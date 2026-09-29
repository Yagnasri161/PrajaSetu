"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Mic, Check } from "lucide-react";

interface VoiceInputProps {
  onTranscript: (finalText: string) => void;
  className?: string;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, className = "" }) => {
  const { language } = useLanguage();
  const [status, setStatus] = useState<"idle" | "listening" | "captured" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef<boolean>(false);
  const finalTranscriptRef = useRef<string>("");
  const restartTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptCallbackRef = useRef(onTranscript);
  transcriptCallbackRef.current = onTranscript;

  const currentLangRef = useRef(language);
  currentLangRef.current = language;

  // Clean shutdown of speech recognition
  const stopRecognition = useCallback(() => {
    isListeningRef.current = false;
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onstart = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
      } catch {
        // Safe to ignore
      }
      recognitionRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecognition();
    };
  }, [stopRecognition]);

  // Safe starter that preserves session and accumulated transcript
  const startSession = useCallback(() => {
    const SpeechRecognition =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

    if (!SpeechRecognition) {
      setStatus("error");
      setErrorMessage(
        currentLangRef.current === "te"
          ? "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ అందుబాటులో లేదు."
          : "Voice input is not supported in this browser."
      );
      isListeningRef.current = false;
      return;
    }

    try {
      // Abort previous instance if any
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onend = null;
          recognitionRef.current.onerror = null;
          recognitionRef.current.abort();
        } catch {}
        recognitionRef.current = null;
      }

      const recognition = new SpeechRecognition();
      // Google-like continuous voice search
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.lang = currentLangRef.current === "te" ? "te-IN" : "en-IN";

      recognition.onstart = () => {
        if (isListeningRef.current) {
          setStatus("listening");
          setErrorMessage(null);
        }
      };

      recognition.onresult = (event: any) => {
        if (!isListeningRef.current) return;

        let currentInterim = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const result = event.results[i];
          const text = result[0]?.transcript || "";
          if (result.isFinal) {
            const cleanFinal = text.trim();
            if (cleanFinal) {
              // Append to accumulated final text without creating duplicates
              const currentFinal = finalTranscriptRef.current;
              if (currentFinal) {
                if (!currentFinal.endsWith(cleanFinal)) {
                  finalTranscriptRef.current = `${currentFinal} ${cleanFinal}`;
                }
              } else {
                finalTranscriptRef.current = cleanFinal;
              }
            }
          } else {
            currentInterim += text;
          }
        }

        // Combine committed final transcript with any ongoing speech
        const combined = (
          finalTranscriptRef.current +
          (currentInterim.trim() ? ` ${currentInterim.trim()}` : "")
        ).trim();

        if (combined) {
          transcriptCallbackRef.current(combined);
        }
      };

      recognition.onerror = (event: any) => {
        const errCode = event.error;

        // Conversational pauses trigger "no-speech" in some browsers.
        // DO NOT stop listening on no-speech!
        if (errCode === "no-speech") {
          return;
        }

        if (errCode === "aborted") {
          // Intentional abort or browser pause, ignore if still listening
          return;
        }

        if (errCode === "not-allowed" || errCode === "permission-denied") {
          isListeningRef.current = false;
          setStatus("error");
          setErrorMessage(
            currentLangRef.current === "te"
              ? "మైక్రోఫోన్ అనుమతి ఇవ్వండి."
              : "Please allow microphone access."
          );
          return;
        }

        if (errCode === "network") {
          setErrorMessage(
            currentLangRef.current === "te"
              ? "నెట్‌వర్క్ సమస్య ఉంది."
              : "Network connection issue."
          );
        }
      };

      // Handle speech recognition termination across silences/pauses
      recognition.onend = () => {
        // If user is STILL in listening mode, automatically restart to continue listening across pauses
        if (isListeningRef.current) {
          if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
          restartTimerRef.current = setTimeout(() => {
            if (isListeningRef.current) {
              startSession();
            }
          }, 150);
        } else {
          // User manually stopped
          recognitionRef.current = null;
          setStatus("captured");
          setTimeout(() => {
            setStatus((prev) => (prev === "captured" ? "idle" : prev));
          }, 2000);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      // If immediate restart fails, schedule a retry if user is still listening
      if (isListeningRef.current) {
        if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
        restartTimerRef.current = setTimeout(() => {
          if (isListeningRef.current) {
            startSession();
          }
        }, 300);
      } else {
        setStatus("idle");
      }
    }
  }, []);

  // Toggle button handler
  const toggleListening = () => {
    // If currently listening, manual click STOPS the session
    if (isListeningRef.current) {
      stopRecognition();
      setStatus("captured");
      if (finalTranscriptRef.current.trim()) {
        transcriptCallbackRef.current(finalTranscriptRef.current.trim());
      }
      setTimeout(() => {
        setStatus((prev) => (prev === "captured" ? "idle" : prev));
      }, 2000);
      return;
    }

    // Otherwise, start new listening session
    stopRecognition();
    setErrorMessage(null);
    finalTranscriptRef.current = "";
    isListeningRef.current = true;
    setStatus("listening");
    startSession();
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={toggleListening}
        aria-label={
          status === "listening"
            ? language === "te"
              ? "వినడం ఆపండి"
              : "Stop listening"
            : language === "te"
            ? "తెలుగులో మాట్లాడండి"
            : "Speak in English"
        }
        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs ${
          status === "listening"
            ? "bg-[#C62828] text-white ring-2 ring-[#C62828]/40 animate-pulse"
            : status === "captured"
            ? "bg-[#2E7D32] text-white"
            : "bg-[#0056A6] hover:bg-[#003B73] text-white"
        }`}
      >
        {status === "listening" ? (
          <>
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <span className="font-telugu">
              {language === "te" ? "వింటున్నాము..." : "Listening..."}
            </span>
          </>
        ) : status === "captured" ? (
          <>
            <Check className="w-4 h-4 text-white" />
            <span className="font-telugu">
              {language === "te" ? "నమోదు చేయబడింది" : "Captured"}
            </span>
          </>
        ) : (
          <>
            <Mic className="w-4 h-4" />
            <span className="font-telugu">
              {language === "te" ? "మాట్లాడండి" : "Speak"}
            </span>
          </>
        )}
      </button>

      {/* User-friendly error tooltip */}
      {errorMessage && (
        <div className="absolute left-0 top-full mt-1.5 z-20 px-2.5 py-1 rounded bg-[#FDECEC] border border-[#C62828]/20 text-[#C62828] text-xs font-medium whitespace-nowrap shadow-xs">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

import { NextRequest, NextResponse } from "next/server";
import { getSchemes, getAllSchemesAdmin, getSchemeById, updateSchemeAdmin, addSchemeAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const admin = searchParams.get("admin") === "true";

    if (id) {
      const scheme = await getSchemeById(id);
      if (!scheme) {
        return NextResponse.json({ error: "Scheme not found" }, { status: 404 });
      }
      return NextResponse.json({ scheme });
    }

    const schemes = admin ? await getAllSchemesAdmin() : await getSchemes();
    return NextResponse.json({ schemes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newScheme = await addSchemeAdmin(body);
    return NextResponse.json({ success: true, scheme: newScheme });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: "Scheme id is required" }, { status: 400 });
    }
    const updated = await updateSchemeAdmin(body);
    return NextResponse.json({ success: true, scheme: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

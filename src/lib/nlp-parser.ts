import { CitizenProfile } from "./types";

export function parseNaturalLanguageProfile(query: string, language: "en" | "te" = "en"): CitizenProfile {
  const text = query.toLowerCase();
  const profile: CitizenProfile = {
    age: null,
    gender: null,
    state: "Telangana", // Default context is Telangana civic discovery
    district: null,
    annual_income: null,
    occupation: null,
    category: null,
    marital_status: null,
    student_status: null,
    farmer_status: null,
    land_acres: null,
    owns_house: null,
    electricity_units: null,
    has_ration_card: null,
    has_aadhaar: null,
    has_income_certificate: null,
    disability: null,
    children: null,
    senior_citizen: null,
    seeking_marriage_aid: null,
    documents_held: [],
    other_relevant_fields: {},
  };

  // 1. Age extraction
  // English: 35 years old, 35 yrs, age 35, 35 year
  // Telugu: 35 సంవత్సరాలు, 35 సం, 35 ఏళ్లు, వయస్సు 35
  const ageMatch = text.match(/(?:age\s*(?:is\s*)?|వయస్సు\s*(?:కూడా\s*)?)?(\b\d{1,2}\b)\s*(?:years?|yrs?|year-old|సంవత్సరాలు|సం|ఏళ్లు|సంవత్సరాల)/i) ||
                   text.match(/(?:age\s*|వయస్సు\s*)(\b\d{1,2}\b)/i);
  if (ageMatch && ageMatch[1]) {
    const parsedAge = parseInt(ageMatch[1], 10);
    if (parsedAge > 0 && parsedAge <= 115) {
      profile.age = parsedAge;
      if (parsedAge >= 57) {
        profile.senior_citizen = true;
      }
    }
  }

  // 2. Annual Income extraction
  // Examples: 1.5 lakh, ₹2 lakh, 1,20,000, 95000, 2 లక్షలు, 1.2 లక్ష, 80 వేలు
  const lakhMatch = text.match(/(?:₹|rs\.?|రూ\.?|రూపాయలు)?\s*(\d+(?:\.\d+)?)\s*(?:lakhs?|lakh|lac|లక్షలు|లక్ష)/i);
  const thousandsMatch = text.match(/(?:₹|rs\.?|రూ\.?|రూపాయలు)?\s*(\d+(?:\.\d+)?)\s*(?:thousand|k|వేలు)/i);
  const directIncomeMatch = text.match(/(?:income|ఆదాయం|ఆదాయము).*?(?:₹|rs\.?|రూ\.?|రూపాయలు)?\s*(\d{5,7})/i);

  if (lakhMatch && lakhMatch[1]) {
    profile.annual_income = Math.round(parseFloat(lakhMatch[1]) * 100000);
  } else if (thousandsMatch && thousandsMatch[1]) {
    profile.annual_income = Math.round(parseFloat(thousandsMatch[1]) * 1000);
  } else if (directIncomeMatch && directIncomeMatch[1]) {
    profile.annual_income = parseInt(directIncomeMatch[1], 10);
  }

  // 3. Land Acres
  // English: 2 acres, 2.5 acre, 3 acres land
  // Telugu: 2 ఎకరాలు, 2.5 ఎకరం
  const landMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:acres?|acre|ఎకరాలు|ఎకరం|ఎకరాల)/i);
  if (landMatch && landMatch[1]) {
    profile.land_acres = parseFloat(landMatch[1]);
    profile.farmer_status = true;
  }

  // 4. Electricity Units
  // English: 120 units, 150 unit
  // Telugu: 120 యూనిట్లు, 150 యూనిట్ల
  const unitsMatch = text.match(/(\d+)\s*(?:units?|unit|యూనిట్లు|యూనిట్ల|యూనిట్)/i);
  if (unitsMatch && unitsMatch[1]) {
    profile.electricity_units = parseInt(unitsMatch[1], 10);
  }

  // 5. Gender & Marital Status
  if (/female|woman|girl|mother|wife|widow|lady|స్త్రీ|మహిళ|అమ్మాయి|వధువు|గృహిణి|వితంతువు/i.test(text)) {
    profile.gender = "female";
  } else if (/male|man|father|husband|boy|పురుషుడు|అబ్బాయి|రైతు/i.test(text) && !/woman|female|మహిళ/i.test(text)) {
    profile.gender = "male";
  }

  if (/widow|వితంతువు/i.test(text)) {
    profile.marital_status = "widow";
  } else if (/unmarried|single|పెళ్లి కాలేదు|అవివాహిత/i.test(text)) {
    profile.marital_status = "unmarried";
  } else if (/married|భార్య|భర్త|వివాహం అయింది|వివాహితుడు/i.test(text)) {
    profile.marital_status = "married";
  }

  // 6. Occupation & Status
  if (/farmer|agriculture|cultivat|rythu|రైతు|వ్యవసాయం|సాగు/i.test(text)) {
    profile.occupation = "farmer";
    profile.farmer_status = true;
  } else if (/student|college|school|b\.?tech|degree|studying|చదువు|విద్యార్థి|కాలేజీ/i.test(text)) {
    profile.occupation = "student";
    profile.student_status = true;
  } else if (/daily wage|laborer|coolie|labour|కూలీ|రోజువారీ కూలీ/i.test(text)) {
    profile.occupation = "daily_wage";
  } else if (/homemaker|housewife|గృహిణి/i.test(text)) {
    profile.occupation = "homemaker";
  } else if (/unemployed|నిరుద్యోగి|ఉద్యోగం లేదు/i.test(text)) {
    profile.occupation = "unemployed";
  }

  // 7. Social Category (SC, ST, BC, EBC, Minority)
  if (/\b(sc|ఎస్సీ|షెడ్యూల్డ్ కులం)\b/i.test(text)) {
    profile.category = "SC";
  } else if (/\b(st|ఎస్టీ|షెడ్యూల్డ్ తెగ)\b/i.test(text)) {
    profile.category = "ST";
  } else if (/\b(bc|బీసీ|వెనుకబడిన తరగతి)\b/i.test(text)) {
    profile.category = "BC";
  } else if (/\b(ebc|ఈబీసీ)\b/i.test(text)) {
    profile.category = "EBC";
  } else if (/\b(minority|muslim|christian|మైనారిటీ|ముస్లిం|క్రైస్తవ)\b/i.test(text)) {
    profile.category = "Minority";
  }

  // 8. House Ownership
  // If mentions no house, homeless, rented, kutcha, etc.
  if (/no house|homeless|rented|hut|kutcha|shed|ఇల్లు లేదు|సొంత ఇల్లు లేదు|అద్దె|నిరాశ్రయు/i.test(text)) {
    profile.owns_house = false;
  } else if (/own house|have house|సొంత ఇల్లు ఉంది|పక్కా ఇల్లు/i.test(text)) {
    profile.owns_house = true;
  }

  // 9. White Ration Card (Food Security Card)
  if (/ration card|white ration|food security card|bpl|తెల్ల రేషన్ కార్డు|రేషన్ కార్డు|ఆహార భద్రత/i.test(text)) {
    profile.has_ration_card = true;
    profile.documents_held?.push("Ration Card");
  }

  // 10. Marriage Aid Seeking
  if (/marriage|bride|wedding|kalyana|shaadi|పెళ్లి|వివాహం|కల్యాణ లక్ష్మి|షాదీ ముబారక్/i.test(text)) {
    profile.seeking_marriage_aid = true;
  }

  // 11. Disability
  if (/disabled|disability|handicapped|divyang|sadarem|దివ్యాంగు|వికలాంగ|సదరం/i.test(text)) {
    profile.disability = true;
  }

  // 12. Senior Citizen
  if (/senior citizen|old age|pension|వృద్ధులు|వృద్ధాప్య/i.test(text)) {
    profile.senior_citizen = true;
  }

  // 13. Telangana Districts
  const districts = [
    "Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon",
    "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar",
    "Khammam", "Kumuram Bheem Asifabad", "Mahabubabad", "Mahabubnagar",
    "Mancherial", "Medak", "Medchal Malkajgiri", "Mulugu", "Nagarkurnool",
    "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli",
    "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet",
    "Vikarabad", "Wanaparthy", "Warangal", "Hanamkonda", "Yadadri Bhuvanagiri"
  ];
  const teluguDistricts: Record<string, string> = {
    "హైదరాబాద్": "Hyderabad",
    "వరంగల్": "Warangal",
    "మెదక్": "Medak",
    "నిజామాబాద్": "Nizamabad",
    "నల్గొండ": "Nalgonda",
    "ఖమ్మం": "Khammam",
    "కరీంనగర్": "Karimnagar",
    "మహబూబ్‌నగర్": "Mahabubnagar",
    "ఆదిలాబాద్": "Adilabad",
    "సిద్దిపేట": "Siddipet",
    "సూర్యాపేట": "Suryapet",
  };

  for (const d of districts) {
    if (new RegExp(`\\b${d}\\b`, "i").test(text)) {
      profile.district = d;
      break;
    }
  }
  if (!profile.district) {
    for (const [teName, enName] of Object.entries(teluguDistricts)) {
      if (text.includes(teName)) {
        profile.district = enName;
        break;
      }
    }
  }

  // Default aadhaar holding to true in India context if mentioned or normal
  if (/aadhaar|aadhar|ఆధార్/i.test(text)) {
    profile.has_aadhaar = true;
    profile.documents_held?.push("Aadhaar");
  }

  return profile;
}

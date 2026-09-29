-- ============================================================
-- PrajaSetu Database Seed Data
-- 12 Verified Official Telangana & Central Government Schemes
-- ============================================================

-- 1. Gruha Jyothi
WITH s1 AS (
  INSERT INTO public.schemes (
    slug, name_en, name_te, short_description_en, short_description_te, category, department,
    benefit_en, benefit_te, eligibility_summary_en, eligibility_summary_te,
    application_process_en, application_process_te, official_source_url, official_application_url, last_verified, active
  ) VALUES (
    'ts-gruha-jyothi',
    'Gruha Jyothi Scheme',
    'గృహ జ్యోతి పథకం',
    'Provides up to 200 units of free electricity per month for domestic households in Telangana.',
    'తెలంగాణలోని అర్హులైన గృహ వినియోగదారులకు నెలకు 200 యూనిట్ల వరకు ఉచిత విద్యుత్ అందించే పథకం.',
    'Energy',
    'Energy Department, Government of Telangana',
    'Zero electricity bill for monthly domestic power consumption up to 200 units.',
    'నెలకు 200 యూనిట్ల వరకు గృహ విద్యుత్ వినియోగానికి జీరో విద్యుత్ బిల్లు (ఉచిత విద్యుత్).',
    'Telangana resident holding a valid White Ration Card (Food Security Card) with a domestic electricity connection consuming <= 200 units/month.',
    'తెలంగాణ నివాసి, చెల్లుబాటు అయ్యే ఆహార భద్రత కార్డు (తెల్ల రేషన్ కార్డు) మరియు నెలకు 200 యూనిట్ల లోపు గృహ విద్యుత్ వినియోగం ఉండాలి.',
    'Submit Praja Palana application form with Aadhaar, White Ration Card, and latest Electricity Customer Service Number (USCNO) at local Gram Panchayat / Ward Office or MeeSeva.',
    'ఆధార్, ఆహార భద్రత కార్డు మరియు విద్యుత్ సర్వీస్ నంబర్‌తో ప్రజాపాలన దరఖాస్తును గ్రామ పంచాయతీ / వార్డు కార్యాలయం లేదా మీసేవలో సమర్పించండి.',
    'https://prajapalana.telangana.gov.in',
    'https://tgspdcl.com',
    '2024-02-27',
    true
  ) RETURNING id
)
INSERT INTO public.eligibility_rules (scheme_id, field, operator, value_text, value_number, value_boolean, description_en, description_te, required)
SELECT id, 'state', 'equals', 'Telangana', NULL, NULL, 'Must be a permanent resident of Telangana state', 'తెలంగాణ రాష్ట్ర శాశ్వత నివాసి అయి ఉండాలి', true FROM s1
UNION ALL
SELECT id, 'has_ration_card', 'boolean', NULL, NULL, true, 'Must possess an active Telangana Food Security Card (White Ration Card)', 'తెలంగాణ ఆహార భద్రత కార్డు (తెల్ల రేషన్ కార్డు) కలిగి ఉండాలి', true FROM s1
UNION ALL
SELECT id, 'electricity_units', 'lte', NULL, 200, NULL, 'Monthly domestic electricity consumption must not exceed 200 units', 'నెలవారీ గృహ విద్యుత్ వినియోగం 200 యూనిట్లకు మించరాదు', true FROM s1;

-- 2. Maha Lakshmi
WITH s2 AS (
  INSERT INTO public.schemes (
    slug, name_en, name_te, short_description_en, short_description_te, category, department,
    benefit_en, benefit_te, eligibility_summary_en, eligibility_summary_te,
    application_process_en, application_process_te, official_source_url, official_application_url, last_verified, active
  ) VALUES (
    'ts-maha-lakshmi',
    'Maha Lakshmi Scheme',
    'మహాలక్ష్మి పథకం',
    'Comprehensive women empowerment scheme providing free bus travel, ₹2,500/month financial aid, and ₹500 subsidized LPG cylinder.',
    'మహిళలకు ఉచిత ఆర్టీసీ బస్సు ప్రయాణం, నెలకు ₹2,500 ఆర్థిక సాయం, ₹500కే ఎల్పీజీ గ్యాస్ సిలిండర్ అందించే ప్రతిష్టాత్మక పథకం.',
    'Women & Child',
    'Department of Women & Child Development, Government of Telangana',
    'Free travel in TSRTC Palle Velugu and Express buses across Telangana, ₹500 LPG cylinder subsidy, and ₹2,500 monthly income assistance for poor women.',
    'తెలంగాణ వ్యాప్తంగా ఆర్టీసీ పల్లె వెలుగు, ఎక్స్‌ప్రెస్ బస్సుల్లో ఉచిత ప్రయాణం, ₹500 కే ఎల్పీజీ సిలిండర్, నెలకు ₹2,500 ఆర్థిక సాయం.',
    'Women residents of Telangana holding an Aadhaar card (for free bus transit); White Ration card and active LPG connection in woman name (for cylinder subsidy).',
    'తెలంగాణ మహిళలు, ఆధార్ కార్డు ఉన్నవారు (ఉచిత బస్సు ప్రయాణానికి); తెల్ల రేషన్ కార్డు మరియు మహిళ పేరిట గ్యాస్ కనెక్షన్ ఉన్నవారు (సిలిండర్ సబ్సిడీకి).',
    'Bus travel is zero-fare upon presenting original Aadhaar with Telangana domicile. For ₹500 LPG and monthly aid, apply via Praja Palana counter.',
    'బస్సు ప్రయాణానికి ఒరిజినల్ ఆధార్ కార్డు చూపి జీరో టికెట్ పొందవచ్చు. ₹500 గ్యాస్ సిలిండర్, ఆర్థిక సాయం కోసం ప్రజా పాలన ద్వారా దరఖాస్తు చేసుకోవాలి.',
    'https://telangana.gov.in',
    'https://prajapalana.telangana.gov.in',
    '2024-02-27',
    true
  ) RETURNING id
)
INSERT INTO public.eligibility_rules (scheme_id, field, operator, value_text, value_number, value_boolean, description_en, description_te, required)
SELECT id, 'gender', 'equals', 'female', NULL, NULL, 'Beneficiary must be female or transgender woman', 'లబ్ధిదారురాలు మహిళ లేదా ట్రాన్స్‌జెండర్ మహిళ అయి ఉండాలి', true FROM s2
UNION ALL
SELECT id, 'state', 'equals', 'Telangana', NULL, NULL, 'Must be a resident of Telangana', 'తెలంగాణ నివాసి అయి ఉండాలి', true FROM s2;

-- 3. Rythu Bharosa
WITH s3 AS (
  INSERT INTO public.schemes (
    slug, name_en, name_te, short_description_en, short_description_te, category, department,
    benefit_en, benefit_te, eligibility_summary_en, eligibility_summary_te,
    application_process_en, application_process_te, official_source_url, official_application_url, last_verified, active
  ) VALUES (
    'ts-rythu-bharosa',
    'Rythu Bharosa Scheme',
    'రైతు భరోసా పథకం',
    'Agricultural investment support for cultivating farmers and landholders in Telangana.',
    'తెలంగాణలోని సాగుచేసే రైతులకు పెట్టుబడి సహాయం అందించే వ్యవసాయ సంక్షేమ పథకం.',
    'Agriculture',
    'Department of Agriculture and Farmers Welfare, Telangana',
    'Direct financial assistance per acre per season transferred to farmer Aadhaar-seeded bank account.',
    'సాగు చేసే రైతులకు ఎకరానికి సీజన్‌కు నేరుగా బ్యాంక్ ఖాతాలో జమ చేయబడే ఆర్థిక పెట్టుబడి సాయం.',
    'Resident farmer cultivating agricultural land in Telangana with title deed passbook (Pattadar) or registered tenant farmer under state guidelines.',
    'తెలంగాణలో వ్యవసాయ భూమి సాగు చేస్తున్న పట్టాదారు పాస్‌బుక్ కలిగిన రైతులు లేదా మార్గదర్శకాల ప్రకారం నమోదైన కౌలు రైతులు.',
    'Enrollment via Agriculture Extension Officers (AEO) or online through Dharani / Agriculture portal with Pattadar Passbook and Aadhaar.',
    'పట్టాదారు పాస్‌బుక్, ఆధార్ కార్డుతో సంబంధిత వ్యవసాయ విస్తరణ అధికారి (AEO) లేదా ధరణి పోర్టల్ ద్వారా నమోదు చేసుకోవచ్చు.',
    'https://rythubharosa.telangana.gov.in',
    'https://agri.telangana.gov.in',
    '2024-03-15',
    true
  ) RETURNING id
)
INSERT INTO public.eligibility_rules (scheme_id, field, operator, value_text, value_number, value_boolean, description_en, description_te, required)
SELECT id, 'farmer_status', 'boolean', NULL, NULL, true, 'Applicant must be a farmer / cultivator', 'దరఖాస్తుదారు వ్యవసాయం చేసే రైతు అయి ఉండాలి', true FROM s3
UNION ALL
SELECT id, 'state', 'equals', 'Telangana', NULL, NULL, 'Must own or cultivate land within Telangana', 'తెలంగాణ రాష్ట్రంలో వ్యవసాయ భూమి ఉండాలి', true FROM s3
UNION ALL
SELECT id, 'land_acres', 'gt', NULL, 0, NULL, 'Must possess cultivable land holdings', 'సాగుభూమి కలిగి ఉండాలి', true FROM s3;

-- 4. Indiramma Indlu
WITH s4 AS (
  INSERT INTO public.schemes (
    slug, name_en, name_te, short_description_en, short_description_te, category, department,
    benefit_en, benefit_te, eligibility_summary_en, eligibility_summary_te,
    application_process_en, application_process_te, official_source_url, official_application_url, last_verified, active
  ) VALUES (
    'ts-indiramma-indlu',
    'Indiramma Indlu Housing Scheme',
    'ఇందిరమ్మ ఇండ్లు పథకం',
    'Housing grant of ₹5,00,000 for houseless and poor families to construct permanent pucca houses.',
    'ఇల్లు లేని పేద కుటుంబాలకు సొంత స్థలంలో పక్కా ఇల్లు నిర్మించుకోవడానికి ₹5,00,000 ఆర్థిక సాయం అందించే పథకం.',
    'Housing',
    'Telangana State Housing Corporation Limited',
    'Financial subsidy of ₹5 Lakh disbursed in phased stages for constructing a pucca dwelling unit; free house site for eligible homeless families without land.',
    'పక్కా ఇంటి నిర్మాణానికి దశలవారీగా ₹5 లక్షల ఆర్థిక గ్రాంట్; స్థలం లేని నిరుపేదలకు ఉచిత ఇంటి స్థలం.',
    'Telangana BPL family with White Ration Card without a pucca house anywhere in India, owning a residential plot or identified as homeless.',
    'తెలంగాణలోని తెల్ల రేషన్ కార్డు కలిగిన పేద కుటుంబం, ఎక్కడా పక్కా ఇల్లు ఉండరాదు, సొంత స్థలం ఉన్నవారు లేదా నిరాశ్రయులు.',
    'Submit Praja Palana application or apply through Gram Sabha / Ward Sachivalayam scrutiny with land possession documents and BPL card.',
    'ప్రజాపాలన దరఖాస్తు లేదా గ్రామసభ / వార్డు సచివాలయం ద్వారా స్థల పత్రాలు, తెల్ల రేషన్ కార్డుతో దరఖాస్తు చేసుకోండి.',
    'https://indirammaindlu.telangana.gov.in',
    'https://housing.telangana.gov.in',
    '2024-03-15',
    true
  ) RETURNING id
)
INSERT INTO public.eligibility_rules (scheme_id, field, operator, value_text, value_number, value_boolean, description_en, description_te, required)
SELECT id, 'state', 'equals', 'Telangana', NULL, NULL, 'Must be a resident of Telangana', 'తెలంగాణ రాష్ట్ర నివాసి అయి ఉండాలి', true FROM s4
UNION ALL
SELECT id, 'owns_house', 'boolean', NULL, NULL, false, 'Must NOT already own a pucca permanent house', 'సొంతంగా పక్కా ఇల్లు కలిగి ఉండకూడదు', true FROM s4
UNION ALL
SELECT id, 'has_ration_card', 'boolean', NULL, NULL, true, 'Must have an active White Ration Card', 'ఆహార భద్రత కార్డు (తెల్ల రేషన్ కార్డు) కలిగి ఉండాలి', true FROM s4;

-- 5. Kalyana Lakshmi / Shaadi Mubarak
WITH s5 AS (
  INSERT INTO public.schemes (
    slug, name_en, name_te, short_description_en, short_description_te, category, department,
    benefit_en, benefit_te, eligibility_summary_en, eligibility_summary_te,
    application_process_en, application_process_te, official_source_url, official_application_url, last_verified, active
  ) VALUES (
    'ts-kalyana-lakshmi',
    'Kalyana Lakshmi / Shaadi Mubarak',
    'కల్యాణ లక్ష్మి / షాదీ ముబారక్',
    'Financial assistance of ₹1,00,116 to alleviate the financial burden of marriage for low-income brides in Telangana.',
    'తెలంగాణలోని పేద కుటుంబాల వధువు వివాహ ఖర్చుల నిమిత్తం ప్రభుత్వం అందించే ₹1,00,116 ఆర్థిక సహాయ పథకం.',
    'Social Security',
    'Scheduled Castes, ST, BC & Minority Welfare Departments, Telangana',
    'One-time direct bank transfer of ₹1,00,116 to the bride mother account before or around the wedding.',
    'పెళ్లి సమయంలో వధువు తల్లి బ్యాంక్ ఖాతాకు నేరుగా ₹1,00,116 ఏకమొత్తం జమ.',
    'Unmarried girl resident of Telangana completing 18 years of age at marriage. Family annual income <= ₹2,00,000 belonging to SC, ST, BC, EBC, or Minority communities.',
    'తెలంగాణ నివాసి, వివాహ సమయానికి 18 ఏళ్లు నిండిన వధువు. కుటుంబ వార్షిక ఆదాయం ₹2 లక్షల లోపు ఉండాలి.',
    'Apply online via Telangana ePass portal at least 10 days before marriage, followed by verification by Mandal Revenue Officer (MRO).',
    'వివాహానికి ముందు తెలంగాణ ఈపాస్ (ePass) పోర్టల్ ద్వారా దరఖాస్తు చేసుకోవాలి.',
    'https://telanganaepass.cgg.gov.in',
    'https://telanganaepass.cgg.gov.in/KalyanLakshmi.do',
    '2024-03-01',
    true
  ) RETURNING id
)
INSERT INTO public.eligibility_rules (scheme_id, field, operator, value_text, value_number, value_boolean, description_en, description_te, required)
SELECT id, 'state', 'equals', 'Telangana', NULL, NULL, 'Bride must be a permanent resident of Telangana', 'వధువు తెలంగాణ రాష్ట్ర శాశ్వత నివాసి అయి ఉండాలి', true FROM s5
UNION ALL
SELECT id, 'age', 'gte', NULL, 18, NULL, 'Bride must have completed 18 years of age', 'వధువు వయస్సు తప్పనిసరిగా 18 సంవత్సరాలు నిండి ఉండాలి', true FROM s5
UNION ALL
SELECT id, 'annual_income', 'lte', NULL, 200000, NULL, 'Combined family annual income must not exceed ₹2,00,000', 'కుటుంబ వార్షిక ఆదాయం ₹2,00,000 మించరాదు', true FROM s5;

-- 6. Aarogyasri Health Scheme
WITH s6 AS (
  INSERT INTO public.schemes (
    slug, name_en, name_te, short_description_en, short_description_te, category, department,
    benefit_en, benefit_te, eligibility_summary_en, eligibility_summary_te,
    application_process_en, application_process_te, official_source_url, official_application_url, last_verified, active
  ) VALUES (
    'ts-aarogyasri',
    'Aarogyasri Health Scheme',
    'రాజీవ్ ఆరోగ్యశ్రీ ఆరోగ్య పథకం',
    'Comprehensive cashless medical treatment coverage up to ₹10,00,000 for families below poverty line.',
    'దారిద్య్ర రేఖకు దిగువన ఉన్న పేద కుటుంబాలకు ₹10 లక్షల వరకు నగదు రహిత వైద్య చికిత్స అందించే ఆరోగ్య పథకం.',
    'Healthcare',
    'Aarogyasri Health Care Trust, Government of Telangana',
    'Complete cashless hospitalization and surgery cover up to ₹10 Lakh per family per year in empanelled network hospitals.',
    'నెట్‌వర్క్ ఆసుపత్రుల్లో కుటుంబానికి సంవత్సరానికి ₹10 లక్షల వరకు పూర్తి నగదు రహిత ఇన్-పేషెంట్ మరియు శస్త్రచికిత్స వైద్య సాయం.',
    'Telangana BPL family holding a valid Food Security (White) Ration Card with Aarogyasri Trust linkage.',
    'తెలంగాణలోని తెల్ల రేషన్ కార్డు (ఆహార భద్రత కార్డు) కలిగిన పేద కుటుంబాలు అర్హులు.',
    'Walk into any empanelled government or private network hospital with your Food Security Card / Aarogyasri Card and Aadhaar for Aarogya Mithra desk processing.',
    'ఆహార భద్రత కార్డు మరియు ఆధార్ కార్డుతో ఏదైనా నమోదిత ఆసుపత్రిలోని ఆరోగ్య మిత్ర హెల్ప్ డెస్క్‌ను సంప్రదించండి.',
    'https://aarogyasri.telangana.gov.in',
    'https://aarogyasri.telangana.gov.in/portal/knowYourPolicyDetails.do',
    '2024-01-15',
    true
  ) RETURNING id
)
INSERT INTO public.eligibility_rules (scheme_id, field, operator, value_text, value_number, value_boolean, description_en, description_te, required)
SELECT id, 'state', 'equals', 'Telangana', NULL, NULL, 'Resident of Telangana', 'తెలంగాణ రాష్ట్ర నివాసి అయి ఉండాలి', true FROM s6
UNION ALL
SELECT id, 'has_ration_card', 'boolean', NULL, NULL, true, 'Must possess active Food Security (White) Ration Card', 'చెల్లుబాటు అయ్యే ఆహార భద్రత (తెల్ల) రేషన్ కార్డు ఉండాలి', true FROM s6;

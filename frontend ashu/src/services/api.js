// JanMitra AI Mock Backend Database & API Service
const COMPLAINTS_KEY = 'janmitra_complaints';

// Initial Seed Data to populate localStorage
const SEED_COMPLAINTS = [
  {
    ticketId: "JM-78341",
    name: "Rajesh Kumar",
    phone: "9876543210",
    area: "Hazratganj, Zone 1",
    title: "Overflowing Garbage Bin & Stray Animals",
    description: "The main garbage container near Hazratganj crossing has not been cleared for three days. Waste is spilling onto the road, causing terrible stench and attracting stray cattle, blocking traffic.",
    submittedAt: "2026-05-20T09:30:00Z",
    status: "Pending",
    image: null,
    // Exact API Contract Fields
    category: "Solid Waste Management",
    department: "Lucknow Nagar Nigam - Sanitation & Health Division (Zone 1)",
    urgency: "High",
    urgency_reason: "Public health hazard and traffic disruption due to waste overflow on main road.",
    sentiment: "Frustrated",
    summary_en: "Overflowing trash bin at Hazratganj crossing uncleared for 3 days, causing bad odor and traffic block by stray animals.",
    summary_hi: "हजरतगंज चौराहे के पास कचरे का डिब्बा 3 दिनों से खाली नहीं हुआ है, जिससे दुर्गंध और आवारा पशुओं द्वारा जाम लग रहा है।",
    citizen_update_en: "Complaint registered. AI has assigned it to Sanitation Officer. Cleaning crew dispatch scheduled.",
    citizen_update_hi: "शिकायत दर्ज। AI ने स्वच्छता अधिकारी को कार्य सौंपा है। सफाई दल भेजने की तैयारी।",
    sms_hi: "जनमित्र: आपकी शिकायत दर्ज है। सं: JM-78341. वार्ड सफाई दल को प्रेषित किया गया है।",
    ticket_sla_days: 2,
    ai_confidence_score: 96.5,
    priority_score: 82,
    estimated_resolution: "2026-05-22T18:00:00Z",
    requires_escalation: false,
    department_note: "Ward 12 cleanliness patrol notified. JCB vehicle scheduled for clearing debris.",
    tags: ["Garbage", "Hazratganj", "Public Health", "Traffic Block"],
    timeline: [
      { status: "Submitted", title: "Grievance Filed", date: "2026-05-20T09:30:00Z", desc: "Ticket generated and verified by JanMitra AI." },
      { status: "Triage", title: "AI Triage Completed", date: "2026-05-20T09:30:05Z", desc: "Routed to Sanitation & Health Division. Urgency: High. Confidence: 96.5%." },
      { status: "Assigned", title: "Officer Assigned", date: "2026-05-20T11:15:00Z", desc: "Assigned to Ward Inspector Shri S.K. Dwivedi." }
    ]
  },
  {
    ticketId: "JM-54129",
    name: "Anjali Mishra",
    phone: "9123456789",
    area: "Alambagh, Zone 5",
    title: "Severe Waterlogging & Broken Drainage",
    description: "After yesterday's rain, the main drain in Sector B Alambagh is completely choked. Water has entered the yards of three houses. Needs immediate vacuum pump suction.",
    submittedAt: "2026-05-21T14:20:00Z",
    status: "Escalated",
    image: null,
    // Exact API Contract Fields
    category: "Water Supply & Sewerage",
    department: "Lucknow Jal Sansthan (Zone 5)",
    urgency: "Critical",
    urgency_reason: "Rainwater flooding residential compound, risking structural damage and waterborne diseases.",
    sentiment: "Anxious",
    summary_en: "Choked drainage in Alambagh Sector B leading to waterlogging in residential house yards after rain.",
    summary_hi: "आलमबाग सेक्टर बी में बारिश के बाद नाला चोक होने से घरों के परिसरों में जलभराव की समस्या।",
    citizen_update_en: "AI detected critical threat level. SLA threshold breached. Ticket escalated to Executive Engineer.",
    citizen_update_hi: "AI द्वारा गंभीर खतरा चिन्हित। समय सीमा उल्लंघन के कारण अधिशासी अभियंता को मामला प्रेषित।",
    sms_hi: "जनमित्र: आपकी गंभीर शिकायत दर्ज है। सं: JM-54129. जलकल विभाग की आपातकालीन टीम रवाना।",
    ticket_sla_days: 1,
    ai_confidence_score: 93.2,
    priority_score: 95,
    estimated_resolution: "2026-05-22T12:00:00Z",
    requires_escalation: true,
    department_note: "Water pumps dispatched to drain flooded lanes. Drainage repairs will commence once water level drops.",
    tags: ["Drainage", "Waterlogging", "Flooding", "Alambagh"],
    timeline: [
      { status: "Submitted", title: "Grievance Filed", date: "2026-05-21T14:20:00Z", desc: "Ticket generated and verified by JanMitra AI." },
      { status: "Triage", title: "AI Triage Completed", date: "2026-05-21T14:20:02Z", desc: "Routed to Lucknow Jal Sansthan. Priority score computed as 95/100." },
      { status: "Assigned", title: "Emergency Team Dispatched", date: "2026-05-21T15:00:00Z", desc: "Drainage inspection team assigned. Water pumps mobilized." },
      { status: "Escalated", title: "SLA Escalation Triggered", date: "2026-05-22T08:00:00Z", desc: "Automated trigger: resolution time breached SLA. Case escalated to Jal Sansthan HQ." }
    ]
  },
  {
    ticketId: "JM-32984",
    name: "Ramesh Srivastava",
    phone: "8877665544",
    area: "Gomti Nagar, Zone 4",
    title: "Streetlights Non-functional for 2 Weeks",
    description: "Entire street light line in Gomti Nagar Phase 2, Patrakar Puram bypass is out. It is pitch dark at night, making it unsafe for women and elder residents. Multiple chain-snatching incidents reported recently.",
    submittedAt: "2026-05-18T20:10:00Z",
    status: "Resolved",
    image: null,
    // Exact API Contract Fields
    category: "Streetlight Maintenance",
    department: "Lucknow Nagar Nigam - Streetlight Division (Zone 4)",
    urgency: "Medium",
    urgency_reason: "Public safety concerns at night, increase in local petty crimes.",
    sentiment: "Concerned",
    summary_en: "Streetlight line completely down for 2 weeks in Patrakar Puram, Gomti Nagar, causing security issues.",
    summary_hi: "गोमती नगर पत्रकार पुरम बाईपास में 2 सप्ताह से स्ट्रीट लाइटें बंद हैं, जिससे सुरक्षा समस्या हो रही है।",
    citizen_update_en: "Resolved. Streetlight department replaced the faulty wiring and 12 LED fittings. Verified by site inspection.",
    citizen_update_hi: "निस्तारित। स्ट्रीट लाइट विभाग ने खराब वायरिंग और 12 एलईडी बल्बों को बदल दिया है। निरीक्षण द्वारा सत्यापित।",
    sms_hi: "जनमित्र: आपकी शिकायत JM-32984 का निस्तारण कर दिया गया है। फीडबैक दर्ज करने हेतु लिंक पर जाएं।",
    ticket_sla_days: 3,
    ai_confidence_score: 98.1,
    priority_score: 65,
    estimated_resolution: "2026-05-21T18:00:00Z",
    requires_escalation: false,
    department_note: "Faulty main circuit breaker replaced. Checked entire stretch, all lights are now glowing.",
    tags: ["Streetlight", "Gomti Nagar", "Safety", "Electricity"],
    timeline: [
      { status: "Submitted", title: "Grievance Filed", date: "2026-05-18T20:10:00Z", desc: "Ticket generated and verified by JanMitra AI." },
      { status: "Triage", title: "AI Triage Completed", date: "2026-05-18T20:10:03Z", desc: "Routed to Streetlight Division. Urgency: Medium." },
      { status: "Assigned", title: "Field Team Assigned", date: "2026-05-19T09:00:00Z", desc: "Line inspector assigned for troubleshooting." },
      { status: "In-Progress", title: "Wiring Inspection", date: "2026-05-20T11:00:00Z", desc: "Excavation and cable repair underway." },
      { status: "Resolved", title: "Issue Resolved", date: "2026-05-21T17:30:00Z", desc: "Lights repaired. Resolution confirmed by smart node ping." }
    ]
  }
];

// Helper to load complaints from localStorage
export const getComplaints = () => {
  const data = localStorage.getItem(COMPLAINTS_KEY);
  if (!data) {
    localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(SEED_COMPLAINTS));
    return SEED_COMPLAINTS;
  }
  return JSON.parse(data);
};

// Helper to save complaints
const saveComplaints = (complaints) => {
  localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints));
};

// Get single complaint by ID
export const getComplaintById = (id) => {
  const complaints = getComplaints();
  return complaints.find(c => c.ticketId.toUpperCase() === id.toUpperCase() || c.ticketId.split('-')[1] === id) || null;
};

// AI Triage NLP Simulator Engine
// Formulates the response according to the required API Contract
export const analyzeComplaintText = (title, description) => {
  const text = (title + " " + description).toLowerCase();
  
  let category = "General Grievance";
  let department = "Lucknow Nagar Nigam - General Administration";
  let urgency = "Medium";
  let slaDays = 5;
  let priority = 50;
  let tags = [];
  let summary_en = "";
  let summary_hi = "";

  // 1. Keyword-based NLP routing
  if (text.includes("garbage") || text.includes("trash") || text.includes("waste") || text.includes("dustbin") || text.includes("cleanliness") || text.includes("sweeper") || text.includes("kachra") || text.includes("safai")) {
    category = "Solid Waste Management";
    department = "Lucknow Nagar Nigam - Sanitation & Health Division";
    slaDays = 2;
    priority = 70;
    tags = ["Waste Management", "Cleanliness", "Sanitation"];
    if (text.includes("smell") || text.includes("disease") || text.includes("overflow")) {
      urgency = "High";
      priority += 15;
    }
  } else if (text.includes("water") || text.includes("drain") || text.includes("sewage") || text.includes("sewer") || text.includes("leak") || text.includes("pipe") || text.includes("nal")) {
    category = "Water Supply & Sewerage";
    department = "Lucknow Jal Sansthan";
    slaDays = 3;
    priority = 65;
    tags = ["Water", "Drainage", "Sewerage"];
    if (text.includes("flooding") || text.includes("waterlogging") || text.includes("house")) {
      urgency = "Critical";
      slaDays = 1;
      priority += 25;
    }
  } else if (text.includes("street light") || text.includes("streetlight") || text.includes("light") || text.includes("dark") || text.includes("khamba")) {
    category = "Streetlight Maintenance";
    department = "Lucknow Nagar Nigam - Streetlight Division";
    slaDays = 3;
    priority = 45;
    tags = ["Streetlight", "Electricity", "Public Safety"];
    if (text.includes("accident") || text.includes("crime") || text.includes("theft")) {
      urgency = "High";
      priority += 15;
    }
  } else if (text.includes("road") || text.includes("pothole") || text.includes("sadak") || text.includes("gaddha")) {
    category = "Roads & Infrastructure";
    department = "Public Works Department (PWD) Lucknow";
    slaDays = 7;
    priority = 40;
    tags = ["Roads", "Infrastructure", "Potholes"];
    if (text.includes("accident") || text.includes("injury")) {
      urgency = "High";
      priority += 20;
    }
  } else if (text.includes("encroachment") || text.includes("illegal") || text.includes(" कब्जा ") || text.includes("kabza") || text.includes("shop")) {
    category = "Encroachment & Land";
    department = "Lucknow Nagar Nigam - Town Planning & Revenue Division";
    slaDays = 5;
    priority = 55;
    tags = ["Encroachment", "Land Use", "Traffic obstruction"];
  }

  // 2. Sentiment analysis simulation
  let sentiment = "Neutral";
  if (text.includes("urgent") || text.includes("immediately") || text.includes("risk") || text.includes("danger") || text.includes("threat")) {
    sentiment = "Anxious";
    priority += 10;
  } else if (text.includes("bad") || text.includes("useless") || text.includes("worst") || text.includes("pathetic") || text.includes("angry") || text.includes("frustrated")) {
    sentiment = "Frustrated";
    priority += 8;
  } else if (text.includes("request") || text.includes("kindly") || text.includes("please")) {
    sentiment = "Polite";
  }

  // Cap priority
  priority = Math.min(priority, 100);

  // Confidence Score calculation
  const ai_confidence_score = Math.floor(85 + Math.random() * 14); // 85% to 99%

  // Auto Escalation logic
  const requires_escalation = priority > 85;

  // Generate simulated summaries
  const t_title = title || "Grievance";
  summary_en = `Citizen reports issue regarding ${t_title}. Main concern: ${description.substring(0, 100)}...`;
  summary_hi = `नागरिक ने ${t_title} के संबंध में शिकायत दर्ज की है। मुख्य समस्या: ${description.substring(0, 80)}...`;

  const estimated_res_date = new Date();
  estimated_res_date.setDate(estimated_res_date.getDate() + slaDays);

  return {
    category,
    department,
    urgency,
    urgency_reason: urgency === "Critical" ? "Urgent intervention required due to safety hazards." : "Standard triage based on department guidelines.",
    sentiment,
    summary_en,
    summary_hi,
    citizen_update_en: `Your complaint is routed to ${department}. Action pending SLA window.`,
    citizen_update_hi: `आपकी शिकायत ${department} को भेजी गई है। कार्रवाई की प्रतीक्षा है।`,
    sms_hi: `जनमित्र: आपकी शिकायत दर्ज कर ली गई है। संदर्भ संख्या: JM-XXXXX. जल्द ही कार्रवाई की जाएगी।`,
    ticket_sla_days: slaDays,
    ai_confidence_score,
    priority_score: priority,
    estimated_resolution: estimated_res_date.toISOString(),
    requires_escalation,
    department_note: "Routed automatically by JanMitra AI. Initial triage completed.",
    tags
  };
};

// Create a new complaint (simulates backend API save)
export const submitComplaint = (name, phone, area, title, description, image = null) => {
  const complaints = getComplaints();
  
  // Create ticket ID
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const ticketId = `JM-${randomNum}`;
  
  // Call AI Analyser
  const aiDetails = analyzeComplaintText(title, description);
  
  // Format SMS with custom ticket ID
  aiDetails.sms_hi = `जनमित्र: आपकी शिकायत दर्ज है। सं: ${ticketId}. श्रेणी: ${aiDetails.category}. कार्रवाई शुरू।`;

  const newComplaint = {
    ticketId,
    name,
    phone,
    area,
    title,
    description,
    submittedAt: new Date().toISOString(),
    status: aiDetails.requires_escalation ? "Escalated" : "Pending",
    image,
    ...aiDetails,
    timeline: [
      { status: "Submitted", title: "Grievance Filed", date: new Date().toISOString(), desc: "Ticket generated and verified by JanMitra AI." },
      { status: "Triage", title: "AI Triage Completed", date: new Date().toISOString(), desc: `Routed to ${aiDetails.department}. SLA: ${aiDetails.ticket_sla_days} days.` }
    ]
  };

  complaints.unshift(newComplaint);
  saveComplaints(complaints);
  return newComplaint;
};

// Dashboard analytics aggregator
export const getDashboardStats = () => {
  const complaints = getComplaints();
  
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;
  const escalated = complaints.filter(c => c.status === "Escalated" || c.requires_escalation).length;
  
  // Department performance mock
  const departments = {};
  complaints.forEach(c => {
    if (!departments[c.department]) {
      departments[c.department] = { name: c.department, total: 0, resolved: 0, pending: 0, escalated: 0 };
    }
    departments[c.department].total += 1;
    if (c.status === "Resolved") departments[c.department].resolved += 1;
    else if (c.status === "Pending") departments[c.department].pending += 1;
    else if (c.status === "Escalated") departments[c.department].escalated += 1;
  });

  const departmentData = Object.values(departments).map(d => ({
    name: d.name.replace("Lucknow Nagar Nigam - ", "").replace("Lucknow Jal Sansthan", "Jal Sansthan"),
    resolved: d.resolved,
    pending: d.pending,
    escalated: d.escalated,
    total: d.total,
    score: Math.floor(70 + Math.random() * 25) // Performance score 70-95%
  }));

  // Categories distribution
  const categories = {};
  complaints.forEach(c => {
    categories[c.category] = (categories[c.category] || 0) + 1;
  });
  const categoryData = Object.entries(categories).map(([name, value]) => ({ name, value }));

  // Trend data (last 7 days)
  const trendData = [
    { name: "Mon", complaints: 12, resolved: 10, escalated: 1 },
    { name: "Tue", complaints: 19, resolved: 14, escalated: 2 },
    { name: "Wed", complaints: 15, resolved: 12, escalated: 3 },
    { name: "Thu", complaints: 22, resolved: 18, escalated: 1 },
    { name: "Fri", complaints: 30, resolved: 21, escalated: 4 },
    { name: "Sat", complaints: 25, resolved: 23, escalated: 2 },
    { name: "Sun", complaints: total, resolved: resolved, escalated: escalated }
  ];

  return {
    total,
    pending,
    resolved,
    escalated,
    departmentData,
    categoryData,
    trendData,
    recentFeed: complaints.slice(0, 5)
  };
};

// Generate live telemetry stream for AI Logs
export const generateLiveAIActivityLog = () => {
  const verbs = ["Triaged", "Routed", "Escalated", "Summarized", "Parsed Sentiment"];
  const areas = ["Hazratganj", "Alambagh", "Gomti Nagar", "Charbagh", "Indira Nagar", "Mahanagar", "Aminabad", "Jankipuram"];
  const categories = ["Solid Waste Management", "Water Supply", "Streetlight", "Road Infrastructure", "Encroachment"];
  const scores = [92.4, 95.8, 97.2, 89.1, 94.6, 98.9];

  const verb = verbs[Math.floor(Math.random() * verbs.length)];
  const area = areas[Math.floor(Math.random() * areas.length)];
  const cat = categories[Math.floor(Math.random() * categories.length)];
  const score = scores[Math.floor(Math.random() * scores.length)];
  const id = `JM-${Math.floor(10000 + Math.random() * 90000)}`;

  return {
    timestamp: new Date().toISOString(),
    id,
    message: `[AI Engine] ${verb} ticket from ${area} under ${cat}. Confidence: ${score}%`,
    score,
    status: verb === "Escalated" ? "warning" : "info"
  };
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  PhoneCall, 
  Award, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Building, 
  ListCollapse, 
  CheckCircle,
  Clock,
  ExternalLink,
  Users,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';

const LandingPage = () => {
  const navigate = useNavigate();
  const [heroSearchId, setHeroSearchId] = useState('');
  const [nodalSearch, setNodalSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [serviceModal, setServiceModal] = useState(null);

  const stats = [
    { label: "कुल प्राप्त शिकायतें (Total Received)", value: "48,920+", icon: <ListCollapse className="w-5 h-5 text-blue-800" />, desc: "Total registered since launch" },
    { label: "निस्तारित शिकायतें (Redressed)", value: "46,215+", icon: <CheckCircle className="w-5 h-5 text-emerald-600" />, desc: "Successfully resolved cases" },
    { label: "समय सीमा निस्तारण (Within SLA)", value: "94.6%", icon: <Award className="w-5 h-5 text-indigo-600" />, desc: "Adherence to official timeframe" },
    { label: "कुल नगर निगम वार्ड (Total Wards)", value: "110 Wards", icon: <Building className="w-5 h-5 text-orange-600" />, desc: "Zones 1-8 of Lucknow city" }
  ];

  const workflowSteps = [
    { number: "01", title: "शिकायत पंजीकरण", subtitle: "Grievance Lodging", desc: "Citizen files details online via standard form or voice input (Hindi/English)." },
    { number: "02", title: "विभाग आवंटन", subtitle: "Nodal Dispatch", desc: "The smart routing engine parses the text and assigns it directly to the designated department node." },
    { number: "03", title: "नोडल अधिकारी समीक्षा", subtitle: "Officer Allocation", desc: "Zone officers and ward inspectors review cases, schedule labor, and begin on-ground work." },
    { number: "04", title: "निवारण कार्रवाई", subtitle: "Redressal Action", desc: "Grievance is resolved. Photos are uploaded and verified on-ground by Lucknow municipal supervisors." },
    { number: "05", title: "नागरिक प्रतिक्रिया", subtitle: "Citizen Approval", desc: "Bilingual SMS is sent to citizen for closure approval. Escalated automatically to HQ if unresolved." }
  ];

  const services = [
    { id: 1, name: "जन्म एवं मृत्यु प्रमाण पत्र", eng: "Birth & Death Certificate", icon: <Users className="w-5 h-5 text-blue-850" /> },
    { id: 2, name: "गृह कर भुगतान (House Tax)", eng: "Online Property Tax", icon: <Building className="w-5 h-5 text-blue-850" /> },
    { id: 3, name: "जल एवं सीवर कर भुगतान", eng: "Water & Sewer Billing", icon: <Clock className="w-5 h-5 text-blue-850" /> },
    { id: 4, name: "व्यापार लाइसेंस (Trade License)", eng: "License & Permits Desk", icon: <ShieldCheck className="w-5 h-5 text-blue-850" /> },
    { id: 5, name: "स्वच्छ लखनऊ अभियान", eng: "Clean Lucknow Campaigns", icon: <Award className="w-5 h-5 text-blue-850" /> },
    { id: 6, name: "सूचना का अधिकार (RTI)", eng: "Right to Information", icon: <HelpCircle className="w-5 h-5 text-blue-850" /> }
  ];

  const nodalOfficers = [
    { zone: "Zone 1", officer: "Shri Amit Kumar Singh", designation: "Zonal Nodal Officer", phone: "9415000001", office: "Hazratganj Zonal Office" },
    { zone: "Zone 2", officer: "Smt. Pushpa Devi", designation: "Zonal Nodal Officer", phone: "9415000002", office: "Charbagh Zonal Office" },
    { zone: "Zone 3", officer: "Shri Rajesh Gupta", designation: "Zonal Nodal Officer", phone: "9415000003", office: "Jankipuram Zonal Office" },
    { zone: "Zone 4", officer: "Shri Manoj Vyas", designation: "Zonal Nodal Officer", phone: "9415000004", office: "Gomti Nagar Zonal Office" },
    { zone: "Zone 5", officer: "Shri Sunil Dutt", designation: "Zonal Nodal Officer", phone: "9415000005", office: "Alambagh Zonal Office" },
    { zone: "Zone 6", officer: "Smt. Rekha Verma", designation: "Zonal Nodal Officer", phone: "9415000006", office: "Chowk Zonal Office" },
    { zone: "Zone 7", officer: "Shri Ravi Dixit", designation: "Zonal Nodal Officer", phone: "9415000007", office: "Indira Nagar Zonal Office" },
    { zone: "Zone 8", officer: "Shri K. K. Pandey", designation: "Zonal Nodal Officer", phone: "9415000008", office: "Ashiana Zonal Office" }
  ];

  const faqs = [
    {
      q: "जनमित्र पोर्टल पर शिकायत दर्ज करने के बाद क्या होता है?",
      qe: "What happens after registering a grievance on JanMitra?",
      a: "शिकायत दर्ज होते ही हमारा स्वचालित सिस्टम शिकायत के शीर्षक और विवरण का विश्लेषण कर उसे संबंधित जोन के नोडल अधिकारी को प्रेषित कर देता है। नागरिक को मोबाइल पर एसएमएस द्वारा संदर्भ संख्या (Reference ID) प्राप्त होती है जिससे वे अपनी शिकायत को ट्रैक कर सकते हैं।",
      ae: "As soon as a grievance is filed, our automated routing system analyzes the text description and forwards it directly to the zonal officer. The citizen receives a Reference ID on SMS to track the real-time progress."
    },
    {
      q: "शिकायत निवारण के लिए आधिकारिक समय-सीमा (SLA) क्या है?",
      qe: "What is the official resolution timeframe (SLA) for grievances?",
      a: "शिकायतों के निवारण की समय-सीमा उनकी श्रेणी पर निर्भर करती है: ठोस कचरा निस्तारण (Solid Waste) हेतु २४ घंटे, सीवर एवं जलभराव (Sewage/Flooding) हेतु २४-४८ घंटे, खराब स्ट्रीट लाइट सुधार हेतु ७२ घंटे तथा सामान्य लोक निर्माण (Road Potholes/Infra) हेतु ७ से १५ दिन की समय-सीमा निर्धारित है।",
      ae: "SLA timeframes depend on the category: 24 hours for Solid Waste/Garbage, 24-48 hours for Sewage drainage or flooding, 72 hours for Streetlights, and 7-15 days for general Road repairs."
    },
    {
      q: "यदि दी गई समय-सीमा में शिकायत का निवारण नहीं होता है, तो क्या होगा?",
      qe: "What happens if a grievance is not redressed within the SLA limit?",
      a: "यदि कोई शिकायत निर्धारित समय-सीमा में निस्तारित नहीं होती है, तो सिस्टम स्वचालित रूप से उसे उच्च अधिकारी (लखनऊ नगर निगम मुख्यालय अथवा अधिशासी अभियंता) को प्रेषित कर देता है, जिससे त्वरित जवाबदेही तय की जा सके।",
      ae: "If a complaint breaches its target SLA, the system triggers an automatic escalation. The ticket is escalated to the Executive Engineer or Lucknow Nagar Nigam Headquarters for administrative review."
    },
    {
      q: "क्या मैं हिंदी और अंग्रेजी दोनों में शिकायत दर्ज कर सकता हूँ?",
      qe: "Can I lodge grievances in both English and Hindi?",
      a: "हाँ, जनमित्र पोर्टल पूरी तरह द्विभाषी है। आप अपनी शिकायत हिंदी, अंग्रेजी या हिंग्लिश में दर्ज करा सकते हैं। हमारी प्रणाली स्वचालित अनुवाद के माध्यम से संबंधित विभागीय अधिकारी को समझने योग्य रिपोर्ट तैयार करती है।",
      ae: "Yes, JanMitra is fully bilingual. You can write your description in Hindi, English, or mixed hinglish. The system translates and summarizes the case details for the municipal ward inspectors."
    }
  ];

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (!heroSearchId.trim()) return;
    navigate('/track', { state: { id: heroSearchId.trim() } });
  };

  const filteredNodalOfficers = nodalOfficers.filter(o => 
    o.zone.toLowerCase().includes(nodalSearch.toLowerCase()) ||
    o.officer.toLowerCase().includes(nodalSearch.toLowerCase()) ||
    o.office.toLowerCase().includes(nodalSearch.toLowerCase())
  );

  return (
    <div className="space-y-12">
      
      {/* Notice Board Marquee */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex items-center space-x-3 overflow-hidden text-xs text-amber-900 font-bold shadow-xs">
        <span className="shrink-0 bg-amber-600 text-white px-2 py-0.5 rounded text-[10px] uppercase font-extrabold tracking-wider flex items-center">
          <AlertCircle className="w-3.5 h-3.5 mr-1" />
          नवीन सूचना / LATEST NOTICE:
        </span>
        <div className="flex-1 overflow-x-hidden relative">
          <div className="animate-marquee whitespace-nowrap space-x-8">
            <span>🚨 वर्षा ऋतु में जलभराव एवं सीवर चौक की शिकायत दर्ज करने हेतु तत्काल टोल-फ्री हेल्पलाइन 1533 अथवा जनमित्र शिकायत केंद्र का उपयोग करें।</span>
            <span>🚨 स्वच्छ वार्ड लखनऊ रैंकिंग: सभी नागरिक अपने संबंधित वार्डों में कूड़ा उठाव एवं साफ-सफाई की समीक्षा सीधे नोडल अधिकारियों से करें।</span>
            <span>🚨 स्ट्रीट लाइट नवीनीकरण योजना: वार्ड स्तर पर खराब एल.ई.डी लाइटों के निस्तारण की समय-सीमा ७२ घंटे निर्धारित की गई है।</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 md:py-12 flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
        
        {/* Government Emblem/Sub-badge */}
        <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-650 text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
          <ShieldCheck className="w-4 h-4 text-blue-800" />
          <span>लखनऊ नगर निगम जनसुनवाई एवं शिकायत निवारण पोर्टल</span>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            नागरिक शिकायत <span className="text-blue-800">निवारण प्रणाली</span>
          </h1>
          <h2 className="text-base md:text-lg font-bold text-slate-500 max-w-xl mx-auto">
            Integrated Civic Redressal Desk — Lucknow Nagar Nigam
          </h2>
          <p className="text-xs md:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            यह प्रणाली लखनऊ के नागरिकों को कूड़ा उठान, नाला सफाई, स्ट्रीट लाइट की खराबी, जलभराव तथा टूटी सड़कों से संबंधित अपनी शिकायतें सीधे दर्ज करने और उनकी स्थिति को ट्रैक करने की सुविधा प्रदान करती है।
          </p>
        </div>

        {/* Dynamic Action & Search Card */}
        <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left space-y-5">
          <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider flex items-center space-x-1.5 border-b border-slate-100 pb-2">
            <Search className="w-4 h-4 text-blue-800" />
            <span>शिकायत की स्थिति जानें (Track Grievance Status)</span>
          </h3>

          <form onSubmit={handleHeroSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                value={heroSearchId}
                onChange={(e) => setHeroSearchId(e.target.value)}
                placeholder="उदा. JM-78341 (Enter Grievance Reference ID)"
                className="admin-input pl-10 pr-4 uppercase font-bold text-xs"
              />
            </div>
            <button
              type="submit"
              disabled={!heroSearchId.trim()}
              className="px-6 py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-lg text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
              <span>स्थिति खोजें / Search</span>
            </button>
          </form>

          {/* Subtext actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold text-slate-500 gap-3">
            <span>नवीन शिकायत दर्ज करना चाहते हैं?</span>
            <button
              onClick={() => navigate('/submit')}
              className="w-full sm:w-auto px-5 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg flex items-center justify-center space-x-1.5 transition-all group cursor-pointer"
            >
              <span>शिकायत दर्ज करें (Register Grievance)</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

      </section>

      {/* Stats Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <GlassCard key={stat.label} delay={i * 0.05} hoverEffect={true}>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{stat.label}</span>
              <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-black text-slate-900">
                {stat.value}
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5 font-semibold leading-relaxed">{stat.desc}</p>
            </div>
          </GlassCard>
        ))}
      </section>

      {/* Workflow Timeline Section */}
      <section className="space-y-6 bg-white border border-slate-200 rounded-xl p-6">
        <div className="text-center space-y-1">
          <h2 className="text-lg font-black tracking-tight text-slate-900 uppercase">शिकायत निस्तारण कार्यप्रणाली</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wide">
            Official Grievance Resolution Workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
          {workflowSteps.map((step, i) => (
            <div key={step.number} className="p-4 rounded-lg bg-slate-50 border border-slate-200 relative flex flex-col justify-between">
              <div className="text-3xl font-black text-slate-200 absolute top-3 right-3 select-none">
                {step.number}
              </div>
              <div>
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-100 text-[9px] font-black uppercase">
                  चरण {step.number}
                </span>
                <h3 className="text-xs font-extrabold text-slate-900 mt-4">
                  {step.title}
                </h3>
                <h4 className="text-[9px] font-bold text-slate-400 uppercase mb-2">
                  {step.subtitle}
                </h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Citizen Utilities Services Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-lg font-black tracking-tight text-slate-900 uppercase">नागरिक कल्याण एवं सार्वजनिक सेवाएं</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wide">
            Lucknow Municipal Single-Window Utilities Grid
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(service => (
            <div 
              key={service.id} 
              onClick={() => setServiceModal(service)}
              className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between hover:border-blue-800 hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-800 group-hover:text-blue-900 transition-colors">{service.name}</h3>
                  <span className="text-[9px] text-slate-400 uppercase font-bold">{service.eng}</span>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-800 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* Nodal Officer Contact Directory */}
      <section className="space-y-6 bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900 uppercase">वार्ड एवं जोनल नोडल अधिकारी संपर्क विवरण</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wide mt-0.5">
              Lucknow Zones 1-8 Officers Directory
            </p>
          </div>
          
          {/* Directory Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            <input 
              type="text"
              value={nodalSearch}
              onChange={(e) => setNodalSearch(e.target.value)}
              placeholder="जोन या अधिकारी का नाम खोजें..."
              className="admin-input pl-9 pr-3 py-2 text-xs font-semibold"
            />
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[9px] tracking-widest font-extrabold">
                <th className="py-2.5 px-3">जोन / Zone</th>
                <th className="py-2.5 px-3">नोडल अधिकारी / Officer Name</th>
                <th className="py-2.5 px-3">पद / Designation</th>
                <th className="py-2.5 px-3">कार्यालय / Office</th>
                <th className="py-2.5 px-3 text-right">हेल्पलाइन / Helpline</th>
              </tr>
            </thead>
            <tbody>
              {filteredNodalOfficers.map(officer => (
                <tr key={officer.zone} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-bold text-blue-900">{officer.zone}</td>
                  <td className="py-3 px-3 text-slate-800 font-extrabold">{officer.officer}</td>
                  <td className="py-3 px-3 text-slate-550">{officer.designation}</td>
                  <td className="py-3 px-3 text-slate-500 text-[11px]">{officer.office}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-700 flex items-center justify-end space-x-1.5">
                    <PhoneCall className="w-3 h-3 text-slate-400" />
                    <span>{officer.phone}</span>
                  </td>
                </tr>
              ))}
              {filteredNodalOfficers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    कोई रिकॉर्ड नहीं मिला (No records found matching search).
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Official FAQ Accordion */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-lg font-black tracking-tight text-slate-900 uppercase">अक्सर पूछे जाने वाले प्रश्न (FAQ)</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wide">
            Frequently Asked Questions & SLAs
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-extrabold text-xs text-slate-800 hover:bg-slate-50 transition-colors select-none"
                >
                  <div className="space-y-1">
                    <span className="block text-slate-900">{faq.q}</span>
                    <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wide">{faq.qe}</span>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>

                {isOpen && (
                  <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2.5 text-xs font-semibold text-slate-650 leading-relaxed border-l-4 border-l-blue-800">
                    <p className="text-slate-700">{faq.a}</p>
                    <p className="text-slate-550 italic font-medium">{faq.ae}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Citizen Helpline Footer Block */}
      <section className="p-8 bg-slate-900 rounded-xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <h2 className="text-lg font-black uppercase tracking-tight">मुख्यालय नागरिक नियंत्रण एवं सहायता कक्ष</h2>
          <p className="text-xs text-slate-400 max-w-xl font-semibold leading-relaxed">
            कंट्रोल रूम लखनऊ नगर निगम, त्रिलोकनाथ रोड, लालबाग, लखनऊ। किसी भी आपातकालीन स्थिति में नागरिकों से अनुरोध है कि वे २४x७ चालू दूरभाष हेल्पलाइन सेवाओं पर संपर्क करें।
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 font-bold text-xs">
          <a href="tel:1533" className="px-5 py-3.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-lg flex items-center justify-center space-x-2 text-orange-400 transition-colors">
            <PhoneCall className="w-4 h-4" />
            <span>नगर निगम हेल्पलाइन: 1533</span>
          </a>
          <a href="tel:1076" className="px-5 py-3.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-lg flex items-center justify-center space-x-2 text-white transition-colors">
            <PhoneCall className="w-4 h-4 text-orange-400" />
            <span>सीएम हेल्पलाइन: 1076</span>
          </a>
        </div>
      </section>

      {/* Info Modal for other Services */}
      {serviceModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  {serviceModal.icon}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-950">{serviceModal.name}</h3>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{serviceModal.eng}</span>
                </div>
              </div>
              <button 
                onClick={() => setServiceModal(null)}
                className="text-xs px-2 py-1 border border-slate-200 rounded-md hover:bg-slate-50 font-bold text-slate-500 cursor-pointer"
              >
                बंद करें (Close)
              </button>
            </div>
            
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 leading-relaxed space-y-2 border-l-4 border-l-orange-500">
              <p>
                सूचना: यह सेवा लखनऊ नगर निगम के मुख्य नागरिक सिंगल-विंडो पोर्टल के माध्यम से संचालित की जाती है।
              </p>
              <p className="text-slate-550 font-medium italic">
                Note: This utility is managed under the primary Lucknow Nagar Nigam official website. JanMitra serves as a dedicated redressal console for public utility grievances.
              </p>
            </div>

            <div className="flex justify-end">
              <a 
                href="https://lko.local.gov.in" 
                target="_blank" 
                rel="noreferrer"
                className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors"
              >
                <span>मुख्य वेबसाइट पर जाएं / LNN Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 pt-6 pb-2 text-center space-y-2 text-xs text-slate-550 font-semibold">
        <p>
          © 2026 जनमित्र शिकायत प्रकोष्ठ। लखनऊ नगर निगम एवं उत्तर प्रदेश शासन। सर्वाधिकार सुरक्षित।
        </p>
        <div className="flex justify-center space-x-4 text-[10px] text-slate-400 uppercase font-black">
          <a href="#rules" className="hover:text-blue-800">नियम एवं शर्तें (Terms)</a>
          <span>•</span>
          <a href="#nn" className="hover:text-blue-800">नगर निगम लखनऊ</a>
          <span>•</span>
          <a href="https://jansunwai.up.nic.in" target="_blank" rel="noreferrer" className="hover:text-blue-800 flex items-center">
            <span>UP Jansunwai Portal</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;

import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  Phone, 
  MapPin, 
  FileText, 
  Image as ImageIcon, 
  Mic, 
  MicOff, 
  CheckCircle2, 
  Copy, 
  ArrowRight, 
  Info,
  ShieldAlert,
  Loader2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import VoiceWaveform from '../components/VoiceWaveform';
import { analyzeComplaintText, submitComplaint } from '../services/api';

const SubmissionPage = () => {
  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('Hazratganj, Zone 1');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // States
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [copied, setCopied] = useState(false);

  // Live Triage Analysis
  const [aiAnalysis, setAiAnalysis] = useState(null);

  const speechInterval = useRef(null);

  const lucknowAreas = [
    "Hazratganj, Zone 1",
    "Gomti Nagar, Zone 4",
    "Alambagh, Zone 5",
    "Chowk, Zone 6",
    "Indira Nagar, Zone 7",
    "Jankipuram, Zone 3",
    "Aminabad, Zone 2",
    "Charbagh, Zone 2"
  ];

  // Run triage analysis as user drafts text
  useEffect(() => {
    if (!title && !description) {
      setAiAnalysis(null);
      return;
    }

    const timer = setTimeout(() => {
      const result = analyzeComplaintText(title, description);
      setAiAnalysis(result);
    }, 400);

    return () => clearTimeout(timer);
  }, [title, description]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleVoiceRecording = () => {
    if (isRecording) {
      clearInterval(speechInterval.current);
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setTitle('');
      setDescription('');
      
      const fullText = "Sewage drainage overflow in Aminabad main market near old temple. The wastewater is flowing into local shops, causing intense health risk and bad odor. Immediate vacuum pump cleanup is needed.";
      let index = 0;
      
      setTitle("Urgent sewage overflow in Aminabad Market");

      speechInterval.current = setInterval(() => {
        if (index < fullText.length) {
          setDescription(prev => prev + fullText.charAt(index));
          index++;
        } else {
          clearInterval(speechInterval.current);
          setIsRecording(false);
        }
      }, 40);
    }
  };

  useEffect(() => {
    return () => clearInterval(speechInterval.current);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !title || !description) return;

    setIsSubmitting(true);

    // Simulated network delay
    setTimeout(() => {
      const ticket = submitComplaint(name, phone, area, title, description, imagePreview);
      setSubmittedTicket(ticket);
      setIsSubmitting(false);
      setShowSuccessModal(true);
      
      // Clear form
      setName('');
      setPhone('');
      setArea('Hazratganj, Zone 1');
      setTitle('');
      setDescription('');
      setImage(null);
      setImagePreview(null);
    }, 1500);
  };

  const copyToClipboard = () => {
    if (submittedTicket) {
      navigator.clipboard.writeText(submittedTicket.ticketId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
      
      {/* Dispatch Loader overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex flex-col items-center justify-center text-slate-800">
          <div className="p-8 rounded-xl bg-white border border-slate-200 shadow-xl flex flex-col items-center max-w-sm text-center space-y-4">
            <Loader2 className="w-10 h-10 text-blue-800 animate-spin" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                शिकायत का पंजीकरण प्रक्रियाधीन है
              </h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Analyzing request details, assigning Lucknow municipal department, and generating receipt ID...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main grievance form */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">शिकायत पंजीकरण फॉर्म (Grievance Registration Form)</h2>
          <p className="text-xs text-slate-500 font-semibold">
            कृपया नीचे दिए गए विवरण को ध्यानपूर्वक भरें। आपका विवरण स्वचालित प्रेषण प्रणाली द्वारा संबंधित विभाग को प्रेषित किया जाएगा।
          </p>
        </div>

        <GlassCard hoverEffect={false}>
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Row 1: Name and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 flex items-center space-x-1.5 uppercase">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>आवेदक का पूरा नाम (Full Name)</span>
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="अपना नाम दर्ज करें (Enter full name)"
                  required
                  className="admin-input font-semibold text-xs"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 flex items-center space-x-1.5 uppercase">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>मोबाइल नंबर (10-Digit Mobile)</span>
                </label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="अपना १० अंकों का मोबाइल नंबर भरें"
                  required
                  pattern="[0-9]{10}"
                  className="admin-input font-mono font-bold text-xs"
                />
              </div>
            </div>

            {/* Area selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 flex items-center space-x-1.5 uppercase">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>लखनऊ क्षेत्र / वार्ड का नाम (Select Ward/Area)</span>
              </label>
              <select 
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="admin-input font-bold text-xs"
              >
                {lucknowAreas.map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 flex items-center space-x-1.5 uppercase">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>शिकायत का संक्षिप्त विषय (Grievance Subject Summary)</span>
              </label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="विषय का संक्षिप्त विवरण (उदा. सड़क पर कूड़ा जमा होना, सीवर चोक होना)"
                required
                className="admin-input font-semibold text-xs"
              />
            </div>

            {/* Description & Speech mock */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-600 flex items-center space-x-1.5 uppercase">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>शिकायत का विस्तृत विवरण (Grievance Description)</span>
                </label>
                
                <button
                  type="button"
                  onClick={toggleVoiceRecording}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded text-[10px] font-bold border transition-colors ${
                    isRecording 
                      ? 'bg-red-50 text-red-655 border-red-200'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isRecording ? <MicOff className="w-3.5 h-3.5 text-red-500 animate-pulse" /> : <Mic className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{isRecording ? 'आवाज रिकॉर्ड हो रही है...' : 'आवाज द्वारा दर्ज करें (Voice Mock)'}</span>
                </button>
              </div>

              {/* Voice component */}
              <VoiceWaveform isActive={isRecording} />

              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="कृपया विस्तृत विवरण लिखें ताकि अधिकारी समस्या को समझ सकें (स्थान, तीव्रता, समस्या की अवधि आदि)। आप आवाज बटन दबाकर सिम्युलेट कर सकते हैं।"
                rows={4}
                required
                className="admin-input resize-none text-xs font-semibold"
              />
            </div>

            {/* Reference image */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 flex items-center space-x-1.5 uppercase">
                <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>समस्या का फोटो अपलोड करें - यदि उपलब्ध हो (Upload Photo)</span>
              </label>
              
              <div className="flex items-center space-x-4">
                <label className="flex flex-col items-center justify-center px-4 py-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors text-[10px] font-bold text-slate-500">
                  <ImageIcon className="w-4 h-4 mb-0.5 text-slate-400" />
                  <span>फ़ाइल चुनें (Select Image)</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {imagePreview && (
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-200">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => { setImage(null); setImagePreview(null); }}
                      className="absolute top-0.5 right-0.5 p-0.5 bg-black/60 rounded-full text-white hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!name || !phone || !title || !description}
              className="w-full py-3 bg-blue-800 hover:bg-blue-900 disabled:bg-slate-250 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-sm flex items-center justify-center space-x-2 transition-colors cursor-pointer text-xs uppercase"
            >
              <span>शिकायत पंजीकरण करें (Submit Grievance Form)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </GlassCard>
      </div>

      {/* Dispatch Classification Report */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">स्वचालित विभाग प्रेषण रिपोर्ट</h2>
          <p className="text-xs text-slate-500 font-semibold">
            Grievance Automated Dispatch Report & Nodal Target Details.
          </p>
        </div>

        <GlassCard hoverEffect={false} className="border-slate-200 bg-white">
          <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 mb-4">
            <Info className="w-4.5 h-4.5 text-blue-800" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
              विभाग विश्लेषण (Dispatch Diagnostics)
            </h3>
          </div>

          {aiAnalysis ? (
            <div className="space-y-5">
              
              {/* Radial Score Gauge */}
              <div className="flex flex-col items-center justify-center py-2 border-b border-slate-100">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" className="stroke-slate-100" strokeWidth="6" fill="transparent" />
                    <circle 
                      cx="48" 
                      cy="48" 
                      r="40" 
                      className="stroke-blue-800" 
                      strokeWidth="6" 
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 * (1 - aiAnalysis.ai_confidence_score / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-slate-900">{aiAnalysis.ai_confidence_score}%</span>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">सत्यापन मिलान</span>
                  </div>
                </div>
              </div>

              {/* Data list */}
              <div className="space-y-3.5 text-xs font-semibold text-slate-650">
                <div className="flex justify-between items-start">
                  <span className="text-slate-500">चिन्हित श्रेणी (Category):</span>
                  <span className="text-right text-slate-900 font-extrabold max-w-[140px]">{aiAnalysis.category}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-slate-500">आवंटित विभाग (Department):</span>
                  <span className="text-right text-blue-900 font-extrabold max-w-[150px]">{aiAnalysis.department}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">गंभीरता (Urgency):</span>
                  <StatusBadge type="urgency" value={aiAnalysis.urgency} />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">प्राथमिकता सूचकांक:</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 font-extrabold">
                    {aiAnalysis.priority_score} / 100
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">निस्तारण समय-सीमा:</span>
                  <span className="text-slate-900 font-bold">{aiAnalysis.ticket_sla_days} कार्य दिवस</span>
                </div>

                <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                  <span className="text-slate-500">उच्च अधिकारी को प्रेषण (Escalated):</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    aiAnalysis.requires_escalation 
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}>
                    {aiAnalysis.requires_escalation ? 'हाँ (YES)' : 'नहीं (NO)'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center space-y-3 text-slate-400">
              <Info className="w-7 h-7 mx-auto text-slate-300" />
              <p className="text-xs font-semibold px-4 leading-relaxed">
                शिकायत का विवरण भरें... दर्ज विषय और विवरण के आधार पर आवंटित विभाग एवं समय-सीमा का स्वचालित रिपोर्ट यहाँ प्रदर्शित होगा।
              </p>
            </div>
          )}
        </GlassCard>
      </div>

      {/* Success Modal (Official receipt card) */}
      <AnimatePresence>
        {showSuccessModal && submittedTicket && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg bg-white border border-slate-300 rounded-xl p-6 shadow-2xl relative"
            >
              
              {/* Receipt Header */}
              <div className="flex items-center space-x-3 mb-5 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 uppercase">
                    शिकायत पंजीकरण सफलतापूर्वक संपन्न हुआ
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    Official Grievance Registration Receipt - Lucknow Nagar Nigam
                  </p>
                </div>
              </div>

              {/* Receipt Box */}
              <div className="border border-slate-200 rounded-lg bg-slate-50 p-4 space-y-4 text-xs font-semibold text-slate-700">
                
                {/* ID & Copy */}
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-slate-400 uppercase font-black">शिकायत संदर्भ संख्या (Reference ID)</span>
                    <h4 className="text-base font-extrabold text-blue-900">{submittedTicket.ticketId}</h4>
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center space-x-1 px-3 py-1.5 border border-slate-350 bg-white hover:bg-slate-50 rounded-lg text-[10px] font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-450" />
                    <span>{copied ? 'कॉपी हो गया' : 'संदर्भ आईडी कॉपी करें'}</span>
                  </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-4 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-slate-450 text-[9px] uppercase font-black block mb-0.5">आवेदक (Citizen Name)</span>
                    <span className="font-bold text-slate-900">{submittedTicket.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-455 text-[9px] uppercase font-black block mb-0.5">क्षेत्र वार्ड (Area/Ward)</span>
                    <span className="font-bold text-slate-900">{submittedTicket.area}</span>
                  </div>
                  <div>
                    <span className="text-slate-455 text-[9px] uppercase font-black block mb-0.5">आवंटित श्रेणी (Category)</span>
                    <span className="font-bold text-slate-900">{submittedTicket.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-455 text-[9px] uppercase font-black block mb-0.5">समय-सीमा (SLA target)</span>
                    <span className="font-bold text-slate-900">{submittedTicket.ticket_sla_days} कार्य दिवस</span>
                  </div>
                </div>

                {/* Summaries */}
                <div className="space-y-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-slate-455 text-[9px] uppercase font-black block mb-0.5">English Summary</span>
                    <p className="text-slate-600 italic font-semibold leading-relaxed">"{submittedTicket.summary_en}"</p>
                  </div>
                  <div>
                    <span className="text-slate-455 text-[9px] uppercase font-black block mb-0.5">शिकायत सारांश (Hindi Summary)</span>
                    <p className="text-slate-600 italic font-semibold leading-relaxed">"{submittedTicket.summary_hi}"</p>
                  </div>
                </div>

                {/* SMS alert box */}
                <div>
                  <span className="text-slate-455 text-[9px] uppercase font-black block mb-0.5">Automated SMS Log Sent to Citizen</span>
                  <div className="p-2.5 rounded bg-slate-900 font-mono text-[10px] text-emerald-400">
                    {submittedTicket.sms_hi}
                  </div>
                </div>
              </div>

              {/* Close and Track Buttons */}
              <div className="mt-5 flex items-center justify-end space-x-3 font-bold text-xs">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="px-4 py-2 border border-slate-350 bg-white hover:bg-slate-50 text-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  रसीद बंद करें (Close)
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate('/track', { state: { id: submittedTicket.ticketId } });
                  }}
                  className="px-5 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>शिकायत ट्रैक करें (Track Progress)</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default SubmissionPage;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  AlertTriangle,
  Building,
  CheckCircle,
  HelpCircle,
  Send,
  Loader2
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import DepartmentTag from '../components/DepartmentTag';
import { SkeletonCard, SkeletonList } from '../components/SkeletonLoader';
import { getComplaintById } from '../services/api';

const TrackingPage = () => {
  const location = useLocation();
  const [searchId, setSearchId] = useState('');
  const [ticket, setTicket] = useState(null);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock citizen feedback state
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Pre-seeded demo ticket IDs for quick access
  const demoTickets = [
    { id: 'JM-78341', title: 'Hazratganj Trash Bin' },
    { id: 'JM-54129', title: 'Alambagh Flooding' },
    { id: 'JM-32984', title: 'Gomti Nagar Lights' }
  ];

  const handleSearch = (idToSearch) => {
    const queryId = idToSearch || searchId;
    if (!queryId) return;

    setIsLoading(true);
    setSearched(true);
    setFeedbackSent(false);
    setFeedbackText('');

    // Simulate search latency
    setTimeout(() => {
      const result = getComplaintById(queryId);
      setTicket(result);
      setIsLoading(false);
    }, 850);
  };

  const handleDemoClick = (id) => {
    setSearchId(id);
    handleSearch(id);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackText) return;
    setFeedbackSent(true);
  };

  useEffect(() => {
    if (location.state?.id) {
      setSearchId(location.state.id);
      handleSearch(location.state.id);
    }
  }, [location.state]);

  // Format date helper
  const formatDate = (isoStr) => {
    if (!isoStr) return '';
    return new Date(isoStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Grievance Tracking Desk</h2>
        <p className="text-xs text-slate-500">
          Search and track the real-time status of your grievance ticket.
        </p>
      </div>

      {/* Search Input Box */}
      <GlassCard hoverEffect={false} className="max-w-xl">
        <div className="space-y-4">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Enter Grievance Reference ID
          </label>
          <div className="flex space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-455" />
              <input 
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="e.g. JM-78341"
                className="admin-input pl-10 pr-4 py-2.5 uppercase font-bold"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={() => handleSearch()}
              disabled={isLoading || !searchId}
              className="px-6 py-2.5 bg-blue-800 hover:bg-blue-900 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-lg text-xs flex items-center space-x-2 transition-all shadow-sm cursor-pointer"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Search Status</span>
            </button>
          </div>

          {/* Quick Demo Shortcuts */}
          <div className="flex items-center flex-wrap gap-2 pt-1.5 text-[10px] font-bold text-slate-500 uppercase">
            <span>Demo Tickets:</span>
            {demoTickets.map(item => (
              <button
                key={item.id}
                onClick={() => handleDemoClick(item.id)}
                className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 hover:border-blue-600 text-slate-700 hover:text-blue-800 transition-colors cursor-pointer"
              >
                {item.id} ({item.title})
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Main Results Display */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SkeletonCard />
          </div>
          <div>
            <SkeletonCard />
          </div>
        </div>
      ) : searched && !ticket ? (
        <GlassCard className="py-12 text-center space-y-4 max-w-xl">
          <AlertTriangle className="w-10 h-10 text-amber-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">Ticket Not Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            The Grievance ID "<span className="font-extrabold uppercase">{searchId}</span>" does not match any registered records on JanMitra AI. Double check spelling and try again.
          </p>
        </GlassCard>
      ) : ticket ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1 & 2: Ticket Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Title & Basic Specs */}
            <GlassCard hoverEffect={false}>
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-250 pb-4 mb-4 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">Active Redressal Case</span>
                  <div className="flex items-center space-x-2.5">
                    <h3 className="text-xl font-extrabold text-blue-800">{ticket.ticketId}</h3>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    <StatusBadge type="status" value={ticket.status} />
                  </div>
                </div>
                
                {/* SLA Timer */}
                <div className="text-left sm:text-right space-y-0.5">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold block">Assigned SLA Timer</span>
                  <span className="text-xs font-bold text-slate-700 flex items-center sm:justify-end">
                    <Clock className="w-3.5 h-3.5 mr-1 text-slate-500" />
                    {ticket.ticket_sla_days} Days Target
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {ticket.title}
                  </h4>
                  <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1 font-semibold">
                    <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1" /> {ticket.name}</span>
                    <span>•</span>
                    <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {ticket.area}</span>
                    <span>•</span>
                    <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> {formatDate(ticket.submittedAt)}</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-550 uppercase tracking-wider block mb-1">Citizen Statement</span>
                  <p className="text-xs text-slate-705 leading-relaxed font-medium">
                    {ticket.description}
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* AI Diagnostics details matching API Contract */}
            <GlassCard hoverEffect={false}>
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-4 mb-4">
                <Sparkles className="w-5 h-5 text-blue-750" />
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-blue-800">
                  AI Classification & Diagnosis Report
                </h4>
              </div>

              {/* Diagnostics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold text-slate-700">
                
                {/* Category & Department */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase">Classified Category</span>
                    <span className="block text-slate-900 font-extrabold">{ticket.category}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase">Routing Department</span>
                    <div className="flex items-center mt-1">
                      <DepartmentTag department={ticket.department} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase">Urgency Assessment</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <StatusBadge type="urgency" value={ticket.urgency} />
                      <span className="text-[10px] text-slate-500 font-medium">({ticket.urgency_reason})</span>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">AI Confidence Score:</span>
                    <span className="font-extrabold text-blue-800">{ticket.ai_confidence_score}%</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Computed Priority Score:</span>
                    <span className="font-extrabold text-blue-800">{ticket.priority_score} / 100</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Escalated Status:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ticket.requires_escalation 
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {ticket.requires_escalation ? 'ESCALATED' : 'STANDARD'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Estimated Resolution:</span>
                    <span className="text-slate-900 font-bold">{formatDate(ticket.estimated_resolution)}</span>
                  </div>
                </div>
              </div>

              {/* Bilingual summary display */}
              <div className="mt-6 pt-4 border-t border-slate-200 space-y-4">
                
                {/* English Summary */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">AI-Generated English Summary</span>
                  <p className="text-xs text-slate-700 font-medium italic">
                    "{ticket.summary_en}"
                  </p>
                </div>

                {/* Hindi Summary */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">AI-Generated Hindi Summary (ब्यूरो रिपोर्ट)</span>
                  <p className="text-xs text-slate-700 font-medium italic">
                    "{ticket.summary_hi}"
                  </p>
                </div>

                {/* Department Note */}
                {ticket.department_note && (
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 mt-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center mb-1">
                      <Building className="w-3.5 h-3.5 mr-1 text-slate-500" />
                      Departmental Notes
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                      {ticket.department_note}
                    </p>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Column 3: Timeline & Interactive Portal */}
          <div className="space-y-6">
            
            {/* Timeline component */}
            <GlassCard hoverEffect={false}>
              <h4 className="font-extrabold text-sm uppercase tracking-wider mb-6 pb-2 border-b border-slate-200">
                Status Timeline
              </h4>

              <div className="relative pl-6 space-y-6">
                
                {/* Vertical bar */}
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-200" />
                <div className="absolute left-2.5 top-2 h-1/2 w-0.5 bg-blue-600" />

                {/* Map steps */}
                {ticket.timeline.map((step, idx) => {
                  const isLast = idx === ticket.timeline.length - 1;
                  return (
                    <div key={step.status} className="relative space-y-1">
                      {/* Node point */}
                      <span className={`absolute -left-6 top-1 w-3 h-3 rounded-full border-2 ${
                        isLast 
                          ? 'bg-blue-600 border-blue-200'
                          : 'bg-emerald-600 border-emerald-250'
                      }`} />

                      <div className="flex items-center justify-between">
                        <h5 className={`text-xs font-bold ${isLast ? 'text-blue-800' : 'text-slate-800'}`}>
                          {step.title}
                        </h5>
                        <span className="text-[9px] text-slate-500 font-semibold">{formatDate(step.date).split(',')[0]}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            {/* Bilingual citizen updates */}
            <GlassCard hoverEffect={false}>
              <div className="space-y-4 text-xs font-semibold">
                
                <div className="flex items-center space-x-1.5 border-b border-slate-200 pb-3">
                  <Clock className="w-4 h-4 text-blue-700" />
                  <h4 className="font-extrabold uppercase tracking-wider text-blue-800">
                    Live Progress Feeds
                  </h4>
                </div>

                {/* English Update */}
                <div className="space-y-1">
                  <span className="text-[9px] text-slate-500 uppercase">Status Update (EN)</span>
                  <p className="text-slate-700 leading-relaxed text-xs">
                    {ticket.citizen_update_en}
                  </p>
                </div>

                {/* Hindi Update */}
                <div className="space-y-1">
                  <span className="text-[9px] text-slate-500 uppercase">स्थिति अपडेट (HI)</span>
                  <p className="text-slate-700 leading-relaxed text-xs">
                    {ticket.citizen_update_hi}
                  </p>
                </div>

                {/* Citizen Outbound SMS */}
                <div className="space-y-1 pt-2 border-t border-slate-200">
                  <span className="text-[9px] text-slate-500 uppercase">SMS logs sent to citizen</span>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200 font-mono text-[10px] text-slate-800">
                    {ticket.sms_hi}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Citizen Feedback Portal */}
            <GlassCard hoverEffect={false} className="bg-slate-50">
              <h4 className="font-extrabold text-xs uppercase tracking-wider mb-3 text-slate-800">
                Citizen Feedback desk
              </h4>
              
              {feedbackSent ? (
                <div className="py-4 text-center space-y-2 text-emerald-600">
                  <CheckCircle className="w-8 h-8 mx-auto" />
                  <p className="text-xs font-bold">Feedback Registered Successfully!</p>
                  <p className="text-[10px] text-slate-500">Your comments have been logged for administrative review.</p>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                  <textarea
                    rows={2}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Enter questions or confirm resolution..."
                    required
                    className="admin-input text-xs"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-lg text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Push Update</span>
                  </button>
                </form>
              )}
            </GlassCard>
          </div>

        </div>
      ) : (
        /* Empty Search screen state */
        <GlassCard className="py-16 text-center max-w-xl space-y-4">
          <HelpCircle className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700">Awaiting Search Queries</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Enter a Grievance Reference ID above or select one of the Demo Ticket shortcuts to audit active telemetry, departments, status workflows, and bilingual logs.
          </p>
        </GlassCard>
      )}

    </div>
  );
};

export default TrackingPage;

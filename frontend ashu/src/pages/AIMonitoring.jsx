import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Sparkles, 
  HelpCircle, 
  ShieldAlert, 
  Clock, 
  Languages, 
  TrendingUp,
  FileCode
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import DepartmentTag from '../components/DepartmentTag';
import { getComplaints } from '../services/api';

const AIMonitoring = () => {
  const [complaints, setComplaints] = useState([]);
  const [expandedJson, setExpandedJson] = useState({});

  useEffect(() => {
    setComplaints(getComplaints());
  }, []);

  // Compute confidence distribution categories
  const confidenceData = [
    { range: '85-88%', count: 0 },
    { range: '89-92%', count: 0 },
    { range: '93-96%', count: 0 },
    { range: '97-100%', count: 0 }
  ];

  complaints.forEach(c => {
    const score = c.ai_confidence_score;
    if (score >= 85 && score <= 88) confidenceData[0].count++;
    else if (score >= 89 && score <= 92) confidenceData[1].count++;
    else if (score >= 93 && score <= 96) confidenceData[2].count++;
    else if (score >= 97 && score <= 100) confidenceData[3].count++;
  });

  // Sentiment analytics count
  const sentimentCounts = { Frustrated: 0, Anxious: 0, Concerned: 0, Polite: 0, Neutral: 0 };
  complaints.forEach(c => {
    if (c.sentiment) sentimentCounts[c.sentiment] = (sentimentCounts[c.sentiment] || 0) + 1;
  });
  
  const toggleJsonExpand = (id) => {
    setExpandedJson(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Model node status states
  const aiSubNodes = [
    { name: "Bilingual Translation Engine", status: "Active", desc: "Translates Hindi titles/descriptions to English and vice-versa", icon: <Languages className="text-blue-800 w-5 h-5" /> },
    { name: "Sentiment & Urgency Classifier", status: "Active", desc: "Filters angry/anxious citizen tones and computes priority weights", icon: <TrendingUp className="text-blue-800 w-5 h-5" /> },
    { name: "Ward Routing Allocator", status: "Active", desc: "Directly binds tickets to corresponding Lucknow Inspector Nodes", icon: <Cpu className="text-emerald-600 w-5 h-5" /> },
    { name: "SLA Watchdog Node", status: "Active", desc: "Monitors target timers and triggers auto-escalations", icon: <Clock className="text-rose-600 w-5 h-5" /> }
  ];

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">AI Model Performance & Contract Audit</h2>
        <p className="text-xs text-slate-500">
          Track classified logs, model confidence distributions, and inspect raw API contract outputs.
        </p>
      </div>

      {/* AI Sub-Model Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aiSubNodes.map((node, i) => (
          <GlassCard key={node.name} delay={i * 0.05} className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                  {node.icon}
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-250 text-[9px] font-extrabold uppercase">
                  {node.status}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{node.name}</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">{node.desc}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Confidence distribution bar chart */}
        <div className="lg:col-span-2">
          <GlassCard hoverEffect={false}>
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4.5 h-4.5 text-blue-800" />
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-850">AI Classification Confidence Distribution</h4>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={confidenceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.5} />
                  <XAxis dataKey="range" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      borderColor: '#e2e8f0',
                      borderRadius: '8px',
                      color: '#0f172a',
                      fontSize: '11px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }} 
                  />
                  <Bar dataKey="count" name="Grievances" radius={[4, 4, 0, 0]}>
                    {confidenceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#1e3a8a' : '#3b82f6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Escalation alert box */}
        <div>
          <GlassCard hoverEffect={false} className="h-full flex flex-col border-rose-200 bg-rose-50/20">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-4.5 h-4.5 text-rose-700" />
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-rose-700">Critical SLA Warnings</h4>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto max-h-[220px] scrollbar-thin">
              {complaints.filter(c => c.requires_escalation || c.status === "Escalated").map(ticket => (
                <div key={ticket.ticketId} className="p-3 rounded-lg border border-rose-150 bg-rose-50/50 text-xs font-semibold flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-blue-800 font-extrabold">{ticket.ticketId}</span>
                    <p className="text-slate-800 text-[10px] truncate max-w-[130px] font-bold">{ticket.title}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[9px] font-extrabold">
                      BREACHED
                    </span>
                    <span className="block text-[8px] text-slate-500 mt-1">Priority: {ticket.priority_score}/100</span>
                  </div>
                </div>
              ))}

              {complaints.filter(c => c.requires_escalation || c.status === "Escalated").length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-2 py-12 text-slate-400">
                  <HelpCircle className="w-8 h-8 text-slate-500" />
                  <p className="text-xs">No active SLA breaches flagged.</p>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* AI Decision Cards (Raw contract inspector) */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-slate-900">Node Classification & JSON Contract Auditor</h3>
          <p className="text-xs text-slate-500">
            Compare citizen descriptions with AI-routed metadata, and view the precise JSON contract schema.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {complaints.map(ticket => {
            const isJsonExpanded = expandedJson[ticket.ticketId];

            // Strip local tracking attributes to isolate the clean JSON payload contract
            const cleanContract = {
              category: ticket.category,
              department: ticket.department,
              urgency: ticket.urgency,
              urgency_reason: ticket.urgency_reason,
              sentiment: ticket.sentiment,
              summary_en: ticket.summary_en,
              summary_hi: ticket.summary_hi,
              citizen_update_en: ticket.citizen_update_en,
              citizen_update_hi: ticket.citizen_update_hi,
              sms_hi: ticket.sms_hi,
              ticket_sla_days: ticket.ticket_sla_days,
              ai_confidence_score: ticket.ai_confidence_score,
              priority_score: ticket.priority_score,
              estimated_resolution: ticket.estimated_resolution,
              requires_escalation: ticket.requires_escalation,
              department_note: ticket.department_note,
              tags: ticket.tags
            };

            return (
              <GlassCard key={ticket.ticketId} hoverEffect={false} className="flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Card Title */}
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <div className="space-y-0.5">
                      <span className="text-[9px] text-slate-500 uppercase">TELEMETRY ID</span>
                      <h4 className="font-extrabold text-blue-800 text-sm">{ticket.ticketId}</h4>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-700 font-bold">Conf: {ticket.ai_confidence_score}%</span>
                      <StatusBadge type="status" value={ticket.status} />
                    </div>
                  </div>

                  {/* Descriptions block */}
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-500 font-bold block mb-0.5">Citizen Text:</span>
                      <p className="text-slate-700 line-clamp-2 leading-relaxed">
                        {ticket.description}
                      </p>
                    </div>

                    {/* Bilingual English & Hindi summaries */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-2.5 rounded bg-slate-50 border border-slate-200 font-semibold">
                        <span className="text-[9px] text-slate-500 block mb-0.5 uppercase tracking-wide">Summary (EN)</span>
                        <p className="text-[10px] text-slate-755 italic line-clamp-3">"{ticket.summary_en}"</p>
                      </div>
                      <div className="p-2.5 rounded bg-slate-50 border border-slate-200 font-semibold">
                        <span className="text-[9px] text-slate-500 block mb-0.5 uppercase tracking-wide">सारांश (HI)</span>
                        <p className="text-[10px] text-slate-755 italic line-clamp-3">"{ticket.summary_hi}"</p>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {ticket.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded text-[9px] font-bold">
                        #{tag}
                      </span>
                    ))}
                    <DepartmentTag department={ticket.department} />
                  </div>
                </div>

                {/* Collapsible raw JSON Viewer */}
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <button
                    onClick={() => toggleJsonExpand(ticket.ticketId)}
                    className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-semibold text-slate-700 transition-colors cursor-pointer"
                  >
                    <span>{isJsonExpanded ? 'COLLAPSE API CONTRACT PAYLOAD' : 'AUDIT API CONTRACT PAYLOAD (JSON)'}</span>
                    <span>{isJsonExpanded ? 'Close' : 'Inspect'}</span>
                  </button>

                  {isJsonExpanded && (
                    <div className="mt-2 p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-mono text-[9px] overflow-x-auto max-h-[160px] scrollbar-thin select-text">
                      <pre>{JSON.stringify(cleanContract, null, 2)}</pre>
                    </div>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default AIMonitoring;

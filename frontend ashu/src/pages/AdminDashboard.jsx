import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart as BarIcon, 
  PieChart as PieIcon, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle, 
  Clock, 
  ListCollapse, 
  Cpu, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import DepartmentTag from '../components/DepartmentTag';
import { getDashboardStats, generateLiveAIActivityLog } from '../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [telemetryLogs, setTelemetryLogs] = useState([]);

  // Load stats from Mock Database
  useEffect(() => {
    setStats(getDashboardStats());
  }, []);

  // Poll new mock AI Activity telemetry logs
  useEffect(() => {
    // Populate initial logs
    const initialLogs = Array.from({ length: 5 }).map(() => generateLiveAIActivityLog());
    setTelemetryLogs(initialLogs);

    const logInterval = setInterval(() => {
      const newLog = generateLiveAIActivityLog();
      setTelemetryLogs(prev => [newLog, ...prev.slice(0, 19)]); // keep last 20 logs
    }, 3500);

    return () => clearInterval(logInterval);
  }, []);

  if (!stats) return <div className="text-center py-12 text-slate-600 font-semibold">Loading Admin Console...</div>;

  // Clean, high-contrast professional color palette
  const COLORS = ['#1e3a8a', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const kpis = [
    { label: "Total Complaints", value: stats.total, icon: <ListCollapse className="w-5 h-5 text-blue-800" />, shadow: "" },
    { label: "Pending Response", value: stats.pending, icon: <Clock className="w-5 h-5 text-amber-600" />, shadow: "" },
    { label: "Resolved Grid", value: stats.resolved, icon: <CheckCircle className="w-5 h-5 text-emerald-600" />, shadow: "" },
    { label: "Escalated SLA", value: stats.escalated, icon: <ShieldAlert className="w-5 h-5 text-rose-600" />, shadow: "" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">JanMitra Governance Dashboard</h2>
          <p className="text-xs text-slate-500">
            Real-time operations and triage dashboard for Lucknow Nagar Nigam & Jal Sansthan nodes.
          </p>
        </div>

        {/* Live system state banner */}
        <div className="flex items-center space-x-2 bg-white border border-slate-200 rounded-xl px-4 py-2 self-start md:self-auto shadow-sm">
          <Cpu className="w-4 h-4 text-blue-850" />
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">SYSTEM LOAD:</span>
          <span className="text-[11px] font-mono font-bold text-emerald-600">NORMAL (0.18s LATENCY)</span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <GlassCard key={kpi.label} delay={idx * 0.05} className={kpi.shadow}>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{kpi.label}</span>
              <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                {kpi.icon}
              </div>
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-900">
                {kpi.value}
              </h3>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trend Area Chart (Col span 2) */}
        <div className="lg:col-span-2">
          <GlassCard hoverEffect={false} className="h-full">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4.5 h-4.5 text-blue-850" />
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-800">Weekly Redressal Intake Trend</h4>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.5} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
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
                  <Area type="monotone" dataKey="complaints" name="Intake" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorComplaints)" />
                  <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorResolved)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Categories Distribution Pie Chart */}
        <div>
          <GlassCard hoverEffect={false} className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <PieIcon className="w-4.5 h-4.5 text-blue-800" />
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-800">Category Shares</h4>
              </div>
            </div>

            <div className="h-48 w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {stats.categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
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
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Pie Legend */}
            <div className="mt-auto grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500">
              {stats.categoryData.map((item, idx) => (
                <div key={item.name} className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                  <span className="truncate">{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Dashboard Department Leaderboard & AI Activity Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Department leaderboard (Col span 1) */}
        <div>
          <GlassCard hoverEffect={false} className="h-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <BarIcon className="w-4.5 h-4.5 text-blue-800" />
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-800">Department Performance</h4>
              </div>
            </div>

            <div className="space-y-4">
              {stats.departmentData.map((dept, idx) => (
                <div key={dept.name} className="space-y-1.5 text-xs font-semibold">
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="truncate max-w-[170px]">{dept.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                      {dept.score}% score
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        dept.score > 85 ? 'bg-emerald-600' : dept.score > 75 ? 'bg-blue-600' : 'bg-amber-600'
                      }`}
                      style={{ width: `${dept.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Live audit console output (Col span 2) */}
        <div className="lg:col-span-2">
          <GlassCard hoverEffect={false} className="h-full border border-slate-200 bg-slate-50 text-slate-800 font-mono flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-blue-800" />
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-blue-800">AI Operations & Dispatch Log</h4>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            </div>

            {/* Terminal output box */}
            <div className="h-56 overflow-y-auto space-y-2 text-[10px] leading-relaxed scrollbar-thin scrollbar-thumb-slate-300">
              {telemetryLogs.map((log, idx) => (
                <div key={idx} className="flex items-start space-x-2 select-text">
                  <span className="text-slate-400">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                  <span className={log.status === 'warning' ? 'text-rose-600 font-bold' : 'text-slate-700 font-medium'}>
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

      </div>

      {/* Live Complaint Ticker List Feed */}
      <GlassCard hoverEffect={false}>
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <Layers className="w-4.5 h-4.5 text-blue-800" />
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-800">Recent Grievances Audit Feed</h4>
          </div>
          <button 
            onClick={() => navigate('/track')}
            className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center hover:underline cursor-pointer"
          >
            <span>Track details</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Complaints Table Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[9px] tracking-widest font-extrabold">
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Area Location</th>
                <th className="py-3 px-4">Department Routing</th>
                <th className="py-3 px-4">Priority score</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentFeed.map(ticket => (
                <tr 
                  key={ticket.ticketId} 
                  onClick={() => navigate(`/track`, { state: { id: ticket.ticketId } })}
                  className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="py-4 px-4 font-bold text-blue-800">{ticket.ticketId}</td>
                  <td className="py-4 px-4">
                    <div className="max-w-[200px] truncate font-bold text-slate-800">
                      {ticket.title}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-500">{ticket.area}</td>
                  <td className="py-4 px-4">
                    <DepartmentTag department={ticket.department} />
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-150 font-black">
                      {ticket.priority_score} / 100
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <StatusBadge type="status" value={ticket.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

    </div>
  );
};

export default AdminDashboard;

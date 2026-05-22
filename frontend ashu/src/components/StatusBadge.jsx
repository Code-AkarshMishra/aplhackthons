import React from 'react';
import { AlertCircle, CheckCircle, Clock, ShieldAlert, ArrowUpCircle } from 'lucide-react';

const StatusBadge = ({ type, value }) => {
  const getBadgeStyle = () => {
    const val = value ? value.toLowerCase() : '';
    
    if (type === 'status') {
      switch (val) {
        case 'resolved':
          return {
            bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            icon: <CheckCircle className="w-3.5 h-3.5 mr-1" />
          };
        case 'escalated':
          return {
            bg: 'bg-rose-50 text-rose-700 border-rose-200 font-bold',
            icon: <ShieldAlert className="w-3.5 h-3.5 mr-1" />
          };
        case 'pending':
          return {
            bg: 'bg-amber-50 text-amber-700 border-amber-200',
            icon: <Clock className="w-3.5 h-3.5 mr-1" />
          };
        case 'in-progress':
        case 'assigned':
          return {
            bg: 'bg-blue-50 text-blue-700 border-blue-200',
            icon: <Clock className="w-3.5 h-3.5 mr-1" />
          };
        default:
          return {
            bg: 'bg-slate-50 text-slate-700 border-slate-200',
            icon: <Clock className="w-3.5 h-3.5 mr-1" />
          };
      }
    } else if (type === 'urgency' || type === 'priority') {
      switch (val) {
        case 'critical':
          return {
            bg: 'bg-red-50 text-red-700 border-red-200 font-bold',
            icon: <ArrowUpCircle className="w-3.5 h-3.5 mr-1" />
          };
        case 'high':
          return {
            bg: 'bg-orange-50 text-orange-700 border-orange-200',
            icon: <AlertCircle className="w-3.5 h-3.5 mr-1" />
          };
        case 'medium':
          return {
            bg: 'bg-slate-100 text-slate-700 border-slate-200',
            icon: null
          };
        case 'low':
        default:
          return {
            bg: 'bg-slate-50 text-slate-500 border-slate-200',
            icon: null
          };
      }
    }

    return { bg: 'bg-slate-50 text-slate-500 border-slate-200', icon: null };
  };

  const style = getBadgeStyle();

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style.bg}`}>
      {style.icon}
      {value}
    </span>
  );
};

export default StatusBadge;

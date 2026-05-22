import React from 'react';
import { Trash2, Droplets, Lightbulb, Construction, MapPin, Building2 } from 'lucide-react';

const DepartmentTag = ({ department }) => {
  const getDeptConfig = () => {
    const dept = department ? department.toLowerCase() : '';

    if (dept.includes('waste') || dept.includes('sanitation') || dept.includes('health')) {
      return {
        name: 'Health & Sanitation',
        color: 'text-teal-700 border-teal-200 bg-teal-50',
        icon: <Trash2 className="w-3.5 h-3.5 mr-1" />
      };
    } else if (dept.includes('water') || dept.includes('jal') || dept.includes('sewer')) {
      return {
        name: 'Water & Sewerage',
        color: 'text-blue-700 border-blue-200 bg-blue-50',
        icon: <Droplets className="w-3.5 h-3.5 mr-1" />
      };
    } else if (dept.includes('light') || dept.includes('electricity')) {
      return {
        name: 'Streetlight Dept',
        color: 'text-amber-700 border-amber-200 bg-amber-50',
        icon: <Lightbulb className="w-3.5 h-3.5 mr-1" />
      };
    } else if (dept.includes('road') || dept.includes('pwd') || dept.includes('infrastructure')) {
      return {
        name: 'Infrastructure / PWD',
        color: 'text-indigo-700 border-indigo-200 bg-indigo-50',
        icon: <Construction className="w-3.5 h-3.5 mr-1" />
      };
    } else if (dept.includes('encroachment') || dept.includes('land') || dept.includes('planning')) {
      return {
        name: 'Revenue & Planning',
        color: 'text-rose-700 border-rose-200 bg-rose-50',
        icon: <MapPin className="w-3.5 h-3.5 mr-1" />
      };
    }

    return {
      name: 'General Admin',
      color: 'text-slate-600 border-slate-200 bg-slate-50',
      icon: <Building2 className="w-3.5 h-3.5 mr-1" />
    };
  };

  const config = getDeptConfig();

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium border ${config.color}`}>
      {config.icon}
      {config.name}
    </span>
  );
};

export default DepartmentTag;

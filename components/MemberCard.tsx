import React from 'react';
import { Member } from '../types';

interface MemberCardProps {
  member: Member;
  onSelect: (member: Member) => void;
}

const getTrafficLightColor = (score: number) => {
  if (score >= 70) return { bg: 'bg-green-500', text: 'text-green-500' };
  if (score >= 60) return { bg: 'bg-yellow-500', text: 'text-yellow-500' };
  if (score >= 5 && score <= 55) return { bg: 'bg-red-500', text: 'text-red-500' };
  return { bg: 'bg-gray-600', text: 'text-gray-400' };
};


const MemberCard: React.FC<MemberCardProps> = ({ member, onSelect }) => {
  const { trafficLightScore } = member.scores;
  const colorInfo = getTrafficLightColor(trafficLightScore);

  return (
    <button 
      onClick={() => onSelect(member)}
      className="w-full text-left bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 hover:bg-gray-700/50 transition-colors duration-200 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-yellow-500"
    >
      <div className="flex items-center">
        <span className="w-8 text-center font-mono text-sm text-gray-400 mr-4">{member.id}</span>
        <span className="font-medium text-white whitespace-nowrap">{member.name}</span>
      </div>
      <div className={`flex items-center justify-end gap-3 font-bold ${colorInfo.text}`}>
        <div className={`w-3.5 h-3.5 rounded-full ${colorInfo.bg}`}></div>
        <span>{trafficLightScore}</span>
      </div>
    </button>
  );
};

export default MemberCard;
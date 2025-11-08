import React, { useEffect } from 'react';
import { Member } from '../types';
import { CloseIcon } from './Icons';

interface MemberDetailModalProps {
  member: Member;
  onClose: () => void;
}

const getTrafficLightColor = (score: number) => {
  if (score >= 70) return { bg: 'bg-green-500', text: 'text-green-500', border: 'border-green-500' };
  if (score >= 60) return { bg: 'bg-yellow-500', text: 'text-yellow-500', border: 'border-yellow-500' };
  if (score >= 40) return { bg: 'bg-red-500', text: 'text-red-500', border: 'border-red-500' };
  return { bg: 'bg-gray-600', text: 'text-gray-400', border: 'border-gray-600' };
};

const formatValue = (value: number) => {
  if (value < 0) {
    return <span className="text-red-400">{value.toLocaleString()}</span>;
  }
  return <span className="text-gray-200">{value.toLocaleString()}</span>;
};

const ScoreItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex justify-between items-baseline py-2 border-b border-gray-700">
    <dt className="text-gray-400 text-sm">{label}</dt>
    <dd className="font-medium text-base">{value}</dd>
  </div>
);


const MemberDetailModal: React.FC<MemberDetailModalProps> = ({ member, onClose }) => {
  const { scores } = member;
  const colorInfo = getTrafficLightColor(scores.trafficLightScore);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className={`relative bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border-t-4 ${colorInfo.border}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gray-800/80 backdrop-blur-sm px-6 py-4 border-b border-gray-700 z-10 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">{member.name}</h2>
            <p className={`text-lg font-semibold ${colorInfo.text}`}>總分: {scores.trafficLightScore}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <CloseIcon className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Section 1: 全鑫白金分會 */}
          <div className="bg-gray-900/50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-yellow-400 mb-3">全鑫白金分會</h3>
            <dl>
              <ScoreItem label="出席" value={formatValue(scores.attendance)} />
              <ScoreItem label="缺席" value={formatValue(scores.absence)} />
              <ScoreItem label="遲到" value={formatValue(scores.late)} />
              <ScoreItem label="病/事假" value={formatValue(scores.medicalLeave)} />
              <ScoreItem label="代理" value={formatValue(scores.proxy)} />
              <ScoreItem label="提供內部引薦" value={formatValue(scores.internalReferralsGiven)} />
              <ScoreItem label="提供外部引薦" value={formatValue(scores.externalReferralsGiven)} />
              <ScoreItem label="收到內部引薦" value={formatValue(scores.internalReferralsReceived)} />
              <ScoreItem label="收到外部引薦" value={formatValue(scores.externalReferralsReceived)} />
              <ScoreItem label="帶來賓" value={formatValue(scores.guestsBrought)} />
              <ScoreItem label="一對一" value={formatValue(scores.oneToOne)} />
              <ScoreItem label="交易價值" value={formatValue(scores.businessValue)} />
              <ScoreItem label="分會教育單位" value={formatValue(scores.educationUnits)} />
            </dl>
          </div>

          {/* Section 2: 紅綠燈預測分數 */}
          <div className="bg-gray-900/50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-yellow-400 mb-3">紅綠燈預測分數</h3>
            <dl>
              <ScoreItem label="出席 (20)" value={formatValue(scores.attendanceScore)} />
              <ScoreItem label="引薦 (20)" value={formatValue(scores.referralScore)} />
              <ScoreItem label="一對一 (15)" value={formatValue(scores.oneToOneScore)} />
              <ScoreItem label="金額 (15)" value={formatValue(scores.businessValueScore)} />
              <ScoreItem label="培訓 (15)" value={formatValue(scores.trainingScore)} />
              <ScoreItem label="來賓 (15)" value={formatValue(scores.guestScore)} />
            </dl>
          </div>

          {/* Section 3: 滾動六個月內尚缺 */}
          <div className="bg-gray-900/50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-yellow-400 mb-3">滾動六個月內尚缺</h3>
            <dl>
              <ScoreItem label="尚缺引薦(每週2筆)" value={formatValue(scores.rolling6Months_referralDeficitWeekly)} />
              <ScoreItem label="尚缺一對一(每兩週次)" value={formatValue(scores.rolling6Months_oneToOneDeficitBiweekly)} />
              <ScoreItem label="引薦金額達成(5~15分)" value={formatValue(scores.rolling6Months_businessValueDeficit)} />
              <ScoreItem label="滾動六個月培訓分" value={formatValue(scores.rolling6Months_trainingDeficit)} />
              <ScoreItem label="尚缺來賓數(每月一個)" value={formatValue(scores.rolling6Months_guestDeficit)} />
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailModal;

import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MemberCard from './components/MemberCard';
import MemberDetailModal from './components/MemberDetailModal';
import StatsSummary from './components/StatsSummary';
import TrafficLightChart from './components/TrafficLightChart'; // 導入圖表元件
import { memberData } from './data/memberData';
import { Member } from './types';

const App: React.FC = () => {
  const [selectedMonth] = useState<string>(Object.keys(memberData)[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filteredMembers = useMemo(() => {
    // 讓圖表和統計數據永遠反映當月全體會員，不受搜尋影響
    const dataForMonth: Member[] = memberData[selectedMonth] || [];
    if (!searchQuery.trim()) {
      return dataForMonth;
    }
    return dataForMonth.filter(member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedMonth, searchQuery]);

  const allMembersForMonth = useMemo(() => {
    return memberData[selectedMonth] || [];
  }, [selectedMonth]);

  const stats = useMemo(() => {
    const counts = {
      green: 0,
      yellow: 0,
      red: 0,
      black: 0,
    };
    allMembersForMonth.forEach(member => {
      const score = member.scores.trafficLightScore;
      if (score >= 70) counts.green++;
      else if (score >= 60) counts.yellow++;
      else if (score >= 5 && score <= 55) counts.red++;
      else counts.black++;
    });
    return counts;
  }, [allMembersForMonth]);

  const handleMemberSelect = (member: Member) => {
    setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <Header />
        <StatsSummary stats={stats} />
        <TrafficLightChart stats={stats} /> 
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentMonth={selectedMonth}
          totalMembers={allMembersForMonth.length}
        />

        <main className="mt-8">
          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMembers.map(member => (
                <MemberCard 
                  key={member.id} 
                  member={member}
                  onSelect={handleMemberSelect}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-xl">找不到符合條件的會員。</p>
            </div>
          )}
        </main>

        <footer className="text-center text-sm text-gray-500 mt-12 py-4 border-t border-gray-800">
          <p>© 2025 欣冠達國際實業有限公司 林沛綺｜All Rights Reserved</p>
        </footer>
      </div>

      {selectedMember && (
        <MemberDetailModal 
          member={selectedMember} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default App;
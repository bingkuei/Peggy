import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MemberCard from './components/MemberCard';
import MemberDetailModal from './components/MemberDetailModal';
import StatsSummary from './components/StatsSummary';
import { memberData } from './data/memberData';
import { Member } from './types';

const App: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(Object.keys(memberData)[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const availableMonths = Object.keys(memberData);

  const filteredMembers = useMemo(() => {
    const dataForMonth: Member[] = memberData[selectedMonth] || [];
    if (!searchQuery.trim()) {
      return dataForMonth;
    }
    return dataForMonth.filter(member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.id.toString().includes(searchQuery)
    );
  }, [selectedMonth, searchQuery]);

  const stats = useMemo(() => {
    const counts = {
      green: 0,
      yellow: 0,
      red: 0,
      black: 0,
    };
    filteredMembers.forEach(member => {
      const score = member.scores.trafficLightScore;
      if (score >= 70) counts.green++;
      else if (score >= 60) counts.yellow++;
      else if (score >= 40) counts.red++;
      else counts.black++;
    });
    return counts;
  }, [filteredMembers]);

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
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          availableMonths={availableMonths}
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
          <p>製作人資訊：副主席林沛綺</p>
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
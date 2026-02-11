import React, { useState, useEffect } from 'react';
import SideBar from './components/SideBar';
import Chats from './components/Chats';

const BOTS = [
  { name: 'Pikachu', bg: 'https://wallpaper.forfun.com/fetch/fd/fd171e71df4b2b952a065c1fd7407a59.jpeg', color: 'bg-yellow-500' },
  { name: 'Charizard', bg: 'https://images7.alphacoders.com/655/655026.jpg', color: 'bg-orange-600' },
  { name: 'Snivy', bg: 'https://wallpapers.com/images/hd/snivy-giving-the-side-eye-cgj3fcavk4ggncld.jpg', color: 'bg-green-500' },
  { name: 'Umbreon', bg: 'https://images8.alphacoders.com/836/836499.jpg', color: 'bg-neutral-800' }
];

const App = () => {
  const [activeBot, setActiveBot] = useState(BOTS[0]);
  const [selectedTone, setSelectedTone] = useState("HAPPY");
  const [isIncognito, setIsIncognito] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Separate history per bot
  const [histories, setHistories] = useState({
    Pikachu: [], Charizard: [], Snivy: [], Umbreon: []
  });

  const toggleIncognito = () => {
    if (!isIncognito) {
      // Per your requirement: once turned on, previous history is back to zero
      setHistories({ Pikachu: [], Charizard: [], Snivy: [], Umbreon: [] });
    }
    setIsIncognito(!isIncognito);
  };

  const clearBotHistory = (botName) => {
    setHistories(prev => ({ ...prev, [botName]: [] }));
  };

  const updateHistory = (botName, newMessage) => {
    setHistories(prev => ({
      ...prev,
      [botName]: [...prev[botName], newMessage]
    }));
  };

  return (
    <div 
      className="min-h-screen w-full flex transition-all duration-1000 ease-in-out bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${activeBot.bg})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] pointer-events-none" />

      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-3 bg-retro-red border-2 border-retro-gold rounded-full shadow-lg cursor-pointer"
      >
        <span className="text-white font-bold">{isMobileMenuOpen ? "✕" : "☰"}</span>
      </button>

      <div className="relative z-10 flex w-full h-screen overflow-hidden p-2 md:p-6 gap-4">
        <SideBar 
          isOpen={isMobileMenuOpen}
          setIsOpen={setIsMobileMenuOpen}
          bots={BOTS}
          activeBot={activeBot} 
          setActiveBot={setActiveBot}
          selectedTone={selectedTone}
          setSelectedTone={setSelectedTone}
          isIncognito={isIncognito}
          toggleIncognito={toggleIncognito}
          clearChat={clearBotHistory}
        />
        
        <main className="flex-1 flex flex-col pt-2 md:pt-0">
          <Chats 
            bot={activeBot} 
            tone={selectedTone} 
            history={histories[activeBot.name]} 
            onSendMessage={(msg) => updateHistory(activeBot.name, msg)}
            isIncognito={isIncognito}
            setIsIncognito={setIsIncognito}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
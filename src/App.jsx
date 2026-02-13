import React, { useState, useRef } from 'react';
import SideBar from './components/SideBar';
import Chats from './components/Chats';
import { createChat } from './lib/gemini';

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
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState("text-[15px]");
  const [bubbleOpacity, setBubbleOpacity] = useState("bg-black/50");
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favoriteBots')) || [];
    } catch (e) {
      return [];
    }
  });

  const toggleFavorite = (botName) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(botName)
        ? prev.filter(name => name !== botName)
        : [...prev, botName];
      localStorage.setItem('favoriteBots', JSON.stringify(newFavorites));
      localStorage.setItem('userFavoritesCount', newFavorites.length.toString());
      return newFavorites;
    });
  };

  // Separate history per bot
  const [histories, setHistories] = useState({
    Pikachu: [], Charizard: [], Snivy: [], Umbreon: []
  });

  // Gemini chat sessions per bot
  // Initialize all chat sessions
  const initAllSessions = (tone) => {
    const sessions = {};
    BOTS.forEach(bot => {
      sessions[bot.name] = createChat(bot.name, tone);
    });
    chatSessionsRef.current = sessions;
  };

  // Initialize sessions immediately (not in useEffect) so they're ready on first render
  const chatSessionsRef = useRef(null);
  if (!chatSessionsRef.current) {
    const sessions = {};
    BOTS.forEach(bot => {
      sessions[bot.name] = createChat(bot.name, "HAPPY");
    });
    chatSessionsRef.current = sessions;
  }

  // Recreate all sessions when tone changes
  const handleToneChange = (newTone) => {
    setSelectedTone(newTone);
    initAllSessions(newTone);
    // Clear all histories since the persona context has changed
    setHistories({ Pikachu: [], Charizard: [], Snivy: [], Umbreon: [] });
  };

  const toggleIncognito = () => {
    if (!isIncognito) {
      // Per your requirement: once turned on, previous history is back to zero
      setHistories({ Pikachu: [], Charizard: [], Snivy: [], Umbreon: [] });
      // Also recreate all chat sessions to clear Gemini context
      initAllSessions(selectedTone);
    }
    setIsIncognito(!isIncognito);
  };

  const clearBotHistory = (botName) => {
    setHistories(prev => ({ ...prev, [botName]: [] }));
    // Recreate that bot's chat session to clear Gemini context
    chatSessionsRef.current[botName] = createChat(botName, selectedTone);
  };

  const updateHistory = (botName, newMessage) => {
    setHistories(prev => ({
      ...prev,
      [botName]: [...prev[botName], newMessage]
    }));

    if (newMessage.sender === 'user') {
      const currentCount = parseInt(localStorage.getItem('userChatCount')) || 0;
      localStorage.setItem('userChatCount', (currentCount + 1).toString());
    }
  };

  return (
    <div
      className="min-h-screen w-full flex transition-all duration-1000 ease-in-out bg-cover bg-center bg-no-repeat relative animate-blur-in"
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
          setSelectedTone={handleToneChange}
          isIncognito={isIncognito}
          toggleIncognito={toggleIncognito}
          clearChat={clearBotHistory}
          onSettingsClick={() => setShowSettings(true)}
        />

        <main className="flex-1 flex flex-col pt-2 md:pt-0 animate-pop-up" style={{ animationDelay: "0.1s" }}>
          <Chats
            bot={activeBot}
            tone={selectedTone}
            history={histories[activeBot.name]}
            onSendMessage={(msg) => updateHistory(activeBot.name, msg)}
            isIncognito={isIncognito}
            setIsIncognito={setIsIncognito}
            showSettings={showSettings}
            setShowSettings={setShowSettings}
            fontSize={fontSize}
            setFontSize={setFontSize}
            bubbleOpacity={bubbleOpacity}
            setBubbleOpacity={setBubbleOpacity}
            chatSession={chatSessionsRef.current[activeBot.name]}
            isFavorite={favorites.includes(activeBot.name)}
            onToggleFavorite={() => toggleFavorite(activeBot.name)}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
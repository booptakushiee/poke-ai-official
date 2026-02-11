import React from 'react';
import { Settings, Ghost, Trash2 } from 'lucide-react';

const SideBar = ({ isOpen, setIsOpen, bots, activeBot, setActiveBot, selectedTone, setSelectedTone, isIncognito, toggleIncognito, clearChat }) => {
  const tones = ["HAPPY", "SAD", "EXCITED", "CURIOUS", "HUNGRY", "ANGRY"];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-40 w-72 md:w-80 p-6 flex flex-col gap-6 bg-glass-dark backdrop-blur-xl border-r-2 md:border-2 border-retro-red md:rounded-[40px] text-white shadow-2xl transition-all duration-500
      md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      <div className="text-center">
        <h2 className="poke-title-stroke text-3xl tracking-widest uppercase mb-4 py-2">Your Chatbots</h2>
        <hr className="border-t border-white/10" />
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-2 flex-grow">
        {bots.map((bot) => (
          <div 
            key={bot.name}
            onClick={() => { setActiveBot(bot); setIsOpen(false); }}
            className={`group flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border-2
              ${activeBot.name === bot.name ? 'bg-white/10 border-retro-gold shadow-lg' : 'bg-transparent border-transparent hover:bg-white/5'}`}
          >
            {/* Pokeball UI fix */}
            <div className={`w-12 h-12 rounded-full border-2 border-white relative overflow-hidden shrink-0 shadow-md`}>
              <div className={`absolute top-0 w-full h-1/2 ${bot.color}`}></div>
              <div className="absolute bottom-0 w-full h-1/2 bg-white"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-3 h-3 bg-white border-2 border-black rounded-full z-10"></div>
                 <div className="w-full h-[2px] bg-black"></div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-bold ${activeBot.name === bot.name ? 'text-retro-gold' : 'text-white/90'}`}>
                {bot.name}
              </h3>
              <p className="text-[10px] opacity-40 uppercase tracking-tighter">Start a conversation..</p>
            </div>
            
            {activeBot.name === bot.name && (
              <button 
                onClick={(e) => { e.stopPropagation(); clearChat(bot.name); }}
                className="p-2 hover:bg-red-500/20 text-white/20 hover:text-red-500 rounded-lg transition-all"
                title="Clear Session"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-white/10">
        <h4 className="text-[10px] uppercase tracking-[0.2em] mb-4 text-white/60 font-bold">Communication Tone</h4>
        <div className="grid grid-cols-2 gap-2">
          {tones.map((t) => (
            <button 
              key={t} 
              onClick={() => setSelectedTone(t)}
              className={`py-2 px-1 border-2 rounded-full text-[9px] font-bold transition-all cursor-pointer tracking-wider
                ${selectedTone === t ? 'bg-retro-red border-retro-gold text-retro-gold shadow-[0_0_10px_rgba(186,166,57,0.3)]' : 'bg-white/5 border-retro-red/30 text-white/70 hover:border-retro-red'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <button 
          onClick={toggleIncognito}
          className={`flex items-center gap-3 text-sm transition-all uppercase cursor-pointer py-1 ${isIncognito ? 'text-cyan-400 font-bold' : 'text-white/60 hover:text-retro-gold'}`}
        >
          <Ghost size={20} className={isIncognito ? 'animate-pulse' : ''} /> 
          {isIncognito ? "Incognito Active" : "Incognito Mode"}
        </button>
        <button className="flex items-center gap-3 text-sm text-white/60 hover:text-retro-gold transition-all uppercase cursor-pointer py-1">
          <Settings size={20} /> Settings
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
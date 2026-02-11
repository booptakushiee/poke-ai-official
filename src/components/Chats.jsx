import React, { useState, useEffect, useRef } from 'react';
import { Paperclip, Mic, Zap, ArrowUp, XCircle } from 'lucide-react';

const Chats = ({ bot, tone, history, onSendMessage, isIncognito, setIsIncognito }) => {
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const generateAIResponse = (userText) => {
    const text = userText.toLowerCase();
    const t = tone.toLowerCase();
    
    // Deep Persona Engine Logic
    const personas = {
      Pikachu: {
        hello: `*Pika?* Hi there! How can I help you?`,
        howAreYou: `I'm good and I feel ${t}. How about you?`,
        bored: `*PIKA?!* Sure. Let's go outside! That would be wonderful!`,
        story: `*Pika!* Oh wow, okay. i'm listening...`,
        storyEnd: `Wow, that's interesting. I'd like to hear more.`,
        action: `PIKA!!`,
        image: `*Sniffs the file* Pika-pika! Is this for me? Looks like a cool image!`
      },
      Charizard: {
        hello: `*Snorts small flame* Hmph. What do you want?`,
        howAreYou: `I am powerful, but currently feeling ${t}. Don't get in my way.`,
        bored: `RAAWR! Let us take to the skies! I am bored too.`,
        story: `Hmph. I suppose I can listen while I rest. Go on.`,
        storyEnd: `*Yawn* Not bad. But my flames tell better stories.`,
        action: `*Roars into the sky* 🔥`,
        image: `*Looks at image* Hmph. That's an interesting photo. But doesn't look impressive as my flames.`
      },
      Snivy: {
        hello: `*Smirks* Oh, it's you. Greetings.`,
        howAreYou: `I am as elegant as ever, though feeling slightly ${t}.`,
        bored: `I suppose a walk in the garden is acceptable. Let's go.`,
        story: `*Crosses arms* Very well. Entertaining me is your duty. Begin.`,
        storyEnd: `Simply elegant. Continue if you must.`,
        action: `*Whips vines elegantly*`,
        image: `*Glances at file* Simply amateur. But I suppose I'll look.`
      },
      Umbreon: {
        hello: `*..Umbre. Hello.`,
        howAreYou: `The moonlight is calm. I feel ${t}.`,
        bored: `The night is where I belong. Let's go.`,
        story: `... I will listen. Proceed.`,
        storyEnd: `... Intriguing. Tell me more.`,
        action: `*Eyes glow yellow* ...`,
        image: `... I see what you sent. Mysterious.`
      }
    };

    const p = personas[bot.name];

    // Response Priority Logic
    if (text.match(/hello|hi|hey|greetings/)) return p.hello;
    if (text.includes("how are you")) return p.howAreYou;
    if (text.match(/bored|go outside/)) return p.bored;
    if (text.match(/let's go|alright|ok/)) return p.action;
    if (text.length > 30) return p.storyEnd; // Simple story detection
    if (text.match(/story|hear a story/)) return p.story;
    
    // Mood-Specific Fallbacks
    if (tone === "HUNGRY") return `*${bot.name} looks at you* ...Do you have any snacks? I'm starving.`;
    if (tone === "ANGRY") return `*${bot.name} is charging up!* Pika... CHUUU! Stay back!`;
    
    return `*${bot.name} looks curious* I'm feeling ${t} right now. What else is on your mind?`;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onSendMessage({ text: `[Attachment: ${file.name}]`, sender: 'user' });
      const pResponses = { 
        Pikachu: "*Pika-pika!* Is this a picture? It looks awesome!", 
        Charizard: "Hmph. Just an image. My tail is brighter.", 
        Snivy: "*Smirk* I've seen better art, but this is okay.", 
        Umbreon: "...A visual. Interesting." 
      };
      setTimeout(() => onSendMessage({ text: pResponses[bot.name], sender: 'bot' }), 1000);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage({ text: input, sender: 'user' });
    const responseText = generateAIResponse(input);
    setInput("");
    setTimeout(() => onSendMessage({ text: responseText, sender: 'bot' }), 900);
  };

  return (
    <div className="flex-1 flex flex-col h-full max-w-6xl mx-auto w-full">
      {/* Incognito Banner */}
      {isIncognito && (
        <div className="flex justify-between items-center bg-cyan-900/40 border border-cyan-400 text-cyan-200 px-6 py-2 rounded-2xl mb-4 text-xs font-bold tracking-widest backdrop-blur-md">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
             YOU ARE IN INCOGNITO MODE.
          </div>
          <button onClick={() => setIsIncognito(false)} className="hover:text-white cursor-pointer"><XCircle size={16} /></button>
        </div>
      )}

      {/* Header UI Fix */}
      <div className="flex items-center gap-4 bg-black/60 backdrop-blur-xl p-4 px-8 rounded-3xl border border-white/10 w-fit shadow-2xl">
        <div className={`w-12 h-12 rounded-full ${bot.color} border-2 border-white relative overflow-hidden shadow-inner`}>
           <div className="w-full h-1/2 bg-white absolute bottom-0 border-t-2 border-black" />
           <div className="w-5 h-5 bg-white border-2 border-black rounded-full z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-black/10 rounded-full"></div>
           </div>
        </div>
        <div>
          <h2 className="text-white text-xl font-bold tracking-tight">{bot.name}</h2>
          <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.3em] mt-1 flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
             Active now
          </p>
        </div>
      </div>

      {/* Messages with Scroll fix */}
      <div className="flex-1 overflow-y-auto py-8 md:py-12 flex flex-col gap-6 custom-scrollbar pr-2 md:pr-4">
        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full opacity-20 select-none">
             <Zap size={48} className="mb-4" />
             <p className="text-xl italic">Ready to battle... or just chat.</p>
          </div>
        )}
        {history.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`max-w-[85%] md:max-w-[65%] p-4 px-7 rounded-[30px] border-2 backdrop-blur-lg shadow-2xl transition-all
              ${msg.sender === 'user' 
                ? 'rounded-tr-none border-retro-gold bg-black/50 text-white' 
                : 'rounded-tl-none border-retro-red bg-glass-dark text-white/90'}`}>
              <p className="text-[15px] tracking-wide leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input Section */}
      <div className="pb-6 md:pb-12">
        <div className="relative flex items-center gap-4 bg-glass-dark backdrop-blur-2xl border-2 border-retro-red rounded-[35px] p-4 md:p-5 px-8 shadow-[0_0_30px_rgba(133,24,24,0.3)]">
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
          
          <div className="flex items-center gap-4 shrink-0">
            <Paperclip 
              className="text-white/40 cursor-pointer hover:text-yellow-400 transition-all transform hover:scale-110 active:scale-90" 
              onClick={() => fileInputRef.current.click()} 
              size={24} 
            />
            <Mic 
              className="text-white/40 cursor-pointer hover:text-yellow-400 transition-all transform hover:scale-110 active:scale-90" 
              onClick={() => alert("Listening to your voice command...")} 
              size={24} 
            />
          </div>
          
          <div className="hidden lg:flex items-center gap-3 text-white/10 font-black shrink-0 pointer-events-none px-2 border-l border-white/5">
             <Zap size={14} fill="currentColor" />
             <span className="text-[11px] uppercase tracking-[0.2em]">TRAINER UNITE</span>
          </div>

          <input 
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/10 text-md md:text-xl px-2"
            placeholder={`Ask ${bot.name} something..`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />

          <button 
            onClick={handleSend} 
            className="group w-12 h-12 bg-black rounded-full flex items-center justify-center text-retro-red border-2 border-retro-red hover:bg-retro-red hover:text-white hover:border-retro-gold transition-all cursor-pointer shadow-lg active:scale-90"
          >
            <ArrowUp size={28} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
        <p className="text-center text-[13px] text-white/20 mt-4 uppercase font-bold tracking-[0.4em]">
          Contains AI-generated responses. May not be accurate.
        </p>
      </div>
    </div>
  );
};

export default Chats;
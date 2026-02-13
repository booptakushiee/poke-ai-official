import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, Heart, Star, CloudRain, Trash2, Info } from 'lucide-react';

const POKEMON_COLLECTION = [
    {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        level: 42,
        hp: 35,
        attack: 55,
        speed: 90,
        hobbies: ["Surfing", "Training with Ash", "Exploring forests"],
        likes: ["Ketchup", "Sparkling objects", "Apples"],
        hates: ["Team Rocket", "Being stuck in a Pokéball", "Sour berries"]
    },
    {
        id: 6,
        name: 'Charizard',
        type: 'Fire/Flying',
        level: 60,
        hp: 78,
        attack: 84,
        speed: 100,
        hobbies: ["Flying over canyons", "Training in volcanoes", "Sleeping in the sun"],
        likes: ["Strong opponents", "Spicy food", "Warm breezes"],
        hates: ["Water", "Cold caves", "Weak battles"]
    },
    {
        id: 700,
        name: 'Sylveon',
        type: 'Fairy',
        level: 35,
        hp: 95,
        attack: 65,
        speed: 60,
        hobbies: ["Dancing in meadows", "Making new friends", "Grooming"],
        likes: ["Gentle music", "Sweet treats", "Shiny ribbons"],
        hates: ["Loud noises", "Conflict", "Muddy places"]
    },
    {
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        level: 15,
        hp: 39,
        attack: 52,
        speed: 65,
        hobbies: ["Sitting by the campfire", "Watching stars", "Playing with small sparks"],
        likes: ["Sunny days", "Hot stones", "Ramen"],
        hates: ["Rain", "Heavy wind", "Snow"]
    },
    {
        id: 835,
        name: 'Yamper',
        type: 'Electric',
        level: 15,
        hp: 59,
        attack: 45,
        speed: 26,
        hobbies: ['Chasing Boltund', 'Herding', 'Napping'],
        likes: ['Treats', 'Running', 'Friends'],
        hates: ['Getting wet', 'Boredom', 'Car rides']
    },
    {
        id: 837,
        name: 'Rolycoly',
        type: 'Rock',
        level: 12,
        hp: 30,
        attack: 40,
        speed: 30,
        hobbies: ['Rolling', 'Speeding in caves', 'Collecting coal'],
        likes: ['Heat', 'Dark places', 'Racing'],
        hates: ['Rain', 'Cold', 'Slow movement']
    },
    {
        id: 833,
        name: 'Drednaw',
        type: 'Water/Rock',
        level: 22,
        hp: 90,
        attack: 115,
        speed: 74,
        hobbies: ['Snapping at logs', 'Swimming', 'Sunbathing on rocks'],
        likes: ['Strong current', 'Biting things', 'Hard shells'],
        hates: ['Soft food', 'Polluted water', 'Disrespect']
    },
    {
        id: 816,
        name: 'Sobble',
        type: 'Water',
        level: 10,
        hp: 50,
        attack: 40,
        speed: 70,
        hobbies: ['Hiding', 'Crying (camouflage)', 'Thinking'],
        likes: ['Berries', 'Water', 'Quiet corners'],
        hates: ['Loud noises', 'Crowds', 'Scary things']
    },
    {
        id: 831,
        name: 'Wooloo',
        type: 'Normal',
        level: 8,
        hp: 42,
        attack: 40,
        speed: 48,
        hobbies: ['Rolling down hills', 'Being fluffy', 'Grazing'],
        likes: ['Soft grass', 'Grooming', 'Other Wooloo'],
        hates: ['Wolves', 'Shearing time', 'Sharp objects']
    },
    {
        id: 650,
        name: 'Chespin',
        type: 'Grass',
        level: 11,
        hp: 56,
        attack: 61,
        speed: 38,
        hobbies: ['Nut cracking', 'Exploring', 'Training'],
        likes: ['Chestnuts', 'Sunbeams', 'Adventure'],
        hates: ['Getting stuck', 'Thirst', 'Cold snaps']
    },
    {
        id: 653,
        name: 'Fennekin',
        type: 'Fire',
        level: 12,
        hp: 40,
        attack: 45,
        speed: 60,
        hobbies: ['Grooming its tail', 'Snacking on twigs', 'Fire breathing'],
        likes: ['Warmth', 'Twigs', 'Sweet food'],
        hates: ['Water', 'Cold air', 'Dirty fur']
    },
    {
        id: 94,
        name: 'Gengar',
        type: 'Ghost/Poison',
        level: 45,
        hp: 60,
        attack: 65,
        speed: 110,
        hobbies: ['Playing pranks', 'Shadow lurking', 'Scaring trainers'],
        likes: ['Dark nights', 'Moonlight', 'Jokes'],
        hates: ['Bright lights', 'Being ignored', 'Serious people']
    },
    {
        id: 136,
        name: 'Flareon',
        type: 'Fire',
        level: 32,
        hp: 65,
        attack: 130,
        speed: 65,
        hobbies: ['Stoking its flame', 'Sunbathing', 'Napping'],
        likes: ['Warm blankets', 'Spicy treats', 'Cozy fires'],
        hates: ['Water', 'Cold wind', 'Wet fur']
    },
    {
        id: 135,
        name: 'Jolteon',
        type: 'Electric',
        level: 32,
        hp: 65,
        attack: 65,
        speed: 130,
        hobbies: ['Charging energy', 'Sprinting', 'Playing fetch'],
        likes: ['Thunderstorms', 'Fast movement', 'Static electricity'],
        hates: ['Grounding', 'Staying still', 'Rubber mats']
    },
    {
        id: 470,
        name: 'Leafeon',
        type: 'Grass',
        level: 32,
        hp: 65,
        attack: 110,
        speed: 95,
        hobbies: ['Photosynthesizing', 'Gardening', 'Sleeping in meadows'],
        likes: ['Fresh air', 'Clean water', 'Sunlight'],
        hates: ['Pollution', 'Droughts', 'Sharp scissors']
    },
    {
        id: 134,
        name: 'Vaporeon',
        type: 'Water',
        level: 32,
        hp: 130,
        attack: 65,
        speed: 65,
        hobbies: ['Swimming', 'Diving', 'Chilling in fountains'],
        likes: ['Clear lakes', 'Rainy days', 'Bubbles'],
        hates: ['Dry heat', 'Dirty water', 'Being stranded']
    },
    {
        id: 471,
        name: 'Glaceon',
        type: 'Ice',
        level: 32,
        hp: 65,
        attack: 60,
        speed: 65,
        hobbies: ['Creating ice sculptures', 'Frosting windows', 'Cooling off'],
        likes: ['Snowy days', 'Ice cream', 'Winter'],
        hates: ['Hot sun', 'Melted ice', 'Sweating']
    },
    {
        id: 149,
        name: 'Dragonite',
        type: 'Dragon/Flying',
        level: 55,
        hp: 91,
        attack: 134,
        speed: 80,
        hobbies: ['Saving people at sea', 'Flying around the world', 'Helping ships'],
        likes: ['Marine life', 'Helping others', 'High altitudes'],
        hates: ['Pollution', 'Shipwrecks', 'Conflict']
    },
    {
        id: 722,
        name: 'Rowlet',
        type: 'Grass/Flying',
        level: 12,
        hp: 68,
        attack: 55,
        speed: 42,
        hobbies: ['Sleeping in backpacks', 'Turning its head', 'Photosynthesizing'],
        likes: ['Quiet places', 'Small spaces', 'Seeds'],
        hates: ['Loud noises', 'Being disturbed while sleeping']
    },
    {
        id: 225,
        name: 'Delibird',
        type: 'Ice/Flying',
        level: 25,
        hp: 45,
        attack: 55,
        speed: 75,
        hobbies: ['Delivering presents', 'Scrounging for food', 'Exploring icy peaks'],
        likes: ['Cold weather', 'Giving gifts', 'Apples'],
        hates: ['Heat', 'Empty bags', 'Being late']
    },
    {
        id: 260,
        name: 'Swampert',
        type: 'Water/Ground',
        level: 36,
        hp: 100,
        attack: 110,
        speed: 60,
        hobbies: ['Swimming in murky water', 'Predicting storms', 'Lifting heavy rocks'],
        likes: ['Mud', 'Clear vision', 'Powerful waves'],
        hates: ['Dry land', 'Dehydration', 'Loud noises']
    },
    {
        id: 256,
        name: 'Combusken',
        type: 'Fire/Fighting',
        level: 20,
        hp: 60,
        attack: 85,
        speed: 55,
        hobbies: ['Kickboxing training', 'Sprinting', 'Testing its flame'],
        likes: ['Spicy food', 'Intense training', 'Victory'],
        hates: ['Water', 'Staying still', 'Cold floors']
    },
    {
        id: 255,
        name: 'Torchic',
        type: 'Fire',
        level: 10,
        hp: 45,
        attack: 60,
        speed: 45,
        hobbies: ['Chasing butterflies', 'Cuddling', 'Blowing small embers'],
        likes: ['Warmth', 'Sweet berries', 'Hugs'],
        hates: ['Water', 'Darkness', 'Being alone']
    },
    {
        id: 261,
        name: 'Poochyena',
        type: 'Dark',
        level: 8,
        hp: 35,
        attack: 55,
        speed: 35,
        hobbies: ['Howling at night', 'Chasing tails', 'Sniffing around'],
        likes: ['Shadows', 'Meat', 'Bones'],
        hates: ['Bright sun', 'Loud bells', 'Bathing']
    },
    {
        id: 264,
        name: 'Linoone',
        type: 'Normal',
        level: 22,
        hp: 78,
        attack: 70,
        speed: 100,
        hobbies: ['Running in straight lines', 'Foraging', 'Swimming in rivers'],
        likes: ['Speed', 'Fresh fruit', 'Open paths'],
        hates: ['Sharp turns', 'Obstacles', 'Dead ends']
    },
    {
        id: 258,
        name: 'Mudkip',
        type: 'Water',
        level: 10,
        hp: 50,
        attack: 70,
        speed: 40,
        hobbies: ['Playing in mud', 'Splashing around', 'Resting on riverbanks'],
        likes: ['Water', 'Muddy spots', 'Relaxing'],
        hates: ['Dry heat', 'Being rushed', 'Loud environments']
    },
    {
        id: 393,
        name: 'Piplup',
        type: 'Water',
        level: 12,
        hp: 53,
        attack: 51,
        speed: 40,
        hobbies: ['Walking with pride', 'Diving for fish', 'Grooming its feathers'],
        likes: ['Clean water', 'Cold climates', 'Being praised'],
        hates: ['Accepting food from strangers', 'Falling down', 'Dirty water']
    },
    {
        id: 196,
        name: 'Espeon',
        type: 'Psychic',
        level: 32,
        hp: 65,
        attack: 65,
        speed: 110,
        hobbies: ['Sunbathing', 'Sensing the future', 'Meditating'],
        likes: ['Sunlight', 'Psychic energy', 'Peaceful places'],
        hates: ['Darkness', 'Loud interruptions', 'Surprises']
    },
    {
        id: 495,
        name: 'Snivy',
        type: 'Grass',
        level: 18,
        hp: 45,
        attack: 45,
        speed: 63,
        hobbies: ["Sunbathing", "Strategizing battles", "Observing nature"],
        likes: ["Clean water", "Fresh dew", "Elegant surroundings"],
        hates: ["Impatience", "Rude behavior", "Wilted plants"]
    },
    {
        id: 197,
        name: 'Umbreon',
        type: 'Dark',
        level: 45,
        hp: 95,
        attack: 65,
        speed: 65,
        hobbies: ["Night patrols", "Stargazing", "Training under the moon"],
        likes: ["Quiet nights", "Dark chocolate", "Full moons"],
        hates: ["Bright flashes", "Noisy crowds", "Early mornings"]
    },
    {
        id: 906,
        name: 'Sprigatito',
        type: 'Grass',
        level: 12,
        hp: 40,
        attack: 61,
        speed: 65,
        hobbies: ["Kneading soft grass", "Napping in sunbeams", "Chasing bugs"],
        likes: ["Gentle pets", "Aromatic flowers", "Milk"],
        hates: ["Being ignored", "Cold water", "Loud vacuum cleaners"]
    },
    {
        id: 7,
        name: 'Squirtle',
        type: 'Water',
        level: 14,
        hp: 44,
        attack: 48,
        speed: 43,
        hobbies: ["Surfing with the Squirtle Squad", "Polishing its shell", "Blowing bubbles"],
        likes: ["Sunglasses", "Beaches", "Seaweed snacks"],
        hates: ["Dry heat", "Thirsty soil", "Mean trainers"]
    },
    {
        id: 143,
        name: 'Snorlax',
        type: 'Normal',
        level: 55,
        hp: 160,
        attack: 110,
        speed: 30,
        hobbies: ["Eating", "Sleeping", "More eating"],
        likes: ["Fluffy pillows", "Huge buffets", "Quiet mountains"],
        hates: ["Alarm clocks", "Empty plates", "Too much exercise"]
    },
    {
        id: 111,
        name: 'Rhyhorn',
        type: 'Ground/Rock',
        level: 30,
        hp: 80,
        attack: 85,
        speed: 25,
        hobbies: ["Charging through walls", "Dust bathing", "Mountain climbing"],
        likes: ["Hard surfaces", "Stone fruit", "Heavy rain"],
        hates: ["Intricate puzzles", "Slippery ice", "Sneaky traps"]
    },
    {
        id: 493,
        name: 'Arceus',
        type: 'Normal',
        level: 100,
        hp: 120,
        attack: 120,
        speed: 120,
        hobbies: ["Creating worlds", "Watching over the universe", "Meditation"],
        likes: ["Universal balance", "Cosmic order", "Wisdom"],
        hates: ["Chaos", "Destruction", "Ignorance"]
    },
    {
        id: 487,
        name: 'Giratina',
        type: 'Ghost/Dragon',
        level: 80,
        hp: 150,
        attack: 100,
        speed: 90,
        hobbies: ["Guarding the Distortion World", "Silent observation", "Shadow walking"],
        likes: ["Quiet voids", "Dimensional shifts", "Mystery"],
        hates: ["Disrespect to boundaries", "Interference with time/space", "Direct sunlight"]
    },
    {
        id: 384,
        name: 'Rayquaza',
        type: 'Dragon/Flying',
        level: 85,
        hp: 105,
        attack: 150,
        speed: 95,
        hobbies: ["Patrolling the ozone layer", "Devouring meteorites", "Defending Earth"],
        likes: ["Clean air", "Ancient ruins", "Peace and quiet"],
        hates: ["Invasive species", "Pollution", "Conflict between Kyogre and Groudon"]
    },
    {
        id: 26,
        name: 'Raichu',
        type: 'Electric',
        level: 48,
        hp: 60,
        attack: 90,
        speed: 110,
        hobbies: ["Testing its voltage", "Running across fields", "Playing Tag"],
        likes: ["High-voltage areas", "Sour snacks", "Socializing"],
        hates: ["Electrical shorts", "Solitude", "Rubber insulation"]
    },
    {
        id: 810,
        name: 'Grookey',
        type: 'Grass',
        level: 10,
        hp: 50,
        attack: 65,
        speed: 65,
        hobbies: ["Drumming on sticks", "Climbing trees", "Dancing to rhythm"],
        likes: ["Upbeat music", "Fertile soil", "Shared meals"],
        hates: ["Quiet rooms", "Broken sticks", "Wilted flowers"]
    },
    {
        id: 813,
        name: 'Scorbunny',
        type: 'Fire',
        level: 11,
        hp: 50,
        attack: 71,
        speed: 69,
        hobbies: ["Training its running speed", "Practicing kicks", "Exploring city streets"],
        likes: ["Fast-paced action", "Roasted corn", "Victory"],
        hates: ["Standing still", "Wet paws", "Losing a race"]
    },
];

const CollectionPage = () => {
    const navigate = useNavigate();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const handleBackClick = () => {
        setShowConfirmModal(true);
    };

    const confirmBack = () => {
        navigate('/');
    };

    const cancelBack = () => {
        setShowConfirmModal(false);
    };

    return (
        <div className="collection-page min-h-screen bg-black text-white font-[family-name:var(--font-pixelify)] relative animate-blur-in">
            {/* Background with overlay */}
            <div className="absolute inset-0 z-0">
                <img src="/sprite3.gif" alt="Background" className="w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
            </div>

            {/* Navbar Style Header */}
            <nav className="relative z-20 flex items-center justify-between px-6 py-3 bg-[#BAA639] border-b-[3px] border-[#8a7a20] shadow-lg">
                <div className="flex gap-8">
                    <Link to="/" className="text-xl font-bold text-[#3a2a00] hover:text-[#851818] transition-colors">Home</Link>
                    <Link to="/collection" className="text-xl font-bold text-[#851818]">Collection</Link>
                    <Link to="/chat" className="text-xl font-bold text-[#3a2a00] hover:text-[#851818] transition-colors">Chats</Link>
                    <Link to="/profile" className="text-xl font-bold text-[#3a2a00] hover:text-[#851818] transition-colors">Profile</Link>
                </div>
            </nav>

            {/* Back Button */}
            <div className="relative z-10 container mx-auto px-6 py-6 transition-all duration-300">
                <button
                    onClick={handleBackClick}
                    className="flex items-center gap-2 text-[#BAA639] hover:text-white transition-colors group cursor-pointer"
                >
                    <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-lg font-bold uppercase tracking-widest">Back</span>
                </button>
            </div>

            {/* Collection Header Section */}
            <div className="relative z-10 container mx-auto px-6 mb-10 flex flex-col md:flex-row items-center gap-6 animate-pop-up">
                <img src="/pokeball-icon.png" alt="Gotta catch 'em all" className="w-16 md:w-24 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                <div className="text-left">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-1 drop-shadow-lg tracking-tighter" style={{ fontFamily: 'var(--font-pixelify)' }}>
                        Gotta catch <span className="text-[#BAA639]">é</span>m all!
                    </h1>
                    <div className="bg-[#BAA639] text-[#3a2a00] px-3 py-0.5 inline-block rounded font-bold uppercase tracking-widest text-sm">
                        Collected: {POKEMON_COLLECTION.length}
                    </div>
                </div>
            </div>

            {/* Pokemon Grid */}
            <main className="relative z-10 container mx-auto px-6 pb-20">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {POKEMON_COLLECTION.map((pkmn, idx) => (
                        <div
                            key={pkmn.id}
                            onClick={() => setSelectedPokemon(pkmn)}
                            className="bg-white/5 border-2 border-white/10 hover:border-[#BAA639]/50 rounded-2xl p-4 flex flex-col items-center group transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 animate-pop-up cursor-pointer overflow-hidden"
                            style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
                        >
                            <div className="w-24 h-24 md:w-32 md:h-32 mb-4 relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-[#BAA639]/5 rounded-full group-hover:bg-[#BAA639]/10 transition-colors duration-500 scale-0 group-hover:scale-100"></div>
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pkmn.id}.png`}
                                    alt={pkmn.name}
                                    className="w-full h-full object-contain relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-1 tracking-wider uppercase group-hover:text-[#BAA639] transition-colors flex items-center gap-2">
                                {pkmn.name} <Info size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h3>
                            <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest">
                                {pkmn.type}
                            </p>
                        </div>
                    ))}
                </div>
            </main>

            {/* Pokémon Detail Modal */}
            {selectedPokemon && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-blur-in">
                    <div className="bg-[#1a1a1a] border-4 border-[#BAA639] rounded-3xl p-6 md:p-10 max-w-2xl w-full shadow-[0_0_50px_rgba(186,166,57,0.3)] animate-pop-up relative max-h-[90vh] overflow-y-auto custom-scrollbar">

                        <button
                            onClick={() => setSelectedPokemon(null)}
                            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors cursor-pointer"
                        >
                            <X size={32} />
                        </button>

                        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                            <div className="w-48 h-48 bg-white/5 border-2 border-white/10 rounded-full p-4 shrink-0 relative flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.id}.png`}
                                    alt={selectedPokemon.name}
                                    className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                                />
                            </div>

                            <div className="flex-1">
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 uppercase tracking-tighter" style={{ fontFamily: 'var(--font-pixelify)' }}>
                                    {selectedPokemon.name}
                                </h2>
                                <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                                    <span className="bg-[#BAA639] text-[#3a2a00] px-3 py-0.5 rounded font-bold uppercase tracking-widest text-xs">
                                        {selectedPokemon.type} Pokémon
                                    </span>
                                    <span className="bg-white/10 text-white/80 px-3 py-0.5 rounded font-bold uppercase tracking-widest text-xs border border-white/10">
                                        LVL {selectedPokemon.level}
                                    </span>
                                </div>

                                {/* Real-time Stats Section */}
                                <div className="grid grid-cols-3 gap-3 mb-8">
                                    <div className="bg-black/40 border border-white/5 p-3 rounded-xl flex flex-col items-center">
                                        <div className="text-[#50C878] font-bold text-lg">{selectedPokemon.hp}</div>
                                        <div className="text-[10px] uppercase text-white/40 font-bold tracking-widest">HP</div>
                                    </div>
                                    <div className="bg-black/40 border border-white/5 p-3 rounded-xl flex flex-col items-center">
                                        <div className="text-[#FF4500] font-bold text-lg">{selectedPokemon.attack}</div>
                                        <div className="text-[10px] uppercase text-white/40 font-bold tracking-widest">ATK</div>
                                    </div>
                                    <div className="bg-black/40 border border-white/5 p-3 rounded-xl flex flex-col items-center">
                                        <div className="text-[#7CB9E8] font-bold text-lg">{selectedPokemon.speed}</div>
                                        <div className="text-[10px] uppercase text-white/40 font-bold tracking-widest">SPD</div>
                                    </div>
                                </div>

                                <div className="space-y-6 mt-4">
                                    <div>
                                        <h4 className="flex items-center gap-2 text-[#BAA639] font-bold uppercase tracking-widest text-sm mb-2 justify-center md:justify-start">
                                            <Star size={18} fill="#BAA639" /> Hobbies
                                        </h4>
                                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                            {selectedPokemon.hobbies.map((h, i) => (
                                                <span key={i} className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs text-white/80">
                                                    {h}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="flex items-center gap-2 text-[#50C878] font-bold uppercase tracking-widest text-sm mb-2 justify-center md:justify-start">
                                            <Heart size={18} fill="#50C878" /> What they LIKE
                                        </h4>
                                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                            {selectedPokemon.likes.map((l, i) => (
                                                <span key={i} className="px-3 py-1 bg-[#50C878]/10 border border-[#50C878]/20 rounded-full text-xs text-[#50C878]">
                                                    {l}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="flex items-center gap-2 text-[#851818] font-bold uppercase tracking-widest text-sm mb-2 justify-center md:justify-start">
                                            <CloudRain size={18} fill="#851818" /> What they HATE
                                        </h4>
                                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                            {selectedPokemon.hates.map((h, i) => (
                                                <span key={i} className="px-3 py-1 bg-[#851818]/10 border border-[#851818]/20 rounded-full text-xs text-[#851818]">
                                                    {h}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-6 border-t border-white/10 flex justify-center">
                            <button
                                onClick={() => setSelectedPokemon(null)}
                                className="bg-[#BAA639] hover:bg-[#d4c24a] text-[#3a2a00] px-10 py-3 rounded-xl font-bold uppercase tracking-widest transition-all hover:scale-105 cursor-pointer shadow-lg"
                            >
                                Close Profile
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-pop-up">
                    <div className="bg-[#1a1a1a] border-4 border-[#BAA639] rounded-3xl p-8 max-w-sm w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-pop-up text-center">
                        <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">Back to Home page?</h2>
                        <div className="flex gap-4">
                            <button
                                onClick={confirmBack}
                                className="flex-1 bg-[#851818] hover:bg-[#a51b1b] text-white py-3 rounded-xl font-bold uppercase tracking-widest transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <Check size={20} /> Confirm
                            </button>
                            <button
                                onClick={cancelBack}
                                className="flex-1 bg-[#BAA639] hover:bg-[#d4c24a] text-[#3a2a00] py-3 rounded-xl font-bold uppercase tracking-widest transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <X size={20} /> Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollectionPage;

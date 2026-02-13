import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Zap, Award, Edit, Save, X, ArrowLeft, Camera } from 'lucide-react';

const ProfilePage = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    // Initial mock user data
    const [user, setUser] = useState({
        name: "Ash Ketchum",
        email: "ash@pokeai.com",
        role: "Pokémon Trainer",
        level: 42,
        bio: "On a journey to be the very best, like no one ever was. Catching 'em all and coding AI bots in my spare time.",
        avatar: "https://i.pinimg.com/736x/bf/95/34/bf953419d76bf747cdd69b55d4cd6fb9.jpg",
        stats: {
            chats: 128,
            favorites: 15,
            streak: 1 // Default to 1, will be updated by useEffect
        }
    });

    useEffect(() => {
        const calculateStreak = () => {
            const today = new Date().toISOString().split('T')[0];
            const storedDate = localStorage.getItem('lastLoginDate');
            let currentStreak = parseInt(localStorage.getItem('userStreak')) || 1;
            let totalDays = parseInt(localStorage.getItem('totalLoginDays')) || 1;

            if (storedDate) {
                if (storedDate === today) {
                    // Already logged in today, keep streak and total days
                } else {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayStr = yesterday.toISOString().split('T')[0];

                    if (storedDate === yesterdayStr) {
                        currentStreak += 1;
                    } else {
                        currentStreak = 1;
                    }
                    totalDays += 1;
                }
            } else {
                currentStreak = 1;
                totalDays = 1;
            }

            localStorage.setItem('lastLoginDate', today);
            localStorage.setItem('userStreak', currentStreak.toString());
            localStorage.setItem('totalLoginDays', totalDays.toString());

            setUser(prev => ({
                ...prev,
                level: totalDays,
                stats: { ...prev.stats, streak: currentStreak }
            }));
        };

        calculateStreak();
    }, []);

    const [editForm, setEditForm] = useState(user);

    // Determine Account Tier based on Streak
    const getAccountTier = (streak) => {
        if (streak >= 100) return { name: "Amethyst", color: "#9966CC", bg: "bg-[#9966CC]/20", border: "border-[#9966CC]" };
        if (streak >= 80) return { name: "Ruby", color: "#E0115F", bg: "bg-[#E0115F]/20", border: "border-[#E0115F]" };
        if (streak >= 60) return { name: "Diamond", color: "#B9F2FF", bg: "bg-[#B9F2FF]/20", border: "border-[#B9F2FF]" };
        if (streak >= 40) return { name: "Emerald", color: "#50C878", bg: "bg-[#50C878]/20", border: "border-[#50C878]" };
        if (streak >= 30) return { name: "Platinum", color: "#E5E4E2", bg: "bg-[#E5E4E2]/20", border: "border-[#E5E4E2]" };
        if (streak >= 21) return { name: "Gold", color: "#FFD700", bg: "bg-[#FFD700]/20", border: "border-[#FFD700]" };
        if (streak >= 7) return { name: "Silver", color: "#C0C0C0", bg: "bg-[#C0C0C0]/20", border: "border-[#C0C0C0]" };
        if (streak >= 3) return { name: "Bronze", color: "#CD7F32", bg: "bg-[#CD7F32]/20", border: "border-[#CD7F32]" };
        return { name: "Rookie", color: "#ffffff", bg: "bg-white/10", border: "border-white/20" };
    };

    const tier = getAccountTier(user.stats.streak);

    const handleEditToggle = () => {
        if (isEditing) {
            // Cancelled
            setEditForm(user);
        }
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setUser(prev => ({
            ...prev,
            ...editForm,
            stats: prev.stats, // Preserve current real-time stats
            level: prev.level  // Preserve current real-time level
        }));
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="profile-page min-h-screen bg-black text-white font-[family-name:var(--font-pixelify)] relative">
            {/* Background with overlay */}
            <div className="absolute inset-0 z-0">
                <img src="/pokegi.gif" alt="Background" className="w-full h-full object-cover opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black"></div>
            </div>

            {/* Navbar (Reused style for consistency) */}
            <nav className="relative z-20 flex items-center justify-between px-6 py-3 bg-[#BAA639] border-b-[3px] border-[#8a7a20] shadow-lg">
                <div className="hidden md:flex gap-8">
                    <Link to="/" className="text-xl font-bold text-[#3a2a00] hover:text-[#851818] transition-colors">Home</Link>
                    <Link to="/collection" className="text-xl font-bold text-[#3a2a00] hover:text-[#851818] transition-colors">Collection</Link>
                    <Link to="/chat" className="text-xl font-bold text-[#3a2a00] hover:text-[#851818] transition-colors">Chats</Link>
                    <Link to="/profile" className="text-xl font-bold text-[#851818]">Profile</Link>
                </div>
                <button
                    className="md:hidden text-white bg-[#851818] border-2 border-[#BAA639] rounded px-2 py-1"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    {showMobileMenu ? '✕' : '☰'}
                </button>
            </nav>

            {/* Back Button */}
            <div className="relative z-30 container mx-auto px-4 mt-6">
                <Link to="/" className="inline-flex items-center gap-2 text-[#BAA639] hover:text-white transition-colors group">
                    <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-lg font-bold uppercase tracking-widest">Back to Home</span>
                </Link>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="absolute top-[60px] left-0 right-0 z-30 bg-[#BAA639] border-b-[3px] border-[#8a7a20] flex flex-col p-6 gap-3 shadow-2xl">
                    <Link to="/" className="text-lg font-bold text-[#3a2a00]">Home</Link>
                    <Link to="#" className="text-lg font-bold text-[#3a2a00]">Collection</Link>
                    <Link to="/chat" className="text-lg font-bold text-[#3a2a00]">Chats</Link>
                    <Link to="/profile" className="text-lg font-bold text-[#851818]">Profile</Link>
                </div>
            )}

            {/* Profile Content */}
            <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center">

                {/* Profile Card */}
                <div className={`w-full max-w-2xl bg-[#1a1a1a]/80 backdrop-blur-md border-2 ${tier.border} rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] animate-pop-up transition-colors duration-500`}>

                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                        <div className="relative group">
                            <div className={`w-36 h-36 rounded-full border-4 ${tier.border} overflow-hidden shadow-lg bg-gray-800 relative`}>
                                <img src={isEditing ? editForm.avatar : user.avatar} alt="Profile" className="w-full h-full object-cover transition-transform duration-500" />
                                {isEditing && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <Camera className="text-white opacity-80" size={32} />
                                    </div>
                                )}
                            </div>

                            {/* Toggle Edit Mode Button */}
                            <button
                                onClick={handleEditToggle}
                                className={`absolute bottom-0 right-0 p-2 rounded-full border-2 text-white transition-all shadow-lg z-20 ${isEditing ? 'bg-red-500 border-red-700 hover:bg-red-600' : 'bg-[#851818] border-[#BAA639] hover:bg-[#a51b1b]'}`}
                                title={isEditing ? "Cancel Editing" : "Edit Profile"}
                            >
                                {isEditing ? <X size={18} /> : <Edit size={18} />}
                            </button>
                        </div>

                        <div className="flex-1 text-center md:text-left w-full">
                            {isEditing ? (
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs text-[#BAA639] uppercase font-bold tracking-wider block mb-1">Trainer Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editForm.name}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border-b-2 border-[#BAA639] text-white text-2xl font-bold px-2 py-1 focus:outline-none focus:border-[#851818] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-[#BAA639] uppercase font-bold tracking-wider block mb-1">Avatar URL</label>
                                        <input
                                            type="text"
                                            name="avatar"
                                            value={editForm.avatar}
                                            onChange={handleChange}
                                            placeholder="https://..."
                                            className="w-full bg-black/40 border-b-2 border-white/20 text-white/80 text-sm px-2 py-1 focus:outline-none focus:border-[#BAA639] transition-colors"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h1 className="text-4xl font-bold text-white mb-2">{user.name}</h1>
                                    <p className="text-[#BAA639] text-xl font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
                                        <Award size={20} /> Lvl {user.level} {user.role}
                                    </p>
                                </>
                            )}

                            {!isEditing && (
                                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4 md:mt-0">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${tier.bg} ${tier.border}`} style={{ color: tier.color }}>
                                        {tier.name.toUpperCase()} TIER
                                    </span>
                                    <span className="px-3 py-1 bg-[#BAA639]/20 border border-[#BAA639] rounded-full text-xs text-[#BAA639]">VERIFIED TRAINER</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <hr className="border-white/10 my-8" />

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Email Section */}
                        <div className="bg-black/40 p-4 rounded-xl border border-white/5 hover:border-[#BAA639]/50 transition-colors">
                            <div className="flex items-center gap-3 mb-2 text-[#BAA639]">
                                <Mail size={18} />
                                <span className="text-sm font-bold uppercase tracking-wider">Email Address</span>
                            </div>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={editForm.email}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/30 text-white text-lg px-0 py-1 focus:outline-none focus:border-[#BAA639]"
                                />
                            ) : (
                                <p className="text-white/90 text-lg">{user.email}</p>
                            )}
                        </div>

                        {/* Account Type Section (Dynamic) */}
                        <div className={`bg-black/40 p-4 rounded-xl border border-white/5 transition-colors relative overflow-hidden group`}>
                            <div className={`absolute inset-0 opacity-10 ${tier.bg}`}></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-2" style={{ color: tier.color }}>
                                    <Shield size={18} />
                                    <span className="text-sm font-bold uppercase tracking-wider">Account Type</span>
                                </div>
                                <p className="text-2xl font-bold" style={{ color: tier.color, textShadow: `0 0 10px ${tier.color}40` }}>
                                    {tier.name} Club
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className="bg-black/40 p-6 rounded-xl border border-white/5 hover:border-[#BAA639]/50 transition-colors mb-8">
                        <div className="flex items-center gap-3 mb-3 text-[#BAA639]">
                            <User size={18} />
                            <span className="text-sm font-bold uppercase tracking-wider">Trainer Bio</span>
                        </div>
                        {isEditing ? (
                            <textarea
                                name="bio"
                                value={editForm.bio}
                                onChange={handleChange}
                                rows={3}
                                className="w-full bg-transparent border border-white/20 rounded-lg text-white/90 p-3 focus:outline-none focus:border-[#BAA639] resize-none"
                            />
                        ) : (
                            <p className="text-white/80 leading-relaxed italic">"{user.bio}"</p>
                        )}
                    </div>

                    {/* Save Button Action */}
                    {isEditing && (
                        <div className="flex justify-end mb-8 animate-pop-up">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 bg-[#50C878] hover:bg-[#40a060] text-black font-bold py-2 px-6 rounded-full transition-all hover:scale-105 shadow-[0_0_15px_rgba(80,200,120,0.4)]"
                            >
                                <Save size={20} /> Save Changes
                            </button>
                        </div>
                    )}

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-[#BAA639]/10 rounded-xl border border-[#BAA639]/20">
                            <div className="text-2xl font-bold text-white mb-1">{user.stats.chats}</div>
                            <div className="text-xs text-[#BAA639] uppercase tracking-wider">Chats</div>
                        </div>
                        <div className="text-center p-4 bg-[#BAA639]/10 rounded-xl border border-[#BAA639]/20">
                            <div className="text-2xl font-bold text-white mb-1">{user.stats.favorites}</div>
                            <div className="text-xs text-[#BAA639] uppercase tracking-wider">Saved</div>
                        </div>
                        <div className={`text-center p-4 rounded-xl border ${tier.border} ${tier.bg} relative overflow-hidden transition-colors duration-500`}>
                            <div className="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-1">
                                {user.stats.streak} <Zap size={16} style={{ fill: tier.color, color: tier.color }} />
                            </div>
                            <div className="text-xs uppercase tracking-wider font-bold" style={{ color: tier.color }}>Day Streak</div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ProfilePage;

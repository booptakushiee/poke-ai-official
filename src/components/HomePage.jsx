import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Palette } from 'lucide-react';

const THEMES = [
    {
        name: "Detective Pikachu",
        bg: "/sprite.gif",
        navColor: "#BAA639",
        navBorder: "#8a7a20",
        strokeColor: "#BAA639",
        btnGradient: "linear-gradient(180deg, #d4c24a 0%, #BAA639 40%, #9a8a2a 100%)",
        accent: "#851818"
    },
    {
        name: "Sprite",
        bg: "/sprite2.gif",
        navColor: "#2E8B57",
        navBorder: "#006400",
        strokeColor: "#90EE90",
        btnGradient: "linear-gradient(180deg, #90EE90 0%, #3CB371 40%, #2E8B57 100%)",
        accent: "#F0FFF0"
    },
    {
        name: "Riding",
        bg: "/pik.gif",
        navColor: "#a4b415ff",
        navBorder: "#0b5986ff",
        strokeColor: "#7e8010ff",
        btnGradient: "linear-gradient(180deg, #0b5986ff 0%, #788f15ff 40%, #0b5986ff 100%)",
        accent: "#E6E6FA"
    },
    {
        name: "Bike",
        bg: "/bike2.gif",
        navColor: "#13a099ff",
        navBorder: "#0f5658ff",
        strokeColor: "#38a3a3ff",
        btnGradient: "linear-gradient(180deg, #1fb864ff 0%, #189452ff 40%, #145a31ff 100%)",
        accent: "#F0FFF0"
    },
    {
        name: "Gengar",
        bg: "/geng.gif",
        navColor: "#4B0082",
        navBorder: "#2E004F",
        strokeColor: "#9370DB",
        btnGradient: "linear-gradient(180deg, #9370DB 0%, #8A2BE2 40%, #4B0082 100%)",
        accent: "#E6E6FA"
    },
    {
        name: "Park",
        bg: "/park.gif",
        navColor: "#8B4513",
        navBorder: "#5C3317",
        strokeColor: "#DEB887",
        btnGradient: "linear-gradient(180deg, #DEB887 0%, #CD853F 40%, #8B4513 100%)",
        accent: "#FFF8DC"
    },
    {
        name: "Infinite",
        bg: "/infi.gif",
        navColor: "#000080",
        navBorder: "#000040",
        strokeColor: "#1E90FF",
        btnGradient: "linear-gradient(180deg, #87CEFA 0%, #1E90FF 40%, #000080 100%)",
        accent: "#F0F8FF"
    },
    {
        name: "Pop",
        bg: "/emes.gif",
        navColor: "#0aa874ff",
        navBorder: "#057179ff",
        strokeColor: "#30995fff",
        btnGradient: "linear-gradient(180deg, #27b970ff 0%, #29be99ff 40%, #29c04aff 100%)",
        accent: "#FFF0F5"
    },
    {
        name: "Night",
        bg: "/nightbro.gif",
        navColor: "#191970",
        navBorder: "#000033",
        strokeColor: "#483D8B",
        btnGradient: "linear-gradient(180deg, #7B68EE 0%, #483D8B 40%, #191970 100%)",
        accent: "#E6E6FA"
    },
    {
        name: "Riding",
        bg: "/riding.gif",
        navColor: "#1179dbff",
        navBorder: "#13389eff",
        strokeColor: "#0f2c8dff",
        btnGradient: "linear-gradient(180deg, #13389eff 0%, #1179dbff 40%, #173f97ff 100%)",
        accent: "#E6E6FA"
    },
    {
        name: "Pop",
        bg: "/pop.gif",
        navColor: "#FF1493",
        navBorder: "#C71585",
        strokeColor: "#FF69B4",
        btnGradient: "linear-gradient(180deg, #FF69B4 0%, #FF1493 40%, #C71585 100%)",
        accent: "#FFF0F5"
    }

];

const HomePage = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

    const [showRunningPikachu, setShowRunningPikachu] = useState(false);

    const theme = THEMES[currentThemeIndex];

    useEffect(() => {
        const interval = setInterval(() => {
            setShowRunningPikachu(true);
            // reset after animation ends (8s)
            setTimeout(() => {
                setShowRunningPikachu(false);
            }, 8500);
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    const cycleTheme = () => {
        setCurrentThemeIndex((prev) => (prev + 1) % THEMES.length);
    };

    return (
        <div className="home-page" style={{ "--theme-accent": theme.accent, "--theme-stroke": theme.strokeColor }}>
            {/* Background Image */}
            <div className={`home-bg key-${theme.name}`}>
                <img src={theme.bg} alt={theme.name} />
                <div className="home-bg-overlay" />
            </div>

            {/* Navbar */}
            <nav className="home-navbar" style={{ background: theme.navColor, borderColor: theme.navBorder }}>
                <div className="home-nav-links">
                    <Link to="/" className="home-nav-link" style={{ color: theme.accent }}>Home</Link>
                    <Link to="/collection" className="home-nav-link" style={{ color: theme.accent }}>Collection</Link>
                    <Link to="/chat" className="home-nav-link" style={{ color: theme.accent }}>Chats</Link>
                    <Link to="/profile" className="home-nav-link" style={{ color: theme.accent }}>Profile</Link>
                </div>
                <button
                    className="home-hamburger"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    style={{ borderColor: theme.accent, background: theme.navBorder }}
                >
                    {showMobileMenu ? '✕' : '☰'}
                </button>
            </nav>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="home-mobile-menu" style={{ background: theme.navColor, borderColor: theme.navBorder }}>
                    <Link to="/" onClick={() => setShowMobileMenu(false)} style={{ color: theme.accent }}>Home</Link>
                    <Link to="/collection" onClick={() => setShowMobileMenu(false)} style={{ color: theme.accent }}>Collection</Link>
                    <Link to="/chat" onClick={() => setShowMobileMenu(false)} style={{ color: theme.accent }}>Chats</Link>
                    <Link to="/profile" onClick={() => setShowMobileMenu(false)} style={{ color: theme.accent }}>Profile</Link>
                </div>
            )}

            {/* Hero Content */}
            <div className="home-hero">
                <h1 className="home-title poke-title-stroke animate-pop-up" style={{ WebkitTextStrokeColor: theme.strokeColor }}>
                    Pika?
                </h1>
                <p className="home-subtitle animate-pop-up" style={{ animationDelay: "0.2s", color: theme.strokeColor }}>
                    Welcome to PokeAI!
                </p>

                <div className="home-cta-group animate-pop-up" style={{ animationDelay: "0.4s" }}>
                    <Link
                        to="/chat"
                        className="home-cta-btn"
                        style={{ background: theme.btnGradient, borderColor: theme.navBorder, color: "#fff" }}
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/chat"
                        className="home-cta-btn"
                        style={{ background: theme.btnGradient, borderColor: theme.navBorder, color: "#fff" }}
                    >
                        Sign in
                    </Link>
                </div>
            </div>

            {/* Customize Button */}
            {!showMobileMenu && (
                <button
                    onClick={cycleTheme}
                    className="absolute top-[80px] md:top-18 right-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full border-2 bg-black/50 backdrop-blur-md hover:scale-105 transition-transform cursor-pointer group"
                    style={{ borderColor: theme.strokeColor }}
                >
                    <Palette size={20} color={theme.strokeColor} className="group-hover:rotate-12 transition-transform" />
                    <span className="font-bold text-sm tracking-widest uppercase" style={{ color: theme.strokeColor }}>
                        Customize Theme
                    </span>
                </button>
            )}

            {/* Running Pikachu */}
            {showRunningPikachu && (
                <div className="fixed bottom-4 left-0 z-50 pointer-events-none animate-pikachu-run">
                    <img src="/run.gif" alt="Running Pikachu" className="w-40 h-40 object-contain" />
                </div>
            )}

            {/* Footer */}
            <div className="home-footer">
                <p className="home-footer-text">Needy of company?</p>
                <p className="home-footer-text">Visit:</p>
                <div className="home-footer-brand">
                    <img src="/pokeball-icon.png" alt="Pokeball" className="home-footer-icon" />
                    <span className="home-footer-logo">PokeAI.com</span>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

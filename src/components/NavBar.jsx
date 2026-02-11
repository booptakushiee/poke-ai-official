import { useState } from 'react';

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#collection">Collection</a>
        <a href="#chats">Chats</a>
        <a href="#profile">Profile</a>
      </div>
      <div className="menu-icon" onClick={toggleMobileMenu}>
        ☰
      </div>
      {showMobileMenu && (
        <div className="mobile-nav">
          <a href="#home" onClick={() => setShowMobileMenu(false)}>Home</a>
          <a href="#collection" onClick={() => setShowMobileMenu(false)}>Collection</a>
          <a href="#chats" onClick={() => setShowMobileMenu(false)}>Chats</a>
          <a href="#profile" onClick={() => setShowMobileMenu(false)}>Profile</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

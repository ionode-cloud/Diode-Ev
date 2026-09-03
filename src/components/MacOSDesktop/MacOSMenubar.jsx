import { useState, useEffect } from 'react';

export default function MacOSMenubar({
  openMenu,
  onToggleMenu,
  onCloseMenus,
  onCloseOs,
  onOpenWin,
  onShowOnlyWin,
  onCycleWallpaper,
  onSetWallpaper,
}) {
  const [dateTimeStr, setDateTimeStr] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const datePart = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setDateTimeStr(`${datePart}  ${h}:${m}`);
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = (cb) => {
    onCloseMenus();
    cb();
  };

  return (
    <div className="os-menubar" onClick={(e) => e.stopPropagation()}>
      <div className="os-mb-left">
        {/* Apple Menu */}
        <div className={`os-mb-menu${openMenu === 'apple' ? ' open' : ''}`}>
          <button className="os-mb-menu-btn bold" onClick={() => onToggleMenu('apple')}>
            
          </button>
          <div className="os-mb-dropdown">
            <div className="os-mb-dd-item" onClick={() => handleAction(() => onShowOnlyWin('win-section-about'))}>
              <span className="dd-icon">ℹ️</span>
              <span>About Robogenesis (A.R.I.A Head)</span>
            </div>
            <div className="os-mb-dd-item" onClick={() => handleAction(() => onShowOnlyWin('win-section-home'))}>
              <span className="dd-icon">🏠</span>
              <span>Home Section (Kinetic Hand)</span>
            </div>
            <div className="os-mb-dd-item" onClick={() => handleAction(() => onOpenWin('win-console'))}>
              <span className="dd-icon">💻</span>
              <span>Developer Code Console</span>
            </div>
            <div className="os-mb-dd-sep" />
            <div className="os-mb-dd-item" onClick={() => handleAction(onCycleWallpaper)}>
              <span className="dd-icon">🖼️</span>
              <span>Cycle Wallpaper</span>
            </div>
          </div>
        </div>

        <span style={{ fontWeight: 700, padding: '0 6px' }}>Robogenesis OS</span>

        {/* Direct Section Navigation Buttons */}
        <button
          className="os-mb-menu-btn"
          onClick={() => handleAction(() => onShowOnlyWin('win-section-home'))}
          title="Home Section (with Hand)"
        >
          Home
        </button>

        <button
          className="os-mb-menu-btn"
          onClick={() => handleAction(() => onShowOnlyWin('win-section-about'))}
          title="About Section (with Head)"
        >
          About
        </button>

        <button
          className="os-mb-menu-btn"
          onClick={() => handleAction(() => onShowOnlyWin('win-section-domains'))}
          title="Domains Section (with Brain)"
        >
          Domains
        </button>

        <button
          className="os-mb-menu-btn"
          onClick={() => handleAction(() => onShowOnlyWin('win-section-products'))}
          title="Products Section (with Coin)"
        >
          Products
        </button>

        <button
          className="os-mb-menu-btn"
          onClick={() => handleAction(() => onShowOnlyWin('win-section-contact'))}
          title="Contact Section (with Earth)"
        >
          Contact
        </button>

        <button
          className="os-mb-menu-btn"
          onClick={() => handleAction(() => onOpenWin('win-console'))}
          title="Open Developer Console"
        >
          Console
        </button>

        {/* Help Menu */}
        <div className={`os-mb-menu${openMenu === 'help' ? ' open' : ''}`}>
          <button className="os-mb-menu-btn" onClick={() => onToggleMenu('help')}>
            Help
          </button>
          <div className="os-mb-dropdown">
            <div className="os-mb-dd-item" onClick={() => handleAction(() => onSetWallpaper(0))}>
              <span>Default Wallpaper</span>
            </div>
            <div className="os-mb-dd-item" onClick={() => handleAction(onCycleWallpaper)}>
              <span>Next Wallpaper</span>
            </div>
          </div>
        </div>
      </div>

      <div className="os-mb-right">
        {/* Date and Time */}
        <span className="os-mb-clock" title="Date & Time">{dateTimeStr}</span>

        {/* Close OS Mode Pill Button */}
        <button className="os-mb-landing-btn" onClick={onCloseOs} title="Return to Landing Page">
          Click To landing Page ↗
        </button>
      </div>
    </div>
  );
}

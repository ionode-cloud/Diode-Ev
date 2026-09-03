import {
  HomeIcon,
  AboutIcon,
  TerminalIcon,
  DomainsIcon,
  MessagesIcon,
  PhotosIcon,
  ProductsIcon,
} from './MacIcons.jsx';

export default function MacOSDock({
  openWindows,
  onOpenWin,
  onCycleWallpaper,
}) {
  return (
    <div className="os-dock">
      {/* 1. Home (with Hand embedded inside) */}
      <div
        className={`os-dock-icon${openWindows.has('win-section-home') ? ' active' : ''}`}
        onClick={() => onOpenWin('win-section-home')}
        title="Home (Kinetic Hand)"
      >
        <HomeIcon />
        <span className="os-dock-tooltip">Home</span>
      </div>

      {/* 2. About (with A.R.I.A Head embedded inside) */}
      <div
        className={`os-dock-icon${openWindows.has('win-section-about') ? ' active' : ''}`}
        onClick={() => onOpenWin('win-section-about')}
        title="About (A.R.I.A Head)"
      >
        <AboutIcon />
        <span className="os-dock-tooltip">About</span>
      </div>

      {/* 3. Domains (with Neural Brain embedded inside) */}
      <div
        className={`os-dock-icon${openWindows.has('win-section-domains') ? ' active' : ''}`}
        onClick={() => onOpenWin('win-section-domains')}
        title="Domains (Neural Brain)"
      >
        <DomainsIcon />
        <span className="os-dock-tooltip">Domains</span>
      </div>

      {/* 4. Products (with VaultShield Coin embedded inside) */}
      <div
        className={`os-dock-icon${openWindows.has('win-section-products') ? ' active' : ''}`}
        onClick={() => onOpenWin('win-section-products')}
        title="Products (VaultShield Token)"
      >
        <ProductsIcon />
        <span className="os-dock-tooltip">Products</span>
      </div>

      {/* 5. Contact (with Earth Telemetry embedded inside) */}
      <div
        className={`os-dock-icon${openWindows.has('win-section-contact') ? ' active' : ''}`}
        onClick={() => onOpenWin('win-section-contact')}
        title="Contact (Earth Telemetry)"
      >
        <MessagesIcon />
        <span className="os-dock-tooltip">Contact</span>
      </div>

      {/* 6. Console (Developer Terminal) */}
      <div
        className={`os-dock-icon${openWindows.has('win-console') ? ' active' : ''}`}
        onClick={() => onOpenWin('win-console')}
        title="Console (Code Runner)"
      >
        <TerminalIcon />
        <span className="os-dock-tooltip">Console</span>
      </div>

      {/* 7. Wallpaper Gallery */}
      <div
        className="os-dock-icon"
        onClick={onCycleWallpaper}
        title="Change Wallpaper"
      >
        <PhotosIcon />
        <span className="os-dock-tooltip">Wallpaper</span>
      </div>
    </div>
  );
}

import { useEffect } from 'react';
import { useOsWindowManager } from '../../hooks/useOsWindowManager.js';
import MacOSMenubar from './MacOSMenubar.jsx';
import MacOSDock from './MacOSDock.jsx';
import WallpaperLayer from './WallpaperLayer.jsx';

import WinSectionHome from './windows/WinSectionHome.jsx';
import WinSectionAbout from './windows/WinSectionAbout.jsx';
import WinSectionDomains from './windows/WinSectionDomains.jsx';
import WinSectionProducts from './windows/WinSectionProducts.jsx';
import WinSectionContact from './windows/WinSectionContact.jsx';
import WinConsole from './windows/WinConsole.jsx';

export default function MacOSDesktop({ isOpen, onClose }) {
  const {
    openWindows,
    zIndexMap,
    focusedWindow,
    wallpaper,
    openMenu,
    openWin,
    showOnlyWin,
    closeWin,
    focusWin,
    cycleWallpaper,
    setWallpaper,
    toggleMenu,
    closeAllMenus,
  } = useOsWindowManager();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      closeAllMenus();
    }
  }, [isOpen, closeAllMenus]);

  if (!isOpen) return null;

  return (
    <div
      id="macos-overlay"
      className="active"
      onClick={closeAllMenus}
    >
      <WallpaperLayer wallpaper={wallpaper} />

      <MacOSMenubar
        openMenu={openMenu}
        onToggleMenu={toggleMenu}
        onCloseMenus={closeAllMenus}
        onCloseOs={onClose}
        onOpenWin={openWin}
        onShowOnlyWin={showOnlyWin}
        onCycleWallpaper={cycleWallpaper}
        onSetWallpaper={setWallpaper}
      />

      {/* Desktop Shortcuts Column (Left side, authentic macOS style) */}
      <div className="os-desktop-shortcuts">
        {[
          { id: 'win-section-home', title: 'Home', subtitle: 'Hand 42-DOF', icon: '🏠' },
          { id: 'win-section-about', title: 'About', subtitle: 'A.R.I.A Head', icon: 'ℹ️' },
          { id: 'win-section-domains', title: 'Domains', subtitle: 'Neural Brain', icon: '🔬' },
          { id: 'win-section-products', title: 'Products', subtitle: 'Crypto Coin', icon: '📦' },
          { id: 'win-section-contact', title: 'Contact', subtitle: 'Earth Orbit', icon: '💬' },
          { id: 'win-console', title: 'Console', subtitle: 'Code Runner', icon: '💻' },
        ].map((item) => (
          <div
            key={item.id}
            className="os-desktop-icon"
            onClick={() => openWin(item.id)}
          >
            <div className="os-di-symbol">{item.icon}</div>
            <div className="os-di-label">
              <span className="os-di-title">{item.title}</span>
              <span className="os-di-sub">{item.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Windows — Each section window embeds its 3D visualizer inside! */}
      {/* 1. Home (contains 42-DOF Kinetic Hand inside) */}
      <WinSectionHome
        isOpen={openWindows.has('win-section-home')}
        isFocused={focusedWindow === 'win-section-home'}
        zIndex={zIndexMap['win-section-home']}
        onClose={() => closeWin('win-section-home')}
        onMin={() => closeWin('win-section-home')}
        onFocus={() => focusWin('win-section-home')}
        onOpenWin={openWin}
      />

      {/* 2. About (contains A.R.I.A Head 3D inside) */}
      <WinSectionAbout
        isOpen={openWindows.has('win-section-about')}
        isFocused={focusedWindow === 'win-section-about'}
        zIndex={zIndexMap['win-section-about']}
        onClose={() => closeWin('win-section-about')}
        onMin={() => closeWin('win-section-about')}
        onFocus={() => focusWin('win-section-about')}
        onCloseOs={onClose}
        onOpenWin={openWin}
      />

      {/* 3. Domains (contains Neural Brain Mesh inside) */}
      <WinSectionDomains
        isOpen={openWindows.has('win-section-domains')}
        isFocused={focusedWindow === 'win-section-domains'}
        zIndex={zIndexMap['win-section-domains']}
        onClose={() => closeWin('win-section-domains')}
        onMin={() => closeWin('win-section-domains')}
        onFocus={() => focusWin('win-section-domains')}
        onOpenWin={openWin}
      />

      {/* 4. Products (contains VaultShield Coin Token inside) */}
      <WinSectionProducts
        isOpen={openWindows.has('win-section-products')}
        isFocused={focusedWindow === 'win-section-products'}
        zIndex={zIndexMap['win-section-products']}
        onClose={() => closeWin('win-section-products')}
        onMin={() => closeWin('win-section-products')}
        onFocus={() => focusWin('win-section-products')}
        onOpenWin={openWin}
      />

      {/* 5. Contact (contains Planet Earth Orbit Telemetry inside) */}
      <WinSectionContact
        isOpen={openWindows.has('win-section-contact')}
        isFocused={focusedWindow === 'win-section-contact'}
        zIndex={zIndexMap['win-section-contact']}
        onClose={() => closeWin('win-section-contact')}
        onMin={() => closeWin('win-section-contact')}
        onFocus={() => focusWin('win-section-contact')}
        onCloseOs={onClose}
      />

      {/* 6. Console (Developer Multi-Language Code Runner) */}
      <WinConsole
        isOpen={openWindows.has('win-console')}
        isFocused={focusedWindow === 'win-console'}
        zIndex={zIndexMap['win-console']}
        onClose={() => closeWin('win-console')}
        onMin={() => closeWin('win-console')}
        onFocus={() => focusWin('win-console')}
        onOpenWin={openWin}
      />

      <MacOSDock
        openWindows={openWindows}
        onOpenWin={openWin}
        onCycleWallpaper={cycleWallpaper}
      />
    </div>
  );
}

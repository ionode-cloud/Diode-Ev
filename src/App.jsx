import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import FooterSection from './components/sections/FooterSection.jsx';
import MacOSDesktop from './components/MacOSDesktop/MacOSDesktop.jsx';

import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import DomainsPage from './pages/DomainsPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

const VALID_PAGES = ['home', 'about', 'domains', 'products', 'contact'];

function getPageFromHash() {
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  if (VALID_PAGES.includes(hash)) {
    return hash;
  }
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash);
  const [scrolled, setScrolled] = useState(false);
  const [osMode, setOsMode] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sync with browser hash history
  useEffect(() => {
    const onHashChange = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Track scroll position for navbar glass styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = useCallback((page) => {
    if (!VALID_PAGES.includes(page)) return;
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        scrolled={scrolled}
        onOpenOs={() => setOsMode(true)}
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen((prev) => !prev)}
      />

      <main className="main-viewport">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenOs={() => setOsMode(true)}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage
            onNavigate={navigateTo}
            onOpenOs={() => setOsMode(true)}
          />
        )}
        {currentPage === 'domains' && (
          <DomainsPage
            onNavigate={navigateTo}
          />
        )}
        {currentPage === 'products' && (
          <ProductsPage
            onNavigate={navigateTo}
          />
        )}
        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={navigateTo}
          />
        )}
      </main>

      <FooterSection
        onNavigate={navigateTo}
        onOpenOs={() => setOsMode(true)}
      />

      <MacOSDesktop
        isOpen={osMode}
        onClose={() => setOsMode(false)}
      />
    </>
  );
}

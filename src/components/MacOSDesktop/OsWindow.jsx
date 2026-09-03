import { useState, useRef, useEffect } from 'react';

export default function OsWindow({
  id,
  title,
  isOpen,
  isFocused,
  zIndex,
  initialWidth = 680,
  initialHeight = 480,
  initialTop = 70,
  initialLeft = 120,
  onClose,
  onMin,
  onFocus,
  bodyStyle = {},
  children,
}) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [pos, setPos] = useState({ top: initialTop, left: initialLeft });
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [isMax, setIsMax] = useState(false);
  const prevGeoRef = useRef({
    pos: { top: initialTop, left: initialLeft },
    size: { width: initialWidth, height: initialHeight },
  });
  const winRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        // Clamp existing pos and size to viewport
        setPos((prev) => ({
          top: Math.max(42, Math.min(prev.top, window.innerHeight - 150)),
          left: Math.max(0, Math.min(prev.left, window.innerWidth - 200)),
        }));
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseDownTitle = (e) => {
    if (e.target.closest('.os-win-btn')) return;
    onFocus();
    if (isMax || isMobile) return;

    const startX = e.clientX - pos.left;
    const startY = e.clientY - pos.top;

    const onMouseMove = (moveEvent) => {
      const maxX = Math.max(0, window.innerWidth - (typeof size.width === 'number' ? size.width : 400));
      const maxY = Math.max(30, window.innerHeight - (typeof size.height === 'number' ? size.height : 300));
      const nx = Math.max(0, Math.min(maxX, moveEvent.clientX - startX));
      const ny = Math.max(30, Math.min(maxY, moveEvent.clientY - startY));
      setPos({ top: ny, left: nx });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    e.preventDefault();
  };

  const handleMouseDownResize = (e) => {
    e.stopPropagation();
    onFocus();
    if (isMax || isMobile) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const currentW = typeof size.width === 'number' ? size.width : (winRef.current?.offsetWidth || 600);
    const currentH = typeof size.height === 'number' ? size.height : (winRef.current?.offsetHeight || 400);

    const onMouseMove = (moveEvent) => {
      const maxW = window.innerWidth - pos.left - 10;
      const maxH = window.innerHeight - pos.top - 60;
      const newW = Math.min(maxW, Math.max(300, currentW + (moveEvent.clientX - startX)));
      const newH = Math.min(maxH, Math.max(200, currentH + (moveEvent.clientY - startY)));
      setSize({ width: newW, height: newH });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    e.preventDefault();
  };

  const toggleMaximize = () => {
    onFocus();
    if (isMobile) return;
    if (!isMax) {
      prevGeoRef.current = { pos, size };
      setIsMax(true);
    } else {
      setPos(prevGeoRef.current.pos);
      setSize(prevGeoRef.current.size);
      setIsMax(false);
    }
  };

  if (!isOpen) return null;

  let style;
  if (isMobile) {
    // Mobile full-width adaptive window
    style = {
      top: '46px',
      left: '8px',
      width: 'calc(100vw - 16px)',
      height: 'calc(100vh - 46px - 68px)',
      maxWidth: '100vw',
      zIndex: zIndex || 100,
      borderRadius: '12px',
    };
  } else if (isMax) {
    // Desktop Maximized
    style = {
      top: '42px',
      left: 0,
      width: '100vw',
      height: 'calc(100vh - 42px)',
      zIndex: zIndex || 200,
      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    };
  } else {
    // Desktop Movable/Resizable
    const clampedWidth = Math.min(
      typeof size.width === 'number' ? size.width : initialWidth,
      window.innerWidth - 30
    );
    const clampedHeight = Math.min(
      typeof size.height === 'number' ? size.height : initialHeight,
      window.innerHeight - 80
    );
    style = {
      top: `${pos.top}px`,
      left: `${pos.left}px`,
      width: `${clampedWidth}px`,
      height: `${clampedHeight}px`,
      zIndex: zIndex || 100,
    };
  }

  return (
    <div
      ref={winRef}
      id={id}
      className={`os-win open${isFocused ? ' focused' : ''}`}
      style={style}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
    >
      <div className="os-win-titlebar" onMouseDown={handleMouseDownTitle}>
        <div className="os-win-btn os-wb-close" onClick={onClose} title="Close">
          <svg viewBox="0 0 12 12" className="os-wb-icon" fill="none">
            <path d="M3.5 3.5L8.5 8.5M8.5 3.5L3.5 8.5" stroke="#4d0000" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="os-win-btn os-wb-min" onClick={onMin} title="Minimize">
          <svg viewBox="0 0 12 12" className="os-wb-icon" fill="none">
            <path d="M2.5 6H9.5" stroke="#663e00" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>
        <div
          className="os-win-btn os-wb-max"
          onClick={toggleMaximize}
          title={isMax ? 'Restore' : 'Zoom'}
          style={isMobile ? { opacity: 0.5, cursor: 'default' } : {}}
        >
          <svg viewBox="0 0 12 12" className="os-wb-icon" fill="none">
            <path
              d="M3.5 8.5L8.5 3.5M8.5 6.5V3.5H5.5M3.5 5.5V8.5H6.5"
              stroke="#004d11"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="os-win-title">{title}</div>
      </div>
      <div className="os-win-body" style={bodyStyle}>
        {children}
      </div>
      {!isMax && !isMobile && (
        <div className="os-win-resize" onMouseDown={handleMouseDownResize} />
      )}
    </div>
  );
}

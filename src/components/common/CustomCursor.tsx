import { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    // Only use custom cursor on larger screens
    if (window.innerWidth < 768) return;
    
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleLinkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.classList.contains('cursor-pointer');
      
      setLinkHovered(isLink);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };
    
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousemove', handleLinkHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousemove', handleLinkHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const cursorClasses = `custom-cursor ${linkHovered ? 'hover' : ''} ${clicked ? 'scale-75' : ''} ${hidden ? 'opacity-0' : 'opacity-100'}`;

  return (
    <div 
      className={cursorClasses}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {linkHovered && (
        <span className="text-[8px] text-white font-medium">VIEW</span>
      )}
    </div>
  );
};

export default CustomCursor;
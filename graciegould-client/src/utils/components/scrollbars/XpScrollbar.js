import { forwardRef, useEffect, useRef, useState } from "react";
import { getComputedHeight } from "../../elements/units"; // Assuming this utility is correct and returns element height.

const XpScrollbar = forwardRef(({ children, className = null }, ref) => {
  const [scrolling, setScrolling] = useState(false);
  const [scrollbarHeight, setScrollbarHeight] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [scrollRatio, setScrollRatio] = useState(1);

  const bodyRef = useRef(null);
  const parentRef = useRef(null);
  const containerRef = useRef(null);
  const scrollbarRef = useRef(null);
  const scrollbarThumbRef = useRef(null);
  const scrollContainer = useRef(null);
  const initialMousePosition = useRef({ x: 0, y: 0 });
  const initialThumbPosition = useRef(0);

  useEffect(() => {
    const updateSizes = () => {
      // Ensure scrollContainer.current and other refs are not null
      if (!scrollContainer.current || !scrollbarRef.current || !bodyRef.current) return;

      const containerHeight = getComputedHeight(scrollContainer.current);
      const contentHeight = getComputedHeight(bodyRef.current);

      const scrollbarHeight = getComputedHeight(scrollbarRef.current);
      const thumbHeight = Math.max((containerHeight / contentHeight) * scrollbarHeight, 30); // Minimum thumb height of 30px

      setScrollbarHeight(scrollbarHeight);
      setThumbHeight(thumbHeight);
      setScrollRatio((contentHeight - containerHeight) / (scrollbarHeight - thumbHeight));
    };

    updateSizes();

    window.addEventListener("resize", updateSizes);

    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  const handleMouseDownThumb = (e) => {
    e.preventDefault();
    initialMousePosition.current = e.clientY;
    initialThumbPosition.current = scrollbarThumbRef.current.offsetTop;
    setScrolling(true);

    // document.addEventListener("mousemove", startScrolling);
    // document.addEventListener("mouseup", stopScrolling);
  };

  
  useEffect(() => {
    const startScrolling = (e) => {
      if (!scrolling || !scrollContainer.current) return;
  
      const deltaY = e.clientY - initialMousePosition.current;
      let newThumbPosition = initialThumbPosition.current + deltaY;
  
      // Ensure the thumb stays within the scrollbar bounds (in percentage)
      const maxThumbPosition = scrollbarHeight - thumbHeight;
      newThumbPosition = Math.max(0, Math.min(newThumbPosition, maxThumbPosition));
  
      // Convert the thumb position to a percentage
      const thumbPositionPercentage = (newThumbPosition / maxThumbPosition) * 100;
  
      // Scroll the content based on the thumb's position as a percentage of the scrollable content
      const maxScrollTop = scrollContainer.current.scrollHeight - scrollContainer.current.clientHeight;
      scrollContainer.current.scrollTop = (thumbPositionPercentage / 100) * maxScrollTop;
  
      // Update the thumb's position
      scrollbarThumbRef.current.style.top = `${thumbPositionPercentage}%`;
    };
  
    const stopScrolling = () => {
      setScrolling(false);
      document.removeEventListener("mousemove", startScrolling);
      document.removeEventListener("mouseup", stopScrolling);
    };
  
    document.addEventListener("mousemove", startScrolling);
    document.addEventListener("mouseup", stopScrolling);
  
    return () => {
      document.removeEventListener("mousemove", startScrolling);
      document.removeEventListener("mouseup", stopScrolling);
    };
  }, [scrolling, scrollbarHeight, thumbHeight, scrollRatio]);
  const scrollbarThumbStyle = {
    position: "absolute",
    top: scrollContainer.current ? `${scrollContainer.current.scrollTop / scrollRatio}px` : '0px',
    height: `${thumbHeight}px`,
  };

  return (
    <div className={className} ref={parentRef}>
      <div className="xp-vertical-scrollbar-container" ref={containerRef}>
        <div className="xp-scrollbar-body-overlay" ref={scrollContainer}>
          <div className="xp-scrollbar-body" ref={bodyRef}>
            {children}
          </div>
        </div>
        <div className="xp-scrollbar-slot">
          <div className="xp-scrollbar" ref={scrollbarRef}>
            <div
              className="xp-scrollbar-thumb"
              ref={scrollbarThumbRef}
              style={scrollbarThumbStyle}
              onMouseDown={handleMouseDownThumb}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default XpScrollbar;

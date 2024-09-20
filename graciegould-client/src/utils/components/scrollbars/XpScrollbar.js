import { forwardRef, useEffect, useRef, useState } from "react";
const XpScrollbar = forwardRef(
  (
    {
      children,
      className = null,
      thumbColor = "#e4e3e3",
      scrollbarColor = "#f1f1f1",
    },
    ref
  ) => {
    const [customScrolling, setCustomScrolling] = useState(false);
    const [thumbHeight, setThumbHeight] = useState(0);
    const containerRef = useRef(null);
    const scrollbarRef = useRef(null);
    const scrollbarThumbRef = useRef(null);
    const scrollContainer = useRef(null);
    const initialMousePosition = useRef({ x: 0, y: 0 });
    const initialThumbPosition = useRef(0);

    useEffect(() => {
      const updateSizes = () => {
        if (!scrollContainer.current || !scrollbarRef.current) return;
        const containerHeight = scrollContainer.current.clientHeight;
        const contentHeight = scrollContainer.current.scrollHeight;
        const thumbHeightPercentage = Math.max(
          (containerHeight / contentHeight) * 100,
          10
        ); // Min thumb height 10%
        setThumbHeight(thumbHeightPercentage);
      };
      updateSizes();
      window.addEventListener("resize", updateSizes);

      return () => {
        window.removeEventListener("resize", updateSizes);
      };
    }, []);

    useEffect(() => {
      const startScrolling = (e) => {
        if (!scrollContainer.current || !scrollbarThumbRef.current) return;
        const scrollbarHeight = scrollbarRef.current.clientHeight;
        const deltaY = e.clientY - initialMousePosition.current;
        let newThumbPosition = initialThumbPosition.current + deltaY;
        const maxThumbPosition =
          scrollbarHeight - (scrollbarHeight * thumbHeight) / 100;
        newThumbPosition = Math.max(
          0,
          Math.min(newThumbPosition, maxThumbPosition)
        );
        const scrollPercentage = newThumbPosition / maxThumbPosition;
        const maxScrollTop =
          scrollContainer.current.scrollHeight -
          scrollContainer.current.clientHeight;
        scrollContainer.current.scrollTop = scrollPercentage * maxScrollTop;
        scrollbarThumbRef.current.style.top = `${
          (newThumbPosition / scrollbarHeight) * 100
        }%`;
      };

      const stopScrolling = () => {
        setCustomScrolling(false);
        document.removeEventListener("mousemove", startScrolling);
        document.removeEventListener("mouseup", stopScrolling);
      };

      const handleMouseDownThumb = (e) => {
        e.preventDefault();
        initialMousePosition.current = e.clientY;
        initialThumbPosition.current = scrollbarThumbRef.current.offsetTop;
        setCustomScrolling(true);
        document.addEventListener("mousemove", startScrolling);
        document.addEventListener("mouseup", stopScrolling);
      };

      const handleDefaultScroll = (e) => {
        if (customScrolling) return;
        const scrollbarHeight = scrollbarRef.current.clientHeight;
        const scrollTop = scrollContainer.current.scrollTop;
        const maxScrollTop =
          scrollContainer.current.scrollHeight -
          scrollContainer.current.clientHeight;
        const scrollPercentage = scrollTop / maxScrollTop;
        const maxThumbPosition =
          scrollbarHeight - (scrollbarHeight * thumbHeight) / 100;
        const newThumbPosition = scrollPercentage * maxThumbPosition;
        scrollbarThumbRef.current.style.top = `${
          (newThumbPosition / scrollbarHeight) * 100
        }%`;
      };

      scrollbarThumbRef.current.addEventListener(
        "mousedown",
        handleMouseDownThumb
      );
      scrollContainer.current.addEventListener("scroll", handleDefaultScroll);
      return () => {
        scrollbarThumbRef.current.removeEventListener(
          "mousedown",
          handleMouseDownThumb
        );
        document.removeEventListener("mousemove", startScrolling);
        document.removeEventListener("mouseup", stopScrolling);
        scrollContainer.current.removeEventListener(
          "onscroll",
          handleDefaultScroll
        );
      };
    }, [customScrolling, thumbHeight]);

    const scrollbarThumbStyle = {
      position: "absolute",
      height: `${thumbHeight}%`,
      backgroundColor: thumbColor,
    };
    const scrollbarStyle = {
      backgroundColor: scrollbarColor,
    };

    return (
      <div className={className} ref={ref}>
        <div className="xp-vertical-scrollbar-container" ref={containerRef}>
          <div className="xp-scrollbar-body-overlay" ref={scrollContainer}>
            <div className="xp-scrollbar-body">{children}</div>
          </div>
          <div className="xp-scrollbar-slot">
            <div
              className="xp-scrollbar"
              ref={scrollbarRef}
              style={scrollbarStyle}
            >
              <div
                className="xp-scrollbar-thumb"
                ref={scrollbarThumbRef}
                style={scrollbarThumbStyle}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default XpScrollbar;

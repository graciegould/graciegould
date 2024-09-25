import { forwardRef, useEffect, useRef, useState } from "react";
const XpScrollbar = ({
  children,
  vertical = true,
  horizontal = false,
  className = null,
  verticalThumbColor = "#e4e3e3",
  verticalScrollbarColor = "#f1f1f1",
}) => {
  let ScrollbarComponent = null;


  if (vertical && horizontal) {
    console.log("vertical and horizontal", className);
    ScrollbarComponent = XpScrollbarVerticalAndHorizontal;
  }
  else if (vertical) {
    console.log("vertical", className);
    ScrollbarComponent = XpScrollbarVertical;
  }
  else if (horizontal) {
    console.log("horizontal", className);
    ScrollbarComponent = XpScrollbarHorizontal;
  }

  return (
    <ScrollbarComponent
      className={className}
      verticalThumbColor={verticalThumbColor}
      verticalScrollbarColor={verticalScrollbarColor}
    >
      {children}
    </ScrollbarComponent>
  );
}

const XpScrollbarVerticalAndHorizontal = ({
  children,
  className = null,
  verticalThumbColor = "#e4e3e3",
  verticalScrollbarColor = "#f1f1f1",
  horizontalThumbColor = "#e4e3e3",
  horizontalScrollbarColor = "#f1f1f1",
}) => {
  const scrollContainer = useRef(null);
  console.log("vertical and horizontal container", className);
  return (
    <div className={className}>
      <div className="xp-scrollable-container-v-and-h">
        <div
          className="xp-scrollable-v-and-h-body-overlay"
          ref={scrollContainer}
        >
          {children}
        </div>
        <div className="xp-scrollbar-v-and-h-vertical">
          <VerticalScrollbar
            scrollContainer={scrollContainer}
            verticalThumbColor={verticalThumbColor}
            verticalScrollbarColor={verticalScrollbarColor}
          />
        </div>
        <div className="xp-scrollbar-v-and-h-horizontal">
          <HorizontalScrollbar
            scrollContainer={scrollContainer}
            horizontalScrollbarColor={horizontalScrollbarColor}
            horizontalThumbColor={horizontalThumbColor}
          />
        </div>
        <div className="xp-bottom-corner-divider"></div>
      </div>
    </div>
  );
};

function XpScrollbarHorizontal({
  children,
  horizontalThumbColor = "#e4e3e3",
  horizontalScrollbarColor = "#f1f1f1",
}) {
  const scrollContainer = useRef(null);
  return (
    <div className="xp-scrollable-container-horizontal">
      <div
        className="xp-scrollable-horizontal-body-overlay"
        ref={scrollContainer}
      >
        {children}
      </div>
      <div className="xp-scrollbar-container-horizontal">
        <HorizontalScrollbar
          scrollContainer={scrollContainer}
          horizontalScrollbarColor={horizontalScrollbarColor}
          horizontalThumbColor={horizontalThumbColor}
        />
      </div>
    </div>
  );
}
const XpScrollbarVertical = ({
  children,
  className = null,
  verticalThumbColor = "#e4e3e3",
  verticalScrollbarColor = "#f1f1f1",
}) => {
  const scrollContainer = useRef(null);
  return (
    <div className={className}>
      <div className="xp-scrollable-container-vertical">
        <div
          className="xp-scrollable-vertical-body-overlay"
          ref={scrollContainer}
        >
          {children}
        </div>
        <div className="xp-scrollbar-vertical-container">
        <VerticalScrollbar
          scrollContainer={scrollContainer}
          verticalThumbColor={verticalThumbColor}
          verticalScrollbarColor={verticalScrollbarColor}
        />
        </div>
      </div>
    </div>
  );
};

const VerticalScrollbar = ({
  scrollContainer,
  verticalThumbColor = "#e4e3e3",
  verticalScrollbarColor = "#f1f1f1",
}) => {
  const [verticalThumbHeight, setVerticalThumbHeight] = useState(0);
  const verticalScrollbarRef = useRef(null);
  const verticalScrollbarThumbRef = useRef(null);
  const initialMousePosition = useRef({ x: 0, y: 0 });
  const initialThumbPosition = useRef(0);

  useEffect(() => {
    const updateSizes = () => {
      if (!scrollContainer.current || !verticalScrollbarRef.current) return;
      const containerHeight = scrollContainer.current.clientHeight;
      const contentHeight = scrollContainer.current.scrollHeight;
      const thumbHeightPercentage = (containerHeight / contentHeight) * 100;
      setVerticalThumbHeight(thumbHeightPercentage);
    };
    updateSizes();
    window.addEventListener("resize", updateSizes);

    return () => {
      window.removeEventListener("resize", updateSizes);
    };
  }, []);

  useEffect(() => {
    function makeScrollBar(e) {
      let customScrolling = false;
      const startScrolling = (e) => {
        e.stopPropagation();
        if (!scrollContainer.current || !verticalScrollbarThumbRef.current)
          return;
        const scrollbarHeight = verticalScrollbarRef.current.clientHeight;
        const deltaY = e.clientY - initialMousePosition.current;
        let newThumbPosition = initialThumbPosition.current + deltaY;
        const maxThumbPosition =
          scrollbarHeight - (scrollbarHeight * verticalThumbHeight) / 100;
        newThumbPosition = Math.max(
          0,
          Math.min(newThumbPosition, maxThumbPosition)
        );
        const scrollPercentage = newThumbPosition / maxThumbPosition;
        const maxScrollTop =
          scrollContainer.current.scrollHeight -
          scrollContainer.current.clientHeight;
        scrollContainer.current.scrollTop = scrollPercentage * maxScrollTop;
        verticalScrollbarThumbRef.current.style.top = `${(newThumbPosition / scrollbarHeight) * 100
          }%`;
      };

      const stopScrolling = (e) => {
        e.stopPropagation();
        customScrolling = false;
        document.removeEventListener("mousemove", startScrolling);
        document.removeEventListener("mouseup", stopScrolling);
      };

      const handleMouseDownThumb = (e) => {
        e.stopPropagation();
        e.preventDefault();
        initialMousePosition.current = e.clientY;
        initialThumbPosition.current =
          verticalScrollbarThumbRef.current.offsetTop;
        document.addEventListener("mousemove", startScrolling);
        document.addEventListener("mouseup", stopScrolling);
        customScrolling = true;
      };

      const handleDefaultScroll = (e) => {
        if (customScrolling) return;
        const scrollbarHeight = verticalScrollbarRef.current.clientHeight;
        const scrollTop = scrollContainer.current.scrollTop;
        const maxScrollTop =
          scrollContainer.current.scrollHeight -
          scrollContainer.current.clientHeight;
        const scrollPercentage = scrollTop / maxScrollTop;
        const maxThumbPosition =
          scrollbarHeight - (scrollbarHeight * verticalThumbHeight) / 100;
        const newThumbPosition = scrollPercentage * maxThumbPosition;
        verticalScrollbarThumbRef.current.style.top = `${(newThumbPosition / scrollbarHeight) * 100
          }%`;
      };

      verticalScrollbarThumbRef.current.addEventListener(
        "mousedown",
        handleMouseDownThumb
      );
      scrollContainer.current.addEventListener("scroll", handleDefaultScroll);
    }
    makeScrollBar();
  }, [verticalThumbHeight, verticalScrollbarRef, scrollContainer]);

  const verticalScrollbarThumbStyle = {
    position: "absolute",
    height: `${verticalThumbHeight}%`,
    backgroundColor: verticalThumbColor,
  };
  const verticalScrollbarStyle = {
    backgroundColor: verticalScrollbarColor,
  };
  return (
    <div
      className="xp-vertical-scrollbar"
      ref={verticalScrollbarRef}
      style={verticalScrollbarStyle}
    >
      <div
        className="xp-vertical-scrollbar-thumb"
        ref={verticalScrollbarThumbRef}
        style={verticalScrollbarThumbStyle}
      />
    </div>
  );
};
const HorizontalScrollbar = ({
  scrollContainer,
  horizontalThumbColor = "#e4e3e3",
  horizontalScrollbarColor = "#f1f1f1"
}) => {
  const [horizontalThumbWidth, setHorizontalThumbWidth] = useState(0);
  const horizontalScrollbarRef = useRef(null);
  const horizontalScrollbarThumbRef = useRef(null);
  const initialMousePosition = useRef({ x: 0, y: 0 });
  const initialThumbPosition = useRef(0);

  useEffect(() => {
    const updateSizes = () => {
      if (!scrollContainer.current || !horizontalScrollbarRef.current) return;
      const containerWidth = scrollContainer.current.clientWidth;
      const contentWidth = scrollContainer.current.scrollWidth;
      const thumbWidthPercentage = (containerWidth / contentWidth) * 100;
      setHorizontalThumbWidth(thumbWidthPercentage);
    };
    updateSizes();
    window.addEventListener("resize", updateSizes);

    return () => {
      window.removeEventListener("resize", updateSizes);
    };
  }, []);

  useEffect(() => {
    function makeScrollBar() {
      let customScrolling = false;

      const startScrolling = (e) => {
        e.stopPropagation();
        if (!scrollContainer.current || !horizontalScrollbarThumbRef.current)
          return;
        const scrollbarWidth = horizontalScrollbarRef.current.clientWidth;
        const deltaX = e.clientX - initialMousePosition.current.x;
        let newThumbPosition = initialThumbPosition.current + deltaX;
        const maxThumbPosition =
          scrollbarWidth - (scrollbarWidth * horizontalThumbWidth) / 100;
        newThumbPosition = Math.max(
          0,
          Math.min(newThumbPosition, maxThumbPosition)
        );
        const scrollPercentage = newThumbPosition / maxThumbPosition;
        const maxScrollLeft =
          scrollContainer.current.scrollWidth -
          scrollContainer.current.clientWidth;
        scrollContainer.current.scrollLeft = scrollPercentage * maxScrollLeft;
        horizontalScrollbarThumbRef.current.style.left = `${(newThumbPosition / scrollbarWidth) * 100
          }%`;
      };

      const stopScrolling = (e) => {
        e.stopPropagation();
        customScrolling = false;
        document.removeEventListener("mousemove", startScrolling);
        document.removeEventListener("mouseup", stopScrolling);
      };

      const handleMouseDownThumb = (e) => {
        e.stopPropagation();
        e.preventDefault();
        initialMousePosition.current = { x: e.clientX, y: e.clientY };
        initialThumbPosition.current =
          horizontalScrollbarThumbRef.current.offsetLeft;
        document.addEventListener("mousemove", startScrolling);
        document.addEventListener("mouseup", stopScrolling);
        customScrolling = true;
      };

      const handleDefaultScroll = () => {
        if (customScrolling) return;
        const scrollbarWidth = horizontalScrollbarRef.current.clientWidth;
        const scrollLeft = scrollContainer.current.scrollLeft;
        const maxScrollLeft =
          scrollContainer.current.scrollWidth -
          scrollContainer.current.clientWidth;
        const scrollPercentage = scrollLeft / maxScrollLeft;
        const maxThumbPosition =
          scrollbarWidth - (scrollbarWidth * horizontalThumbWidth) / 100;
        const newThumbPosition = scrollPercentage * maxThumbPosition;
        horizontalScrollbarThumbRef.current.style.left = `${(newThumbPosition / scrollbarWidth) * 100
          }%`;
      };

      horizontalScrollbarThumbRef.current.addEventListener(
        "mousedown",
        handleMouseDownThumb
      );
      scrollContainer.current.addEventListener("scroll", handleDefaultScroll);
    }
    makeScrollBar();
  }, [horizontalThumbWidth, horizontalScrollbarRef, scrollContainer]);

  const horizontalScrollbarThumbStyle = {
    position: "absolute",
    width: `${horizontalThumbWidth}%`,
    backgroundColor: horizontalThumbColor,
    height: "100%",
  };
  const horizontalScrollbarStyle = {
    backgroundColor: horizontalScrollbarColor,
    height: "25px",
    width: "100%",
  };

  return (
    <div
      className="xp-horizontal-scrollbar"
      ref={horizontalScrollbarRef}
      style={horizontalScrollbarStyle}
    >
      <div
        className="xp-horizontal-scrollbar-thumb"
        ref={horizontalScrollbarThumbRef}
        style={horizontalScrollbarThumbStyle}
      />
    </div>
  );
};

export default XpScrollbar;

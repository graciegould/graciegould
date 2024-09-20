import React, { useEffect, useState, forwardRef } from "react";
import DragHandler from "../../elements/drag-handler";
const Resizable = forwardRef(
  (
    {
      children,
      initialWidth = 500,
      initialHeight = 500,
      initialLeft = 0,
      initialTop = 0,
      unit = "px",
      onUpdateSize = null,
      dragHandlerRef = null,
      className = null,
    },
    containerRef
  ) => {
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);
    const [left, setLeft] = useState(initialLeft);
    const [top, setTop] = useState(initialTop);

    useEffect(() => {
      function makeResizableDiv(div) {
        const element = containerRef.current;
        const parentElement = element.parentElement;

        const resizers = element.querySelectorAll(".resizer");
        const minSize = 20;
        let originalWidth = 0;
        let originalHeight = 0;
        let originalX = 0;
        let originalY = 0;
        let originalMouseX = 0;
        let originalMouseY = 0;

        for (let i = 0; i < resizers.length; i++) {
          const currentResizer = resizers[i];
          currentResizer.addEventListener("mousedown", function (e) {
            e.preventDefault();
            const parentRect = parentElement.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
            originalWidth = parseFloat(
              getComputedStyle(element, null)
                .getPropertyValue("width")
                .replace("px", "")
            );
            originalHeight = parseFloat(
              getComputedStyle(element, null)
                .getPropertyValue("height")
                .replace("px", "")
            );
            originalX = elementRect.left - parentRect.left;
            originalY = elementRect.top - parentRect.top;
            originalMouseX = e.pageX;
            originalMouseY = e.pageY;

            window.addEventListener("mousemove", resize);
            window.addEventListener("mouseup", stopResize);
          });

          function resize(e) {
            let newWidth = originalWidth;
            let newHeight = originalHeight;

            if (currentResizer.classList.contains("bottom-right")) {
              newWidth = originalWidth + (e.pageX - originalMouseX);
              newHeight = originalHeight + (e.pageY - originalMouseY);
            } else if (currentResizer.classList.contains("bottom-left")) {
              newWidth = originalWidth - (e.pageX - originalMouseX);
              newHeight = originalHeight + (e.pageY - originalMouseY);
              if (newWidth > minSize)
                setLeft(originalX + (e.pageX - originalMouseX)); 
            } else if (currentResizer.classList.contains("top-right")) {
              newWidth = originalWidth + (e.pageX - originalMouseX);
              newHeight = originalHeight - (e.pageY - originalMouseY);
              if (newHeight > minSize)
                setTop(originalY + (e.pageY - originalMouseY)); 
            } else if (currentResizer.classList.contains("top-left")) {
              newWidth = originalWidth - (e.pageX - originalMouseX);
              newHeight = originalHeight - (e.pageY - originalMouseY);
              if (newWidth > minSize)
                setLeft(originalX + (e.pageX - originalMouseX));
              if (newHeight > minSize)
                setTop(originalY + (e.pageY - originalMouseY));
            }

            if (newWidth > minSize) setWidth(newWidth);
            if (newHeight > minSize) setHeight(newHeight);
          }

          function stopResize() {
            window.removeEventListener("mousemove", resize);
          }
        }
      }
      makeResizableDiv(containerRef.current);
      if (dragHandlerRef) {
        new DragHandler(
          containerRef.current,
          dragHandlerRef.current,
          { top, left, width, height },
          (position) => {
            setTop(position.top);
            setLeft(position.left);
          }
        );
      }
    }, [left, top, containerRef, dragHandlerRef]);

    useEffect(() => {
      if (onUpdateSize) {
        onUpdateSize({ width, height, top, left });
      }
    }, [width, height, top, left, dragHandlerRef]);

    // useEffect(() => {
    //   if (dragHandlerRef) {
    //     const dragHandler = new DragHandler(
    //       containerRef.current,
    //       dragHandlerRef.current,
    //       { top, left, width, height },
    //       update
    //     );
    //   }
    // }, [dragHandlerRef]);

    const resizableStyle = {
      background: "white",
      width: width + "px",
      height: height + "px",
      left: left + "px",
      top: top + "px",
      position: "absolute",
      boxSizing: "border-box",
    };

    const resizersStyle = {
      width: "100%",
      height: "100%",
      border: "1px solid black",
      boxSizing: "border-box",
      position: "relative",
      zIndex: 1,
    };

    const resizerStyle = {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: "white",
      border: "3px solid #4286f4",
      position: "absolute",
    };

    const resizerPositions = {
      topLeft: { left: "-5px", top: "-5px", cursor: "nwse-resize" },
      topRight: { right: "-5px", top: "-5px", cursor: "nesw-resize" },
      bottomLeft: { left: "-5px", bottom: "-5px", cursor: "nesw-resize" },
      bottomRight: { right: "-5px", bottom: "-5px", cursor: "nwse-resize" },
    };

    return (
      <div ref={containerRef} className={className ? className : "resizable"} style={resizableStyle}>
        <div className="resizers" style={resizersStyle}>
            {children}
          <div
            className="resizer top-left"
            style={{ ...resizerStyle, ...resizerPositions.topLeft }}
          ></div>
          <div
            className="resizer top-right"
            style={{ ...resizerStyle, ...resizerPositions.topRight }}
          ></div>
          <div
            className="resizer bottom-left"
            style={{ ...resizerStyle, ...resizerPositions.bottomLeft }}
          ></div>
          <div
            className="resizer bottom-right"
            style={{ ...resizerStyle, ...resizerPositions.bottomRight }}
          ></div>
        </div>
      </div>
    );
  }
);

export default Resizable;

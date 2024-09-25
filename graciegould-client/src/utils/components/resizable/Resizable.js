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
      maxWidth = null,
      maxHeight = null,
      minWidth = 20,
      minHeight = 20,
      minTop = null,
      minLeft= null,
      zIndex = 0,
      onUpdateSize = null,
      dragHandlerRef = null,
      className = null,
      id = "viewport",
      style={},
      ...props
    },
    containerRef
  ) => {
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);
    const [left, setLeft] = useState(initialLeft);
    const [top, setTop] = useState(initialTop);

    useEffect(() => {
      function makeResizableDiv() {
        const element = containerRef.current;
        const parentElement = element.parentElement;
        const resizers = element.querySelectorAll(".resizer");
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
            let newLeft = originalX;  
            let newTop = originalY;
          
            if (currentResizer.classList.contains("bottom-right")) {
              newWidth = originalWidth + (e.pageX - originalMouseX);
              newHeight = originalHeight + (e.pageY - originalMouseY);
            } else if (currentResizer.classList.contains("bottom-left")) {
              newWidth = originalWidth - (e.pageX - originalMouseX);
              newHeight = originalHeight + (e.pageY - originalMouseY);
              if (newWidth > minWidth) {
                newLeft = originalX + (e.pageX - originalMouseX);
              }
            } else if (currentResizer.classList.contains("top-right")) {
              newWidth = originalWidth + (e.pageX - originalMouseX);
              newHeight = originalHeight - (e.pageY - originalMouseY);
              newTop = originalY + (e.pageY - originalMouseY);
            } else if (currentResizer.classList.contains("top-left")) {
              newWidth = originalWidth - (e.pageX - originalMouseX);
              newHeight = originalHeight - (e.pageY - originalMouseY);
              if (newWidth > minWidth) {
                newLeft = originalX + (e.pageX - originalMouseX);
              }
              if (newHeight > minHeight) {
                newTop = originalY + (e.pageY - originalMouseY);
              }
            }
            if (typeof minLeft === 'number' && newLeft < minLeft) {
              newLeft = minLeft;
            }
            if (typeof minTop === 'number' && newTop < minTop) {
              newTop = minTop;
            }

            console.log("max width: ", maxWidth, "new width", newWidth);
            if (maxWidth && newWidth > maxWidth) newWidth = maxWidth;
            if (maxHeight && newHeight > maxHeight) newHeight = maxHeight;
            if (newWidth > minWidth) setWidth(newWidth);
            if (newHeight > minHeight) setHeight(newHeight);
            
            setLeft(newLeft); // Set left after checking minLeft
            setTop(newTop);   // Set top after checking minTop
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
            if (typeof minLeft === 'number' && position.left < minLeft) {
              position.left = minLeft;
            }
            if (typeof minTop === 'number' && position.top < minTop) {
              position.top = minTop;
            }
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


    const resizableStyle = {
      background: "white",
      width: width + "px",
      height: height + "px",
      left: left + "px",
      top: top + "px",
      position: "absolute",
      boxSizing: "border-box",
      ...style
    };

    const resizersStyle = {
      width: "100%",
      height: "100%",
      border: "1px solid black",
      boxSizing: "border-box",
      position: "relative",
      zIndex: 0,
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
      <div ref={containerRef} className={className ? className : "resizable"} style={resizableStyle} id={id} {...props}>
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

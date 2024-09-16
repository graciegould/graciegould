import { on } from 'process';
import React, { useEffect, useState } from 'react';

function Resizable({
  children,
  initialWidth = 500,
  initialHeight = 500,
  initialLeft = 0,
  initialTop = 0,
  updatedSize = { width: initialWidth, height: initialHeight },
  onUpdateSize = null
}) {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [left, setLeft] = useState(initialLeft);
  const [top, setTop] = useState(initialTop);

  useEffect(() => {
    function makeResizableDiv(div) {
      const element = document.querySelector(div);
      const resizers = document.querySelectorAll(div + ' .resizer');
      const minSize = 20;
      let originalWidth = 0;
      let originalHeight = 0;
      let originalX = 0;
      let originalY = 0;
      let originalMouseX = 0;
      let originalMouseY = 0;

      for (let i = 0; i < resizers.length; i++) {
        const currentResizer = resizers[i];
        currentResizer.addEventListener('mousedown', function (e) {
          e.preventDefault();
          originalWidth = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
          originalHeight = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
          originalX = element.getBoundingClientRect().left;
          originalY = element.getBoundingClientRect().top;
          originalMouseX = e.pageX;
          originalMouseY = e.pageY;
          window.addEventListener('mousemove', resize);
          window.addEventListener('mouseup', stopResize);
        });

        function resize(e) {
          let newWidth = originalWidth;
          let newHeight = originalHeight;

          // Only adjust the size, not the position unless necessary
          if (currentResizer.classList.contains('bottom-right')) {
            newWidth = originalWidth + (e.pageX - originalMouseX);
            newHeight = originalHeight + (e.pageY - originalMouseY);
          } else if (currentResizer.classList.contains('bottom-left')) {
            newWidth = originalWidth - (e.pageX - originalMouseX);
            newHeight = originalHeight + (e.pageY - originalMouseY);
            if (newWidth > minSize) setLeft(left + (e.pageX - originalMouseX)); // Adjust left if resizing from the left side
          } else if (currentResizer.classList.contains('top-right')) {
            newWidth = originalWidth + (e.pageX - originalMouseX);
            newHeight = originalHeight - (e.pageY - originalMouseY);
            if (newHeight > minSize) setTop(top + (e.pageY - originalMouseY)); // Adjust top if resizing from the top side
          } else if (currentResizer.classList.contains('top-left')) {
            newWidth = originalWidth - (e.pageX - originalMouseX);
            newHeight = originalHeight - (e.pageY - originalMouseY);
            if (newWidth > minSize) setLeft(left + (e.pageX - originalMouseX));
            if (newHeight > minSize) setTop(top + (e.pageY - originalMouseY));
          }

          if (newWidth > minSize) setWidth(newWidth);
          if (newHeight > minSize) setHeight(newHeight);
          if(onUpdateSize) onUpdateSize({ width: newWidth, height: newHeight });
        }

        function stopResize() {
          window.removeEventListener('mousemove', resize);
        }
      }
    }
    makeResizableDiv('.resizable');
  }, [left, top]);

  useEffect(() => {
    console.log('updatedSize', updatedSize);
    setWidth(updatedSize.width);
    setHeight(updatedSize.height);
    const element = document.querySelector('.resizable');
    element.style.width = updatedSize.width + 'px';
    element.style.height = updatedSize.height + 'px';
    if(onUpdateSize) onUpdateSize(updatedSize);
  }, [updatedSize]);

  const resizableStyle = {
    background: 'white',
    width: width + 'px',
    height: height + 'px',
    left: left + 'px',
    top: top + 'px',
    position: 'absolute',
    boxSizing: 'border-box',
  };

  const resizersStyle = {
    width: '100%',
    height: '100%',
    border: '1px solid black',
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 1,
  };

  const resizerStyle = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: 'white',
    border: '3px solid #4286f4',
    position: 'absolute',
  };

  const resizerPositions = {
    topLeft: { left: '-5px', top: '-5px', cursor: 'nwse-resize' },
    topRight: { right: '-5px', top: '-5px', cursor: 'nesw-resize' },
    bottomLeft: { left: '-5px', bottom: '-5px', cursor: 'nesw-resize' },
    bottomRight: { right: '-5px', bottom: '-5px', cursor: 'nwse-resize' },
  };

  return (
    <div className="resizable" style={resizableStyle}>
      <div className="resizers" style={resizersStyle}>
        {children}
        <div className="resizer top-left" style={{ ...resizerStyle, ...resizerPositions.topLeft }}></div>
        <div className="resizer top-right" style={{ ...resizerStyle, ...resizerPositions.topRight }}></div>
        <div className="resizer bottom-left" style={{ ...resizerStyle, ...resizerPositions.bottomLeft }}></div>
        <div className="resizer bottom-right" style={{ ...resizerStyle, ...resizerPositions.bottomRight }}></div>
      </div>
    </div>
  );
}

export default Resizable;

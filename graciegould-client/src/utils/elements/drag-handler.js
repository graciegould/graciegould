function DragHandler(element, dragHandler, initialPosition, update = () => {}) {
  const initialMousePosition = { x: 0, y: 0 };
  const initialElementPosition = initialPosition;
  const dragMouseDown = (e) => {
    e = e || window.event;
    e.preventDefault();
    initialMousePosition.x = e.clientX;
    initialMousePosition.y = e.clientY;
    const rect = element.getBoundingClientRect();
    initialElementPosition.top = rect.top + window.scrollY;
    initialElementPosition.left = rect.left + window.scrollX;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  };
  const elementDrag = (e) => {
    e = e || window.event;
    e.preventDefault();
    const deltaX = e.clientX - initialMousePosition.x;
    const deltaY = e.clientY - initialMousePosition.y;
    const position = {
      top: initialElementPosition.top + deltaY,
      left: initialElementPosition.left + deltaX
    };
    update(position);
    dragHandler.style.cursor = 'grabbing';
  };

  const closeDragElement = () => {
    dragHandler.style.cursor = 'grab';
    document.onmouseup = null;
    document.onmousemove = null;
  };
  dragHandler.onmousedown = dragMouseDown;
}

export default DragHandler;

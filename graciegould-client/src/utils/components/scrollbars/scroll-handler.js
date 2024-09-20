import { relativeMousePos } from "../../elements/mouse";
import { getComputedHeight, pixelsToPercentage } from "../../elements/units";

function ScrollHandler(scrollbar, thumbElement, scrollContainer, update = () => {}) {
  let initialMousePosition = { x: 0, y: 0 };
  let initialElementPosition = thumbElement.offsetTop;

  const dragMouseDown = (e) => {
    e = e || window.event;
    e.preventDefault();
    initialMousePosition = relativeMousePos(e, scrollbar);
    initialElementPosition = thumbElement.offsetTop;
    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
  };

  const elementDrag = (e) => {
    e = e || window.event;
    e.preventDefault();
    const currentMousePosition = relativeMousePos(e, scrollbar);
    const deltaY = currentMousePosition.y - initialMousePosition.y;
    let newPosition = initialElementPosition + deltaY;
    const maxScrollPosition =
      scrollbar.offsetHeight - thumbElement.offsetHeight;
    if (newPosition < 0) newPosition = 0;
    if (newPosition > maxScrollPosition) newPosition = maxScrollPosition;
    console.log("newPosition", newPosition);
    update({
      top: newPosition
    });
  };

  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  const handleDefaultScroll = (e) => {
    update({
      top: thumbElement.offsetTop,
    });
  }
  thumbElement.onmousedown = dragMouseDown;
  scrollContainer.onscroll = handleDefaultScroll;
  scrollContainer.addEventListener("scroll", handleDefaultScroll);  
}

export default ScrollHandler;

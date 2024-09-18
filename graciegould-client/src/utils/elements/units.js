const validUnits = ['px', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax', '%'];

function formatValueWithUnit(input, unit = null) {
    let val;
    if (typeof input === 'number') {
        if (unit === null) {
            val = input + 'px';
        } else if (validUnits.includes(unit)) {
            val = input + unit;
        } else {
            throw new Error('Invalid unit');
        }
    } else if (typeof input === 'string') {
        const number = parseFloat(input);
        const extractedUnit = input.replace(number, '');
        if (validUnits.includes(extractedUnit)) {
            val = input;
        } else {
            throw new Error('Invalid unit');
        }
    } else {
        throw new Error('Invalid value');
    }
    return val;
}

function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();
  
    return !(
      domRect1.top > domRect2.bottom ||
      domRect1.right < domRect2.left ||
      domRect1.bottom < domRect2.top ||
      domRect1.left > domRect2.right
    );
}
  
  function percentOfOverlap(element1, element2) {
    /**
     * Calculate the percentage of the area of element 1 that is overlapped with element 2.
     *
     * @param {HTMLElement} element1 - The first DOM element.
     * @param {HTMLElement} element2 - The second DOM element.
     * @returns {number} Percentage of overlap (0 to 100).
     */
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
  
    const overlapLeft = Math.max(rect1.left, rect2.left);
    const overlapTop = Math.max(rect1.top, rect2.top);
    const overlapRight = Math.min(rect1.right, rect2.right);
    const overlapBottom = Math.min(rect1.bottom, rect2.bottom);
  
    // Check if there is any overlap
    const overlapWidth = Math.max(0, overlapRight - overlapLeft);
    const overlapHeight = Math.max(0, overlapBottom - overlapTop);
  
    const overlapArea = overlapWidth * overlapHeight;
    const element1Area = rect1.width * rect1.height;
  
    // Calculate the percentage of overlap
    const overlapPercentage = (overlapArea / element1Area) * 100;
  
    return overlapPercentage;
  }
  
  function distanceFromCenter(div1, div2) {
    if (div1 && div2) {
      const rect1 = div1.getBoundingClientRect();
      const rect2 = div2.getBoundingClientRect();
  
      const center1X = rect1.left + rect1.width / 2;
      const center1Y = rect1.top + rect1.height / 2;
      const center2X = rect2.left + rect2.width / 2;
      const center2Y = rect2.top + rect2.height / 2;
  
      const distanceX = Math.abs(center1X - center2X);
      const distanceY = Math.abs(center1Y - center2Y);
  
      return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    }
  }
  
  function pixelsToPercentage(pixels, divWidth) {
    if (pixels === undefined || pixels === null || typeof pixels !== "number") {
      throw new Error("pixels must be a number");
    }
    if (divWidth === undefined || divWidth === null || typeof divWidth !== "number") {
      throw new Error("divWidth must be a number");
    }
    if (divWidth === 0) {
      throw new Error("divWidth cannot be zero");
    }
    const percentage = (pixels / divWidth) * 100;
    return Math.round(percentage * 100) / 100;
  }


  function percentageToPixels(percentage, divWidth) {
    if (percentage === undefined || percentage === null || typeof percentage !== "number") {
      throw new Error("percentage must be a number");
    }
    if (divWidth === undefined || divWidth === null || typeof divWidth !== "number") {
      throw new Error("divWidth must be a number");
    }
    if (divWidth === 0) {
      throw new Error("divWidth cannot be zero");
    }
    const pixels = (percentage / 100) * divWidth;
    return Math.round(pixels * 100) / 100;
  }
  
  function boundaryBoxRelativeToParent(element, parent) {
  
    let elementRect = element.getBoundingClientRect();
    let parentRect = parent.getBoundingClientRect();
  
    return {
      top: elementRect.top - parentRect.top,
      left: elementRect.left - parentRect.left,
      bottom: elementRect.bottom - parentRect.top,
      right: elementRect.right - parentRect.left,
      width: elementRect.width,
      height: elementRect.height
    };
  
  }
  export {
    formatValueWithUnit,
    elementsOverlap,
    distanceFromCenter,
    percentOfOverlap,
    pixelsToPercentage,
    percentageToPixels,
    boundaryBoxRelativeToParent
  };
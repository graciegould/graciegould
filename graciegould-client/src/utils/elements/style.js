import { formatValueWithUnit } from './units';

function updateSizeAndPos(element, inputs, unit = null) {
    const props = ['width', 'height', 'top', 'left', 'bottom', 'right'];
    if(!unit) {
        unit = 'px';
    }
    Object.keys(inputs).forEach((prop) => {
        if(!props.includes(prop)) {
            return;
        }
        let input = formatValueWithUnit(inputs[prop], unit);
        element.style[prop] = input;
    });
}


export {
    updateSizeAndPos,
};
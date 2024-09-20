function relativeMousePos(e, element = null) {
    if(!element) return {x: e.clientX, y: e.clientY}
    const rect = element.getBoundingClientRect();
    return {
        x:  e.clientX - rect.left, 
        y: e.clientY - rect.top 
    }

}

export {
    relativeMousePos
}
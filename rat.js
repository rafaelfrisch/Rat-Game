const screen = document.getElementById('screen')
const rat = document.getElementById('rat')

function initialPosition(screen, rat, cheese){
    const screen_position = getCenterPosition(screen)
    const rat_dimension = getElementDimensions(rat)
    changePositionElement(rat, screen_position.x_position,
        screen_position.y_position)
}

function getElementDimensions(element){
    const elementRect = element.getBoundingClientRect()
    return {
        width: elementRect.width,
        height: elementRect.height,
    }
}

function getCenterPosition(element){
    const elementRect = element.getBoundingClientRect()
    return {
        x_position: elementRect.left + getElementDimensions(element).width/2,
        y_position: elementRect.top + getElementDimensions(element).height/2,
    }
}

function animateRat(rat){

}

function translatePositionToCenter(element){
    element.style.transform = 'translate(50%, 50%)'
}

function rotateElement(element, angle){
    element.style.transform = 'rotate('+angle*180/Math.PI+'deg)';
}

function changePositionElement(element, x_position, y_position){
    element.style.left = x_position.toString() + "px"
    element.style.top = y_position.toString() + "px"
    translatePositionToCenter(element)
}

function translateElementWithMouse(element, mouse_x_position, mouse_y_position, angle){
    // changePositionElement(element, mouse_x_position, mouse_y_position)
    // element.style.transform = 'rotate('+angle*180/Math.PI+'deg)'+'translateX('
    // + mouse_x_position - getCenterPosition(element).x_position+'px)'+
    // 'translateY('+mouse_y_position - getCenterPosition(element).y_position+'px)';
    element.style.transform = 'rotate('+angle*180/Math.PI+'deg)'+'translateX('+
    (mouse_x_position - getCenterPosition(element).x_position).toString()+'px)'
    +'translateY('+(mouse_y_position - getCenterPosition(element).y_position).toString()+'px)'
}

initialPosition(screen, rat, cheese)

screen.addEventListener('mousemove', (event) =>{
    const mouse_x_position = event.pageX
    const mouse_y_position = event.pageY
    const rotation_angle = 
    Math.atan2(mouse_y_position - getCenterPosition(screen).y_position,
    mouse_x_position - getCenterPosition(screen).x_position)
    animateMouse(rat, mouse_x_position, mouse_y_position, rotation_angle)
    // translateElementWithMouse(rat, mouse_x_position, mouse_y_position, rotation_angle)
    rotateElement(rat, rotation_angle)
    
})
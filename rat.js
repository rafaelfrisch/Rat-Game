const screen = document.getElementById('screen')
const rat = document.getElementById('rat')
const cat = document.getElementById('head')
const leftPupil = document.getElementById('left-pupil')
const rightPupil = document.getElementById('right-pupil')

function initialPosition(screen, rat){
    const screen_position = getCenterPosition(screen)
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

function changePositionElement(element, x_position, y_position){
    element.style.left = x_position.toString() + "px"
    element.style.top = y_position.toString() + "px"
    element.style.transform = 'translate(-50%, -50%)'
}

function moveRat(element, mouse_x_position, mouse_y_position, angle){
    element.style.left = mouse_x_position.toString() + "px"
    element.style.top = mouse_y_position.toString() + "px"
    element.style.transform = 'translate(-50%, -50%)'+'rotate('+angle*180/Math.PI+'deg)'
}

function rotateElement(element, angle){
    element.style.transform = 'rotate('+angle*180/Math.PI+'deg)';
}

initialPosition(screen, rat)

screen.addEventListener('mousemove', (event) =>{
    const mouse_x_position = event.pageX
    const mouse_y_position = event.pageY
    const rotation_angle = 
    Math.atan2(mouse_y_position - getCenterPosition(screen).y_position,
    mouse_x_position - getCenterPosition(screen).x_position)
    moveRat(rat, mouse_x_position, mouse_y_position, rotation_angle)

    const left_pupil_angle =     
    Math.atan2(mouse_y_position - getCenterPosition(leftPupil).y_position,
    mouse_x_position - getCenterPosition(leftPupil).x_position)
    const right_pupil_angle =     
    Math.atan2(mouse_y_position - getCenterPosition(rightPupil).y_position,
    mouse_x_position - getCenterPosition(rightPupil).x_position)

    rotateElement(leftPupil, left_pupil_angle+Math.PI/2)
    rotateElement(rightPupil, right_pupil_angle+Math.PI/2)
})
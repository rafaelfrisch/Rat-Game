const screen = document.getElementById('screen')
const rat = document.getElementById('rat')
const cheese = document.getElementById('cheese')

function initialPosition(screen, rat, cheese){
    const screen_position = getCenterPosition(screen)
    const rat_dimension = getElementDimensions(rat)
    changePositionElement(rat, screen_position.x_position-rat_dimension.width/2,
        screen_position.y_position-rat_dimension.height/2)
    changePositionElement(cheese, screen_position.x_position+rat_dimension.width,
        screen_position.y_position-rat_dimension.height/2)
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

function rotateElement(element, angle){
    element.style.transform = 'rotate('+angle*180/Math.PI+'deg)';
}

function changePositionElement(element, x_position, y_position){
    element.style.left = x_position.toString() + "px"
    element.style.top = y_position.toString() + "px"
}

// function translateElementWithMouse(element, mouse_x_position, mouse_y_position, angle, screen){
//     const radius = Math.hypot(mouse_x_position - getCenterPosition(screen).x_position,
//     mouse_y_position - getCenterPosition(screen).y_position
//     )-getElementDimensions(element).width
//     console.log(radius)
//     element.style.left = (radius*Math.sin(angle)+getElementDimensions(element).height/2*Math.cos(angle)+
//     getCenterPosition(screen).x_position
//     ).toString()+ "px"
//     element.style.top = (radius*Math.cos(angle)-getElementDimensions(element).width/2*Math.sin(angle)+
//     getCenterPosition(screen).y_position
//     ).toString()+ "px"
// }

initialPosition(screen, rat, cheese)

screen.addEventListener('mousemove', (event) =>{
    const mouse_x_position = event.pageX
    const mouse_y_position = event.pageY
    changePositionElement(cheese, mouse_x_position, mouse_y_position)
    const rotation_angle = 
    Math.atan2(mouse_y_position - getCenterPosition(screen).y_position,
    mouse_x_position - getCenterPosition(screen).x_position)
    rotateElement(rat, rotation_angle)
})
const screen = document.getElementById('screen')
const rat = document.getElementById('rat')
const cat = document.getElementById('head')
const leftPupil = document.getElementById('left-pupil')
const rightPupil = document.getElementById('right-pupil')
const leftEye = document.getElementById('left-eye')
const rightEye = document.getElementById('right-eye')
const volumeMute = document.getElementById('volume-mute')
const volumeUp = document.getElementById('volume-up')
let soundEnabled = true
var catMusic;

function sound(src, enabled) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      if(enabled)
        this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
}

function initialPosition(screen, rat){
    const screen_position = getCenterPosition(screen)
    changePositionElement(rat, screen_position.x_position,
        screen_position.y_position)
    catMusic = new sound("louder.mp3")
    catMusic.play()
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

function catBlink(left_eye, right_eye){
    let id = null;
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
      if (pos == 80) {
        clearInterval(id);
        left_eye.style.opacity = 1
        right_eye.style.opacity = 1
      } else {
        pos++;
        left_eye.style.opacity = 1-pos/30
        right_eye.style.opacity = 1-pos/30
      }
    }
}

initialPosition(screen, rat)

volumeUp.addEventListener('click', (event) =>{
    event.preventDefault();
    console.log('up')
    soundEnabled = !soundEnabled
    if(soundEnabled){
        volumeUp.style.opacity = 1
        volumeMute.style.opacity = 0
    }
    else{
        volumeUp.style.opacity = 0
        volumeMute.style.opacity = 1
    }
})
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

screen.addEventListener('contextmenu', (event) =>{
    event.preventDefault();
    const mouse_x_position = event.pageX
    const mouse_y_position = event.pageY
    const rotation_angle = 
    Math.atan2(mouse_y_position - getCenterPosition(screen).y_position,
    mouse_x_position - getCenterPosition(screen).x_position)
    let catSound = new sound("cat.mp3", soundEnabled)
    catSound.play()
    moveRat(cat, mouse_x_position, mouse_y_position, rotation_angle+Math.PI/2)
    rat.remove()
}, false);

screen.addEventListener('click', (event) =>{
    event.preventDefault();
    catBlink(leftEye, rightEye)
});
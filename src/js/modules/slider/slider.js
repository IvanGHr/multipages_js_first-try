export default class Slider {
    constructor({
        container = null,
        btns = null,
        next = null, 
        prev = null,
        activeClass = '',
        animate,
        autoplay } = {}){
        this.container = document.querySelector(container);//main box - slider
        this.slides = this.container.children;//slides in the slider(chields);
        this.btns = document.querySelectorAll(btns);//btn for sliding
        this.prev = document.querySelector(prev);//btn prev slide
        this.next = document.querySelector(next);//btn next slide
        this.activeClass = activeClass;//const active class
        this.animate = animate;//dop animate classes
        this.autoplay = autoplay;//auto next slide
        this.slideIndex = 1;//default number of slide
    }
}

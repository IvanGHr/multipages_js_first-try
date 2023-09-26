export default class Slider {
    constructor({
        container = null,
        btns = null,
        next = null, 
        prev = null,
        nextBtn = null,
        prevBtn = null,
        activeClass = '',
        animate,
        autoplay } = {}){
        this.container = document.querySelector(container);//main box - slider
        try {
            this.slides = this.container.children;//slides in the slider(chields);
            this.nextBtn = document.querySelectorAll(nextBtn);
            this.prevBtn = document.querySelectorAll(prevBtn);
        } catch(e) {}
        this.btns = document.querySelectorAll(btns);//btn for sliding
        this.prev = document.querySelector(prev);//btn prev slide
        this.next = document.querySelector(next);//btn next slide
        this.activeClass = activeClass;//const active class
        this.animate = animate;//dop animate classes
        this.autoplay = autoplay;//auto next slide
        this.slideIndex = 1;//default number of slide
    }
}

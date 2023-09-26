import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        for (const slide of this.slides) {
            slide.classList.remove(this.activeClass);//for every slide = delete active class
            if (this.animate) {//if clider have dop animate (animate = true), all inactive slides 
                slide.querySelector('.card__title').style.opacity = '0.4';//title = opacity 0.4
                slide.querySelector('.card__controls-arrow').style.opacity = '0';//arrow = opacity 0
            }
        };

        if (!this.slides[0].closest('button')) {//if active slide it is`nt a button
            this.slides[0].classList.add(this.activeClass);//create active class
        }
        
        if (this.animate) {//if children have dop animate (animate = true) - active slide
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[1]); // Btn
            this.container.appendChild(this.slides[2]); // Btn
            this.decorizeSlides();
        } else if (this.slides[1].tagName == "BUTTON"){
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[1]); // Btn
            this.decorizeSlides();
        } else {
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {

            for (let i = this.slides.length - 1; i > 0; i--) {//start for from the end of the slider
                if (this.slides[i].tagName !== "BUTTON") {//if slide = is`nt a button
                    let active = this.slides[i];//getting last slide active class
                    this.container.insertBefore(active, this.slides[0]);//push last slide in the start of the slider
                    this.decorizeSlides();//and call decorize slide
                    break;//stop
                }
            }
        });
    }

    init() {
        try {
            this.container.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                align-items: flex-start;
            `;

            this.bindTriggers();
            this.decorizeSlides();

            if (this.autoplay) {//if slider autoplay = true
                setInterval(() => this.nextSlide(), 5000);//create auto next slide after 5 sec
            }
        } catch (e) {}
    }
}
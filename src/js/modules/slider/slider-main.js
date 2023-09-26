import Slider from './slider';

export default class MainSlider extends Slider {
    constructor(btns, nextBtn, prevBtn) {
        super(btns, nextBtn, prevBtn)
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        try {
            this.hanson.style.opacity = '0';

            if (n == 3){
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        }catch(e){}

        for (const slide of this.slides) {
            slide.style.display = 'none';
        }

        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    sliding(way) {
        way.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();//stop others events
                e.preventDefault();

                if (btn.classList.value.includes("prev")) {
                    this.plusSlides(-1);
                } else if (btn.classList.value.includes("next")) {
                    this.plusSlides(1);
                }
            });
        });
    }

    bindBtn() {
        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                this.plusSlides(1);
            });

            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });
    }

    render() {
        if (this.container) {
            try {
                this.hanson = document.querySelector('.hanson');
            } catch(e){}

            this.showSlides(this.slideIndex);
            this.bindBtn();
            this.sliding(this.nextBtn);
            this.sliding(this.prevBtn);
        }
    }
}
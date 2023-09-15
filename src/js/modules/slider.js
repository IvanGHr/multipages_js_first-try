export default class Slider {
    constructor(page, btns) {
        this.page = document.querySelector(page);//main page
        this.slides = Array.from(this.page.children);//chields of main page which show
        this.btns = document.querySelectorAll(btns);//buttons to change chield
        this.slideIndex = 1;
    }

    //show page (number of page)
    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        try {
            this.hanson.style.opacity = '0';

            if (n === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch(e) {}
        
        //animation all pages
        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        //animation page who was choose
        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    //next page
    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    //change page after click on the button, and change page to 1 after click on the logo
    render() {
			//try - If this part of the code is executed, then the code will move on, but if not, then the code will still move on.
			try {
				this.hanson = document.querySelector('.hanson')
			} catch (e) {}

			this.btns.forEach(btn => {
				btn.addEventListener('click', () => {
					this.plusSlides(1)
				})

				btn.parentNode.previousElementSibling.addEventListener('click', e => {
					e.preventDefault()
					this.slideIndex = 1
					this.showSlides(this.slideIndex)
				})
			})

			this.showSlides(this.slideIndex)
		};
};
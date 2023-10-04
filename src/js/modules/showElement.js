export default class ShowElem {
    constructor(triggers) {
        try {
            this.triggers = document.querySelectorAll(triggers);
        } catch(e) {}
    }

    showElement() {
        this.triggers.forEach(elem => {
            elem.addEventListener('click', () => {
                const showElement = elem.parentNode.nextElementSibling;

                if (showElement) {
                    if (window.getComputedStyle(showElement).display === 'block') {
                        showElement.style.display = 'none';
                    } else {
                        showElement.style.display = 'block';
                        showElement.classList.add('animated', 'slideInRight');
                    }
                }
            });
        });
    }


    init() {
        this.showElement();
    }
}
export default class Difference {
    constructor(oldOfficer, newOfficer, items) {
        try {
            this.oldOfficer = document.querySelector(oldOfficer);
            this.newOfficer = document.querySelector(newOfficer);
            this.oldItems = this.oldOfficer.querySelectorAll(items);
            this.newItems = this.newOfficer.querySelectorAll(items);
            this.items = items;
            this.oldCounter = 0;
            this.newCounter = 0;
        } catch(e) {}
    }

    bindTriggers(selector, itemsSelector, counter) {
        selector.querySelector('.plus').addEventListener('click', () => {
            if (counter !== itemsSelector.length - 2) {
                itemsSelector[counter].style.display = 'flex';
                counter++;
            } else {
                itemsSelector[counter].style.display = 'flex';
                itemsSelector[itemsSelector.length - 1].remove();
            }
        });
    }

    hideElem(selector) {
        selector.forEach((item, i, arr) => {
            if (i !== arr.length - 1) {
                item.style.display = 'none';
            }
        });
    }

    init() {
        try {
            this.hideElem(this.oldItems);
            this.hideElem(this.newItems);

            this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
            this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
        } catch(e) {}
    }
}
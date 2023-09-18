export default class Difference {
    constructor(oldOfficer, newOfficer, items) {
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer = document.querySelector(newOfficer);
        this.oldItems = this.oldOfficer.querySelectorAll(items);
        this.newItems = this.newOfficer.querySelectorAll(items);
        this.items = items;
        this.oldCounter = 0;
        this.newCounter = 0;
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
        selector.querySelectorAll(this.items).forEach((item, i, arr) => {
            if (i !== arr.length - 1) {
                item.style.display = 'none';
            }
        });
    }

    init() {
        this.hideElem(this.oldOfficer);
        this.hideElem(this.newOfficer);

        this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
        this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
    }
}
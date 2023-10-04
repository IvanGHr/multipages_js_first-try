export default class Download {
    constructor(trigger) {
        this.trigger = document.querySelectorAll(trigger);
        this.path = 'assets/img/mainbg.jpg';
    }

    downloadItem(path) {
        const link = document.createElement('a');

        link.setAttribute('href', path);
        link.setAttribute('download', 'name__some__file');

        link.style.display = 'none';
        document.body.appendChild(link);

        /* link.addEventListener('click', (e) => {
            e.preventDefault();
        }); */

        link.click();

        document.body.removeChild(link);
    }

    init() {
        this.trigger.forEach(elem => {
            elem.style.cursor = 'pointer';
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.downloadItem(this.path);//we can use elem.dataAttribute and use property what we need for downloading; i.e. when we click on a specific button, a specific file will be loaded;
            });
        });
    }
}
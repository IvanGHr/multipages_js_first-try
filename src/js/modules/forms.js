import PostData from "./submits.js/post";

export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Loading...',
            suc: 'Thanks, we`ll contact you soon',
            fail: 'Something was wrong'
        };
        this.path = 'assets/question.php';
        
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    checkMail() {
        const mailInputs = document.querySelectorAll('[type="email"]');

        mailInputs.forEach(input => {
            input.addEventListener('keypress' , function(e) {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    initMask() {
        let setCursorPos = (pos, elem) => {
            elem.focus();

            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();

                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };

        function addMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                value = this.value.replace(/\D/g, '');

            if (def.length >= value.length) {
                value = def;
            }

            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < value.length ? value.charAt(i++) : i >= value.length ? '' : a;
            });

            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPos(this.value.length, this);
            }
        }

        let inputs = document.querySelectorAll('[name="phone"]');

        inputs.forEach(input => {
            input.addEventListener('input', addMask);
            input.addEventListener('focus', addMask);
            input.addEventListener('blur', addMask);
        })
    }


    init() {
        this.checkMail();
        this.initMask();
        this.forms.forEach(elem => {
            elem.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMess = document.createElement('div');
                statusMess.style.cssText = `
                    margin-top: 14px;
                    font-size: 16px;
                    color: grey;
                `;
                elem.parentNode.appendChild(statusMess);

                statusMess.textContent = this.message.loading;

                const formData = new FormData(elem);

                this.postData = new PostData().postData(this.path, formData);

                this.postData
                    .then(result => {
                        console.log(result);
                        statusMess.textContent = this.message.suc;
                    })
                    .catch(() => {
                        statusMess.textContent = this.message.fail;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMess.remove();
                        }, 4000);
                    });
            });
        });
    }
}
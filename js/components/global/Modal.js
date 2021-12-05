import { Base } from '../../core/Base.js';

const ESCAPE_CODE = 'Escape';

export class Modal extends Base {
    constructor(id, options) {
        super(id);
        this.modal;
        this.options = options;
        this.destroyed = false;
    }

    prefs() {
        return {
            classesGlobalDialog: 'has_dialog',
            classesShow: 'open',
            classesActive: 'active',
            classesExtra: '',
            overlay: this.modal.querySelector('.modal-overlay'),
            dialogWindow: this.modal.querySelector('.modal-window'),
            closeBtn: '[data-close]',
            clickOutSide: true,
            closeByEscape: true,
        };
    }

    init() {}

    showModal() {
        if(this.modal) {
            this.modal.classList.add(this.prefs().classesShow);
            this.addGlobalDialogClass();
        } else {
            if(this.destroyed) return;

            this.onBeforeShowModal(this.options)

            this.modal = this.render();
            document.body.appendChild(this.modal);

            this.renderButtons();

            this.addClasses();
            this.addGlobalDialogClass();
            this.addListeners();
        }
    }

    onBeforeShowModal(modalData = {}) {
        if (modalData.attributes) {
            Object.keys(modalData.attributes).forEach((key) => {
                const value = modalData.attributes[key];

                if (value === null || value === undefined || value === '') {
                    delete modalData.attributes[key];
                }

                this.prefs().dialogWindow.setAttribute(key, value);
            });
            this.attributes = modalData.attributes;
        }
    }

    setContent() {
        this.modal.querySelector('.modal-body').innerHTML = this.options.body || '';

        this.renderButtons();
    }

    onAfterCloseModal() {
        if (this.attributes) {
            Object.keys(this.attributes).forEach((key) => {
                this.prefs().dialogWindow.removeAttribute(key);
            });
        }
    }

    addListeners() {
        if (this.prefs().clickOutSide) {
            this.clickOutsideHandler = this.ev('click', (_, event) => {
                if (event.target === this.prefs().overlay) {
                    this.closeModal();
                }
            }, this.prefs().overlay ).pop();
        }

        if (this.prefs().closeByEscape) {
            this.escHandler = this.ev('keyup', (_, event) => {
                const kdbEvent = (event);

                if (kdbEvent.code === ESCAPE_CODE) {
                    this.closeModal();
                }
            }, window ).pop();
        }

        this.closeBtnHandler = this.ev('click', (_, event) => {
            this.closeModal();
        }, this.prefs().closeBtn ).pop();
    }

    addClasses() {
        const classes = [this.prefs().classesShow];

        if (this.prefs().classesExtra) {
            classes.push(this.prefs().classesExtra);
        }

        this.modal.classList.add(...classes);
    }

    cleanUpListeners() {
        if (this.escHandler) {
            this.escHandler();
            this.escHandler = null;
        }

        if (this.clickOutsideHandler) {
            this.clickOutsideHandler();
            this.clickOutsideHandler = null;
        }

        this.closeBtnHandler()
        this.closeBtnHandler = null
    }

    addGlobalDialogClass() {
        const html = document.documentElement;

        if (!html.classList.contains(this.prefs().classesGlobalDialog)) {
            html.classList.add(this.prefs().classesGlobalDialog);
        }
    }

    removeGlobalDialogClass() {
        document.documentElement.classList.remove(this.prefs().classesGlobalDialog);
    }


    closeModal() {
        this.modal.classList.remove(this.prefs().classesShow);
        this.removeGlobalDialogClass();
        this.onAfterCloseModal();

        // this.onDestroy()
    }

    onDestroy() {
        this.modal.parentNode.removeChild(this.modal);
        this.cleanUpListeners();

        this.destroyed = true;
    }

    renderButtons() {
        if(!this.options.footerButtons || this.btns) return;

        let markup = '';

        this.options.footerButtons.forEach(btn => {
            markup += `<button class="${btn.class}" data-event-name="${btn.handler}">${btn.text}</button>`
        })

        const btns = document.createElement('div');
        btns.classList.add('modal-footer');
        btns.insertAdjacentHTML('afterbegin', markup);

        this.btns = btns;

        if(this.btns) {
            this.prefs().dialogWindow.appendChild(this.btns);
        }
    }

    render() {
        const markup = `
            <div class="modal-window">
                <div class="modal-header">
                    <div class="modal-title">${this.options.title || ''}</div>
                    <span class="modal-close" data-close>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path xmlns="http://www.w3.org/2000/svg" d="M21 3.71L20.29 3 12 11.29 3.71 3 3 3.71 11.29 12 3 20.29l.71.71L12 12.71 20.29 21l.71-.71L12.71 12z"/>
                        </svg>
                    </span>
                </div>
                <div class="modal-body">
                    ${this.options.body || ''}
                </div>
            </div>
            <div class="modal-overlay"></div>
        `
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.insertAdjacentHTML('afterbegin', markup);

        return modal;
    }
}
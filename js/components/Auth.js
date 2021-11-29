import { Modal } from "./global/Modal.js";

export class Auth extends Modal {
    constructor(id) {
        super(id);
    }

    init() {
        this.$el.addEventListener('click', () => {
            this.showModal()
        })
    }

    onBeforeShowModal() {
        super.onBeforeShowModal();

        this.options = {
            title: 'Auth',
            body: `
                test
            `
        }
    }
}
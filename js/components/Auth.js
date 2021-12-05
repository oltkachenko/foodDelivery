import { Modal } from "./global/Modal.js";
import { Form } from "../core/form.js";
import { Validation } from '../core/validation.js';

export class Auth extends Modal {
    constructor(id) {
        super(id);
    }

    prefs() {
        return {
            ...super.prefs(),

            classesExtra: 'auth'
        };
    }

    init() {
        this.$el.addEventListener('click', () => {
            this.showModal();
        })
    }

    showModal() {
        super.showModal();

        this.form = new Form(this.modal.querySelector('#logInForm'), {
            login: [Validation.required],
            password: [Validation.required, Validation.minLength(10)]
        });

        if(!this.events) {
            this.modal.addEventListener('submit', (event) => {
                event.preventDefault();

                this.form.isValid();

                this.events = true;
            })
        }
    }

    onBeforeShowModal() {
        super.onBeforeShowModal();

        this.options = {
            title: 'Auth',
            body: `
                <form id="logInForm" class="b-form m-login">
                    <div class="b-form-section">
                        <label class="b-form-label">Логин</label>
                        <input id="login" name="login" class="b-form-input" type="text">
                    </div>
                    <div class="b-form-section">
                        <label class="b-form-label">Пароль</label>
                        <input id="password" name="password" class="b-form-input" type="password">
                    </div>
                    <div class="modal-footer">
                        <div class="footer-buttons">
                            <button class="button button-primary button-login" type="submit">Войти</button>
                        </div>
                    </div>
                </form>
            `
        }
    }
}
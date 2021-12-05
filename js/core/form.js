import { renderFormElementError } from '../templates/RenderFormElementError.js'

export class Form {
    constructor(form, controls) {
        this.form = form;
        this.controls = controls;
    }

    prefs() {
        return {
            classesError: 'm-invalid',
            validationMessages: {
                required: 'Field is required',
                minLength: `Min length should be ${this.minLength}`
            }
        };
    }

    isValid() {
        let isFormValid = true;

        Object.keys(this.controls).forEach((control) => {
            const validators = this.controls[control];

            let isValid = true;
            let msg;

            for(let validator of validators) {
                let validation = validator(this.form[control].value)

                isValid = validation.valid && isValid;
                let validationState = validation.state;

                this.minLength = validation.minLength || '';

                msg = this.prefs().validationMessages[validationState];

                if(!isValid) break;
            }

            if(!isValid) {
                this.setError(this.form[control], msg);
            } else {
                this.clearError(this.form[control]);
            }

            isFormValid = isFormValid && isValid;
        })

        return isFormValid;
    }

    setError($el, msg) {
        this.clearError($el);
        const error = renderFormElementError(msg);
        $el.classList.add(this.prefs().classesError);
        $el.insertAdjacentHTML('afterend', error);
    }

    clearError($el) {
        $el.classList.remove(this.prefs().classesError);

        if($el.nextSibling) {
            $el.closest('.b-form-section').removeChild($el.nextSibling);
        }
    }
}
export class Validation {
    static required(value = '') {
        return {
            state: 'required',
            valid: value && value.trim()
        }
    }

    static minLength(length) {
        return value => {
            return {
                state: 'minLength',
                valid: value.length >= length,
                minLength: length
            }
        }
    }
}
import { Base } from "../../core/Base.js";
import { alertHideTime } from '../../core/config.js'

class Alert extends Base {
    constructor(id) {
        super(id)
    }

    showMsg(msg, hideAfter = alertHideTime) {
        if(this.time) clearTimeout(this.time);

        this.$el.textContent = msg;
        this.$el.classList.remove('hide');

        this.time = setTimeout(() => {
            this.$el.classList.add('hide');
        }, hideAfter);
    }
}

export const alert = new Alert('alert')
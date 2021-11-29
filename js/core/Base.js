import { EventBus } from "./eventBus.js";

export class Base {
    constructor(id) {
        this.$el = document.getElementById(id);
        this.init();
    }

    init() {}

    show() {
        this.onShow();
    }

    hide() {
        this.onHide()
    }

    onShow() {
        this.$el.classList.remove('hide');
    }

    onHide() {
        this.$el.classList.add('hide');
    }

    remove() {
        this.$el.remove()
    }

    eventBus() {
        return new EventBus();
    }

    ev(eventName, cb, selector = '', passive = true) {
        var elements = [];
        var self = this;

        if (selector instanceof Element || selector === window) {
            elements = [selector];
        } else if (typeof selector === 'string') {
            elements = Array.from(document.querySelectorAll(selector));
        }

        return elements.map(element => {
            let fn = function fn(...args) {
                return cb.apply(self, [this, ...args]);
            };

            element.addEventListener(eventName, fn, passive ? { passive: true } : { passive: false });
            const dispose = () => {
                if (fn) {
                    element.removeEventListener(eventName, fn);
                    fn = undefined;
                }
            };
            dispose.eventName = eventName;
            return dispose;
        });
    }
}
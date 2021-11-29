export class EventBus {
    constructor() {}

    on(type, listener) {
        window.addEventListener(type, listener);
    }

    once(type, listener) {
        window.addEventListener(type, listener, { once: true });
    }

    off(type, listener) {
        window.removeEventListener(type, listener);
    }

    emit(type, detail) {
        return window.dispatchEvent(new CustomEvent(type, { detail }));
    }
}

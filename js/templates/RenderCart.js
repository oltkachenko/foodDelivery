import { CURRENCY } from "../core/config.js";

export function renderCart(product) {
    const markup = `
        <div class="food-row">
            <span class="food-name">${product.name}</span>
            <strong class="food-price">${product.price} ${CURRENCY}</strong>
            <div class="food-counter">
                <button class="counter-button btn-dec" data-pid="${product.id}" data-dec>-</button>
                <span class="counter" data-pid="${product.id}">${product.qty}</span>
                <button class="counter-button btn-inc" data-pid="${product.id}" data-inc>+</button>
            </div>
        </div>
    `;

    return markup;
}
import { CURRENCY } from "../core/config.js";

export function renderCart(product) {
    const markup = `
        <div class="b-cart_product">
            <span class="b-cart_product-name">${product.name}</span>
            <strong class="b-cart_product-price">${product.price} ${CURRENCY}</strong>
            <div class="b-stepper">
                <button class="b-button btn-dec" data-pid="${product.id}" data-dec>-</button>
                <span class="b-stepper-counter counter" data-pid="${product.id}">${product.qty}</span>
                <button class="b-button btn-inc" data-pid="${product.id}" data-inc>+</button>
            </div>
        </div>
    `;

    return markup;
}
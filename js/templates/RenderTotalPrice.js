import { CURRENCY } from "../core/config.js";

export function renderTotalPrice(price) {
    const markup = `
        <div class="b-cart-price">
            <span class="b-cart-price_value">
                <span class="b-cart-price_total" id="cart-total-price">${price}</span>
                <span class="b-cart-price_currency">${CURRENCY}</span>
            </span>
        </div>
    `;

    return markup;
}
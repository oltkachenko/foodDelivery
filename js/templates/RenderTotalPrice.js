import { CURRENCY } from "../core/config.js";

export function renderTotalPrice(price) {
    const markup = `
        <div class="cart-price">
            <span class="cart-price_value">
                <span class="cart-price_total modal-pricetag">${price}</span>
                <span class="cart-price_currency">${CURRENCY}</span>
            </span>
        </div>
    `;

    return markup;
}
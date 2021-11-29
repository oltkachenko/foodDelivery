import { CURRENCY } from "../core/config.js";

export function renderMenu(item) {
    const markup = `
        <div class="card">
            <img src="${item.image}" alt="${item.name}" class="card-image" />
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${item.name}</h3>
                </div>
                <div class="card-info">
                    <div class="ingredients">${item.description}</div>
                </div>
                <div class="card-buttons">
                    <button class="button button-primary button-add-cart" data-pid="${item.id}">
                        <span class="button-card-text">В корзину</span>
                        <span class="button-cart-svg"></span>
                    </button>
                    <strong class="card-price-bold">${item.price} ${CURRENCY}</strong>
                </div>
            </div>
        </div>
    `;

    return markup;
}
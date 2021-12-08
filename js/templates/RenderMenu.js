import { CURRENCY } from "../core/config.js";

export function renderMenu(item) {
    const markup = `
        <div class="b-tile">
            <img src="${item.image}" alt="${item.name}" class="b-tile-image" />
            <div class="b-tile-details">
                <div class="b-tile-header">
                    <h3 class="b-tile-name">${item.name}</h3>
                </div>
                <div class="b-tile-info">
                    <div class="b-tile-ingredients">${item.description}</div>
                </div>
                <div class="b-tile-buttons">
                    <button class="b-button m-primary button-add-cart" data-pid="${item.id}">
                        <span class="b-button-text">В корзину</span>
                        <span class="b-button-icon m-cart"></span>
                    </button>
                    <span class="b-tile-price">${item.price} ${CURRENCY}</span>
                </div>
            </div>
        </div>
    `;

    return markup;
}
import { CURRENCY } from "../core/config.js";

export function renderRestourant(item) {
    const markup = `
        <a href="restaurant.html?restourant=${item.products}" class="b-tile">
            <img src="${item.image}" alt="${item.name}" class="b-tile-image" />
            <div class="b-tile-details">
                <div class="b-tile-header">
                    <h3 class="b-tile-name">${item.name}</h3>
                    <span class="b-tile-tag">${item.time_of_delivery} мин</span>
                </div>
                <div class="b-tile-info">
                    <div class="b-tile-rating">
                        ${item.stars}
                    </div>
                    <div class="b-tile-price">От ${item.price} ${CURRENCY}</div>
                    <div class="b-tile-category">${item.kitchen}</div>
                </div>
            </div>
        </a>
    `;

    return markup;
}
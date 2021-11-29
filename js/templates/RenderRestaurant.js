import { CURRENCY } from "../core/config.js";

export function renderRestourant(item) {
    const markup = `
        <a href="restaurant.html?restourant=${item.products}" class="card card-restaurant">
            <img src="${item.image}" alt="${item.name}" class="card-image" />
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">${item.name}</h3>
                    <span class="card-tag tag">${item.time_of_delivery} мин</span>
                </div>
                <div class="card-info">
                    <div class="rating">
                        ${item.stars}
                    </div>
                    <div class="price">От ${item.price} ${CURRENCY}</div>
                    <div class="category">${item.kitchen}</div>
                </div>
            </div>
        </a>
    `;

    return markup;
}
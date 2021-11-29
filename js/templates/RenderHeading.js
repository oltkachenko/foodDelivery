import { CURRENCY } from "../core/config.js";

export function renderHeading(restourant) {
    const markup = `
        <h2 class="section-title restaurant-title">${restourant.name}</h2>
        <div class="card-info">
            <div class="rating">
                ${restourant.stars}
            </div>
            <div class="price">От ${restourant.price} ${CURRENCY}</div>
            <div class="category">${restourant.kitchen}</div>
        </div>
    `;

    return markup;
}
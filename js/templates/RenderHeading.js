import { CURRENCY } from "../core/config.js";

export function renderHeading(restourant) {
    const markup = `
        <h2 class="b-heading-title">${restourant.name}</h2>
        <div class="b-tile-info">
            <div class="b-tile-rating">
                ${restourant.stars}
            </div>
            <div class="b-tile-price">От ${restourant.price} ${CURRENCY}</div>
            <div class="b-tile-category">${restourant.kitchen}</div>
        </div>
    `;

    return markup;
}
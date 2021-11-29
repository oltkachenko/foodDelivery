import { Base } from "../core/Base.js";
import { renderRestourant } from '../templates/RenderRestaurant.js';
import { loader } from "./global/Loader.js";

export class Restaurant extends Base {
    constructor(id) {
        super(id);
    }

    init(){
        this.show();
    }

    async onShow() {
        const partners = await fetch('../../db/partners.json')
            .then((response) => response.json());

        const html = partners.map(item => {
            return renderRestourant(item);
        });

        this.$el.insertAdjacentHTML('afterbegin', html.join(' '));

        loader.remove();
    }
}
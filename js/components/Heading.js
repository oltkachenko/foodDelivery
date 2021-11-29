import { Base } from "../core/Base.js";
import { renderHeading } from "../templates/RenderHeading.js";
import { getURLParams } from "../core/helpers.js";

export class Heading extends Base {
    constructor(id) {
        super(id)
    }

    init(){
        this.show()
    }

    async onShow() {
        const partner = await fetch(`./db/partners.json`)
            .then((response) => response.json())
            .then(partners => partners.find((el) => el.products === getURLParams('restourant')))

        const html = renderHeading(partner)

        this.$el.insertAdjacentHTML('afterbegin', html);
    }
}

import { Base } from '../../core/Base.js';

class Loader extends Base {
    constructor(id) {
        super(id)
    }
}

export const loader = new Loader('loader');
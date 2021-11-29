import { Base } from "../core/Base.js";
import { renderMenu } from '../templates/RenderMenu.js';
import { getURLParams, getItemFromStorage } from "../core/helpers.js";
import { loader } from "./global/Loader.js";
import { alert } from "./global/Alert.js";

export class Menu extends Base {
    constructor(id) {
        super(id)
    }

    init(){
        this.show()
    }

    async onShow() {
        this.restourantMenu = await fetch(`../../db/${getURLParams('restourant')}`)
            .then((response) => response.json());

        const html = this.restourantMenu.map(item => {
            return renderMenu(item);
        });

        this.$el.insertAdjacentHTML('afterbegin', html.join(' '));
        this.$el.addEventListener('click', this.addToCart.bind(this));

        loader.remove();
    }

    addToCart(event) {
        const addToCart = event.target.closest('.button-add-cart');

        if(!addToCart) return;

        const id = addToCart.dataset.pid;

        const cartItems = getItemFromStorage('cart');
        let cartQty = getItemFromStorage('basketStorageNumItems', 0);

        const product = this.restourantMenu.find(item => item.id === id);
        const basketItem = cartItems.find(item => item.id === id);

        if(basketItem) {
            basketItem.qty++
        } else {
            cartItems.push({
                id: product.id,
                name: product.name,
                price: product.price,
                qty: 1
            })
        }

        cartQty++;

        localStorage.setItem('cart', JSON.stringify(cartItems));
        localStorage.setItem('basketStorageNumItems', JSON.stringify(cartQty));

        alert.showMsg(`${product.name} added to cart`);

        this.eventBus().emit('basket.changed');
    }
}

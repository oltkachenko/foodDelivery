import { getItemFromStorage } from "../core/helpers.js";
import { renderCart } from "../templates/RenderCart.js";
import { renderTotalPrice } from "../templates/RenderTotalPrice.js"
import { Modal } from "./global/Modal.js";

export class Cart extends Modal {
    constructor(id) {
        super(id);
    }

    init() {
        this.$el.addEventListener('click', () => {
            this.showModal();
            console.log(this);
        })

        this.basketTotalItems1 = this.$el.querySelector('#button-cart-text');
        this.showBasketQty();

        this.eventBus().on('basket.changed', this.showBasketQty.bind(this));
        this.eventBus().on('basket.changed', this.renderContent.bind(this));
    }

    renderContent() {
        if(this.modal) {
            this.price = 0;

            this.cartItems = getItemFromStorage('cart');

            const html = this.cartItems.map(product => {
                this.price += product.price * product.qty;

                return renderCart(product);
            });

            html.push(renderTotalPrice(this.price))

            this.options.body = html.join(' ');
            this.options.footerButtons = [
                { class: 'b-button m-primary', text: 'Checkout', handler: 'modalHandlerOk' },
                { class: 'b-button', text: 'Cancel', handler: 'modalHandlerCancel' }
            ]
            this.setContent();
        }
    }

    showModal() {
        super.showModal();

        if(!this.cartItems.length) {
            this.showEmptyCart();
            this.setContent();
        }

        if(!this.events) {
            this.modal.addEventListener('click', (event) => {
                if(event.target.dataset.eventName === 'modalHandlerOk') {
                    this.modalHandlerOk()
                } else if(event.target.dataset.eventName === 'modalHandlerCancel') {
                    this.modalHandlerCancel()
                } else if(event.target.classList.contains('b-button')) {
                    if(event.target.closest('.btn-dec')) {
                        this.setQty('dec', event.target.closest('.btn-dec').dataset.pid);
                    } else if (event.target.closest('.btn-inc')) {
                        this.setQty('inc', event.target.closest('.btn-inc').dataset.pid);
                    }

                    this.showBasketQty();
                }

                this.events = true;
            })
        }
    }

    setQty(value, id) {
        this.basketTotalItems = JSON.parse(localStorage.getItem('basketStorageNumItems'));
        const cartItem = this.cartItems.find(item => item.id === id);

        if(value === 'dec') {
            cartItem.qty > 0 ? cartItem.qty-- : 0;
            this.basketTotalItems > 0 ? this.basketTotalItems-- : 0;

            this.price -= cartItem.price;

            if(cartItem.qty === 0) {
                this.removeCartItem(id);
            }
            if( this.basketTotalItems === 0) {
                this.showBasketQty();
            }
        } else if (value === 'inc') {
            cartItem.qty++;
            this.basketTotalItems++;
            this.price += cartItem.price;
        }

        if(cartItem.qty > 0) {
            this.modal.querySelector(`.counter[data-pid="${id}"]`).textContent = cartItem.qty;
        }

        this.modal.querySelector('#cart-total-price').textContent = `${this.price}`

        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        localStorage.setItem('basketStorageNumItems', JSON.stringify(this.basketTotalItems))

        if( this.basketTotalItems === 0) {
            this.showEmptyCart()
            this.setContent();
        } else {
            this.showCartItems(this.cartItems)
        }
    }

    onBeforeShowModal() {
        super.onBeforeShowModal();

        this.cartItems = getItemFromStorage('cart');

        if(this.cartItems.length) {
            this.showCartItems(this.cartItems)
        } else {
            this.showEmptyCart()
        }
    }

    removeCartItem(id) {
        const index = this.cartItems.findIndex(item => item.id === id);
        this.cartItems.splice(index, 1);
        this.modal.querySelector(`[data-pid="${id}"]`).closest('.b-cart_product').remove();
    }

    showCartItems(items) {
        this.price = 0;

        const html = items.map(product => {
            this.price += product.price * product.qty;

            return renderCart(product);
        });

        html.push(renderTotalPrice(this.price))

        this.options = {
            title: 'Cart',
            body: html.join(' '),
            footerButtons: [
                { class: 'b-button m-primary', text: 'Checkout', handler: 'modalHandlerOk' },
                { class: 'b-button', text: 'Cancel', handler: 'modalHandlerCancel' }
            ]
        }
    }

    showEmptyCart() {
        this.options = {
            title: 'Cart',
            body: 'Your cart is empty'
        }
    }

    showBasketQty() {
        const basketStorageNumItems = getItemFromStorage('basketStorageNumItems', 0);

        this.basketTotalItems1.textContent = basketStorageNumItems;
        this.basketTotalItems1.classList.remove('hide');

        if(!basketStorageNumItems) {
            this.basketTotalItems1.classList.add('hide');
        }
    }

    modalHandlerCancel() {
        this.closeModal()
    }

    modalHandlerOk() {

    }
}
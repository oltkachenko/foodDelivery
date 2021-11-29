import { getItemFromStorage } from "../core/helpers.js";
import { renderCart } from "../templates/RenderCart.js";
import { Modal } from "./global/Modal.js";

export class Cart extends Modal {
    constructor(id) {
        super(id);
    }

    init() {
        this.$el.addEventListener('click', () => {
            this.showModal()
        })

        this.cartQty1 = this.$el.querySelector('.button-cart-text');
        this.showBasketQty();

        this.eventBus().on('basket.changed', this.showBasketQty.bind(this))
    }

    showModal() {
        super.showModal()

        console.log(this);

        this.modal.addEventListener('click', (event) => {
            if(event.target.dataset.eventName === 'modalHandlerOk') {
                this.modalHandlerOk()
            } else if(event.target.dataset.eventName === 'modalHandlerCancel') {
                this.modalHandlerCancel()
            } else if(event.target.classList.contains('counter-button')) {
                if(event.target.closest('.btn-dec')) {
                    this.setQty('dec', event.target.closest('.btn-dec').dataset.pid);
                } else if (event.target.closest('.btn-inc')) {
                    this.setQty('inc', event.target.closest('.btn-inc').dataset.pid);
                }

                this.showBasketQty();
            }
        })
    }

    setQty(value, id) {
        this.cartQty = JSON.parse(localStorage.getItem('basketStorageNumItems'));
        const cartItem = this.cartItems.find(item => item.id === id);

        if(value === 'dec') {
            cartItem.qty > 0 ? cartItem.qty-- : 0;
            this.cartQty > 0 ? this.cartQty-- : 0;

            if(cartItem.qty === 0) {
                this.removeCartItem(id);
            }
            if( this.cartQty === 0) {
                this.showBasketQty();
            }
        } else if (value === 'inc') {
            cartItem.qty++;
            this.cartQty++
        }

        if(cartItem.qty > 0) {
            this.modal.querySelector(`.counter[data-pid="${id}"]`).textContent = cartItem.qty;
        }

        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        localStorage.setItem('basketStorageNumItems', JSON.stringify(this.cartQty))

        if( this.cartQty === 0) {
            this.showEmptyCart()
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
        this.modal.querySelector(`.counter[data-pid="${id}"]`).closest('.food-row').remove();
    }

    showCartItems(items) {
        this.price = 0;

        const html = items.map(product => {
            this.price += product.price * product.qty;

            return renderCart(product);
        });

        this.options = {
            title: 'Cart',
            body: html.join(' '),
            footerButtons: [
                { class: 'button button-primary', text: 'Checkout', handler: 'modalHandlerOk' },
                { class: 'button clear-cart', text: 'Cancel', handler: 'modalHandlerCancel' }
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

        this.cartQty1.textContent = basketStorageNumItems;
        this.cartQty1.classList.remove('hide');

        if(!basketStorageNumItems) {
            this.cartQty1.classList.add('hide');
        }
    }

    modalHandlerCancel() {
        this.closeModal()
    }
}
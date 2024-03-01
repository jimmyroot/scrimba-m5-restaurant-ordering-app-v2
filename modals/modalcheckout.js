// modalcheckout.js
// ----------------------------------------------//
// The checkout modal and associated functions   //
// ----------------------------------------------//

import { cafe } from "../app/cafe"
import { modalViewBasket } from "./modalviewbasket"
import { modalOrderConfirmation } from "./modalorderconfirmation"
import styles from './modal.module.css'
import checkoutStyles from './modalcheckout.module.css'

const ModalCheckout = () => {

    // Use this function to add the event listeners. Use 'get()' first to append
    // this module's node to the DOM
    const addEventListeners = () => {
        node.addEventListener('click', e => {
            handleClick(e.target.dataset.type)
        })

        node.addEventListener('input', e => {        
            const input = e.target
            Boolean(input.value) ? input.classList.remove(styles.warning) : input.classList.add(styles.warning)
        })
    }

    const handleClick = type => {
        const execute = {
            pay: () => {
                const form = document.querySelectorAll('#form-card-detail')[0]
                if (isFormComplete(form)) handlePayment(form)
            },
            back: () => {
                hide()
                modalViewBasket.show()
            },
            hide: () => {
                hide()
            },
            discount: () => {
                // handle the call to cafe.handleApplyDiscount and set warning class if empty or invalid
                const inputDiscount = document.getElementById('ipt-discount')

                if (inputDiscount.value) {
                    const discountCode = inputDiscount.value.toUpperCase()
                    const codeIsValid = cafe.handleApplyDiscount(discountCode)
                    
                    if (codeIsValid) {
                        if (inputDiscount.classList.contains(styles.warning)) inputDiscount.classList.remove(styles.warning)
                    } else {
                        inputDiscount.classList.add(styles.warning)
                    }
                    
                } else {
                    inputDiscount.classList.add(styles.warning)
                }

                inputDiscount.value = ''
                refreshTotal()
            },
            removeDiscount: () => {
                cafe.handleApplyDiscount()
                refreshTotal()
            }
        }

        if (type) execute[type]()
    }

    const render = () => {
        const orderTotal = cafe.getOrderTotal()

        const modalHtml = `
            <div class="${styles.inner}">
                <header class="${styles.header}">
                    <h3 class="${styles.title}">Checkout</h3>
                    <div class="${styles.divider}"></div>
                    <button class="${styles.btnTopLeft}" data-type="back">
                        <i class='bx bx-chevron-left bx-md' ></i>
                    </button>
                    <button class="${styles.btnTopRight}" data-type="hide">
                        <i class='bx bx-x bx-md'></i>
                    </button>
                </header>
                <form class="${checkoutStyles.cardEntryForm}" id="form-card-detail">
                    <h4 class="${styles.subTitle}">Card details</h4>
                    <label for="card-name">Name</label>
                    <input class="${checkoutStyles.fullWidthInput}" id="card-name" placeholder="Name">                         
                    <label for="card-number">Card Number</label>
                    <input class="${checkoutStyles.fullWidthInput}" id="card-number" placeholder="Card Number">
                    <div class="${checkoutStyles.flexRowContainer}">
                        <label for="card-month-expire">Expiry Month</label>
                        <select class="${checkoutStyles.halfWidthInput}" name="Month" id="card-month-expire">
                            <option value="">Month</option>
                            <option value="january">January</option>
                            <option value="february">February</option>
                            <option value="march">March</option>
                            <option value="april">April</option>
                            <option value="may">May</option>
                            <option value="june">June</option>
                            <option value="july">July</option>
                            <option value="august">August</option>
                            <option value="september">September</option>
                            <option value="october">October</option>
                            <option value="november">November</option>
                            <option value="december">December</option>
                        </select>
                        <label for="card-year-expire">Expiry Year</label>
                        <select class="${checkoutStyles.halfWidthInput} ${checkoutStyles.selection}" name="Year" id="card-year-expire">
                            <option value="">Year</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                        </select>
                    </div>
                    <div class="${checkoutStyles.flexRowContainer}">
                        <label for="card-ccv">CCV</label>
                        <input class="${checkoutStyles.fullWidthInput} ${checkoutStyles.ccv}" id="card-ccv" placeholder="CCV">
                        <p class="${checkoutStyles.ccvDescription}">3 or 4 digits usually found on the back of your card</p>
                    </div>
                </form>
                <footer class="${styles.footer}">
                    <div class="${styles.total}" id="div-checkout-total">
                        <p>Total
                        :</p>
                        <p id="p-basket-total">£${orderTotal}</p>
                    </div>
                    <div class="${checkoutStyles.discount}">
                        <label for="ipt-discount">Discount code</label>
                        <input type="text" class="${checkoutStyles.fullWidthInput}" id="ipt-discount" placeholder="Discount code?">
                        <button class="${checkoutStyles.btnDiscount}" data-type="discount">
                            <i class='bx bx-chevron-right bx-md' ></i>
                        </button>    
                    </div>
                    <button class="${styles.btnMain}" id="btn-pay" data-type="pay">Pay</button>
                </footer>
            </div>
        `

        return modalHtml    
    }

    const refresh = () => {
        node.innerHTML = render()
        refreshTotal()
    }

    // Function to update just the total, if we render the whole modal again
    // we lose the input in the credit card input fields
    const refreshTotal = () => {
        const orderTotal = cafe.getOrderTotal()

        document.querySelector('#div-checkout-total').innerHTML = `
            <p>Total ${cafe.renderDiscountStatus(true)}:</p>
            <p id="p-basket-total">£${orderTotal}</p>
        `
    }

    const handlePayment = form => {
        form.reset()
        hide()
        modalOrderConfirmation.show()
    }

    const isFormComplete = form => {

        // Create an array of form elements filtered by value or not 
        const emptyInputs = [...form.elements].filter(element => !Boolean(element.value))
        // If there are empty elements, add warning class to them and return false
        if (emptyInputs.length > 0) {
            emptyInputs.forEach(input => input.classList.add(styles.warning))
            return false
        }
        // If there were no empty inputs return true
        return true
    }

    const show = () => {
        refresh()
        node.showModal()
    }

    const hide = () => {
        node.close()
    }

    const get = () => {
        return node
    }

    // Init base node
    const node = document.createElement('dialog')
    node.className += styles.modal
    node.id = 'modal-checkout'

    // Expose functions
    return {
        get,
        show,
        hide,
        addEventListeners
    }
}

export const modalCheckout = ModalCheckout()
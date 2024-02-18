import { app } from "../data/app"
import { modalViewBasket } from "./modalviewbasket"
import { btnViewBasket } from "../components/btnviewbasket"
import { modalOrderConfirmation } from "./modalorderconfirmation"
import { renderDiscountStatus, handleApplyDiscount } from "../helpers/helpers"

const ModalCheckout = () => {

    const addEventListeners = () => {
        node.addEventListener('click', e => {
            const handleClick = {
                pay: () => {
                    const form = document.querySelectorAll('#form-card-detail')[0]
                    if (isFormComplete(form)) handlePayment(form)
                },
                back: () => {
                    hide()
                    modalViewBasket.show()
                },
                close: () => {
                    hide()
                },
                discount: () => {
                    handleApplyDiscount()
                    refreshTotal()
                    btnViewBasket.refreshBtnViewBasket()
                }
            }

            const type = e.target.dataset.type
            if (type) handleClick[type]()
        }
    )}

    const renderContent = () => {
        const discountMultiplier = app.getDiscountMultiplier()
        const orderTotal = app.getOrderTotal()

        const modalHtml = `
            <div class="modal-inner">
                <header>
                    <h3 class="modal-title">Checkout</h3>
                    <div class="div-divider div-divider-accent"></div>
                    <button class="btn-modal-back" data-type="back">
                        <i class='bx bx-chevron-left bx-md' ></i>
                    </button>
                    <button class="btn-modal-close" data-type="close">
                        <i class='bx bx-x bx-md'></i>
                    </button>
                </header>
                <form class="form-card-detail" id="form-card-detail">
                    <h4 class="h4-card-det">Card details</h4>
                    <label for="card-name">Name</label>
                    <input class="ipt-card" id="card-name" placeholder="Name">                         
                    <label for="card-number">Card Number</label>
                    <input class="ipt-card" id="card-number" placeholder="Card Number">
                    <div class="div-card-detail-2-column">
                        <label for="card-month-expire">Expiry Month</label>
                        <select class="sel-card" name="Month" id="card-month-expire">
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
                        <select class="sel-card" name="Year" id="card-year-expire">
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
                    <div class="div-card-detail-2-column">
                        <label for="card-ccv">CCV</label>
                        <input class="ipt-card ipt-card-ccv" id="card-ccv" placeholder="CCV">
                        <p class="p-ccv">3 or 4 digits usually found on the back of your card</p>
                    </div>
                </form>
                <footer>
                    <div class="div-space-between" id="div-checkout-total">
                        <p>Total
                            ${renderDiscountStatus(discountMultiplier)}
                        :</p>
                        <p id="p-basket-total">£${orderTotal}</p>
                    </div>
                    <div class="div-discount">
                        <label for="ipt-discount">Discount code</label>
                        <input type="text" class="ipt-discount" id="ipt-discount" placeholder="Discount code?">
                        <button class="btn-modal-discount" data-type="discount">
                            <i class='bx bx-chevron-right bx-md' ></i>
                        </button>    
                    </div>
                    <button class="btn-modal-main" id="btn-pay" data-type="pay">Pay</button>
                </footer>
            </div>
        `

        return modalHtml    
    }

    const refreshContent = () => {
        // document.querySelector('#modal-checkout')
        node.innerHTML = renderContent()
    }

    const refreshTotal = () => {
        const discountMultiplier = app.getDiscountMultiplier()
        const orderTotal = app.getOrderTotal()

        document.querySelector('#div-checkout-total').innerHTML = `
            <p>Total ${renderDiscountStatus(discountMultiplier)}:</p>
            <p id="p-basket-total">£${orderTotal}</p>
        `
    }

    const handlePayment = (form) => {
        form.reset()
        hide()
        modalOrderConfirmation.show()
    }

    const isFormComplete = (form) => {
        // Create an array of form elements filtered by value or not 
        const emptyInputs = [...form.elements].filter(element => !Boolean(element.value))
        // If there are empty elements, add warning class to them and return false
        if (emptyInputs.length > 0) {
            emptyInputs.forEach(input => input.classList.add('warning'))
            return false
        }
        // If there were no empty inputs return true
        return true
    }

    const show = () => {
        refreshContent()
        document.querySelector('#modal-checkout').showModal()
    }

    const hide = () => {
        document.querySelector('#modal-checkout').close()
    }

    const get = () => {
        return node
    }

    // Call this when instantiating the element, probably in index.js
    const node = document.createElement('dialog')
    node.classList.add('modal')
    node.id = 'modal-checkout'
    refreshContent()

    return {
        get,
        addEventListeners,
        show,
        hide
    }
}

export const modalCheckout = ModalCheckout()
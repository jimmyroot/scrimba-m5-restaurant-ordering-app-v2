import { header } from './layout/header'
import { footer } from './layout/footer'
import divInnerContainer from './layout/inner'
import menu from './components/menu'
import { btnViewBasket } from './components/btnviewbasket'
import { modalViewBasket } from './modals/modalviewbasket'
import { modalCheckout } from './modals/modalcheckout'
import { modalOrderConfirmation } from './modals/modalorderconfirmation'
import { modalMyOrders } from './modals/modalmyorders'
import { modalDiscounts } from './modals/modaldiscounts'

// Grab what we need from the DOM (only if we use it more than once in the rest of our code)
// const ulMenu = document.getElementById('ul-menu')
// const ulMenuFilter = document.getElementById('ul-menu-filter')
// const secBasket = document.getElementById('sec-basket')
// const modalBasket = document.getElementById('modal-basket')
// const modalCheckout = document.getElementById('modal-checkout')
// const modalOrderConfirmation = document.getElementById('modal-order-confirmation')
// const modalMyOrders = document.getElementById('modal-my-orders')
// const modalDiscounts = document.getElementById('modal-discounts')
// const formCardDet = document.querySelectorAll('#form-card-detail')[0]


// Init vars
let basket = []
let orderHistory = []
let discountMultiplier = 0
let currentStarRating = 1
// const defaultCategory = 'coffee'
const discountCodes = {
    'JAN10': 0.9,
    'OFF20': 0.8
}

// ----------------------- //
// --- EVENT LISTENERS --- //
// ----------------------- //


// Footer nav
// document.getElementById('ul-footer-nav').addEventListener('click', e => {
//     const type = e.target.dataset.type
//     const tag = e.target.tagName

//     // I use this object literal 'switch' style whenever a modal has more than one button
//     const handleClick = {
//         orders: () => {
//             showModal(modalMyOrders, true)
//         },
//         discounts: () => {
//             showModal(modalDiscounts, true)
//         }
//     }
//     if (type) handleClick[type]()
//     if (tag === 'BUTTON') handleSelectNav(e.target)

// })

// Basket buttons, go to checkout, remove ite, or close
// modalBasket.addEventListener('click', e => {
//     const type = e.target.dataset.type
    
//     const handleClick = {
//         checkout: () => {
//             showModal(modalBasket, false)
//             showModal(modalCheckout, true)
//         },
//         close: () => {
//             showModal(modalBasket, false)
//         },
//         remove: () => {
//             handleRemoveItemFromOrder(e.target.dataset.instanceId)
//         }
//     }

//     if (type) handleClick[type]()
// })

// Checkout buttons 1. Pay 2. Back to basket 3. Close 4. Apply discount
// modalCheckout.addEventListener('click', e => {
//     modalCheckout.addEventListener('click', e => {
//     const type = e.target.dataset.type

//     const handleClick = {
//         pay: () => {
//             if (isFormComplete(formCardDet)) handlePayment()
//         },
//         back: () => {
//             showModal(modalCheckout, false)
//             showModal(modalBasket, true)
//         },
//         close: () => {
//             showModal(modalCheckout, false)
//         },
//         discount: () => {
//             handleApplyDiscount()
//         }
//     }
    
//     if (type) handleClick[type]()
// })
// })

// Discounts modal close btn
// modalDiscounts.addEventListener('click', e => {
//     const type = e.target.dataset.type
//     if (type === 'close') showModal(modalDiscounts, false)
// })

// My Orders (order history) modal close btn
// modalMyOrders.addEventListener('click', e => {
//     const type = e.target.dataset.type
//     if (type === 'close') showModal(modalMyOrders, false)
// })

// Credit card form — every time the value changes, remove warnng if a value exists, else
// add the warning class
// formCardDet.addEventListener('input', e => {        
//     const input = e.target
//     Boolean(input.value) ? input.classList.remove('warning') : input.classList.add('warning')
// })

// ------------------------ //
// --- RENDER FUNCTIONS --- // 
// ------------------------ //

// Render the main menu according to the category we pass in; categories can be found in menuArray


// Render checkout modal; not much to do here except update the total and show 
// if a discount is applied. Called when the modal is shown and when a user enters 


// Render order confirmation, show a list of the items ordered and if a discount 


// Render the Order history modal, called just before the 'my-orders' modal is displayed.
// Similar functionality to the other render loops in the project
const renderOrderHistory = orderHistory => {
    document.getElementById('ul-order-history').innerHTML = orderHistory.map((order, index, arr) => {
        const isLastIter = ((index + 1) === arr.length)
        const starRating = []
        while (starRating.length < order.starRating) {
            starRating.push(`<i class="bx bxs-star"></i>`)
        } 
        
        return `
            <li class="li-order-history">
                <div class="div-space-between">
                        <p>${order.date}</p>
                        <p>£${order.total}</p>
                </div>
                <p>${order.items.map(item => item).join(', ')}</p>
                <p>You thought this order was: ${starRating.map(star => star).join('')}</p>
            </li>
            ${isLastIter ? '' : '<div class="div-divider div-divider-accent"></div>'}
        `
    }).join('')
}

// Render discounts modal, called just before discounts modal is displayed. Maps through
// discountCodes object, calculates percentage discount for each multiplier and displays it 
// in a list
const renderDiscounts = discountCodes => {
    const html = Object.entries(discountCodes).map((obj, index, arr) => {
        const isLastIter = ((index + 1) === arr.length)
        const percentage = (100-(obj[1] / 1 * 100))
        return `
            <li class="li-discount-code">
                <p>Enjoy ${percentage}% off with code <span class="spn-code">${obj[0]}</span></p>
            </li>
            ${isLastIter ? '' : '<div class="div-divider div-divider-accent"></div>'}
        `
    }).join('')
    document.getElementById('ul-discounts').innerHTML = html
}

// Build the main screen
document.querySelector('#app-container').appendChild(header.getHeader())
document.querySelector('#app-container').appendChild(divInnerContainer)
document.querySelector('#div-inner-container').appendChild(menu)
document.querySelector('#div-inner-container').appendChild(btnViewBasket.getElement())
document.querySelector('#div-inner-container').appendChild(footer.get())

// Add the modals 
document.querySelector('#div-inner-container').appendChild(modalViewBasket.get())
document.querySelector('#div-inner-container').appendChild(modalCheckout.get())
document.querySelector('#div-inner-container').appendChild(modalOrderConfirmation.get())
document.querySelector('#div-inner-container').appendChild(modalMyOrders.get())
document.querySelector('#div-inner-container').appendChild(modalDiscounts.get())

btnViewBasket.addEventListeners()
footer.addEventListeners()
modalViewBasket.addEventListeners()
modalCheckout.addEventListeners()
modalOrderConfirmation.addEventListeners()
modalMyOrders.addEventListeners()
modalDiscounts.addEventListeners()

// TODO 1: Can we move render stars into it's own component
// TODO 2: Finish the last modal
// TODO 3: Homogenize all modals (refreshContent etc)
// TODO 4: Add event listeners to my orders modal (Finish myOrders modal)
// TODO 5: Add a 'Clear order' button on the main screen
// TODO 6: Add functionality to count how many of each item has been ordered and display it
//         in the relevant places
// TODO 7: Add a getPercentage helper function to use when rendering the discounts
// TODO 8: Get rid of the isLastIter function
// TODO 9: Get rid of focus highlight on footer nav
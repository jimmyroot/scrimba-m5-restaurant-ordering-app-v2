import { app } from './data/app'
import menuArray from './data/menu'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'
// import header from './layout/header'
import { header } from './layout/header'
import { footer } from './layout/footer'
import divInnerContainer from './layout/inner'
import menu from './components/menu'
import { btnViewBasket } from './components/btnviewbasket'
import { modalViewBasket } from './modals/modalviewbasket'
import { modalCheckout } from './modals/modalcheckout'
import { modalOrderConfirmation } from './modals/modalorderconfirmation'

console.log(btnViewBasket)

// Grab what we need from the DOM (only if we use it more than once in the rest of our code)
const ulMenu = document.getElementById('ul-menu')
const ulMenuFilter = document.getElementById('ul-menu-filter')
const secBasket = document.getElementById('sec-basket')
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

// Order type btns
// document.getElementById('div-order-type').addEventListener('click', e => {
//     const id = e.target.dataset.id
//     if (id) handleSelectOrderType(e.target)
// })

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



// Menu item add btns
// ulMenu.addEventListener('click', e => {
//     const id = e.target.dataset.id
//     if (id) handleAddItemToOrder(id)
// })

// View basket btn (via parent section element, so we can re-render btn whenever we want)
// secBasket.addEventListener('click', e => {
//     const type = e.target.dataset.type
//     if (type === 'basket') showModal(modalBasket, true)
// })

// // Order confirmation modal, just a close btn (resets order system when clicked)
// modalordernfirmation.addEventListener('click', e => {
//     const type = e.target.dataset.type
//     console.log(e.target.dataset.starId)

//     const handleClick = {
//         close: () => {
//             showModal(modalOrderConfirmation, false)
//         },
//         star: () => {
//             renderStars(e.target.dataset.starId)
//         }
//     }
//     if (type) handleClick[type]()
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

// Refreshes the View Basket button on the main page according to current basket contents
// Should be called whenever basket is changed


// Renders the menu filter buttons according to the categories in the menuArry. Categories
// are generated dynamically, so we can easily add more items with new categories to the array 


// Highlight whichever order type the user selected (this is cosmetic only, no real function in this app)
// const handleSelectOrderType = target => {
//     document.querySelectorAll('.btn-order-type.selected').forEach(el => el.classList.remove('selected'))
//     target.classList.add('selected')
// }

// Highlight selected footer button. If no target is passed in, nothing gets selected and any existing selections
// are removed


// Take care of cosmetics when selecting a filter button, and re-render the menu to show the selected
// category
// Reset the ordering system, clear basket, clear discount codes etc...
const handleReset = () => {
    basket = []
    discountMultiplier = 0
    currentStarRating = 1
    renderViewBasketBtn(basket)
}

// Called before handle reset when user closes the order confirmation modal
const saveOrder = basket => {
    // Build an object containing details about the currentorder and push it to the 
    // orderHistory array
    const orderObj = {
        items: basket.map(item => item.name),
        total: getOrderTotal(basket),
        starRating: currentStarRating,
        date: new Date().toLocaleDateString('en-GB', {
            month: 'short',
            day: 'numeric',
        })
    }
    orderHistory.push(orderObj)
}

// Apply discount if valid

// ------------------------ //
// --- HELPER FUNCTIONS --- //
// ------------------------ //

// Calculate order total (with discount, if applied)

// Used when rendering totals, if discount is applied return a span with a 'discount applied' message,
// else return an empty string; to be used inside string template


// Show or hide the specified modal, and call the respective function assigned
// to the id of the modal we're displaying; in this way we can execute tasks 
// before showing the modal dialog
const showModal = (modal, doShow) => {
    
    // These functions will be called before the modal displays
    const getReadyToShow = {
        'modal-my-orders': () => {
            renderOrderHistory(orderHistory)
        },
        'modal-basket': () => {
            renderBasket(basket)
        },
        'modal-checkout': () => {
            renderCheckout(basket)
        },
        'modal-order-confirmation': () => {
            renderOrderConfirmation(basket)
        },
        'modal-discounts': () => {
            renderDiscounts(discountCodes)
        }
    }
    
    // These functions will be called when a given modal is closed
    const cleanUp = {
        'modal-my-orders': () => {
            handleSelectNav()
        },
        'modal-order-confirmation': () => {
            saveOrder(basket)
            handleReset()
        },
        'modal-discounts': () => {
            handleSelectNav()
        }
    }
    
    // are we showing (doShow = true) or not? 
    if (doShow) {
        // If we specified any setup code for the modal, run it now
        if (Object.keys(getReadyToShow).includes(modal.id)) getReadyToShow[modal.id]()
        modal.showModal()
    } else {
        // If there's any cleanup code to run, do so
        if (Object.keys(cleanUp).includes(modal.id)) cleanUp[modal.id]()
        modal.close()
    }
}
// Show the menu
// renderMenu(menuArray, defaultCategory)
// renderViewBasketBtn(basket)
// renderFilterBtns(defaultCategory)

// Build the main screen
document.querySelector('#app-container').appendChild(header.getHeader())
document.querySelector('#app-container').appendChild(divInnerContainer)
document.querySelector('#div-inner-container').appendChild(menu)
document.querySelector('#div-inner-container').appendChild(btnViewBasket.getElement())
document.querySelector('#div-inner-container').appendChild(footer.getElement())

// Add the modals 
document.querySelector('#div-inner-container').appendChild(modalViewBasket.getElement())
document.querySelector('#div-inner-container').appendChild(modalCheckout.getElement())
document.querySelector('#div-inner-container').appendChild(modalOrderConfirmation.getElement())


btnViewBasket.addEventListeners()
footer.addEventListeners()
modalViewBasket.addEventListeners()
modalCheckout.addEventListeners()
modalOrderConfirmation.addEventListeners()
export { appState }

import menuArray from './data/menu'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'
import header from './layout/header'
import footer from './layout/footer'
import divInnerContainer from './layout/inner'
import menu from './components/menu'
import btnViewBasket from './components/btnviewbasket'
import appState from './data/appState'
import modalViewBasket from './modals/modalviewbasket'

console.log(btnViewBasket)

// Grab what we need from the DOM (only if we use it more than once in the rest of our code)
const ulMenu = document.getElementById('ul-menu')
const ulMenuFilter = document.getElementById('ul-menu-filter')
const secBasket = document.getElementById('sec-basket')
const modalBasket = document.getElementById('modal-basket')
const modalCheckout = document.getElementById('modal-checkout')
const modalOrderConfirmation = document.getElementById('modal-order-confirmation')
const modalMyOrders = document.getElementById('modal-my-orders')
const modalDiscounts = document.getElementById('modal-discounts')
const formCardDet = document.querySelectorAll('#form-card-detail')[0]


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
// modalOrderConfirmation.addEventListener('click', e => {
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
const renderMenu = (menu, category = 'coffee') => {

    // Filter the menu, chain map to keep things neat
    ulMenu.innerHTML = menu.filter(item => item.category === category).map((item, index, arr) => {
        const {name, ingredients, price, imageURL, id} = item
        // Create a boolean isLastIter to track if we are on the last iteration
        const isLastIter = ((index + 1) === arr.length)
        return `
            <li class="li-menu-item">
                <img class="img-item" src="${imageURL}">
                <div>
                    <span class="spn-item-name">${name}</span>
                    <span class="spn-item-dets">
                        ${ingredients.map(ingredient => ingredient).join(', ')}
                    </span>
                    <span class="spn-item-dets">£${price.toFixed(2)}</span>
                </div>
                <button class="btn-add" data-id="${id}">
                    <i class='bx bx-plus bx-md'></i>
                </button>
            </li>
            ${isLastIter ? '' : '<div class="div-divider div-divider-primary"></div>'}
        `
    }).join('')
}

// Render basket contents in basket modal, called before we show the basket modal
const renderBasket = basket => {

    // Generate html for items in basket
    const htmlBasket = basket.map((item, index, arr) => {
        const {name, ingredients, price, imageURL, instanceId} = item
        const isLastIter = ((index + 1) === arr.length)
        return `
            <li class="li-menu-item">
                <img class="img-item" src="${imageURL}">
                <div>
                    <span class="spn-item-name">${name}</span>
                    <span class="spn-item-dets">
                        ${ingredients.map(ingredient => ingredient).join(', ')}
                    </span>
                    <span class="spn-item-dets">£${price.toFixed(2)}</span>
                </div>
                <button class="btn-remove" data-instance-id="${instanceId}" data-type="remove">
                    <i class='bx bx-minus bx-sm'></i>
                </button>
            </li>
            ${isLastIter ? '' : '<div class="div-divider div-divider-accent"></div>'}
        `
    }).join('')

    // Create the html for the basket total. Use our renderDiscountStatus to show
    // if the user has used a discount code
    const htmlTotal = `
        <p>Total ${renderDiscountStatus(discountMultiplier)}:</p>
        <p id="p-basket-total">£${getOrderTotal(basket)}</p>
    `

    // Render the basket contents and total amount in respective elements
    document.getElementById('ul-basket-items').innerHTML = htmlBasket
    document.getElementById('div-basket-total').innerHTML = htmlTotal
    
    // Set the checkout button to disabled if the basket is empty, or vice versa
    enableButtons([document.getElementById('btn-checkout')], basket.length > 0)
    
    // When the basket is rendered we need to update the button on the main page, so we
    // may as well do that here
    renderViewBasketBtn(basket)
}

// Render checkout modal; not much to do here except update the total and show 
// if a discount is applied. Called when the modal is shown and when a user enters 
// a discount code, valid or not
const renderCheckout = basket => {

    const htmlCheckoutTotal = `
        <p>Total ${renderDiscountStatus(discountMultiplier)}:</p>
        <p id="p-basket-total">£${getOrderTotal(basket)}</p>
    `
    document.getElementById('div-checkout-total').innerHTML = htmlCheckoutTotal
}

// Render order confirmation, show a list of the items ordered and if a discount 
// was applied. Also, show star rating
const renderOrderConfirmation = basket => {
   
    let html = basket.map(item => {
        return `
            <div class="div-ordered-item">
                <p>${item.name}</p><p>£${item.price.toFixed(2)}</p>
            </div>
        `
    }).join('')

    html += `
        <li>
            <div class="div-divider div-divider-accent"></div>
            <div class="div-space-between">
                <p>Total: ${renderDiscountStatus(discountMultiplier)}</p>
                <p>£${getOrderTotal(basket)}</p>
            </div>
        </li>
    `

    document.getElementById('u-modal-order-complete-details').innerHTML = html
    renderStars(currentStarRating)
}

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
const renderViewBasketBtn = basket => {
    secBasket.innerHTML = `
        <button class="btn btn-view-basket" id="btn-view-basket" data-type="basket">
            <i class="bx bx-basket bx-lg"></i>
            <span class="span-item-count">${basket.length}</span>
            <span>View basket</span>
            <span class="span-basket-total">£${getOrderTotal(basket)}</span>
        </button>`
}

// Renders the menu filter buttons according to the categories in the menuArry. Categories
// are generated dynamically, so we can easily add more items with new categories to the array 
// without doing any extra work
const renderFilterBtns = defaultCategory => {
    // Use spread along with new Set() to get an array of unique category values from which
    // we can build the list
    const filterCategories = [...new Set(menuArray.map(item => item.category))]
    // Render the buttons
    ulMenuFilter.innerHTML = filterCategories.map(category => {
        // Convert first letter to uppercase for the cateogry text
        const btnTxt = category.charAt(0).toUpperCase() + category.slice(1)
        const isSelected = category === defaultCategory ? 'selected' : ''
        return `
            <li class="li-menu-filter">
                <button class="btn-filter-category ${isSelected}" data-filter="${category}">${btnTxt}</button>
            </li>
        `
    }).join('')
}

// Render the stars 
const renderStars = numberOfStars => {
    currentStarRating = numberOfStars
    let starArr = []
    for (let star = 1; star <= 5; star++) {
        star <= currentStarRating ? 
            starArr.push(`
                <li class="li-star solid" data-type="star" data-star-id="${star}">
                    <i class="bx bxs-star"></i>
                </li>
            `) : 
            starArr.push(`
                <li class="li-star" data-type="star" data-star-id="${star}">
                    <i class="bx bxs-star" ></i>
                </li>
            `)
    }
    document.getElementById('ul-star-rating').innerHTML = starArr.map(star => star).join('')
}

// EVENT HANDLERS

// Add item to order; use structuredClone() to create a deep copy of the selected item and
// push it to the basket array with a UUID. Now we can add/remove multiple items of the same type
const handleAddItemToOrder = (id) => {
    // Find the item
    const itemToAdd = menuArray.find(item => item.id === +id)
    // Copy it
    let copyOfItemToAdd = structuredClone(itemToAdd)
    // Add UUID
    copyOfItemToAdd.instanceId = uuidv4()
    basket.push(copyOfItemToAdd)
    // Update View Basket button
    renderViewBasketBtn(basket)
}

// Remove item from basket based using it's instanceId
const handleRemoveItemFromOrder = (instanceIdToRemove) => {
    // Use reduce to return a new array that doesn't include the item
    // we're removing
    basket = basket.reduce((arr, item) => {
        if (item.instanceId !== instanceIdToRemove) arr.push(item)
        return arr
    }, [])

    renderBasket(basket)
}

// Highlight whichever order type the user selected (this is cosmetic only, no real function in this app)
// const handleSelectOrderType = target => {
//     document.querySelectorAll('.btn-order-type.selected').forEach(el => el.classList.remove('selected'))
//     target.classList.add('selected')
// }

// Highlight selected footer button. If no target is passed in, nothing gets selected and any existing selections
// are removed


// Take care of cosmetics when selecting a filter button, and re-render the menu to show the selected
// category

const handlePayment = () => {
    // Reset the card details form, hide checkout modal, show order confirmation modal
    formCardDet.reset()
    showModal(modalCheckout, false)
    showModal(modalOrderConfirmation, true)
}

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
const handleApplyDiscount = () => {
    const iptDiscount = document.getElementById('ipt-discount')
    const code = iptDiscount.value
    // Check if the discount code exists 
    if (Object.keys(discountCodes).includes(code)) {
        // If so set the discountMultiplier
        discountMultiplier = discountCodes[code]
        // Remove the warning class if it's there
        if (iptDiscount.classList.contains('warning')) iptDiscount.classList.remove('warning')
        renderCheckout(basket)
    } else {
        // disable discount, show warning; the discount code was invalid
        discountMultiplier = 0
        iptDiscount.classList.add('warning')
        renderCheckout(basket)
    }
    iptDiscount.value = ''
}

// ------------------------ //
// --- HELPER FUNCTIONS --- //
// ------------------------ //

// Calculate order total (with discount, if applied)
const getOrderTotal = order => {
    if (order.length > 0) {
        let total = order.map(
            item => item.price
        ).reduce(
            (total, price) => total + price
        )
        if (discountMultiplier) total *= discountMultiplier
        return total.toFixed(2)
    } else {
        return "0.00"
    }
}

// I guess we would validate the credit card details here in a real app,
// for now we just check that the fields aren't empty
const isFormComplete = form => {
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

// Used when rendering totals, if discount is applied return a span with a 'discount applied' message,
// else return an empty string; to be used inside string template
const renderDiscountStatus = discountMultiplier => {
    if (discountMultiplier > 0) {
        const percentDiscount = getDiscountPercentage(discountMultiplier)
        return `
            <span class="spn-discount">
                (${percentDiscount}% discount applied)
            </span>&nbsp;
        `
    }
    return ''
}

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

// Takes an array of buttons and a boolean to enable them or not
const enableButtons = (buttons, doEnable) => {
    if (buttons.length > 0) buttons.forEach(button => button.disabled = !doEnable)
}

// Get percentage of currently applied discount
const getDiscountPercentage = discountMultiplier => {
    return (100-(discountMultiplier / 1 * 100))
}

// Show the menu
// renderMenu(menuArray, defaultCategory)
// renderViewBasketBtn(basket)
// renderFilterBtns(defaultCategory)

document.querySelector('#app-container').appendChild(header)
document.querySelector('#app-container').appendChild(divInnerContainer)
document.querySelector('#div-inner-container').appendChild(menu)
document.querySelector('#div-inner-container').appendChild(btnViewBasket)
document.querySelector('#div-inner-container').appendChild(footer)
document.querySelector('#div-inner-container').appendChild(modalViewBasket)
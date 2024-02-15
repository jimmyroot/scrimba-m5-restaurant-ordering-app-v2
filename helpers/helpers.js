import appState from "../data/appState"
import { refreshBasket } from "../modals/modalviewbasket"
import { handleSelectNav } from "../layout/footer"

export { getOrderTotal, showModal }

const getOrderTotal = (order, discountMultiplier) => {
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

// Show or hide the specified modal, and call the respective function assigned
// to the id of the modal we're displaying; in this way we can execute tasks 
// before showing the modal dialog
const showModal = (modal, doShow) => {
    
    // These functions will be called before the modal displays
    const getReadyToShow = {
        'modal-my-orders': () => {
            renderOrderHistory(appState.orderHistory)
        },
        'modal-basket': () => {
            refreshBasket(appState.basket)
        },
        'modal-checkout': () => {
            renderCheckout(appState.basket)
        },
        'modal-order-confirmation': () => {
            renderOrderConfirmation(appState.basket)
        },
        'modal-discounts': () => {
            renderDiscounts(appState.discountCodes)
        }
    }
    
    // These functions will be called when a given modal is closed
    const cleanUp = {
        'modal-my-orders': () => {
            handleSelectNav()
        },
        'modal-order-confirmation': () => {
            saveOrder(appState.basket)
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
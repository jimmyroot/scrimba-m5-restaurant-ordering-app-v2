import { app } from '../data/app'

// import { refreshBasket } from "../modals/modalviewbasket"
// import { handleSelectNav } from "../layout/footer"

export { renderDiscountStatus, handleApplyDiscount, enableButtons }

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

const renderDiscountStatus = discountMultiplier => {
    let html = ''
    if (discountMultiplier > 0) {
        const percentDiscount = getDiscountPercentage(discountMultiplier)
        html = `
            <span class="spn-discount">
                (${percentDiscount}% discount applied)
            </span>&nbsp;
        `
    }
    return html
}

// Apply discount if valid
const handleApplyDiscount = () => {
    const inputDiscount = document.getElementById('ipt-discount')
    const code = inputDiscount.value
    const discountCodes = app.getDiscountCodes()

    // Check if the discount code exists 
    if (Object.keys(discountCodes).includes(code)) {
        // If so set the discountMultiplier
        app.setDiscountMultiplier(discountCodes[code])
        // Remove the warning class if it's there
        if (inputDiscount.classList.contains('warning')) inputDiscount.classList.remove('warning')
        // renderCheckout(basket)
    } else {
        // disable discount, show warning; the discount code was invalid
        app.setDiscountMultiplier(0)
        inputDiscount.classList.add('warning')
        // renderCheckout(basket)
    }
    inputDiscount.value = ''
}

const getDiscountPercentage = discountMultiplier => {
    return (100-(discountMultiplier / 1 * 100))
}   

const enableButtons = (buttons, doEnable) => {
    buttons.forEach(button => button.disabled = true)
    // if (buttons.length > 0) buttons.forEach(button => button.disabled = !doEnable)
}
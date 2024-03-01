// cafe.js
// -------------------------------------------------------------------//
// All of the core app functions (e.g. order handling) happens here   //
// -------------------------------------------------------------------//

import menuArray from './data'
import { btnViewBasket } from '../components/btnviewbasket'
import { discount, btnRemoveDiscount } from '../modals/modal.module.css'

const Cafe = () => {

    // Init app variables

    let basket = []
    let orderHistory = []
    let discountMultiplier = 0
    let currentStarRating = 3
    const discountCodes = {
        'JAN10': 0.9,
        'OFF20': 0.8
    }
   
    // Getters

    const getBasket = () => {
        return basket
    }

    const getDiscountMultiplier = () => {
        return discountMultiplier
    }

    const getOrderHistory = () => {
        return orderHistory 
    }

    const getCurrentStarRating = () => {
        return currentStarRating 
    }

    const getDiscountCodes = () => {
        return discountCodes
    }
     
    const getMenuArray = () => {
        return menuArray
    }

    // Setters

    const setDiscountMultiplier = multiplier => {
        discountMultiplier = multiplier
    }

    const setCurrentStarRating = numStars => {
        currentStarRating = numStars
    }

    // App functionality

    const addToBasket = idToAdd => {
        const itemToAdd = menuArray.find(item => item.id === idToAdd)
        // Deep copy the item
        let copyOfItemToAdd = structuredClone(itemToAdd)
        
        // Has this item already been added?
        const itemInBasket = basket.find(item => item.id === copyOfItemToAdd.id)
        
        // If yes, increase count, else push the new item to the basket
        if (itemInBasket) {
            itemInBasket.count++
        } else {
            copyOfItemToAdd.count = 1
            basket.push(copyOfItemToAdd)
        }
        
        btnViewBasket.refresh(basket, getOrderTotal())
    }
    
    const removeFromBasket = idToRemove => {
        
        const itemToRemove = basket.find(item => item.id === idToRemove)
        itemToRemove.count--
        
        // Remove the item from the basket if the count is less than 1 (i.e. nothing)
        if (itemToRemove.count < 1) {
            basket = basket.reduce((arr, item) => {
                if (item.id !== idToRemove) arr.push(item)
                return arr
             }, [])
        }
    
        btnViewBasket.refresh(basket, getOrderTotal())
    }

    const clearBasket = () => {
        basket = []
        btnViewBasket.refresh()
    }

    const archiveOrder = () => {

        // Build an object containing details about the currentorder and push it to the 
        // orderHistory array
        const orderObj = {
            items: basket.map(item => {
                return [
                    item.name,
                    item.count
                ]
            }),
            total: getOrderTotal(basket),
            starRating: currentStarRating,
            date: new Date().toLocaleDateString('en-GB', {
                month: 'short',
                day: 'numeric',
            })
        }

        orderHistory.push(orderObj)
    }

    const getOrderTotal = () => {

        // Iterate the basket and use reduce to add up the price as we go along
        if (basket.length > 0) {
            let total = basket.map(
                item => (item.price * item.count)
            ).reduce(
                (total, price) => total + price
            )

            // Apply discount if necessary before returning
            if (discountMultiplier) total *= discountMultiplier
            return total.toFixed(2)
        } else {
            return '0.00'
        }
    }

    const handleReset = () => {
        basket = []
        discountMultiplier = 0
        currentStarRating = 3
        btnViewBasket.refresh(basket, getOrderTotal())
    }

    // Apply discount or not
    const handleApplyDiscount = (discountCode = '') => {

        // Check if the discount code exists 
        if (Object.keys(discountCodes).includes(discountCode)) {
            // If so set the discountMultiplier & remove any warnings
            setDiscountMultiplier(discountCodes[discountCode])
            btnViewBasket.refresh(basket, getOrderTotal())
            return true
        } else {
            // disable discount, show warning; the discount code was invalid
            setDiscountMultiplier(0)
            btnViewBasket.refresh(basket, getOrderTotal())
            return false
        }     
    }
    
    // Sends back a little 'badge' in html if a discount is active, returns empty string if not
    // If you call this with 'true' as an argument, it will render the 'remove discount' button
    const renderDiscountStatus = (showRemoveButton = false) => {
        let html = ''
        if (discountMultiplier > 0) {
            const percentDiscount = getDiscountPercentage(discountMultiplier)
            html = `
                <span class="${discount}">
                    ${percentDiscount}% discount applied
                    ${showRemoveButton ? `<button class="${btnRemoveDiscount}" data-type="removeDiscount"><i class='bx bx-x bx-sm'></i></button>` : ``}
                </span>&nbsp;
            `
        }
        return html
    }
    
    // 
    // A little helper function to get the percentage for a given discount
    const getDiscountPercentage = discountMultiplier => {
        return (100-(discountMultiplier / 1 * 100))
    }
    
    // Expose functions
    return {
        getBasket,
        getMenuArray,
        getDiscountMultiplier,
        getOrderHistory,
        getCurrentStarRating,
        getDiscountCodes,
        getOrderTotal,
        setDiscountMultiplier,
        setCurrentStarRating,
        addToBasket,
        removeFromBasket,
        clearBasket,
        archiveOrder,
        renderDiscountStatus,
        handleReset,
        handleApplyDiscount
    }
}

export const cafe = Cafe()
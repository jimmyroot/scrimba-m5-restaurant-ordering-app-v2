import { v4 as newUUID } from 'https://jspm.dev/uuid'
import menuArray from './data'
import { btnViewBasket } from '../components/btnviewbasket'
import { discount, warning } from '../modals/modal.module.css'

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
    
    const setDiscountMultiplier = ( multiplier ) => {
        discountMultiplier = multiplier
    }

    const setCurrentStarRating = ( numStars ) => {
        currentStarRating = numStars
    }

    const getMenuArray = () => {
        return menuArray
    }

    const addToBasket = ( id ) => {
        const itemToAdd = menuArray.find(item => item.id === +id)
        // Deep copy the item
        let copyOfItemToAdd = structuredClone(itemToAdd)
        copyOfItemToAdd.instanceId = newUUID()
        basket.push(copyOfItemToAdd)
        btnViewBasket.refresh(basket, getOrderTotal())
    }

    const removeFromBasket = ( instanceIdToRemove ) => {
        // Use reduce to return a new array that doesn't include the item
        // we're removing
        basket = basket.reduce((arr, item) => {
            if (item.instanceId !== instanceIdToRemove) arr.push(item)
            return arr
        }, [])
        btnViewBasket.refresh(basket, getOrderTotal())
    }

    const archiveOrder = () => {
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

    const getOrderTotal = () => {
        if (basket.length > 0) {
            let total = basket.map(
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

    const handleReset = () => {
        basket = []
        discountMultiplier = 0
        currentStarRating = 3
        btnViewBasket.refresh(basket, getOrderTotal())
    }

    // Apply discount if code is valid
    const handleApplyDiscount = () => {
        const inputDiscount = document.getElementById('ipt-discount')
        const currCode = inputDiscount.value
        const discountCodes = cafe.getDiscountCodes()

        // Check if the discount code exists 
        if (Object.keys(discountCodes).includes(currCode)) {
            // If so set the discountMultiplier
            setDiscountMultiplier(discountCodes[currCode])
            // Remove the warning class if it's there
            if (inputDiscount.classList.contains(warning)) inputDiscount.classList.remove(warning)
        } else {
            // disable discount, show warning; the discount code was invalid
            setDiscountMultiplier(0)
            inputDiscount.classList.add(warning)
        }
        inputDiscount.value = ''
    }
    
    const renderDiscountStatus = () => {
        let html = ''
        if (discountMultiplier > 0) {
            const percentDiscount = getDiscountPercentage(discountMultiplier)
            html = `
                <span class="${discount}">
                    ${percentDiscount}% discount applied 
                </span>&nbsp;
            `
        }
        return html
    }
        
    const getDiscountPercentage = ( discountMultiplier ) => {
        return (100-(discountMultiplier / 1 * 100))
    }
    
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
        archiveOrder,
        renderDiscountStatus,
        handleReset,
        handleApplyDiscount
    }
}

export const cafe = Cafe()
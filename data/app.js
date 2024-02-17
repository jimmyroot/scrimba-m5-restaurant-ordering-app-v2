import { v4 as newUUID } from 'https://jspm.dev/uuid'
import { btnViewBasket } from '../components/btnviewbasket'

const App = () => {

    // Init app variables
    let basket = []
    let orderHistory = []
    let discountMultiplier = 0
    let currentStarRating = 3
    let discountCodes = {
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

    
    const setDiscountMultiplier = (multiplier) => {
        discountMultiplier = multiplier
    }

    const setCurrentStarRating = (numStars) => {
        currentStarRating = numStars
    }

    const addToBasket = (menuArray, id) => {
        const itemToAdd = menuArray.find(item => item.id === +id)
        // Deep copy it
        let copyOfItemToAdd = structuredClone(itemToAdd)
        copyOfItemToAdd.instanceId = newUUID()
        basket.push(copyOfItemToAdd)
    }

    const removeFromBasket = (instanceIdToRemove) => {
        // Use reduce to return a new array that doesn't include the item
        // we're removing
        basket = basket.reduce((arr, item) => {
            if (item.instanceId !== instanceIdToRemove) arr.push(item)
            return arr
        }, [])

    }

    const saveToOrderHistory = basket => {
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
        btnViewBasket.refreshBtnViewBasket()
    }

    return {
        getBasket,
        getDiscountMultiplier,
        getOrderHistory,
        getCurrentStarRating,
        getDiscountCodes,
        getOrderTotal,
        addToBasket,
        removeFromBasket,
        setDiscountMultiplier,
        setCurrentStarRating,
        saveToOrderHistory,
        handleReset
    }
}

export const app = App()
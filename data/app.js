import { v4 as newUUID } from 'https://jspm.dev/uuid'

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

    const setDiscountMultiplier = (multiplier) => {
        discountMultiplier = multiplier
    }

    const setCurrentStarRating = (numStars) => {
        currentStarRating = numStars
    }

    return {
        getBasket,
        getDiscountMultiplier,
        getOrderHistory,
        getCurrentStarRating,
        getDiscountCodes,
        addToBasket,
        removeFromBasket,
        setDiscountMultiplier,
        setCurrentStarRating
    }
}

export const app = App()
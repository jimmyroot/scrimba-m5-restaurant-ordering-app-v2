// menu.js
// -----------------------------------------------------//
// All functionality for the menu can be found here...  //
// -----------------------------------------------------//

import { cafe } from "../app/cafe"
import styles from './menu.module.css'

const Menu = () => {

    // Init menu
    let menuArray = cafe.getMenuArray()

    // Use these to remember states between refreshes
    let toGo = true
    let activeFilter = 'coffee'
    

    // Use this function to add the event listeners. Use 'get()' first to append
    // this module's node to the DOM
    const addEventListeners = () => {
        node.addEventListener('click', e => {
            handleClick(e.target, e.target.dataset.type)
        })
    }

    const handleClick = (target, type) => {
        const execute = {
            add: () => {
                const idToAdd = +target.dataset.id
                cafe.addToBasket(idToAdd)
            },
            selectOrderType: () => {
                toGo = target.dataset.toGo === 'true' ? true : false
                refresh()
            },
            selectFilterType: () => {
                activeFilter = target.dataset.filter
                refresh()
            }
        }

        if (type) execute[type]()
    }

    // Render functions

    const render = () => {
        let html = renderFilterBtns()
        html += renderMenu()
        return html
    }

    const renderFilterBtns = () => {

        // Render the order type 'at table' or 'to go' buttons, these are really just eye 
        // candy, they don't do anything in this app
        let html = `
            <section class="${styles.menuOptions}">
                <div class="${styles.orderTypeContainer}" id="div-order-type">
                    <button class="${toGo ? styles.typeBtnSelected : styles.typeBtn}" data-type="selectOrderType" data-to-go="true">
                        <i class="bx bx-coffee-togo bx-md"></i>
                        Order to go
                    </button>
                    <button class="${toGo ? styles.typeBtn : styles.typeBtnSelected}" data-type="selectOrderType" data-to-go="false">
                        <i class="bx bx-qr-scan bx-md" ></i>
                        Order to table
                    </button>
                </div>
                <ul class="${styles.filterList}" id="ul-menu-filter">
        `

        // Render the list of filter options 'coffee', 'breakfast', etc
        // Use spread, along with new Set() to get an array of unique category values from which
        // we can build the list of filter btns 
        const filterCategories = [...new Set(menuArray.map(item => item.category))]

        // Render the buttons themselvecs
        html += filterCategories.map(category => {
            const btnTxt = category.charAt(0).toUpperCase() + category.slice(1)
            return `
                    <li class="${styles.filterItem}">
                        <button class="${category === activeFilter ? styles.filterBtnSelected : styles.filterBtn}" data-type="selectFilterType" data-filter="${category}">${btnTxt}</button>
                    </li>
                `
                }).join('').concat(`
                </ul>
            </section>
        `)

        return html
    }

    const renderMenu = () => {
        let html = `   
            <section>
                <ul class="${styles.menuList}" id="ul-menu-list">
        `

        html += menuArray.filter(item => item.category === activeFilter).map((item, index, arr) => {
            const { name, ingredients, price, imageURL, id } = item

            // Create a boolean, isLastIter, to track if we are on the last iteration (we'll use it below)
            const isLastIter = ((index + 1) === arr.length)
            const divider = `<div class="${styles.divider}"></div>`
            return `
                <li class="${styles.menuItem}">
                    <img class="${styles.image}" src="${imageURL}">
                    <div class="${styles.itemInfo}">
                        <span class="${styles.itemName}">${name}</span>
                        <span class="${styles.itemDetail}">
                            ${ingredients.map(ingredient => ingredient).join(', ')}
                        </span>
                        <span class="${styles.itemDetail}">£${price.toFixed(2)}</span>
                    </div>
                    <button class="${styles.btn}" data-type="add" data-id="${id}">
                        <i class='bx bx-plus bx-md'></i>
                    </button>
                </li>
                ${isLastIter ? '' : divider}
            `
        }).join('').concat(`
                </ul>
            </section>
        `)

        return html
    }

    const refresh = () => {
        node.innerHTML = render()
    }
    
    const get = () => {
        refresh()
        return node
    }

    // Init the node that will be returned by this module
    const node = document.createElement('main')

    return {
        get,
        addEventListeners
    }

}

export const menu = Menu()
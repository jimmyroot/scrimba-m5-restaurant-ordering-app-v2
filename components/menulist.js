import menuArray from '../data/data'
import { app } from '../data/app'
import { btnViewBasket } from './btnviewbasket'

const MenuList = () => {

    const renderMenuList = (category = 'coffee') => {
        return menuArray.filter(item => item.category === category).map((item, index, arr) => {
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

    const refreshMenuList = (category) => {
        document
            .querySelector('#ul-menu-list')
            .innerHTML = renderMenuList(category)
    }

    const addEventListeners = () => {
        ul.addEventListener('click', e => {
            const id = e.target.dataset.id
            if (id) app.addToBasket(menuArray, id)
            btnViewBasket.refreshBtnViewBasket()
        })
    }

    const node = document.createElement('section')
    const ul = document.createElement('ul')
    node.id = 'sec-menu-list'
    ul.id = 'ul-menu-list'

    ul.innerHTML = renderMenuList()
    node.appendChild(ul)

    const getElement = () => {
        return node
    }

    return {
        getElement,
        addEventListeners,
        refreshMenuList
    }
}

export const menuList = MenuList()
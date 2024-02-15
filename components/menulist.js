import menuArray from "../data/menu.js"

// Render the main menu according to the category we pass in; categories can be found in menuArray
const renderMenu = (category = 'coffee') => {

    const secMenu = document.createElement('section')
    const ulMenu = document.createElement('ul')

    // Filter the menu, chain map to keep things neat
    ulMenu.innerHTML = menuArray.filter(item => item.category === category).map((item, index, arr) => {
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

    // We need the ID for when we re-render the menu in menufilter.js
    secMenu.id = 'sec-menu-list'
    // ulMenu.id = 'ul-menu'
    ulMenu.classList.add('ul-menu')
    secMenu.appendChild(ulMenu)

    return secMenu
}

const menuList = renderMenu()

export default menuList
export { renderMenu }
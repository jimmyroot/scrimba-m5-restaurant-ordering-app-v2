import { cafe } from "../app/cafe"

const Menu = () => {

    // Init menu
    let menuArray = cafe.getMenuArray()

    // Use these to remember states between refreshes
    let toGo = true
    let activeFilter = 'coffee'
    
    const addEventListeners = () => {
        node.addEventListener('click', e => {
            handleClick(e)
        })
    }

    const handleClick = (e) => {
        const execute = {
            add: () => {
                cafe.addToBasket(e.target.dataset.id)
            },
            selectOrderType: () => {
                toGo = e.target.dataset.toGo === 'true' ? true : false
                refresh()
            },
            selectFilterType: () => {
                activeFilter = e.target.dataset.filter
                refresh()
            }
        }

        const type = e.target.dataset.type
        if (type) execute[type]()
    }

    // Module render functions
    const render = () => {
        let html = renderFilterBtns()
        html += renderMenu()
        return html
    }

    const renderFilterBtns = () => {

        // Render the order type 'at table' or 'to go' buttons, these are really just eye 
        // candy, they don't do anything in this app
        let html = `
            <section class="sec-menu-controls">
                <div class="div-order-type" id="div-order-type">
                    <button class="btn-order-type ${toGo ? 'selected' : ''}" data-type="selectOrderType" data-to-go="true">
                        <i class="bx bx-coffee-togo bx-md"></i>
                        Order to go
                    </button>
                    <button class="btn-order-type ${toGo ? '' : 'selected'}" data-type="selectOrderType" data-to-go="false">
                        <i class="bx bx-qr-scan bx-md" ></i>
                        Order to table
                    </button>
                </div>
                <ul class="ul-menu-filter" id="ul-menu-filter">
        `

        // Render the list of filter options 'coffee', 'breakfast', etc
        // Use spread, along with new Set() to get an array of unique category values from which
        // we can build the list of filter btns 
        const filterCategories = [...new Set(menuArray.map(item => item.category))]

        // Render the buttons
        html += filterCategories.map(category => {
            // Convert first letter to uppercase for the cateogry text
            const btnTxt = category.charAt(0).toUpperCase() + category.slice(1)
            const isSelected = category === activeFilter ? 'selected' : ''
            return `
                <li class="li-menu-filter">
                    <button class="btn-filter-category ${isSelected}" data-type="selectFilterType" data-filter="${category}">${btnTxt}</button>
                </li>
            `
        })
        .join('')
        .concat('</ul></section>')

        return html
    }

    const renderMenu = () => {
        let html = `   
            <section>
                <ul id="ul-menu-list">
        `

        html += menuArray.filter(item => item.category === activeFilter).map((item, index, arr) => {
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
                    <button class="btn-add" data-type="add" data-id="${id}">
                        <i class='bx bx-plus bx-md'></i>
                    </button>
                </li>
                ${isLastIter ? '' : '<div class="div-divider div-divider-primary"></div>'}
            `
        })
        .join('')
        .concat(`
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

    const node = document.createElement('main')
    node.classList.add('main')

    return {
        get,
        addEventListeners
    }

}

export const menu = Menu()
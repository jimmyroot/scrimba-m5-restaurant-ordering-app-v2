const Footer = () => {

    const footerEl = document.createElement('footer')

    footerEl.innerHTML = `
        <ul class="ul-footer-nav" id="ul-footer-nav">
            <li class="li-footer-nav">
                <button class="btn-footer-nav">
                    <img class="img-account" src="/assets/jimmy.png" alt="User avatar">
                    <span>Account</span>
                </button>
            </li>
            <li class="li-footer-nav">
                <button class="btn-footer-nav" data-type="orders">
                    <i class='bx bx-receipt bx-lg'></i>
                    <span>My Orders</span>
                </button>
            </li>
            <li class="li-footer-nav">
                <button class="btn-footer-nav" data-type="discounts">
                    <i class='bx bx-gift bx-lg'></i>
                    <span>Discounts</span>
                </button>
            </li>
            <li class="li-footer-nav">
                <button class="btn-footer-nav">
                    <i class='bx bx-cog bx-lg'></i>
                    <span>Settings</span>
                </button>
            </li>
        </ul>
    `

    const getElement = () => {
        return footerEl
    }

    const addEventListeners = () => {
        document.querySelector('#ul-footer-nav').addEventListener('click', e => {
            const type = e.target.dataset.type

            const handleClick = {
                orders: () => {
                    showModal(modalMyOrders, true)
                },
                discounts: () => {
                    showModal(modalDiscounts, true)
                }
            }
            if (type) handleClick[type]()

            // Add or remove selection class, visual only
            if (e.target.tagName === 'BUTTON') handleSelectNav(e.target)
        })
    }

    // This function is private to the module...does it work? 
    const handleSelectNav = target => {
        const targetAlreadySelected = target ? target.classList.contains('selected') : false
        document.querySelectorAll('.btn-footer-nav.selected').forEach(btn => btn.classList.remove('selected'))
        if (target && !targetAlreadySelected) target.classList.add('selected')
    }

    return {
        getElement,
        addEventListeners
    }

}

export const footer = Footer()


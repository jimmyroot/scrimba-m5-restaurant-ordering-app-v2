import { header } from './layout/header'
import { inner } from './layout/inner'
import { footer } from './layout/footer'
import { menu } from './components/menu'
import { btnViewBasket } from './components/btnviewbasket'
import { modalViewBasket } from './modals/modalviewbasket'
import { modalCheckout } from './modals/modalcheckout'
import { modalMyOrders } from './modals/modalmyorders'
import { modalDiscounts } from './modals/modaldiscounts'
import { modalOrderConfirmation } from './modals/modalorderconfirmation'

// Build the main sreen layout
document.querySelector('#div-app-outer').appendChild(header.get())
document.querySelector('#div-app-outer').appendChild(inner.get())
document.querySelector('#div-app-inner').appendChild(menu.get())
document.querySelector('#div-app-inner').appendChild(btnViewBasket.get())
document.querySelector('#div-app-inner').appendChild(footer.get())

// Append modals to the DOM
document.querySelector('#div-app-inner').appendChild(modalViewBasket.get())
document.querySelector('#div-app-inner').appendChild(modalCheckout.get())
document.querySelector('#div-app-inner').appendChild(modalOrderConfirmation.get())
document.querySelector('#div-app-inner').appendChild(modalMyOrders.get())
document.querySelector('#div-app-inner').appendChild(modalDiscounts.get())

// Add the event listeners for each module
menu.addEventListeners()
btnViewBasket.addEventListeners()
footer.addEventListeners()
modalViewBasket.addEventListeners()
modalCheckout.addEventListeners()
modalOrderConfirmation.addEventListeners()
modalMyOrders.addEventListeners()
modalDiscounts.addEventListeners()

// TODO 5: Add a 'Clear order' button on the main screen
// TODO 6: Add functionality to count how many of each item has been ordered and display it
//         in the relevant places
// TODO 8: Get rid of the isLastIter function, use css instead
// TODO 9: Get rid of focus highlight on footer nav
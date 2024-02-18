const Modal = () => { // Change this to your modal name

    // To set up a new modal, first go through the template
    // changing classes and IDs where appropriate. Then, import
    // the module:
    // import { modal } from './modals/modaltemplate'
    //
    // Then add it to the DOM:
    // document.querySelector('whatever').appendChild(modal.get())
    //
    // Then add the event listeners
    // modal.addEventListeners()
    //
    // Notes: You should set up any content in the renderContent function.
    // Alternatively, you could create your own render function, but make
    // sure to add it to node.innerHTML before showing the modal

    const addEventListeners = () => {
        node.addEventListener('click', e => {
            const handleClick = {
                close: () => {
                    hide()
                }
            }

            const type = e.target.dataset.type
            if (type) handleClick[type]()
        }
    )}

    const renderContent = () => {
        let html = `
            <div class="modal-inner">
                <header>
                    <h3 class="modal-title">Modal Title</h3>
                    <div class="div-divider div-divider-accent"></div>
                </header>
                <!-- Modal content goes here -->
                <footer>
                    <button class="btn-modal-main" data-type="close">Close</button>
                </footer>
            </div>
        `
        return html
    }

    const refreshContent = () => {
        node.innerHTML = renderContent()
    }

    const show = () => {
        refreshContent()
        document.querySelector('#modal-id').showModal() //Modify this with id of the modal
    }

    const hide = () => {
        document.querySelector('#modal-id').close() //Modify this with id of the modal
    }

    // Call this function to add your modal to the DOM, like...
    // document.querySelector('element-you'll-append-modal-to).appendChild(modal.getElement())
    const getElement = () => {
        refreshContent()
        return node
    }

    // Scaffold the modal, change below 'id', classList, etc as needed
    const node = document.createElement('dialog')
    node.classList.add('modal')
    node.id = 'modal-id'

    return {
        getElement,
        addEventListeners,
        show,
        hide
    }
}

// Modify this with the name of the modal
// Export the modal as an instance of the main function, 
// basically it's a class just without the 'class' keyword
export const modal = Modal() 

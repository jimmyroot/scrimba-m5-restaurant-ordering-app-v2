const Modal = () => { // Change this to your modal name

    const addEventListeners = () => {
        node.addEventListener('click', e => {
            // Do something with 'e'
        }
    )}

    const renderContent = () => {
        let html = `
            <!-- content -->
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

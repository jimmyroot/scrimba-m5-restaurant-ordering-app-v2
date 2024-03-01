const Modal = () => { // Change this to your modal name of choice

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
    // Notes: You should set up any content in the render function.
    // Alternatively, you could create your own render function, but make
    // sure to add it to node.innerHTML before showing the modal

    // Use this function to add the event listeners. Use 'get()' first to append
    // this module's node to the DOM
    const addEventListeners = () => {
        node.addEventListener('click', e => {
            const target = e.target
            const type = e.target.dataset.type
            handleClick(target, type)
        }
    )}

    const handleClick = (target, type) => {
        const execute = {
            hide: () => {
                hide()
            },
            // doSomethingElse: () => {
            //     const id = target.dataset.id
            //     doFunction(id)
            // }
        }

        if (type) execute[type]()
    }

    const render = () => {
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

    const refresh = () => {
        node.innerHTML = render()
    }

    const show = () => {
        refresh()
        node.showModal() 
    }

    const hide = () => {
        node.close()
    }

    // Call this function to add your modal to the DOM, like...
    // document.querySelector('element-you'll-append-modal-to).appendChild(modal.get())
    const get = () => {
        refreshContent()
        return node
    }

    // Initiliazae the base node, change below 'id', classList or className if using CSS Modules, etc as needed
    // Everything else will be appended to this 'node' before it's returned in the get() function
    const node = document.createElement('dialog')
    node.classList.add('modal')
    node.id = 'modal-id'

    // Expose functions
    return {
        get,
        addEventListeners,
        show,
        hide
    }
}

// Modify this with the name of the modal
// Export the modal as an instance of the main function, 
// basically it's a class just without the 'class' keyword
export const modal = Modal() 

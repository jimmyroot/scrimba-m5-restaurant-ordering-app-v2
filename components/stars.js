
const Stars = () => {

    // Init
    let starsToRender = null
    
    const render = () => {
        let html = `
            <div class="div-star-rating">
                <h4 class="h4-modal">Rate your experience</h4>
                <ul class="ul-star-rating" id="ul-star-rating">
        `

        html += renderStars()

        html += `
                </ul>
            </div>
        `

        return html
    }

    const renderStars = () => {
        let starArr = []

        for (let star = 1; star <= 5; star++) {
            star <= starsToRender ?
                starArr.push(`
                    <li class="li-star solid" data-type="star" data-star-id="${star}">
                        <i class="bx bxs-star"></i>
                    </li>
                `) : 
                starArr.push(`
                    <li class="li-star" data-type="star" data-star-id="${star}">
                        <i class="bx bxs-star" ></i>
                    </li>
                `)
            }

         // Return the list of <li> stars
        return starArr.map(star => star).join('')
    }


    // This works a little differently to the other modules, it returns only html, not a node
    const get = ( numStars ) => {
        starsToRender = numStars
        return render()
    }

    return {
        get
    }
}

export const stars = Stars()
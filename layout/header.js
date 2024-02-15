const header = document.createElement('header')

header.classList.add('header')

header.innerHTML = `
        <img src="assets/logo.png" alt="The Cool Beans coffee shop logo, a circle with the leaves of a coffee plant in the middle">
        <h1 class="h1-title">Cool Beans</h1>
        <p class="p-tagline">Coffee. Code. Hang.</p>
        <p class="p-header-detail">
                <a href="#"><i class='bx bxs-star' ></i> 4.8 (1,847)</a> • 
                No min. order • 
                <a href="#">Allergen info</a>
        </p>
`

export default header
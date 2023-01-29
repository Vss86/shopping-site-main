let shoppingCart = document.getElementById("shopping-cart")

let basket = JSON.parse(localStorage.getItem("data")) || [];


// Produktdatat finns i variabeln shopData (se data.js)


const generateCartItems = () => {
    // Generera alla produkter med dynamisk HTML och Array.protype.map() samt join()
    //
    // Använd denna markup för varje produktkort - den korresponderar mot CSS:en
    //
    // <div class="cart-item">
    // <img width="100" src={--image--} alt="" />
    // <div class="details">
    //     <div class="title-price-x">
    //     <h4 class="title-price">
    //         <p>{--title--}</p>
    //         <p class="cart-item-price"> {--price--}</p>
    //     </h4>
    //     <i onclick="removeItem({--id--})" class="bi bi-x-lg"></i>
    //     </div>
    //     <div class="cart-buttons">
    //     <div class="buttons">
    //         <i onclick="decrement({--id--})" class="bi bi-dash-lg"></i>
    //         <div id={--id--} class="quantity">{--total--}</div>
    //         <i onclick="increment({--id--})" class="bi bi-plus-lg"></i>
    //     </div>
    //     </div>
    //     <h3> {--total * price--}</h3>
    // </div>
    // </div>
 
}

generateCartItems();
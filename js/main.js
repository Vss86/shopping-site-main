const shop = document.getElementById('shop');
const menu = document.getElementById('categories');
const close =document.getElementById('close');
const open = document.getElementById('open');

 menuFunction = (a, b, c) => {
    a.addEventListener("click",() => {
        a.classList.toggle('hide');
        b.classList.toggle('hide');

        if(c == 'menu-open') {
            menu.classList.toggle("slide");
        }
        if(c == 'menu-close') {
            menu.classList.toggle("slide");
        }
    })
}
menuFunction(open, close, "menu-open");
menuFunction(close, open, "menu-close");

let basket = JSON.parse(localStorage.getItem("data")) || [];
// Produktdatat finns i variabeln shopData (se data.js)

const categoryDictionary = {
    mens: "men's clothing",
    jewelery: "jewelery",
    electronics: "electronics",
    womens: "women's clothing"
}

const filterProducts = category => item => { 
    if (!categoryDictionary[category]) {
        return true;
    }
    return item.category === categoryDictionary[category]
}
//function for creating html for products
const generateShop = (category) => {
    // Generera alla produkter med dynamisk HTML och Array.protype.map() samt join()
    // Använd denna markup för varje produktkort - den korresponderar mot CSS:en
    const productsData = shopData.filter(filterProducts(category))
    
    return (shop.innerHTML = productsData.map((item) => { 
        return `<div id=product-id-${item.id} class="item">
        <img width="220" src=${item.image} alt=""> 
        <div id="details" class="details">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <span onclick="spanSelected(${item.id})" id="read"></span>
            <div class="price-quantity">
            <h2>$ ${item.price}</h2>
            <div class="buttons">
                <i onclick="decrement(${item.id})" class="bi bi-dash-lg"></i>
                <div id=${item.id} class="quantity">0</div>
                <i onclick="increment(${item.id})" class="bi bi-plus-lg"></i>
            </div>
            </div>
        </div>
    </div>`
    }).join(' ')); 
}
function parseQuery(query, queryString) {
    return new URLSearchParams(queryString).get(query)
}
const categoryName = parseQuery('category', location.search)
generateShop(categoryName)

// function for read more features
const spanSelected = (id) => {
    const item = document.getElementById(`product-id-${id}`);
    const itemDetails = item.getElementsByClassName("details")[0];
    itemDetails.classList.toggle("active");
    }

// function for incrementing items
const increment = (id) => {
    // Om användaren klickar på + på produkten 
    const selectedProduct = id;
    const productInBasket = basket.find((a) =>
        a.id === selectedProduct)
    if (productInBasket === undefined) {
        basket.push ({
            id: selectedProduct,
            item: 1,
        })
    } else {
        productInBasket.item += 1;
    }
    localStorage.setItem('data', JSON.stringify(basket));
    updateItem(selectedProduct);
}

// function for decrementing items
const decrement = (id) => {
    // Om användaren klickar på - på produkten 
    const selectedProduct = id;
    const productInBasket = basket.find((a) =>
        a.id === selectedProduct)
        if (productInBasket === undefined) {
            return;
        }
        else if (productInBasket.item === 0) {
        return;
        } else {
        productInBasket.item -= 1;
        }
        // console.log(basket);
        localStorage.setItem('data', JSON.stringify(basket));
        updateItem(selectedProduct);
}

//function for updating items
const updateItem = (id) => {
    const selectedProduct = id;
    const productInBasket = basket.find((a) =>
        a.id === selectedProduct)
    const quantity = document.getElementById(id);
    quantity.innerHTML = productInBasket.item;
    // console.log(productInBasket.item);
    basketItem();
}

// function for updating items in the cart
const basketItem = () => {
    const cart = document.getElementById('cartAmount');
    const toatalItem = basket.reduce((a, b) =>
        {return a + b.item}, 0)
    cart.innerHTML = toatalItem;
}
basketItem()
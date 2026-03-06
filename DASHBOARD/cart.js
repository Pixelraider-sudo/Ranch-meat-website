const cartContainer = document.getElementById("cart-items-container");
const totalPriceElement = document.getElementById("total-price");

let cartData = JSON.parse(localStorage.getItem("primeCutsCart")) || [];

/* DISPLAY CART */

function displayCart() {
  cartContainer.innerHTML = "";

  if (cartData.length === 0) {
    cartContainer.innerHTML = `
<div class="empty-cart">
<p>Your cart is empty.<br><br>
<a href="/DASHBOARD/dashboard.html">Go back to shop</a>
</p>
</div>
`;

    totalPriceElement.textContent = "0";

    return;
  }

  let total = 0;

  cartData.forEach((item, index) => {
    const priceNumber = parseInt(item.price.replace(/[^\d]/g, ""));

    const quantity = item.quantity || 1;

    total += priceNumber * quantity;

    const cartItem = document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `

<div class="cart-img">
<img src="${item.img}" alt="${item.name}">
</div>

<div class="cart-details">

<h3>${item.name}</h3>

<p>Price: ${item.price}</p>

<div class="quantity-controls">

<button onclick="decreaseQty(${index})">-</button>

<span>${quantity}</span>

<button onclick="increaseQty(${index})">+</button>

</div>

<button class="remove-btn" onclick="removeItem(${index})">
Remove
</button>

</div>

<div class="cart-price">
KSh ${priceNumber * quantity}
</div>

`;

    cartContainer.appendChild(cartItem);
  });

  totalPriceElement.textContent = total;
}

/* REMOVE ITEM */

function removeItem(index) {
  cartData.splice(index, 1);

  localStorage.setItem("primeCutsCart", JSON.stringify(cartData));

  displayCart();
}

/* INCREASE QUANTITY */

function increaseQty(index) {
  cartData[index].quantity = (cartData[index].quantity || 1) + 1;

  localStorage.setItem("primeCutsCart", JSON.stringify(cartData));

  displayCart();
}

/* DECREASE QUANTITY */

function decreaseQty(index) {
  if (!cartData[index].quantity) {
    cartData[index].quantity = 1;
  }

  if (cartData[index].quantity > 1) {
    cartData[index].quantity--;
  }

  localStorage.setItem("primeCutsCart", JSON.stringify(cartData));

  displayCart();
}

/* CHECKOUT */

document.querySelector(".checkout-btn").addEventListener("click", () => {
  if (cartData.length === 0) {
    alert("Your cart is empty!");

    return;
  }

  alert("Proceeding to M-Pesa payment...");
});

/* INITIAL LOAD */

displayCart();

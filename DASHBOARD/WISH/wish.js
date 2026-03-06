const container = document.getElementById("wishlist-container");

let wishlist = JSON.parse(localStorage.getItem("primeCutsWishlist")) || [];
let cart = JSON.parse(localStorage.getItem("primeCutsCart")) || [];

/* DISPLAY WISHLIST */

function displayWishlist() {
  container.innerHTML = "";

  if (wishlist.length === 0) {
    container.innerHTML = `

<div class="empty-message">

<p>Your wishlist is empty ❤️</p>

<br>

<a href="/DASHBOARD/dashboard.html">
Browse products
</a>

</div>

`;

    return;
  }

  wishlist.forEach((item, index) => {
    const card = document.createElement("div");

    card.className = "wishlist-item";

    card.innerHTML = `

<div class="wishlist-img">

<img src="${item.img}" alt="${item.name}">

</div>

<div class="wishlist-details">

<h3>${item.name}</h3>

<p>${item.price}</p>

</div>

<div class="wishlist-actions">

<button class="move-btn" onclick="moveToCart(${index})">
Move to Cart
</button>

<button class="remove-btn" onclick="removeItem(${index})">
Remove
</button>

</div>

`;

    container.appendChild(card);
  });
}

/* REMOVE ITEM */

function removeItem(index) {
  wishlist.splice(index, 1);

  localStorage.setItem("primeCutsWishlist", JSON.stringify(wishlist));

  displayWishlist();
}

/* MOVE TO CART */

function moveToCart(index) {
  const item = wishlist[index];

  cart.push(item);

  wishlist.splice(index, 1);

  localStorage.setItem("primeCutsCart", JSON.stringify(cart));

  localStorage.setItem("primeCutsWishlist", JSON.stringify(wishlist));

  displayWishlist();

  alert(item.name + " moved to cart!");
}

/* INITIAL LOAD */

displayWishlist();

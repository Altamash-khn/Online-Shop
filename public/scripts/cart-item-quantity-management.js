const cartItemForms = document.querySelectorAll(".cart-item-management");
const cartTotalPriceElement = document.getElementById("cart-total-price");
const navCartBadges = document.querySelectorAll(".badge");

function updateCart(event) {
  event.preventDefault();
  const productId = event.target.dataset.id;
  const csrfToken = event.target.dataset.csrfToken;
  const inputElementValue = event.target.querySelector("[type='number']").value;

  try {
    fetch("/cart/items", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
        newQuantity: +inputElementValue,
        _csrf: csrfToken,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          alert("Something went wrong!");
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data.updatedCartData.updatedItemTotalPrice === 0) {
          event.target.closest("li").remove();
          cartTotalPriceElement.textContent =
            data.updatedCartData.newCartTotalPrice.toFixed(2);
          navCartBadges.forEach((navCartBadge) => {
            navCartBadge.textContent = data.updatedCartData.newTotalItems;
          });
          return;
        }

        const cartItemTotalPriceElement =
          event.target.parentElement.querySelector(".cart-item-total-price");
        cartItemTotalPriceElement.textContent =
          data.updatedCartData.updatedItemTotalPrice.toFixed(2);
        cartTotalPriceElement.textContent =
          data.updatedCartData.newCartTotalPrice.toFixed(2);
        navCartBadges.forEach((navCartBadge) => {
          navCartBadge.textContent = data.updatedCartData.newTotalItems;
        });
      });
  } catch (error) {
    alert("Something went wrong!");
    return;
  }
}

cartItemForms.forEach((form) => {
  form.addEventListener("submit", updateCart);
});

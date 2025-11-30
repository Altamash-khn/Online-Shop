const addTocartButton = document.querySelector("#add-to-cart-button");
const cartBadges = document.querySelectorAll(".nav-items .badge");

addTocartButton.addEventListener("click", async (e) => {
  let res;
  try {
    res = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: e.target.dataset.productid,
        _csrf: e.target.dataset.csrftoken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong!! catch block!");
    return;
  }

  if (!res.ok) {
    alert("Something went wrong fetched correctly");
    return;
  }

  const resData = await res.json();
  const newTotalQuantity = resData.newTotalItems;

  cartBadges.forEach((cartBadge) => {
    cartBadge.textContent = newTotalQuantity;
  });
});

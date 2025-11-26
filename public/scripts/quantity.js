const totalQuantityInput = document.querySelector(".totalQuantity");
const updateCartBtn = document.querySelector(".update-btn");
// const cartBadge = document.querySelector(".nav-items .badge");

totalQuantityInput.addEventListener("input", async (e) => {
    updateCartBtn.removeAttribute("disabled");
    // fetch(`/cart/items/${e.target.dataset.id}`, {
    //     method: "POST",
    //     body: JSON.stringify({
    //         quantity: e.target.value,
    //         _csrf: e.target.dataset.csrftoken,
    //     }),
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // });

    // cartBadge.textContent = e.target.value
});

updateCartBtn.addEventListener("click", async (e) => {    
});
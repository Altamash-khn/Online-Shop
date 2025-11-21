const products = document.querySelectorAll(".product-item");

products.forEach((product) => {
    const deleteBtn = product.querySelector(".deleteBtn");
    
    deleteBtn.addEventListener("click", async (e) => {
        const productId = e.target.dataset.id;
        const csrfToken = e.target.dataset.csrf;
        const res = await fetch(`/admin/products/${productId}?_csrf=${csrfToken}`, {
            method: "DELETE"
        })

        if(!res.ok){
            alert("Could not delete product. Please try again later.");
            return;
        }

        product.closest('li').remove();
    });
})
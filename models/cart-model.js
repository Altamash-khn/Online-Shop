class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  addItem(product) {
    const plainProduct = {
      id: product.id || product._id.toString(),
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
    };

    const cartItem = {
      product: plainProduct,
      quantity: 1,
      totalPrice: product.price,
    };

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === product.id) {
        cartItem.quantity = cartItem.quantity + 1;
        cartItem.totalPrice = cartItem.totalPrice + product.price;
        this.items[i] = cartItem;

        this.totalQuantity++;
        this.totalPrice += product.price;
        return;
      }
    }

    this.items.push(cartItem);
    this.totalQuantity++;
    this.totalPrice += product.price;
  }
}

module.exports = Cart;

class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  addItem(product) {
  const productId = product.id || product._id.toString();

  const existingItem = this.items.find(item => item.product.id === productId);

  this.totalQuantity++;
  this.totalPrice += product.price;

  if (existingItem) {
    existingItem.quantity++;
    existingItem.totalPrice += product.price;
    return;
  }

  this.items.push({
    product: {
      id: productId,
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
    },
    quantity: 1,
    totalPrice: product.price,
  });
}

updateItem(productId, newQuantity) {
  const existingItem = this.items.find(item => item.product.id === productId);

  if (!existingItem) {
    return {
      updatedItemTotalPrice: 0,
      newCartTotalPrice: this.totalPrice,
      newTotalItems: this.totalQuantity
    };
  }
  
  if (newQuantity <= 0) {
    this.totalQuantity -= existingItem.quantity;
    this.totalPrice -= existingItem.totalPrice;
    this.items = this.items.filter(item => item.product.id !== productId);

    return {
      updatedItemTotalPrice: 0,
      newCartTotalPrice: this.totalPrice,
      newTotalItems: this.totalQuantity
    };
  }

  this.totalQuantity -= existingItem.quantity;
  this.totalPrice -= existingItem.totalPrice;

  existingItem.quantity = newQuantity;
  existingItem.totalPrice = existingItem.product.price * newQuantity;

  this.totalQuantity += newQuantity;
  this.totalPrice += existingItem.totalPrice;

  return {
    updatedItemTotalPrice: existingItem.totalPrice,
    newCartTotalPrice: this.totalPrice,
    newTotalItems: this.totalQuantity
  };
}


}

module.exports = Cart;

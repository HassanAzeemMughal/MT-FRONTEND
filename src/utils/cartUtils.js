export function getProductDiscount(product, allCartItems) {
  // Step 1: Group by product ID
  const totalQtyForProduct = allCartItems
    .filter((item) => item._id === product._id)
    .reduce((sum, item) => sum + item.quantity, 0);

  // Step 2: Get discounts map (assumed to be { "2": "10", "3": "15" } etc.)
  const discountMap = product.discounts || new Map();

  // Step 3: Get best discount based on quantity
  let appliedDiscount = 0;
  for (const [qtyStr, discountStr] of Object.entries(discountMap)) {
    const qty = parseInt(qtyStr);
    const discount = parseFloat(discountStr);
    if (totalQtyForProduct >= qty && discount > appliedDiscount) {
      appliedDiscount = discount;
    }
  }

  return appliedDiscount;
}

export function calculateCartTotals(cartItems) {
  const groupedProducts = {};

  cartItems.forEach((item) => {
    const productId = item._id;
    if (!groupedProducts[productId]) {
      groupedProducts[productId] = [];
    }
    groupedProducts[productId].push(item);
  });

  let cartTotalPrice = 0;
  let cartDiscountAmount = 0;

  Object.keys(groupedProducts).forEach((productId) => {
    const items = groupedProducts[productId];

    const product = items[0];
    const discountPercent = getProductDiscount(product, cartItems);
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    items.forEach((item) => {
      const productPrice = item.discount ? item.offerPrice : item.price;
      const quantity = item.quantity;
      const productTotal = productPrice * quantity;
      const discountAmount =
        discountPercent > 0 ? (productTotal * discountPercent) / 100 : 0;

      cartTotalPrice += productTotal;
      cartDiscountAmount += discountAmount;
    });
  });

  const totalAfterDiscount = cartTotalPrice - cartDiscountAmount;

  return {
    subtotal: cartTotalPrice,
    totalDiscount: cartDiscountAmount,
    totalAfterDiscount: totalAfterDiscount,
  };
}

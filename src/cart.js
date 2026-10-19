function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть положительным');
  }
  if (quantity > product.stock) {
    throw new RangeError('Количество превышает остаток на складе');
  }

  const existingIndex = cart.findIndex((item) => item.id === product.id);

  if (existingIndex === -1) {
    return [...cart, { ...product, quantity }];
  }

  const existing = cart[existingIndex];
  const newQuantity = existing.quantity + quantity;

  if (newQuantity > product.stock) {
    throw new RangeError('Количество превышает остаток на складе');
  }

  return cart.map((item, index) =>
    index === existingIndex ? { ...item, quantity: newQuantity } : item
  );
}

function changeQuantity(cart, id, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть положительным');
  }

  const existing = cart.find((item) => item.id === id);

  if (!existing) {
    return [...cart];
  }

  if (quantity > existing.stock) {
    throw new RangeError('Количество превышает остаток на складе');
  }

  return cart.map((item) =>
    item.id === id ? { ...item, quantity } : item
  );
}

function removeFromCart(cart, id) {
  return cart.filter((item) => item.id !== id);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  const discount = promoCode === 'SAVE10' && subtotal >= 20000 ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal < 50000 ? 30000 : 0;
  const total = subtotal - discount + delivery;

  return { subtotal, discount, delivery, total };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
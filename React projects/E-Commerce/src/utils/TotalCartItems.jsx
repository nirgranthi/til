export function totalCartItems(cart) {
    let totalCartItems = 0
    cart.forEach((cartItem) => {
        totalCartItems += cartItem.quantity
    })
    return totalCartItems
}
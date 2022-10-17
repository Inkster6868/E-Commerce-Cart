const CartItem = ({ data, onEmitDecreaseItem, onEmitIncreaseItem }) => {

    // When the items are in the cart section of the page
    return (
        <div className="checkout-modal_list-item">
            <div className="img-wrap">
                <img src={`/assets/${data.thumbnail}`} className="img-fluid" alt={data.title} />
            </div>
            <div className="information">
                <div>
                    <h4>{data.title}</h4>
                    <div className="pricing">
                        <span>{data.discountedPrice}</span>
                        <small>
                            <strike>{data.price}</strike>
                        </small>
                    </div>
                </div>
                <div className="cart-addon cart-addon__modal">
                {/* //emitdecrase andincrease are used to basically increase or decrease the quantity inside the cart component which directly renders inside the main countign */}
                    <button onClick={() => onEmitDecreaseItem(data)}>-</button>
                    <span className="counter">{data.quantity}</span>
                    <button onClick={() => onEmitIncreaseItem(data)}>+</button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddToCartIcon from "../../../assets/icons/add_cart.svg"
import Modal from "../../UI/Modal"
import { addItemHandler, removeItemHandler } from "../../../actions"

// here is the list item that is being returned(custom component/element)
const ListItem = ({ data }) => {
    // const [counter, setCounter] = useState(0)
    const [showModal, setShowModal] = useState(false)
    // initially the show modal will be not be appearing
    // item below this.. items is storing 
    const item = useSelector(state => state.cart.items.find(item => item.id === data.id))
    const dispatch = useDispatch()

        /* Stop propogation is used to stop the loading of modal while we click on + and - buttons */
    const increaseCounterByOne = event => {
        event.stopPropagation()
        dispatch(addItemHandler(data))
    }

    const decreaseCounterByOne = event => {
        event.stopPropagation()
        dispatch(removeItemHandler(data.id))
    }

        //toggling the previous state of modals on the onclick function 
        // when this function handlemodal is called it changes the state from true to false and vice versa
    const handleModal = () => {
        setShowModal(previousState => !previousState)
    }

    return (
        <Fragment>
            <div onClick={handleModal} className={"item-card"}>
                <img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt={data.title}/>
                <div className={"item-card__information"}>
                    <div className={"pricing"}>
                        <span>₹{data.discountedPrice}</span>
                        <small>
                            <strike>₹{data.price}</strike>
                        </small>
                    </div>
                    <div className={"title"}>
                        <h3>{data.title}</h3>
                    </div>
                </div>

                {
                    !item || item?.quantity < 1 ?
                    <button className={"cart-add"} onClick={increaseCounterByOne}>
                        <span>Add to Cart</span>
                        <img src={AddToCartIcon} alt="Cart Icon"/>
                    </button>
                    :
                    <div className="cart-addon">
                        <button onClick={decreaseCounterByOne}><span>-</span></button>
                        <span>{item.quantity}</span>
                        <button onClick={increaseCounterByOne}><span>+</span></button>
                    </div>
                }
            </div>

            {/* //if showmodal and Modal will be true then only we are going to show the modal */}
            { showModal && 
                <Modal onClose={handleModal}>
                    <div className="item-card__modal">
                        <div className="img-wrap">
                            <img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt={data.title}/>
                        </div>
                        <div className="meta">
                            <h3>{data.title}</h3>
                            <div className={"pricing"}>
                                <span>₹{data.discountedPrice}</span>
                                <small>
                                    <strike>₹{data.price}</strike>
                                </small>
                            </div>
                            <p>{data.description}</p>
                            {/* //conditional rednering  */}
                            {
                                
                                !item || item?.quantity < 1 ?
                                <button className={"cart-add card-add__modal"} onClick={increaseCounterByOne}>
                                    <span>Add to Cart</span>
                                    <img src={AddToCartIcon} alt="Cart Icon"/>
                                </button>
                                :
                                <div className="cart-addon card-addon__modal">
                                    <button onClick={decreaseCounterByOne}><span>-</span></button>
                                    <span>{item.quantity}</span>
                                    <button onClick={increaseCounterByOne}><span>+</span></button>
                                </div>
                            }
                        </div>
                    </div>
                </Modal> 
            }
        </Fragment>
    )
}

export default ListItem
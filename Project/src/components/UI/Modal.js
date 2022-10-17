// import { Fragment } from "react"
import ReactDom from "react-dom"
import { Backdrop } from "./Loader"

// in case of oncl
const Modal = ({ onClose, children }) => {
    return (
        <>
            {
                ReactDom.createPortal(
                    <>
                        <Backdrop onClose={onClose}/>
                        <div className="modal">
                            <button type="close" onClick={onClose}>X</button>
                            {/* clicking on this X should close this modal */}
                            <div className="content">{children}</div>
                            {/* // the decription about the product is being passed as aa children here so any change in the children will be rendered here */}
                        </div>
                    </>
                    ,
                    document.getElementById("modal-root")
                )
            }
        </>
    )
}

export default Modal
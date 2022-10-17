import ReactDom from 'react-dom'

export const Backdrop = props => {
    const handleClick = () => {
        if(props.onClose) {
            props.onClose();
        }
    }

        //return the blurry effect
    return (
        <div onClick={handleClick} className="loader-overlay"></div>
    )
}

const Loader = () => {
    return (
        //basically used for rendering jsx element outside the rootelement tag in the index.html file
        ReactDom.createPortal(
            <>
            <Backdrop/>
            <div className="loading-dots">
                <div>Loading</div>
                <div className="loading-dots--dot"></div>
                <div className="loading-dots--dot"></div>
                <div className="loading-dots--dot"></div>
            </div>
            </>,
            document.getElementById("loader-root")
            // loader root jiski id hai usmai render krrhe hai
        )
    )
}

export default Loader
const Loader = ({ color , radius , width  , speed}) => {
    let finalColor = color !== undefined ? color : "white"
    let finalRadius = radius !== undefined ? radius : "3px"
    let finalWidth = width !== undefined ? width : "25px"
    let finalSpeed = speed !== undefined ? speed : "0.7s"
    return (
        <span className="loader flex justify-content-center">
            <style jsx>{`
    .loader {
    width: ${finalWidth};
    height: ${finalWidth};
    border-radius: 50%;
    display: inline-block;
    border-top: ${finalRadius} solid ${finalColor};
    border-right:${finalRadius} solid transparent;
    box-sizing: border-box;
    animation: rotation ${finalSpeed} linear infinite;
    }
    
    @keyframes rotation {
    0% {
    transform: rotate(0deg);
    }
    100% {
    transform: rotate(360deg);
    }
    }
    `}</style>
        </span>
    )
}

export default Loader
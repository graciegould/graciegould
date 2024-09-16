function RbButton({
    children,
    onClick
}) {
    
    return (
        <button
            className="btn retro-box"
            onClick={onClick}
        >
            {children}
        </button>
    )
}
export default RbButton;
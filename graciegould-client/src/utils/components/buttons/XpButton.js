function XpButton({
    children,
    onClick
}) {
    
    return (
        <button
            className="xp-btn"
            onClick={onClick}
        >
            {children}
        </button>
    )
}
export default XpButton;
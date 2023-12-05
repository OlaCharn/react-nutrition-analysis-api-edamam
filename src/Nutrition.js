export const Nutrition = ({ label, quantity, unit }) => {
    return (
        <div>
            <div className="Nutritable"><p className="b">{label}</p> {quantity.toFixed(3)} {unit}</div>
        </div>
    )
}
export default function ProductCard({ product, onAdd }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 10 }}>
      <img src={product.image} alt={product.name} width="100%" />
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <strong>₹{product.price}</strong>
      <div>
        <button onClick={() => onAdd(product)}>Add to Cart</button>
      </div>
    </div>
  );
}

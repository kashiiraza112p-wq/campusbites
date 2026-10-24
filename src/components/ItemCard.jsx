
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ItemCard({ item, favourite, onToggleFavourite }) {
  const { addItem } = useCart();

  return (
    <article className="item-card">
      <div className="food-art">
        <span className="food-emoji" aria-hidden="true">
          {item.emoji}
        </span>

        {item.image && (
          <img
            className="food-photo"
            src={item.image}
            alt={item.name}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        )}

        <span className="item-tag">{item.tag}</span>

        <button
          className={`favourite ${favourite ? 'is-favourite' : ''}`}
          onClick={() => onToggleFavourite(item.id)}
          aria-label={
            favourite
              ? `Remove ${item.name} from favourites`
              : `Add ${item.name} to favourites`
          }
        >
          {favourite ? '♥' : '♡'}
        </button>
      </div>

      <div className="item-info">
        <p className="item-category">{item.category}</p>

        <h3>
          <Link to={`/item/${item.id}`}>{item.name}</Link>
        </h3>

        <p className="item-description">{item.description}</p>

        <div className="item-bottom">
          <strong>Rs. {item.price}</strong>

          <button
            className="add-button"
            onClick={() => addItem(item)}
            aria-label={`Add ${item.name} to cart`}
          >
            ＋ Add
          </button>
        </div>
      </div>
    </article>
  );
}

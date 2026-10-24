
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ItemPage() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { addItem } = useCart();

  useEffect(() => {
    let active = true;

    async function loadItem() {
      try {
        setLoading(true);
        setError('');
        setItem(null);

        const response = await fetch('/menu.json');

        if (!response.ok) {
          throw new Error('Menu could not be loaded.');
        }

        const data = await response.json();
        const match = data.find(
          (entry) => entry.id === Number(id)
        );

        if (!match) {
          throw new Error('This menu item was not found.');
        }

        if (active) {
          setItem(match);
        }
      } catch (err) {
        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadItem();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="page-container">
        <p className="status-message">Loading item...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container">
        <p className="error-message">{error}</p>
        <Link className="back-link" to="/">
          ← Back to menu
        </Link>
      </main>
    );
  }

  return (
    <main className="page-container">
      <Link className="back-link" to="/">
        ← Back to menu
      </Link>

      <article className="detail-card">
        <div className={`detail-art art-${item.id}`}>
          <span className="detail-emoji">{item.emoji}</span>

          {item.image && (
            <img
              className="detail-photo"
              src={item.image}
              alt={item.name}
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          )}

          <small>{item.tag}</small>
        </div>

        <div className="detail-copy">
          <p className="eyebrow">
            {item.category.toUpperCase()}
          </p>

          <h1>{item.name}</h1>

          <p className="detail-description">
            {item.description}
          </p>

          <div className="detail-price">
            Rs. {item.price}
          </div>

          <p className="detail-fresh">
            ✳ Prepared fresh for your campus break
          </p>

          <button
            className="primary-button"
            onClick={() => addItem(item)}
          >
            ＋ Add to your order <span>→</span>
          </button>
        </div>
      </article>
    </main>
  );
}

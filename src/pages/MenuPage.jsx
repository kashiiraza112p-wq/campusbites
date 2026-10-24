
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuList from '../components/MenuList';

const categories = ['All items', 'Meals', 'Snacks', 'Drinks', 'Desserts'];

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All items');
  const [favourites, setFavourites] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadMenu() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('/menu.json');

        if (!response.ok) {
          throw new Error('Menu could not be loaded.');
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Menu data has an invalid format.');
        }

        if (active) {
          setMenu(data);
        }
      } catch (err) {
        if (active) {
          setError(
            `${err.message} Please check public/menu.json and refresh.`
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadMenu();

    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return menu.filter((item) => {
      const matchesCategory =
        category === 'All items' || item.category === category;

      const matchesSearch =
        `${item.name} ${item.description} ${item.category}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFavourite =
        !showFavourites || favourites.includes(item.id);

      return matchesCategory && matchesSearch && matchesFavourite;
    });
  }, [menu, category, search, showFavourites, favourites]);

  const toggleFavourite = (id) => {
    setFavourites((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    );
  };

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-pill">
            <span className="live-dot" />
            CAMPUS DINING EXPERIENCE
          </span>

          <h1>
            Good food.
            <br />
            <em>Great breaks.</em>
          </h1>

          <p>
            Your campus food destination. Discover freshly prepared
            favourites, explore the menu and order for your next break.
          </p>

          <Link className="hero-link" to="/cart">
            Explore your order <span>↗</span>
          </Link>

          <div className="hero-meta">
            <span>✦ Freshly prepared</span>
            <span>◷ Convenient pickup</span>
          </div>
        </div>

        <div
          className="hero-visual"
          aria-label="Burger, fries and drink"
        >
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />

          <span className="hero-food hero-burger">🍔</span>
          <span className="hero-food hero-fries">🍟</span>
          <span className="hero-food hero-drink">🥤</span>

          <span className="floating-note">
            FRESH &amp; TASTY <b>✳</b>
          </span>

          <span className="visual-spark spark-one">✳</span>
          <span className="visual-spark spark-two">✦</span>
        </div>
      </section>

      <main className="main-content">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR CAMPUS FOOD DESTINATION</p>

            <h2>
              Explore the menu<span className="heading-dot">.</span>
            </h2>

            <p className="section-subtitle">
              Great flavours, student-friendly prices and something
              for every craving.
            </p>
          </div>

          <span className="menu-count">
            {menu.length} menu items
          </span>
        </div>

        <div className="toolbar">
          <label className="search-box">
            <span>⌕</span>

            <input
              type="search"
              placeholder="Search food and drinks..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search menu"
            />

            <kbd>⌕</kbd>
          </label>

          <button
            className={`favourites-filter ${
              showFavourites ? 'active' : ''
            }`}
            onClick={() => setShowFavourites((value) => !value)}
            aria-pressed={showFavourites}
          >
            {showFavourites ? '♥ Favourites' : '♡ Favourites'}
          </button>
        </div>

        <div className="category-list" aria-label="Filter by category">
          {categories.map((name) => (
            <button
              key={name}
              className={
                category === name
                  ? 'category-chip selected'
                  : 'category-chip'
              }
              onClick={() => setCategory(name)}
              aria-pressed={category === name}
            >
              {name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="status-message">
            <span className="spinner" />
            Loading the menu...
          </div>
        ) : error ? (
          <div className="error-message" role="alert">
            ⚠ {error}
            <button onClick={() => window.location.reload()}>
              Try again
            </button>
          </div>
        ) : (
          <MenuList
            items={filtered}
            favourites={favourites}
            onToggleFavourite={toggleFavourite}
          />
        )}
      </main>

      <footer className="site-footer">
        <span className="footer-brand">
          CB <b>CampusBites</b>
        </span>

        <span>Fresh food. Better campus life.</span>

        <span>
          Menu changes daily · Prices in PKR (Rs.)
        </span>

        <span className="developer-credit">
          Developed by <strong>KASHIF RAZA</strong>
        </span>
      </footer>
    </>
  );
}

import ItemCard from './ItemCard';
export default function MenuList({ items, favourites, onToggleFavourite }) {
  if (!items.length) return <div className="empty-state"><span>🔎</span><h3>No items found</h3><p>Try another search or category.</p></div>;
  return <div className="menu-grid">{items.map((item) => <ItemCard key={item.id} item={item} favourite={favourites.includes(item.id)} onToggleFavourite={onToggleFavourite} />)}</div>;
}

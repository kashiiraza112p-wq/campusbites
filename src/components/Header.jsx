import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
export default function Header() {
  const { count } = useCart();
  return <header className="site-header"><div className="header-inner"><Link to="/" className="brand"><span className="brand-mark">CB</span><span>campus<span className="brand-light">bites</span><small>YOUR CAMPUS CANTEEN</small></span></Link><nav aria-label="Main navigation"><NavLink to="/" end>Menu</NavLink><NavLink to="/cart" className="cart-nav">Your order <span className="cart-count" aria-label={`${count} items in cart`}>{count}</span></NavLink></nav></div></header>;
}

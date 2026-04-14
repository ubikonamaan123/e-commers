import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function MainLayout() {
  const { user, logout } = useAuth();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '0 auto', maxWidth: 1200 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0' }}>
        <h2>ShopHub (Amazon/Meesho Style)</h2>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link to="/">Home</Link>
          <Link to="/chat">Chat</Link>
          {user?.role === 'vendor' && <Link to="/vendor">Vendor Panel</Link>}
          {user?.role === 'admin' && <Link to="/admin">Admin Panel</Link>}
          {user ? (
            <button onClick={logout}>Logout ({user.name})</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

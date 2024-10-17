import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="max-w-screen-xl mx-auto px-4 bg-white pt-4">
        <div className="w-full px-4 h-16 border border-zinc-200 shadow rounded-full flex items-center justify-between gap-4">
          <Link to="/" className="text-lg font-medium tracking-tighter">
            Guten Books
          </Link>
          <Link to="/wishlist" className="button-solid">
            Wishlist
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

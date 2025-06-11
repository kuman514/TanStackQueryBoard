import { NavLink } from 'react-router';

export default function Header() {
  return (
    <header className="fixed left-0 top-0 w-full h-20 flex flex-row justify-center items-center gap-4 bg-green-500 text-white text-2xl">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'font-bold text-blue-200' : ''
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/posts"
        className={({ isActive }) => (isActive ? 'font-bold' : '')}
      >
        Posts
      </NavLink>
      <NavLink
        to="/create"
        className={({ isActive }) => (isActive ? 'font-bold' : '')}
      >
        Create
      </NavLink>
    </header>
  );
}

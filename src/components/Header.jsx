import { Menu, LogOut, Crown } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../hooks/useAuth";
import { navLinks } from "../navLinks";
import NerdLogo from "../assets/nerdnest.svg";


/**
 * Top header bar.
 * – Shows burger button (mobile) → opens sidebar
 * – Desktop nav links inline
 * – Theme switcher & auth links
 */
export default function Header({ onMenu }) {
  const { user, isAdmin, logout } = useAuth();

  const links = navLinks.filter((l) => !l.admin || isAdmin);

  return (
    <header
      className="sticky top-0 z-30 flex h-14 items-center border-b
                 bg-white/70 px-4 backdrop-blur
                 dark:border-slate-700 dark:bg-slate-900/70 md:px-6"
    >
      {/* burger */}
      <button
        onClick={onMenu}
        aria-label="Open navigation"
        className="rounded p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Brand / logo */}
      <div className="flex items-center gap-2">
        <img src={NerdLogo} alt="" className="w-6 h-6" />
        <Link
          to="/"
          className="text-lg font-semibold tracking-wide text-slate-900 dark:text-white"
        >
          NerdNest
        </Link>
      </div>
      {/* inline nav (desktop) */}
      <nav className="ml-8 hidden md:flex gap-5">
        {links.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              (isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400") +
              " font-medium transition-colors"
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* right side controls */}
      <div className="ml-auto flex items-center gap-4">
        <ThemeToggle />

        {user ? (
          <>
            {/* Avatar */}
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-sm font-semibold text-white">
              {user.email?.[0]?.toUpperCase() ?? "U"}
              {isAdmin && (
                <Crown
                  size={14}
                  className="absolute -top-1 -right-1 rotate-[20deg]
                             text-yellow-400 drop-shadow-sm"
                />
              )}
            </div>

            <button
              onClick={logout}
              className="inline-flex items-center gap-1 rounded px-3 py-1.5 text-sm
                         font-medium text-slate-700 hover:bg-slate-100
                         dark:text-slate-300 dark:hover:bg-slate-800/40"
            >
              <LogOut size={16} className="opacity-70" />
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="inline-flex items-center gap-1 rounded px-3 py-1.5 text-sm
                         font-medium text-slate-700 hover:bg-slate-100
                         dark:text-slate-300 dark:hover:bg-slate-800/40"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="inline-flex items-center gap-1 rounded px-3 py-1.5 text-sm
                         font-medium bg-sky-600 text-white hover:bg-sky-500
                         active:bg-sky-700 focus-visible:outline-none
                         focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              Sign&nbsp;Up
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}
// src/components/Sidebar.jsx
import { NavLink, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { useEffect } from "react";
import { navLinks } from "../navLinks.js";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  // ─── Close when route changes ──────────────────────────────
  useEffect(() => {
    if (isOpen) onClose?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // ─── Close on Escape key ───────────────────────────────────
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // ─── Lock body scroll while sidebar is open ────────────────
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = original);
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ease-out
                  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose}></div>

      <aside
        className="relative h-full w-64 bg-white dark:bg-slate-900 shadow-lg"
        tabIndex={-1} // focus trap entry
      >
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-semibold tracking-wide">Navigation</span>
          <button onClick={onClose} aria-label="Close sidebar">
            <X size={20} />
          </button>
        </div>

        <nav className="mt-4 space-y-1 px-4">
          {navLinks.map(({ label, to, admin }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `block rounded px-3 py-2 font-medium transition-colors ${isActive
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400"
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  );
}

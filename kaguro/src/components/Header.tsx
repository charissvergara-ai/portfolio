"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, User, LogOut, Shield, Package, ShoppingBag, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { totalItems, setDrawerOpen } = useCart();
  const { user, isLoading, signOut } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/store", label: "Store" },
    { href: "/faqs", label: "FAQs" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="../../../assets/images/logos/logo-transparent.png" alt="KaGuro Logo" className="h-10 w-45" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-wide transition-colors ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-text-dark hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {!isLoading && (
              <>
                {user ? (
                  <div className="relative hidden md:block" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-1.5 text-sm font-bold text-text-dark transition-colors hover:text-primary"
                    >
                      <User className="h-5 w-5" />
                      <span className="max-w-[100px] truncate">{user.name.split(" ")[0]}</span>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white py-2 shadow-lg ring-1 ring-black/5">
                        <div className="border-b border-gray-200 px-4 py-2">
                          <p className="text-sm font-bold text-text-dark">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        {user.role === "ADMIN" && (
                          <Link
                            href="/admin"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-dark transition-colors hover:bg-light-bg"
                          >
                            <Shield className="h-4 w-4" /> Admin Panel
                          </Link>
                        )}
                        {user.role === "VENDOR" && (
                          <Link
                            href="/vendor"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-dark transition-colors hover:bg-light-bg"
                          >
                            <Package className="h-4 w-4" /> Vendor Panel
                          </Link>
                        )}
                        {user.role === "CUSTOMER" && (
                          <Link
                            href="/customer"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-dark transition-colors hover:bg-light-bg"
                          >
                            <ShoppingBag className="h-4 w-4" /> My Account
                          </Link>
                        )}
                        <button
                          onClick={() => { setDropdownOpen(false); signOut(); }}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" /> Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/sign-in"
                    className="hidden text-text-dark transition-colors hover:text-primary md:block"
                  >
                    <User className="h-5 w-5" />
                  </Link>
                )}
              </>
            )}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative text-text-dark transition-colors hover:text-primary"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="text-text-dark md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="border-t bg-white px-4 py-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 text-sm font-bold uppercase tracking-wide transition-colors ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-text-dark hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <div className="border-t pt-3 mt-2">
                  <p className="px-0 py-2 text-xs font-bold text-gray-400 uppercase">
                    {user.name}
                  </p>
                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-sm font-bold uppercase tracking-wide text-primary transition-colors hover:text-primary-dark"
                    >
                      Admin Panel
                    </Link>
                  )}
                  {user.role === "VENDOR" && (
                    <Link
                      href="/vendor"
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-sm font-bold uppercase tracking-wide text-primary transition-colors hover:text-primary-dark"
                    >
                      Vendor Panel
                    </Link>
                  )}
                  {user.role === "CUSTOMER" && (
                    <Link
                      href="/customer"
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-sm font-bold uppercase tracking-wide text-primary transition-colors hover:text-primary-dark"
                    >
                      My Account
                    </Link>
                  )}
                  <button
                    onClick={() => { setMobileOpen(false); signOut(); }}
                    className="block py-3 text-sm font-bold uppercase tracking-wide text-red-600 transition-colors hover:text-red-700"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm font-bold uppercase tracking-wide text-text-dark transition-colors hover:text-primary"
              >
                Sign In
              </Link>
            )}
          </nav>
        )}
      </header>
      <CartDrawer />
    </>
  );
}

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SECTOR_LINKS, SITE_NAME } from "@/lib/constants";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [mobileSectorsOpen, setMobileSectorsOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();
  const { user, loading } = useAuth();

  const isSectorActive = SECTOR_LINKS.some((s) => location.pathname === s.href);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-heading font-bold text-xl text-primary flex items-center gap-2">
          <img src="/assets/images/logo/hvn logo.jpeg" alt="HVN Logo" className="h-10 w-auto" />
          <span className="hidden sm:inline">{SITE_NAME}</span>
          <span className="sm:hidden">HVN</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary hover:bg-primary/5",
                location.pathname === link.href && "text-primary bg-primary/10"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Sectors Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSectorsOpen(true)}
            onMouseLeave={() => setSectorsOpen(false)}
          >
            <button
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary hover:bg-primary/5 flex items-center gap-1",
                isSectorActive && "text-primary bg-primary/10"
              )}
              onClick={() => setSectorsOpen(!sectorsOpen)}
            >
              Our Sectors
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", sectorsOpen && "rotate-180")} />
            </button>

            <div
              className={cn(
                "absolute top-full left-0 mt-1 w-56 rounded-xl border bg-popover shadow-xl p-2 transition-all duration-200 origin-top",
                sectorsOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              )}
            >
              {SECTOR_LINKS.map((sector) => (
                <Link
                  key={sector.href}
                  to={sector.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-primary/5 hover:text-primary",
                    location.pathname === sector.href && "text-primary bg-primary/10"
                  )}
                  onClick={() => setSectorsOpen(false)}
                >
                  <span className="text-lg">{sector.icon}</span>
                  {sector.label}
                </Link>
              ))}
            </div>
          </div>

          {NAV_LINKS.slice(3).map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary hover:bg-primary/5",
                location.pathname === link.href && "text-primary bg-primary/10"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/shop" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          {!loading && user ? (
            <Link to="/dashboard">
              <Button size="sm" variant="default">
                <User className="h-4 w-4 mr-1" /> Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/membership" className="hidden md:block">
              <Button size="sm">Join HVN</Button>
            </Link>
          )}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t bg-background animate-slide-in-right">
          <nav className="container py-4 flex flex-col gap-1">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-md text-sm font-medium transition-colors hover:bg-primary/5",
                  location.pathname === link.href && "text-primary bg-primary/10"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Sectors Collapsible */}
            <button
              onClick={() => setMobileSectorsOpen(!mobileSectorsOpen)}
              className={cn(
                "px-4 py-3 rounded-md text-sm font-medium transition-colors hover:bg-primary/5 flex items-center justify-between",
                isSectorActive && "text-primary bg-primary/10"
              )}
            >
              Our Sectors
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", mobileSectorsOpen && "rotate-180")} />
            </button>
            {mobileSectorsOpen && (
              <div className="pl-4 flex flex-col gap-1 animate-fade-in">
                {SECTOR_LINKS.map((sector) => (
                  <Link
                    key={sector.href}
                    to={sector.href}
                    onClick={() => { setOpen(false); setMobileSectorsOpen(false); }}
                    className={cn(
                      "px-4 py-2.5 rounded-md text-sm font-medium transition-colors hover:bg-primary/5 flex items-center gap-2",
                      location.pathname === sector.href && "text-primary bg-primary/10"
                    )}
                  >
                    <span>{sector.icon}</span>
                    {sector.label}
                  </Link>
                ))}
              </div>
            )}

            {NAV_LINKS.slice(3).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-md text-sm font-medium transition-colors hover:bg-primary/5",
                  location.pathname === link.href && "text-primary bg-primary/10"
                )}
              >
                {link.label}
              </Link>
            ))}
            {!loading && user ? (
              <Link to="/dashboard" onClick={() => setOpen(false)}>
                <Button className="w-full mt-2" size="sm">
                  <User className="h-4 w-4 mr-1" /> Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/membership" onClick={() => setOpen(false)}>
                <Button className="w-full mt-2">Join HVN</Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SHOP_CATEGORIES } from "@/lib/constants";

const SAMPLE_PRODUCTS = [
  { id: "p1", name: "Hand-woven Basket", price: 2500, category: "Crafts", artist: "Mary W.", image: "" },
  { id: "p2", name: "Acrylic Landscape", price: 15000, category: "Paintings", artist: "John M.", image: "" },
  { id: "p3", name: "Beaded Necklace Set", price: 3500, category: "Crafts", artist: "Grace N.", image: "" },
  { id: "p4", name: "Clay Water Pot", price: 8000, category: "Sculptures", artist: "Peter K.", image: "" },
  { id: "p5", name: "Kiondo Bag", price: 4500, category: "Textiles", artist: "Faith K.", image: "" },
  { id: "p6", name: "Documentary Photo Print", price: 6000, category: "Photography", artist: "David M.", image: "" },
  { id: "p7", name: "Digital Art Print", price: 3000, category: "Digital Art", artist: "Ann W.", image: "" },
  { id: "p8", name: "Carved Wooden Mask", price: 12000, category: "Cultural Artifacts", artist: "Samuel N.", image: "" },
];

export default function Shop() {
  const [filter, setFilter] = useState("All");
  const { addItem, items, removeItem, updateQuantity, total, itemCount, clearCart } = useCart();

  const filtered = filter === "All" ? SAMPLE_PRODUCTS : SAMPLE_PRODUCTS.filter((p) => p.category === filter);

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-secondary/10 to-primary/10">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">🛍️ Art & Artifacts Shop</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Support local artists and artisans. Every purchase empowers a creative community.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <Button variant={filter === "All" ? "default" : "outline"} size="sm" onClick={() => setFilter("All")}>All</Button>
            {SHOP_CATEGORIES.map((cat) => (
              <Button key={cat} variant={filter === cat ? "default" : "outline"} size="sm" onClick={() => setFilter(cat)}>{cat}</Button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {filtered.map((product) => (
              <div key={product.id} className="group rounded-xl border bg-card overflow-hidden hover-lift">
                <div className="aspect-square bg-muted flex items-center justify-center relative">
                  <span className="text-4xl opacity-20">🎨</span>
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                  <h3 className="font-medium text-sm mt-0.5">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">by {product.artist}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-primary">KES {product.price.toLocaleString()}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs"
                      onClick={() => {
                        addItem({ id: product.id, name: product.name, price: product.price });
                        toast.success(`${product.name} added to cart`);
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sheet */}
      {itemCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="lg" className="rounded-full shadow-xl">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Cart ({itemCount}) — KES {total.toLocaleString()}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4 flex-1 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-sm text-primary">KES {item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => removeItem(item.id)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between font-bold mb-4">
                  <span>Total</span>
                  <span>KES {total.toLocaleString()}</span>
                </div>
                <Button className="w-full mb-2" onClick={() => toast.success("Checkout coming soon! Payment integration in progress.")}>
                  Checkout
                </Button>
                <Button variant="outline" className="w-full" onClick={clearCart}>Clear Cart</Button>
                <p className="text-xs text-center text-muted-foreground mt-2">M-Pesa & card payment coming soon</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}

      {/* Sell Your Art CTA */}
      <section className="py-12 bg-card">
        <div className="container text-center">
          <h2 className="text-2xl font-heading font-bold mb-2">Are You an Artist?</h2>
          <p className="text-muted-foreground mb-4">Join our network and sell your creations to a wider audience.</p>
          <Button variant="outline">Sell Your Art</Button>
        </div>
      </section>
    </Layout>
  );
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ShoppingBag,
  ChevronLeft,
  Search,
  Filter,
  Tag,
  Plus,
  ShoppingCart
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock products data
const products = [
  {
    id: 1,
    name: 'Classic Logo T-Shirt',
    price: 29.99,
    category: 'Apparel',
    image: 'https://dummyimage.com/600x600/f0f0f0/333333.jpg&text=T-Shirt',
    inStock: true,
    colors: ['Black', 'White', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 2,
    name: 'Eco-Friendly Water Bottle',
    image: 'https://dummyimage.com/600x600/f0f0f0/333333.jpg&text=Water+Bottle',
    price: 24.99,
    category: 'Accessories',
    inStock: true,
    colors: ['Silver', 'Black', 'Blue']
  },
  {
    id: 3,
    name: 'Embroidered Cap',
    price: 19.99,
    category: 'Accessories',
    image: 'https://dummyimage.com/600x600/f0f0f0/333333.jpg&text=Cap',
    inStock: true,
    colors: ['Black', 'Navy', 'Gray']
  },
  {
    id: 4,
    name: 'Zip-Up Hoodie',
    price: 49.99,
    category: 'Apparel',
    image: 'https://dummyimage.com/600x600/f0f0f0/333333.jpg&text=Hoodie',
    inStock: false,
    colors: ['Black', 'Gray'],
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 5,
    name: 'Enamel Pin Set',
    price: 12.99,
    category: 'Accessories',
    image: 'https://dummyimage.com/600x600/f0f0f0/333333.jpg&text=Pin+Set',
    inStock: true,
    colors: ['Mixed']
  },
  {
    id: 6,
    name: 'Sticker Pack',
    price: 8.99,
    category: 'Stickers & Pins',
    image: 'https://dummyimage.com/600x600/f0f0f0/333333.jpg&text=Stickers',
    inStock: true
  }
]

const categories = [
  { id: 'all', name: 'All Products', count: 12 },
  { id: 'apparel', name: 'Apparel', count: 6 },
  { id: 'accessories', name: 'Accessories', count: 4 },
  { id: 'stickers', name: 'Stickers & Pins', count: 2 },
]

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const router = useRouter()

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-black/30 backdrop-blur-xl border-r border-white/10">
        {/* Logo Section */}
        <div className="p-4 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative w-10 h-8 overflow-hidden rounded-full">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IEXlfwRwFpn2Ej78zjbJNB6Y0QXL9e.png"
                alt="CommonsSense Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-sm font-bold tracking-tight">Swag Shop</span>
          </Link>
        </div>

        {/* Sidebar Content */}
        <div className="p-4 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3">CATEGORIES</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    activeCategory === category.id ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="text-sm bg-white/5 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3">FILTERS</h3>
            <div className="space-y-4">
              {/* Price Range */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Price Range</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  className="w-full"
                />
                <div className="flex justify-between text-sm">
                  <span>$0</span>
                  <span>$100</span>
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-white/10 bg-white/5" />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-black/30 backdrop-blur-xl border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
            
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Cart Button */}
              <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
                <ShoppingCart size={24} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all">
                {/* Product Image */}
                <div className="relative aspect-square bg-white/5">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-medium">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-medium mb-1">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">${product.price}</span>
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!product.inStock}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 
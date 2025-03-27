"use client"

import { ShoppingBag, Package, TrendingUp, DollarSign, Tag, Box, Truck } from "lucide-react"
import Link from "next/link"

export default function MerchandisePage() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="bg-black/30 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
              ← Back to Main Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Merchandise</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard 
            title="Total Products" 
            value="24" 
            trend="+4" 
            icon={<Package size={24} />} 
          />
          <StatCard 
            title="Monthly Sales" 
            value="$3,456" 
            trend="+12%" 
            icon={<DollarSign size={24} />} 
          />
          <StatCard 
            title="Active Orders" 
            value="18" 
            trend="+3" 
            icon={<ShoppingBag size={24} />} 
          />
        </div>

        {/* Products Grid */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: 'Classic T-Shirt',
                price: '$25.00',
                stock: 45,
                status: 'In Stock'
              },
              {
                name: 'Embroidered Cap',
                price: '$22.00',
                stock: 28,
                status: 'In Stock'
              },
              {
                name: 'Eco Tote Bag',
                price: '$18.00',
                stock: 0,
                status: 'Out of Stock'
              },
              {
                name: 'Sticker Pack',
                price: '$8.00',
                stock: 150,
                status: 'In Stock'
              },
              {
                name: 'Hoodie',
                price: '$45.00',
                stock: 12,
                status: 'Low Stock'
              },
              {
                name: 'Water Bottle',
                price: '$20.00',
                stock: 35,
                status: 'In Stock'
              }
            ].map((product, i) => (
              <div key={i} className="p-4 bg-black/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-full">
                      <Tag size={18} />
                    </div>
                    <h3 className="font-medium">{product.name}</h3>
                  </div>
                  <span className="font-medium text-green-400">{product.price}</span>
                </div>
                <div className="flex items-center justify-between mt-4 text-sm">
                  <span className={`px-2 py-1 rounded-full ${
                    product.status === 'In Stock' ? 'bg-green-500/10 text-green-500' :
                    product.status === 'Low Stock' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {product.status}
                  </span>
                  <span className="text-gray-400">{product.stock} units</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {[
              {
                orderNumber: '#12345',
                items: 3,
                total: '$75.00',
                status: 'Shipped',
                date: 'Today at 2:30 PM'
              },
              {
                orderNumber: '#12344',
                items: 1,
                total: '$25.00',
                status: 'Processing',
                date: 'Today at 11:45 AM'
              },
              {
                orderNumber: '#12343',
                items: 2,
                total: '$43.00',
                status: 'Delivered',
                date: 'Yesterday'
              }
            ].map((order, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Box size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{order.orderNumber}</p>
                    <p className="text-sm text-gray-400">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-medium">{order.total}</p>
                    <p className="text-sm text-gray-400">{order.items} items</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-400">{order.status}</span>
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

function StatCard({ title, value, trend, icon }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-white/10 p-3 rounded-lg">{icon}</div>
        <div className="flex items-center text-green-400">
          <TrendingUp size={16} className="mr-1" />
          <span>{trend}</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-gray-400">{title}</p>
    </div>
  )
} 
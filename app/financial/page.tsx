"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  DollarSign,
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Wallet,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock financial data
const transactions = [
  {
    id: 1,
    type: 'income',
    description: 'Membership Dues',
    amount: 2500,
    date: '2024-03-26',
    category: 'Membership'
  },
  {
    id: 2,
    type: 'expense',
    description: 'Office Supplies',
    amount: 150.75,
    date: '2024-03-25',
    category: 'Operations'
  },
  {
    id: 3,
    type: 'income',
    description: 'Event Tickets',
    amount: 1200,
    date: '2024-03-24',
    category: 'Events'
  }
]

const categories = [
  { id: 'membership', name: 'Membership', color: 'bg-blue-500' },
  { id: 'events', name: 'Events', color: 'bg-green-500' },
  { id: 'donations', name: 'Donations', color: 'bg-purple-500' },
  { id: 'operations', name: 'Operations', color: 'bg-red-500' },
]

export default function FinancialPage() {
  const [activeView, setActiveView] = useState("overview")
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
            <span className="text-sm font-bold tracking-tight">Financial Dashboard</span>
          </Link>
        </div>

        {/* Sidebar Content */}
        <div className="p-4 space-y-6">
          {/* Add Transaction Button */}
          <button className="w-full flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Plus size={20} />
            <span>Add Transaction</span>
          </button>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3">CATEGORIES</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-white/10 bg-white/5" defaultChecked />
                  <span className={`w-2 h-2 rounded-full ${category.color}`} />
                  <span>{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3">RECENT TRANSACTIONS</h3>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="bg-white/5 p-3 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{transaction.description}</h4>
                    <span className={transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{transaction.category}</span>
                    <span>{transaction.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-black/30 backdrop-blur-xl border-b border-white/10 p-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Balance"
              value="$45,250.75"
              trend="+12.5%"
              icon={<Wallet size={24} />}
              trendDirection="up"
            />
            <StatCard 
              title="Monthly Income"
              value="$8,245.00"
              trend="+23.1%"
              icon={<TrendingUp size={24} />}
              trendDirection="up"
            />
            <StatCard 
              title="Monthly Expenses"
              value="$3,750.25"
              trend="-5.2%"
              icon={<TrendingDown size={24} />}
              trendDirection="down"
            />
            <StatCard 
              title="Available Budget"
              value="$12,500.00"
              trend="+8.4%"
              icon={<DollarSign size={24} />}
              trendDirection="up"
            />
          </div>

          {/* Charts and Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Transaction History */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Transaction History</h3>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}>
                        {transaction.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-400">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                      </p>
                      <p className="text-sm text-gray-400">{transaction.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Overview */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Budget Overview</h3>
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">{category.name}</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                      <div className={`h-full ${category.color} transition-all duration-500`} style={{ width: '75%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  trend: string
  icon: React.ReactNode
  trendDirection: 'up' | 'down'
}

function StatCard({ title, value, trend, icon, trendDirection }: StatCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-white/10 p-3 rounded-lg">{icon}</div>
        <div className={`flex items-center ${
          trendDirection === 'up' ? 'text-green-400' : 'text-red-400'
        }`}>
          {trendDirection === 'up' ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
          {trend}
        </div>
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-gray-400">{title}</p>
    </div>
  )
} 
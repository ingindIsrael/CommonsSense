"use client"

import { DollarSign, TrendingUp, CreditCard, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Link from "next/link"

export default function FinancesPage() {
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
        <h1 className="text-3xl font-bold mb-6">Finances</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard 
            title="Total Balance" 
            value="$24,567" 
            trend="+8.5%" 
            icon={<Wallet size={24} />} 
          />
          <StatCard 
            title="Monthly Income" 
            value="$12,345" 
            trend="+23%" 
            icon={<DollarSign size={24} />} 
          />
          <StatCard 
            title="Monthly Expenses" 
            value="$8,234" 
            trend="-12%" 
            isNegative
            icon={<CreditCard size={24} />} 
          />
        </div>

        {/* Recent Transactions */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {[
              {
                name: 'Monthly Donations',
                amount: '+$2,500',
                date: 'Today at 2:45 PM',
                type: 'income'
              },
              {
                name: 'Office Supplies',
                amount: '-$350',
                date: 'Yesterday at 11:30 AM',
                type: 'expense'
              },
              {
                name: 'Event Ticket Sales',
                amount: '+$1,200',
                date: 'Jul 2, 2024',
                type: 'income'
              },
              {
                name: 'Marketing Campaign',
                amount: '-$800',
                date: 'Jul 1, 2024',
                type: 'expense'
              }
            ].map((transaction, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'income' ? 'bg-green-500/10' : 'bg-red-500/10'
                  }`}>
                    {transaction.type === 'income' ? 
                      <ArrowUpRight size={20} className="text-green-500" /> : 
                      <ArrowDownRight size={20} className="text-red-500" />
                    }
                  </div>
                  <div>
                    <p className="font-medium">{transaction.name}</p>
                    <p className="text-sm text-gray-400">{transaction.date}</p>
                  </div>
                </div>
                <span className={`font-medium ${
                  transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Reports */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Financial Reports</h2>
          <div className="space-y-4">
            {[
              {
                name: 'Q2 2024 Financial Report',
                date: 'June 30, 2024',
                size: '2.4 MB'
              },
              {
                name: 'Q1 2024 Financial Report',
                date: 'March 31, 2024',
                size: '2.1 MB'
              }
            ].map((report, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-black/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/10 rounded-full">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-gray-400">{report.date}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{report.size}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, trend, icon, isNegative = false }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-white/10 p-3 rounded-lg">{icon}</div>
        <div className={`flex items-center ${isNegative ? 'text-red-400' : 'text-green-400'}`}>
          <TrendingUp size={16} className="mr-1" />
          <span>{trend}</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-gray-400">{title}</p>
    </div>
  )
} 
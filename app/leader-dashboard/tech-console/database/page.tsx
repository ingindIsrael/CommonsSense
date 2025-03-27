"use client"

import { useState } from "react"
import { Download, Database, RefreshCw } from "lucide-react"
import Link from "next/link"
import { ConfirmModal } from "../components/confirm-modal"

export default function DatabaseManagementPage() {
  const [isUpdatingSchema, setIsUpdatingSchema] = useState(false)
  const [isMigrating, setIsMigrating] = useState(false)
  const [showMigrateWarning, setShowMigrateWarning] = useState(false)

  const handleUpdateSchema = async () => {
    setIsUpdatingSchema(true)
    try {
      const response = await fetch('/api/schema', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch schema')
      }

      const schema = await response.json()
      console.log('Schema updated successfully:', schema)
    } catch (error) {
      console.error('Failed to update schema:', error)
    } finally {
      setIsUpdatingSchema(false)
    }
  }

  const handleMigration = async () => {
    setIsMigrating(true)
    try {
      const response = await fetch('/api/database/migrate', {
        method: 'POST',
      })
      
      if (!response.ok) {
        throw new Error('Failed to run migration')
      }

      alert('Database migration completed successfully')
    } catch (error) {
      console.error('Migration error:', error)
      alert('Failed to run migration. Check console for details.')
    } finally {
      setIsMigrating(false)
      setShowMigrateWarning(false)
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="bg-black/30 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/leader-dashboard/tech-console" className="text-gray-400 hover:text-white transition-colors">
              ← Back to Tech Console
            </Link>
            <button
              onClick={handleUpdateSchema}
              disabled={isUpdatingSchema}
              className={`flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-800 
                       text-white rounded-lg transition-colors ${isUpdatingSchema ? 'opacity-70' : ''}`}
            >
              <Download size={16} className={isUpdatingSchema ? 'animate-bounce' : ''} />
              {isUpdatingSchema ? 'Updating Schema...' : 'Update Database Schema'}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Database Management</h1>
        
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="text-red-500" size={24} />
            <h2 className="text-xl font-bold">Database Controls</h2>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => setShowMigrateWarning(true)}
              disabled={isMigrating}
              className="w-full"
            >
              <div className="p-4 bg-black/30 rounded-lg flex items-center justify-between hover:bg-black/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <RefreshCw size={20} className={isMigrating ? 'animate-spin' : ''} />
                  <span>{isMigrating ? 'Running Migration...' : 'Run Database Migration'}</span>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </button>
            
            <div className="p-4 bg-black/30 rounded-lg">
              <h3 className="font-medium mb-2">Current Schema Status</h3>
              <p className="text-gray-400">View and manage your database schema</p>
            </div>
            
            <div className="p-4 bg-black/30 rounded-lg">
              <h3 className="font-medium mb-2">Backup Controls</h3>
              <p className="text-gray-400">Manage database backups and restoration</p>
            </div>
            
            <div className="p-4 bg-black/30 rounded-lg">
              <h3 className="font-medium mb-2">Performance Metrics</h3>
              <p className="text-gray-400">Monitor database performance and usage</p>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showMigrateWarning}
        onClose={() => setShowMigrateWarning(false)}
        onConfirm={handleMigration}
        title="Run Database Migration"
        message="This will create or update database tables. Are you sure you want to continue?"
      />
    </div>
  )
} 
import { AlertTriangle } from "lucide-react"

interface WarningModalProps {
  isOpen: boolean
  onConfirm: () => void
}

export function WarningModal({ isOpen, onConfirm }: WarningModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900/90 border border-red-500/20 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-red-500/10 rounded-full">
            <AlertTriangle size={32} className="text-red-500" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-4">Warning</h2>
        
        <p className="text-gray-400 text-center mb-8">
          Only the tech specialist should manipulate this console. Unauthorized access or modifications may result in system instability.
        </p>
        
        <div className="flex justify-center">
          <button
            onClick={onConfirm}
            className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            I Understand, Continue
          </button>
        </div>
      </div>
    </div>
  )
} 
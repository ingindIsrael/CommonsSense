import { AppDashboard } from "@/components/app-dashboard"
import { 
  Home,
  Calendar, 
  FileText, 
  Users, 
  Database,
  ShoppingBag,
  Flag
} from "lucide-react"

const dashboardTiles = [
  {
    title: "Leader Dashboard",
    description: "Access your leadership overview and metrics",
    icon: <Home className="h-6 w-6" />,
    href: "/leader-dashboard",
    color: "from-blue-500 to-blue-600",
    requiresSecurityCheck: true
  },
  {
    title: "Calendar",
    description: "Manage events and schedules",
    icon: <Calendar className="h-6 w-6" />,
    href: "/calendar",
    color: "from-yellow-500 to-yellow-600"
  },
  {
    title: "PoliEd",
    description: "Political education resources and training",
    icon: <FileText className="h-6 w-6" />,
    href: "/polied",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Social",
    description: "Connect with your community",
    icon: <Users className="h-6 w-6" />,
    href: "/social",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Financial",
    description: "Manage budgets and transactions",
    icon: <Database className="h-6 w-6" />,
    href: "/financial",
    color: "from-pink-500 to-pink-600"
  },
  {
    title: "Resources",
    description: "Access shared resources and documents",
    icon: <FileText className="h-6 w-6" />,
    href: "/resources",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    title: "Swag Shop",
    description: "Browse and order merchandise",
    icon: <ShoppingBag className="h-6 w-6" />,
    href: "/shop",
    color: "from-red-500 to-red-600"
  },
  {
    title: "Campaigns",
    description: "Manage your active campaigns",
    icon: <Flag className="h-6 w-6" />,
    href: "/campaigns",
    color: "from-orange-500 to-orange-600"
  }
]

export default function DashboardPage() {
  return <AppDashboard tiles={dashboardTiles} />
} 
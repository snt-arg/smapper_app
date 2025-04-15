import { NavLink } from './Navigation.tsx'
import {
  ChartLine,
  FolderDown,
  LayoutDashboard,
  Radio,
  ServerCog,
} from 'lucide-react'
import Mobilebar from './MobileBar.tsx'
import DesktopBar from './DesktopBar.tsx'
import { useBreakpointValue } from '@chakra-ui/react'

const links: NavLink[] = [
  {
    href: '/',
    icon: LayoutDashboard,
    text: 'Dashboard',
  },
  {
    href: '/visualizer',
    icon: ChartLine,
    text: 'Visualizer',
  },
  {
    href: '/services',
    icon: ServerCog,
    text: 'Services',
  },

  {
    href: '/recordings',
    icon: FolderDown,
    text: 'Recordings',
  },
  // {
  //   href: '/sensors',
  //   icon: Radio,
  //   text: 'Sensors',
  // },
]

const smVariant = { navigation: 'drawer', navigationButton: true }
const mdVariant = { navigation: 'sidebar', navigationButton: false }

function Sidebar() {
  const variants = useBreakpointValue({ base: smVariant, lg: mdVariant })

  return variants?.navigation === 'sidebar' ? (
    <DesktopBar links={links} />
  ) : (
    <Mobilebar links={links} />
  )
}

export default Sidebar

import { Stack } from "@chakra-ui/react"
import NavigationItem from "./NavLinkItem"


export interface NavLink {
  href: string,
  text: string,
  icon: React.ElementType,
}


interface Props {
  links: NavLink[],
  onClick?: () => void
}

export function Navigation({ links, onClick }: Props) {
  return (
    <Stack>
      {links.map((link, index) => (
        <NavigationItem
          key={index}
          href={link.href}
          icon={link.icon}
          text={link.text}
          onClick={onClick}
        />
      ))}
    </Stack>

  );
}

export default Navigation;

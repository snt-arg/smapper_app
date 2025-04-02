import { NavLink } from "react-router-dom"
import { Text, Flex } from "@chakra-ui/react"

interface NavLinkProps {
  href: string,
  text: string,
  icon: React.ElementType,
  onClick?: () => void
}


export default function NavigationItem({ href, text, icon: Icon, onClick }: NavLinkProps) {
  return (
    <NavLink
      to={href}
      onClick={onClick}
    >
      {({ isActive }) => (
        <>
          <Flex
            spaceX={3}
            alignItems="center"
            bgColor={isActive ? "blue.200" : "transparent"}
            paddingX="4"
            paddingY={2}
            borderRadius="md">
            <Icon size={25} />
            <Text textStyle="xl">{text}</Text>
          </Flex>
        </>
      )}
    </NavLink>
  )
}

import { NavLink } from 'react-router-dom'
import { Text, Flex } from '@chakra-ui/react'

interface NavLinkProps {
  href: string
  text: string
  icon: React.ElementType
  onClick?: () => void
}

export default function NavigationItem({
  href,
  text,
  icon: Icon,
  onClick,
}: NavLinkProps) {
  return (
    <NavLink to={href} onClick={onClick}>
      {({ isActive }) => (
        <Flex
          colorPalette="blue"
          spaceX={3}
          alignItems="center"
          bgColor={
            isActive
              ? { base: 'colorPalette.300', _dark: 'colorPalette.600' }
              : 'transparent'
          }
          paddingX="4"
          paddingY={2}
          borderRadius="md"
          _hover={{
            base: { bgColor: 'colorPalette.200' },
            _dark: { bgColor: 'colorPalette.400' },
          }}
        >
          <Icon size={25} />
          <Text textStyle="lg" fontWeight="medium">
            {text}
          </Text>
        </Flex>
      )}
    </NavLink>
  )
}

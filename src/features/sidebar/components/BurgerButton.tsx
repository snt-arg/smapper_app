import { Button, Icon } from '@chakra-ui/react'

export default function BurgerButton() {
  return (
    <Button variant="plain">
      <Icon width={35} height={35}>
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={'M4 6h16M4 12h16m-7 6h7'}
          ></path>
        </svg>
      </Icon>
    </Button>
  )
}

import { createSystem, defineConfig } from "@chakra-ui/react";
import { defaultConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    breakpoints: {
      sm: "320px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
  },

})


export default createSystem(defaultConfig, config);

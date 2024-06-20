import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
        global: (props) => ({
            svg: {
                color:
                    props.colorMode === "dark" ? "whiteAlpha.900" : "teal.700",
            }
        }),
    },
    components: {
        Icon: {
            baseStyle: (props) => ({
                color:
                    props.colorMode === "dark" ? "whiteAlpha.900" : "teal.700",
            }),
        },
    },
});

export default theme;

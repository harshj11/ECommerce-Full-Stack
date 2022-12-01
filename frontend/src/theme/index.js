import { extendTheme, theme as base } from '@chakra-ui/react';
import './styles.css';

const theme = extendTheme({
    "colors": {
        "orange": {
            "50": "#FFF1E5",
            "100": "#FFD6B8",
            "200": "#FFBC8A",
            "300": "#FFA25C",
            "400": "#FF882E",
            "500": "#FF7D1A",
            "600": "#CC5800",
            "700": "#994200",
            "800": "#662C00",
            "900": "#331600"
        }
    },
    fonts: {
        heading: `Montserrat, ${base.fonts.heading}`,
        body: `Kumbh Sans, ${base.fonts.body}`
    },
    components: {
        Link: {
            baseStyle: {
                '_hover': { 
                    borderBottom: 'solid 4px #ff7d1a',
                    cursor: 'pointer',
                    textDecoration: 'none',
                }
            },
        },
        Button: {
            baseStyle: {
                'boxShadow': '0 2px 20px 0 #ffd2b3',
                '_hover': {
                    cursor: 'pointer'
                }
            }
        }
    }
});

export default theme;
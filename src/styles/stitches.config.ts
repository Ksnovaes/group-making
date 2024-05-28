import { createStitches } from "@stitches/react";

export const { 
    config, 
    styled, 
    css,
    globalCss, 
    keyframes, 
    getCssText, 
    theme, 
    createTheme
} = createStitches({
    theme: {
        colors: {
            white: '#FFF',

            gray900: '#121214',
            gray800: '#202024',
            gray300: '#c4c4cc',
            gray100: '#e1e1e6',

            orange900: '#b34700',
            orange700: '#e65c00',
            orange300: '#ffad5c',
            orange200: '#ffd580'
        }
    }
})
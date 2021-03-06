import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import createSpacing from '@material-ui/core/styles/createSpacing';
import createTypography from '@material-ui/core/styles/createTypography';

import type { TypographyStyleOptions } from '@material-ui/core/styles/createTypography';

const palette = createPalette({
    type: 'light',
    background: {
        default: '#f2f2f2',
    },
});

const breakpoints = createBreakpoints({
    values: {
        xs: 0,
        sm: 576,
        md: 894,
        lg: 1150,
        xl: 1480,
    },
});

const spacing = createSpacing(8);

const defaultTypographyHeadings: TypographyStyleOptions = {
    fontWeight: 'bold',
};

const typography = createTypography(palette, {
    h1: {
        ...defaultTypographyHeadings,
        fontSize: '2rem', // 32
    },
    h2: {
        ...defaultTypographyHeadings,
        // fontSize: '2.5rem', // 40px
    },
    h3: {
        ...defaultTypographyHeadings,
        // fontSize: '1.5rem', // 24px
    },
    body1: {
        fontSize: '0.875rem', // 14px
    },
    fontFamily: [
        '"Tahoma"',
        'sans-serif',
    ].join(','),
});

let muiTheme = createTheme({
    palette,
    breakpoints,
    spacing,
    typography,
    props: {
        MuiContainer: {
            maxWidth: 'lg',
        },
        MuiButton: {
            color: 'primary',
            variant: 'outlined',
        },
        MuiTextField: {
            variant: 'outlined',
        },
    },
    overrides: {},
});

muiTheme = responsiveFontSizes(muiTheme);

export const theme = muiTheme;

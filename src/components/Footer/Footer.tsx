import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(({ palette }) => ({
    footer: {
        position: 'absolute',
        display: 'flex',
        width: '100%',
        bottom: 0,
        padding: '10px 15px',
        color: palette.common.white,
        backgroundColor: palette.text.primary,
    },
}));

export const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Typography>
                © 2020-{new Date().getFullYear()} | Vi
            </Typography>
        </footer>
    );
};

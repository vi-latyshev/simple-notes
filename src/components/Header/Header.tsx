import { makeStyles, Typography } from '@material-ui/core';

interface HeaderProps {
    title: string;
    children?: React.ReactChild;
}

const useStyles = makeStyles(() => ({
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    header: {
        flex: 1,
    },
}));

export const Header = ({
    title,
    children,
}: HeaderProps) => {
    const classes = useStyles();

    return (
        <header className={classes.headerContainer}>
            <Typography variant="h1" className={classes.header}>
                {title}
            </Typography>
            {children}
        </header>
    );
};

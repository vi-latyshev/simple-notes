import Link from 'next/link';
import { Button, makeStyles } from '@material-ui/core';
import { Create, Delete } from '@material-ui/icons';

import type { Note } from 'types/note';

interface NoteItemProps extends Note { }

const useStyles = makeStyles(({ palette }) => ({
    note: {
        display: 'flex',
        flexDirection: 'row',
        '& > *': {
            display: 'flex',
            alignItems: 'center',
            padding: '10px 15px',
            border: `1px solid ${palette.background.default}`,
        },
        '&:not(:last-child) > *': {
            borderBottom: 'none',
        },
    },
    index: {
        width: 100,
    },
    description: {
        flex: '1 auto',
        borderLeft: 'none',
        borderRight: 'none',
    },
    buttonContainer: {
        '& > *': {
            margin: '0 5px',
        },
    },
    button: {
        padding: 7,
        minWidth: 32,
    },
}));

export const NoteItem = ({
    id,
    description,
}: NoteItemProps) => {
    const classes = useStyles();

    return (
        <div className={classes.note}>
            <div className={classes.index}>
                {id}
            </div>
            <div className={classes.description}>
                {description}
            </div>
            <div className={classes.buttonContainer}>
                <Link href={`/${id}`} passHref>
                    <Button className={classes.button}>
                        <Create fontSize="inherit" />
                    </Button>
                </Link>
                <Button color="secondary" className={classes.button}>
                    <Delete fontSize="inherit" />
                </Button>
            </div>
        </div>
    );
};

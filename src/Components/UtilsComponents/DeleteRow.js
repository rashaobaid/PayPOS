import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';


const useStyles = makeStyles({
    root: {
        maxWidth: '200px',
        display: 'inline-block',
        position: 'absolute',
        marginLeft: '-200px',
        marginTop: '-121px',
        backgroundColor: '#d8d9dd',
    },
});

const DeleteRow = ({ onDeleteCallback, id }) => {
    const [show, toggleShow] = useState(false);
    const classes = useStyles();
    return (
        <>
            <Button color="primary" variant="outlined" onClick={() => toggleShow(!show)} >
                <Close />
            </Button>
            {show && <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography color="textSecondary">
                        Are you sure you want to delete this record?
                   </Typography>
                </CardContent>
                <CardActions>
                    <Button size='small' variant="contained" color="primary" onClick={() => onDeleteCallback(id)}>
                        Yes
                    </Button>
                    <Button size='small' variant="contained" color="secondary" onClick={() => toggleShow(!show)}>
                        No
                    </Button>
                </CardActions>
            </Card>}
        </>
    );
}

export default DeleteRow;


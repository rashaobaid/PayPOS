import React from 'react'
import { makeStyles, createStyles, IconButton, Grid, Tooltip, Select, MenuItem, TextField,FormControl } from "@material-ui/core";
import { PersonAdd, Visibility } from "@material-ui/icons";
const useStyles = makeStyles((theme) =>
    createStyles({
        headerContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        clientText: {
            fontSize: "2em",
            fontWeight: 700,
            fontFamily: "auto",
            color: '#1d3e5f'
        },
        iconButton: {
            backgroundColor: "#a1b1bc",
            padding: "0.2em",
            borderRadius: "0.2em",
            color: "#344963",
        },
        visibilityIcon: {
            marginRight: "0.5em",
        },
        select:{
            width:'100%',
            marginBottom:'1em',
            backgroundColor:'white',
            '& .MuiOutlinedInput-input': {
                padding: '8.5px 14px'
            }

        },
        input:{
            backgroundColor:'white',
            '& .MuiOutlinedInput-input': {
                padding: '8.5px 14px'
            }
        }
        
    })
);
const ClientHeader = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.headerContainer}>
            <span className={classes.clientText}>Choose Client</span>
            <Grid >
                <IconButton className={`${classes.iconButton} ${classes.visibilityIcon}`}>
                    <Tooltip title="show last receipt" placement="top">
                        <Visibility />
                    </Tooltip>
                </IconButton>
                <IconButton className={classes.iconButton}>
                    <Tooltip title="Add new customer" placement="top">
                        <PersonAdd />
                    </Tooltip>
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <FormControl variant="outlined"  className={classes.select}  >
                    <Select
                        labelId="Walk in Customer"
                        name="Walk in Customer"
                        fullWidth
                    >
                        <MenuItem value='Walk in Customer' selected > Walk in Customer</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                className={classes.input}
                    variant="outlined"
                    fullWidth
                    placeholder="Barcode Scanner"
                />
            </Grid>
        </Grid>
    )
}

export default ClientHeader;
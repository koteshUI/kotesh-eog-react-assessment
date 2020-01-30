import React from 'react'
import { Grid, CardContent, Typography, Card, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    card: {
        background: "#171C43",
        color: "#5c69c5"
    },
    title: {
        color: "#fff"
    }
}));
export default props => {
    const classes = useStyles();

    return (<Grid item md={3} lg={2} >
        <Card elevation={1}>
            <CardContent className={classes.card}>
                <Typography variant="h6">{props.title.toUpperCase()}</Typography>
                <Typography className={classes.title} variant="h5">{props.currentValue}</Typography>
            </CardContent>
        </Card>
    </Grid>)
}

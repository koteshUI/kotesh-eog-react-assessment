import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import * as actions from '../../store/actions'
import MetricCheckBox from '../metricComponents/MetricCheckBox'
import Chart from '../chart/Chart'
import { connect } from 'react-redux'
import CardSection from '../CardSection'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
    },
    chartContainer: {
        width: '100vw',
        height: '500px',
    },
}))

const GraphContainer = ({
    startLiveUpdates,
    getPastData,
    latestValue,
    metrics,
    ...props
}) => {
    const classes = useStyles(props)
    const [axes, setVisible] = React.useState({
        pressure: false,
        temp: false,
        percentage: false,
    })
    const [selectedMetrics, setSelectedMetrics] = React.useState([])
    React.useEffect(() => {
        let triggerLiveUpdate = false
        Object.entries(axes).forEach(
            ([value]) => {
                if (value) {
                    triggerLiveUpdate = true;
                }
            }
        );
        if (triggerLiveUpdate) {
            startLiveUpdates()
        }
    }, [axes, startLiveUpdates])
    const getYAxisID = metric => {
        if (metric.toLowerCase().endsWith('pressure')) {
            return 1
        } else if (metric.toLowerCase().endsWith('temp')) {
            return 2
        } else {
            return 0
        }
    }
    const handleSelect = selected => {
        const metricSelected = selected()
        if (selectedMetrics.length < metricSelected.length) {
            getPastData(metricSelected[metricSelected.length - 1])
        }
        setVisible({
            pressure: metricSelected.some(m => getYAxisID(m) === 1),
            temp: metricSelected.some(m => getYAxisID(m) === 2),
            percentage: metricSelected.some(m => getYAxisID(m) === 0),
        })
        setSelectedMetrics(selected)
    }
    return (

        <main className={classes.root}>
            <Grid container>
                <Grid container item xs={12} spacing={4}>
                    <Grid item xs={12} md={12} lg={12}>
                        <MetricCheckBox
                            setSelected={handleSelect}
                            selectedMetrics={selectedMetrics}
                        />
                    </Grid>
                    <Grid
                        item
                        container
                        spacing={2}
                        className={classes.valueGrid}
                    >
                        <Grid item lg={12} md={7} xs={12}>
                            <Grid container spacing={2}>
                                <CardSection
                                    selectedMetrics={selectedMetrics}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        className={classes.chartContainer}
                        item
                        container
                        xs={12}
                        justify="center"
                        alignItems="center"
                    >
                        <Chart
                            selectedMetrics={selectedMetrics}
                            getYAxisID={getYAxisID}
                            axes={axes}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </main>
    )
}

const mapDispatch = dispatch => ({
    startLiveUpdates: () => {
        dispatch({
            type: actions.TRIGGER_LIVE_UPDATES,
        })
    },
    getPastData: metricName => {
        dispatch({
            type: actions.GET_LAST_THIRTY_MINS_DATA,
            metricName,
        })
    },
})

export default connect(
    () => ({}),
    mapDispatch
)(GraphContainer)

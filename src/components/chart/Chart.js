import React from 'react'
import {
    XAxis,
    YAxis,
    LineChart,
    Line,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import {
    indigo,
    purple,
    teal,
    red,
    pink,
    green,
} from '@material-ui/core/colors'
import { useSelector } from 'react-redux'
import * as d3 from "d3-time-format"


const colors = [
    red[500],
    pink[500],
    purple[500],
    teal[500],
    green[500],
    indigo[500],
]


const getData = state => {
    const { metrics } = state.metrics;
    const plot = Object.keys(metrics).map(key => metrics[key])
    return {
        data: plot,
    }
}

const Chart = ({ selectedMetrics, getYAxisID, axes }) => {
    const { data } = useSelector(
        getData
    )
    return (<ResponsiveContainer >
        <LineChart width={800} height={500} data={data}>
            {selectedMetrics.map((metric, index) => (
                <Line
                    key={index}
                    dot={false}
                    activeDot={false}
                    yAxisId={getYAxisID(metric)}
                    dataKey={metric}
                    stroke={colors[index]}
                />
            ))}

            {selectedMetrics.length > 0 && (
                <XAxis dataKey="at" strokeWidth={1} tickFormatter={d3.timeFormat('%I:%M')} />
            )}
            {axes.percentage && (
                <YAxis
                    label={{
                        value: '%',
                        position: 'insideTopLeft',
                        offset: 0,
                        fill: '#908e8e',
                        dy: 10,
                        dx: 10,
                        angle: -90,
                    }}
                    yAxisId={0}
                    orientation="left"
                    stroke={'#908e8e'}
                    domain={[0, 100]}
                    ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                    tick={{ fontSize: 12 }}
                />
            )}
            {axes.pressure && (
                <YAxis
                    label={{
                        value: 'PSI',
                        position: 'insideTopLeft',
                        offset: 0,
                        fill: '#908e8e',
                        fontSize: 12,
                        dy: 15,
                        dx: 10,
                        angle: -90,
                    }}
                    yAxisId={1}
                    orientation="left"
                    stroke={'#908e8e'}
                    tick={{ fontSize: 12 }}
                />
            )}
            {axes.temp && (
                <YAxis
                    label={{
                        value: 'F',
                        position: 'insideTopLeft',
                        offset: 0,
                        fill: '#908e8e',
                        fontSize: 12,
                        dy: 10,
                        dx: 10,
                        angle: -90,
                    }}
                    yAxisId={2}
                    orientation="left"
                    stroke={'#908e8e'}
                    tick={{ fontSize: 12 }}
                />
            )}
            }
            <Tooltip />
        </LineChart>
    </ResponsiveContainer>)
}


export default Chart

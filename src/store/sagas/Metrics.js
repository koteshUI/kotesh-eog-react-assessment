import { takeEvery, take, call, put, fork, select } from 'redux-saga/effects'
import * as actions from '../actions'
import api from '../api'
import { eventChannel } from 'redux-saga'

const getMetrics = ({ metrics: { metrics } }) => metrics

function* formatData(dataList) {
    let data = yield select(getMetrics)
    dataList.map(item => {
        const { metric, at, value } = item
        data = {
            ...data,
            [at]: {
                ...data[at],
                [metric]: value,
                at,
            },
        }
        return null
    })
    yield put({ type: actions.METRICS_RECEIVED_MULTI, metrics: data })
}

function* processData(newData) {
    const { metric, at, value } = newData
    let data = yield select(getMetrics)
    const lastLatestValue = yield select(state => state.metrics.latestValue)

    data = {
        ...data,
        [at]: {
            ...data[at],
            [metric]: value,
            at,
        },
    }
    const latestValue = {
        ...lastLatestValue,
        [metric]: value,
    }
    yield put({ type: actions.METRICS_RECEIVED, metrics: data, latestValue })
}

const createChannel = sub =>
    eventChannel(emit => {
        const handler = data => {
            emit(data)
        }
        sub.subscribe(handler)
        return () => {
            sub.unsubscribe()
        }
    })

function* triggerLiveUpdate() {
    const sub = yield call(api.subscribeLive)
    const subscription = yield call(createChannel, sub)
    while (true) {
        const { data } = yield take(subscription)
        yield fork(processData, data.newMeasurement)
    }
}

function* fetchLast30minData(action) {
    const { data } = yield call(api.FetchLast30minData, action.metricName)
    const newData = data.getMeasurements
    yield fork(formatData, newData)
}

function* watch() {
    yield takeEvery(actions.GET_LAST_THIRTY_MINS_DATA, fetchLast30minData)
    yield takeEvery(actions.TRIGGER_LIVE_UPDATES, triggerLiveUpdate)

}

export default [watch]

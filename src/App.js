import React from 'react'

import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { ApolloProvider } from 'react-apollo'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import api from './store/api'
import createStore from './store'

import 'react-toastify/dist/ReactToastify.css'
import Wrapper from './components/Wrapper'
import Header from './components/Header'
import GraphContainer from './components/graphContainer/GraphContainer'

const { client } = api
const store = createStore()
const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: 'rgb(39,49,66)',
        },
        secondary: {
            main: 'rgb(197,208,222)',
        },
        background: {
            // main: 'rgb(226,231,238)',
            main: '#0f273d',
        },
    },
})

const App = props => (
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Wrapper >
                    <Header />
                    <ToastContainer />
                    <GraphContainer />
                </Wrapper>
            </Provider>
        </ApolloProvider>
    </MuiThemeProvider>
)

export default App

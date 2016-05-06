import React from 'react'
import ReactDOM from 'react-dom'
import Error from '../page/error'
var props = window.APP_PROPS
ReactDOM.render(<Error {...props}/>, document.getElementById("app"))
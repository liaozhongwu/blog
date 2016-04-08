import React from 'react'
import ReactDOM from 'react-dom'
import Error from '../page/Error'
var props = window.APP_PROPS
ReactDOM.render(<Error {...props}/>, document.getElementById("main"))
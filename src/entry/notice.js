import React from 'react'
import ReactDOM from 'react-dom'
import Notice from '../page/Notice'
var props = window.APP_PROPS
ReactDOM.render(<Notice {...props}/>, document.getElementById("main"))
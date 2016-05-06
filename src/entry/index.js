import React from 'react'
import ReactDOM from 'react-dom'
import Index from '../page/index'
var props = window.APP_PROPS
ReactDOM.render(<Index {...props}/>, document.getElementById("app"))
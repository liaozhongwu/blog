import React from 'react'
import ReactDOM from 'react-dom'
import Index from '../page/Index'
var props = window.APP_PROPS
ReactDOM.render(<Index {...props}/>, document.getElementById("app"))
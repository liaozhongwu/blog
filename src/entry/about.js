import React from 'react'
import ReactDOM from 'react-dom'
import About from '../page/About'
var props = window.APP_PROPS
ReactDOM.render(<About {...props}/>, document.getElementById("app"))
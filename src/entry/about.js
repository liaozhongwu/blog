import React from 'react'
import ReactDOM from 'react-dom'
import About from '../page/about'
var props = window.APP_PROPS
ReactDOM.render(<About {...props}/>, document.getElementById("app"))
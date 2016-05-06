import React from 'react'
import ReactDOM from 'react-dom'
import Blog from '../page/blog'
var props = window.APP_PROPS
ReactDOM.render(<Blog {...props}/>, document.getElementById("app"))
import React from 'react'
import ReactDOM from 'react-dom'
import Blogs from '../page/Blogs'
var props = window.APP_PROPS
ReactDOM.render(<Blogs {...props}/>, document.getElementById("app"))
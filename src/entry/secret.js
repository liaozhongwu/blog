import React from 'react'
import ReactDOM from 'react-dom'
import Secret from '../page/secret'
var props = window.APP_PROPS
ReactDOM.render(<Secret {...props}/>, document.getElementById("app"))
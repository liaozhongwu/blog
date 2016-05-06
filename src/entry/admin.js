import React from 'react'
import ReactDOM from 'react-dom'
import Admin from '../page/admin'
var props = window.APP_PROPS;
ReactDOM.render(<Admin {...props}/>, document.getElementById("app"))
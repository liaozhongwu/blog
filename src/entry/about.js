import React from 'react';
import About from '../page/About';
var props = window.APP_PROPS;
React.render(<About {...props}/>, document.getElementById("main"));
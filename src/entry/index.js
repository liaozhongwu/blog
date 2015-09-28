import React from 'react';
import Index from '../page/Index';
var props = window.APP_PROPS;
React.render(<Index {...props}/>, document.getElementById("main"));
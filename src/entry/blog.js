import React from 'react';
import Blog from '../page/Blog';
var props = window.APP_PROPS;
React.render(<Blog {...props}/>, document.getElementById("main"));
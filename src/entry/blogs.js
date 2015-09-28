import React from 'react';
import Blogs from '../page/Blogs';
var props = window.APP_PROPS;
React.render(<Blogs {...props}/>, document.getElementById("main"));
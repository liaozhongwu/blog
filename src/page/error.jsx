import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";

export default class Error extends React.Component {	
	static getMeta () {
		return {
			cssFile: [ "/theme.css" ]
		}
	}
  	render() {
	    return (
	    	<div className="content">
	    		Sorry, the page is not found.
			</div>
	    );
  	}	
}
import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";

export default class Base extends React.Component {
	constructor () {
		super();
	}
	renderMeta () {
		var html = [];
		if (this.props.meta) {
			this.props.meta.map((meta, i) => {
				html.push(<meta key={ i } name={meta.name} content={meta.content} />);
			});
		}
		return html;
	}
	renderCss () {
		var html = [];
		if (this.props.style) {
			html.push(<style key={"style"}>{ this.props.styles }</style>);
		}
		if (this.props.cssFile) {
			this.props.cssFile.map((path, i) => {
				html.push(<link key={ i } rel="stylesheet" type="text/css" href={ path } />);
			});
		}
		return html;
	}
	renderJs () {
		var html = [];
		if (this.props.APP_PROPS) {
			html.push(<script type="text/javascript" key={"APP_PROPS"}
				dangerouslySetInnerHTML={{__html: "window.APP_PROPS = " + JSON.stringify(this.props.APP_PROPS)}}></script>);
		}
		if (this.props.jsFile) {
			this.props.jsFile.map((path, i) => {
				html.push(<script key={ i } type="text/javascript" src={ path }></script>);
			});
		}
		return html;
	}
  	render() {
	    return (
	    	<html>
	    		<head>
	    			<meta chatSet="utf-8"/>
	    			<meta name="author" content="liaozhongwu<liaozhongwu95@163.com>"/>
	    			<meta name="description" content="liaozhongwu's blog"/>
	    			<meta name="keywords" content="Blog,FrontEnd,Node,Html,Css,Js"/>
					<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0"/>
	    			<meta name="baidu-site-verification" content="xAzLf0HKaT" />
					{ this.renderMeta() }
	    			{ this.renderCss() }
	    		</head>
	    		<body>
	    			<div className="app" id="app">
	    				<Header />
	    					<div className="main" id="main"
	    						dangerouslySetInnerHTML={{__html: this.props.content || ""}}>
	    					</div>
	    				<Footer />
	    			</div>
					{ this.renderJs() }
				</body>
			</html>
	    );
	}
}
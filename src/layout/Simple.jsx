import React from "react";
import CDN from "../../lib/cdn";

export default class Base extends React.Component {
	constructor () {
		super();
	}
	renderTitle () {
		if (this.props.title) {
			return <title>{this.props.title}</title>
		} else {
	 		return <title>{"廖仲武的个人网站 - Liaozhongwu's Personal Website"}</title>
		}
	}
	renderDescription () {
		if (this.props.description) {
			return <meta name="description" content={this.props.description} />
		} else {
	 		return <meta name="description" content="廖仲武的个人网站 - Liaozhongwu's Personal Website" />
		}
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
				html.push(<link key={ i } rel="stylesheet" type="text/css" href={ CDN(path) } />);
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
				html.push(<script key={ i } type="text/javascript" src={ CDN(path) }></script>);
			});
		}
		return html;
	}
  	render() {
	    return (
	    	<html>
	    		<head>
	    			{ this.renderTitle() }
	    			<meta charSet="utf-8"/>
	    			<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
	    			<meta name="author" content="liaozhongwu<liaozhongwu95@163.com>"/>
	    			<meta name="keywords" content="廖仲武,个人网站,博客,liaozhongwu,blog"/>
	    			{ this.renderDescription() }
						<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0"/>
						{ this.renderMeta() }
						<link rel="start" href="http://www.liaozhongwu.com" title="Home"/>
	    			{ this.renderCss() }
	    			<script type="text/javascript" src={CDN("/vendor/react.min.js")}></script>
	    			<script type="text/javascript" src={CDN("/vendor/react-dom.min.js")}></script>
	    			<script type="text/javascript" src={CDN("/vendor/ga.js")}></script>
	    		</head>
	    		<body>
  					<div className="app" id="app"
  						dangerouslySetInnerHTML={{__html: this.props.content || ""}}>
  					</div>
						{ this.renderJs() }
				</body>
			</html>
	    );
	}
}
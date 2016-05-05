import React from "react";
import CDN from "../../../lib/cdn";

export default class Header extends React.Component {
  render() {
    return (
		<div className="header">
			<nav className="nav">
				<a href="/">Home</a>
				<a href="/blogs">Blog</a>
				<a href="/about">About</a>
			</nav>
			<div className="motto">
				<img className="avatar" src={CDN("/img/avatar.png")}/>
				<p>stay hungry. stay foolish.</p>
			</div>
		</div>
    );
  }
}
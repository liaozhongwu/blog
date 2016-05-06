import React from "react";

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
				<div className="avatar"/>
				<p>stay hungry. stay foolish.</p>
			</div>
		</div>
    );
  }
}
import React from "react";

export default class Header extends React.Component {
  render() {
    return (
		<div className="header">
			<nav className="nav">
				<a href="/blogs">Blog</a>
				<a href="/about">About</a>
				<a href="/notice">Other</a>
			</nav>
			<div className="motto">
				<a href="/">
					<img className="avatar" src="/img/avatar.jpg"/>
				</a>
				<p>stay hungry. stay foolish.</p>
			</div>
		</div>
    );
  }
}
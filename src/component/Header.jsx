import React from "react";

export default class Header extends React.Component {
  render() {
    return (
		<header className="header">
			<nav className="nav">
				<a href="/">Home</a>
				<a href="/blogs">Blog</a>
				<a href="/about">About</a>
				<a href="/other">Other</a>
			</nav>
			<div className="motto">
				<img className="avatar" src="/img/avatar.jpg"/>
				<p>stay hungry, stay foolish</p>
			</div>
		</header>
    );
  }
}
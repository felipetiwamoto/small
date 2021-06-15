import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Menu(props) {
	let [route, setRoute] = useState("");

	useEffect(() => {
		setRoute(window.location.pathname || ``);
	}, []);

	return (
		<ul className="menu">
			<li className="menu__item">
				<Link className={`menu__link ${route === `/product` ? `menu__link--active` : ``}`} to="/product">
					Product
				</Link>
			</li>
			<li className="menu__item">
				<Link className={`menu__link ${route === `/category` ? `menu__link--active` : ``}`} to="/category">
					Category
				</Link>
			</li>
			<li className="menu__item">
				<Link className={`menu__link ${route === `/order` ? `menu__link--active` : ``}`} to="/order">
					Order
				</Link>
			</li>
			<li className="menu__item">
				<Link className={`menu__link ${route === `/employee` ? `menu__link--active` : ``}`} to="/employee">
					Employee
				</Link>
			</li>
			<li className="menu__item">
				<Link className={`menu__link ${route === `/logout` ? `menu__link--active` : ``}`} to="/logout">
					Logout
				</Link>
			</li>
		</ul>
	);
}

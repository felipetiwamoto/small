import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Todo from "./page/Todo";

import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Todo} />
				</Switch>
			</BrowserRouter>
		</Provider>
	);
}

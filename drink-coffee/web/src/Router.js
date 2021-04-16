import { BrowserRouter, Route, Switch } from "react-router-dom";
import './../src/assets/css/main.css';

import Initial from "./pages/Initial";
import DashboardIndex from "./pages/dashboard/DashboardIndex";
import CategoryIndex from "./pages/category/CategoryIndex";
import OrderIndex from "./pages/order/OrderIndex";
import ProductIndex from "./pages/product/ProductIndex";
import EmployeeIndex from "./pages/employee/EmployeeIndex";
import ClientIndex from "./pages/client/ClientIndex";

export default function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" component={Initial} exact />
				<Route path="/dashboard" component={DashboardIndex} />
				<Route path="/category" component={CategoryIndex} />
				<Route path="/order" component={OrderIndex} />
				<Route path="/product" component={ProductIndex} />
				<Route path="/employee" component={EmployeeIndex} />
				<Route path="/client" component={ClientIndex} />
			</Switch>
		</BrowserRouter>
	);
}

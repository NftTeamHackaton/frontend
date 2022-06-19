import { Route, Routes } from "react-router-dom";

// pages
import { IndexPage } from "../pages/IndexPage";
import { TransferPage } from "../pages/TransferPage";
import { ErrorPage } from "../pages/ErrorPage";

export const AppRoutes = (props: any) => {
	return (
		<Routes>
			<Route path="/" element={<IndexPage />} />
			<Route path="/transfer" element={<TransferPage />} />
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
};

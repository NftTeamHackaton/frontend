import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useSelector, RootStateOrAny } from "react-redux";

export const Notifier = () => {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const notifications = useSelector((state: RootStateOrAny) => state.notifier.notifications);

	useEffect(() => {
		notifications.forEach((notification: any) => {
			enqueueSnackbar(notification.message, {
				variant: notification.variant,
			});
			if (notification.redirect) {
				navigate(notification.redirect);
			}
		});
	}, [notifications]);

	return null;
};

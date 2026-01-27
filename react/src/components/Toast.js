import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react"


function Toast({successObject}) {

	useEffect(() => {
	if (!successObject || !successObject.data) return
		toast.success(Object.values(successObject.data).flat()[0])
	}, [successObject])

	return (
	<div>
		<ToastContainer
			position="bottom-right"
			theme="colored"
		/>
		</div>
	);
}

export default Toast;

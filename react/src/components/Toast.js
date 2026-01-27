import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast({successObject}) {

	const notify = () => toast.success(Object.values(successObject.data)[0][0]);

	return (
	<div>
		<button onClick={notify}>Notify!</button>
		<ToastContainer
			position="bottom-right"
			theme="colored"
		/>
		</div>
	);
}

export default Toast;

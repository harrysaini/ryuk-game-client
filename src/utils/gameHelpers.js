import { ToastContainer, toast } from 'react-toastify';
import utils from './utils';

function showErrorMessage(error) {
	toast.error("Some error occured -"+error.message);
}


const gameHelpers = {
	showErrorMessage : showErrorMessage
}


export default gameHelpers;


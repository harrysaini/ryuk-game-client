import { ToastContainer, toast } from 'react-toastify';
import utils from './utils';

function showErrorMessage(error) {
	toast.error("Error -"+ String(error));
}


const gameHelpers = {
	showErrorMessage : showErrorMessage
}


export default gameHelpers;


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const NotifyEmptyList = () => {
toast('Contact list is empty', {
position: "top-center",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
};
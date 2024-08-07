import { useDispatch, useSelector } from "react-redux";
import { appLogout } from '../store/slices/authSlice';
import { toast } from "react-toastify";

const useGenerateNewOtp = () => {
    const { token } = useSelector((e) => e.auth);
    const dispatch = useDispatch()

    const generateNewOtp = async () => {
        try {
            const res = await fetch(`https://cloudhome-lh9h.onrender.com/api/v1/otp/generate`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();

            if (data.status === "success") {
                toast.success(data.message)
            }else if (data.message === "Unauthorised") {
                dispatch(appLogout);
                
            } 
             else {
                alert(data.message);
            }
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    return { generateNewOtp };
};

export default useGenerateNewOtp;
import { useDispatch, useSelector } from 'react-redux';
import { appLogout, setEmailVerified } from '../store/slices/authSlice';
import { toast } from 'react-toastify';


const useVerifyOtp = () => {
    const { token } = useSelector((e) => e.auth);
    const dispatch = useDispatch();
   

    const verifyOtp = async (email, otp) => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/otp/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.json();

            if (data.message === "Unauthorised") {
                dispatch(appLogout);
                
            } 
            else if (data.status === "success") {
                dispatch(setEmailVerified());
                toast.success("✅Email Verified")
               
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    return { verifyOtp };
};

export default useVerifyOtp;

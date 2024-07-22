import { useDispatch, useSelector } from 'react-redux';
import { appLogout, setEmailVerified } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const useVerifyOtp = () => {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

            if (data.message === "unauthorised") {
                dispatch(appLogout);
                
            } 
            if (data.status === "success") {
                dispatch(setEmailVerified());
                alert('OTP verified successfully');
                navigate('/'); // Redirect to home screen
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

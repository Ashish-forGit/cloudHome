import { useDispatch, useSelector } from 'react-redux';
import { setEmailVerified } from '../store/slices/authSlice';

const useVerifyOtp = () => {
    const { token } = useSelector((state) => state.auth);
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

            if (data.status === "success") {
                dispatch(setEmailVerified());
                alert('OTP verified successfully');
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

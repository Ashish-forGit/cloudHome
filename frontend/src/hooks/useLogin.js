import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { appLogin } from '../store/slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch()

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const URL = process.env.BACKEND_URL;
      const res = await fetch(`${URL}/api/v1/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to log in');
      }

      const data = await res.json();
      console.log(data);
      // localStorage.setItem("authorization", data.data.token) // storing token
      

      // handle successful login
      if (data.status === "success") {
        dispatch(appLogin(data))
        // navigate('/');
        toast.success("User logged in...");
      }
    
    
    } catch (err) {
      setError(err.message);
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;

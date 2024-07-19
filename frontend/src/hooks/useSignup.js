
import { useNavigate } from "react-router-dom";

const useSignup = () => {
    const navigate = useNavigate()

    const signup = async ({ email, password }) => {
      try {
        const URL = process.env.BACKEND_URL;
        const res = await fetch(`${URL}/api/v1/auth/signup`, {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        console.log(data);
        if (data.status == "success") {
            navigate('/login')
        }
      } catch (err) {
        alert('Signup error: ' + err.message);
      }
    };
  
    return { signup };
  };
  
  export default useSignup;
  
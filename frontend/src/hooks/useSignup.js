const useSignup = () => {
    const signup = async ({ email, password }) => {
      try {
        const URL = `${process.env.BACKEND_URL}/api/v1/auth/signup`;
        const res = await fetch(URL, {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        console.log(data);
      } catch (err) {
        alert('Signup error: ' + err.message);
      }
    };
  
    return { signup };
  };
  
  export default useSignup;
  
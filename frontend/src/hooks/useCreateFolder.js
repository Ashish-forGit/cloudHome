import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useCreateFolder = () => {
    const { token } = useSelector((e) => e.auth);
  
    const createFolder = async ({name, parentId}) => {
      try {
        const res = await fetch(`${process.env.BACKEND_URL}/api/v1/folder/create`, {
          method: 'POST',
          body: JSON.stringify({
            name,
            parentId,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        toast.success("Folder Created")
      } catch (error) {
        alert(error.message) 
      }
    };
  
    return { createFolder };
  };
  
  export default useCreateFolder;
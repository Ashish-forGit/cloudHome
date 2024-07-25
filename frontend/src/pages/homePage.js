import "../../HomePage.css";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import useCreateFolder from "../hooks/useCreateFolder";
import useGetFileFolders from "../hooks/useGetFileFolders";
import useUploadFile from "../hooks/useUploadFile";

const HomePage = () => {
    const [newFolder, setNewFolder] = useState("");
    const inputRef = useRef(null);
    const [showCreateFolder, setShowCreateFolder] = useState(false);
    const { createFolder } = useCreateFolder();
    const [folderStructure, setFolderStructure] = useState([{ _id: null, name: "Cloud Home" }]);
    const { getFileFolders, fileFolders=[] } = useGetFileFolders();

    const parentFolder = folderStructure[folderStructure.length - 1];

    const handleDoubleClick = (elem) => {
        if (elem.type === 'folder') {
            setFolderStructure([...folderStructure, elem]);
        }
    };

    const handleAllowCreateFolder = () => {
        setShowCreateFolder(true);
    };

    const handleCreateFolder = async () => {
        if (newFolder.length > 0) {
            await createFolder({
                name: newFolder,
                parentId: parentFolder._id,
            });
            getFileFolders(parentFolder._id);
            setShowCreateFolder(false);
            setNewFolder("");
        }
    };

    useEffect(() => {
        getFileFolders(parentFolder._id);
    }, [folderStructure]);

    const handleBackClick = (clickIdx) => {
        const newFolderStructure = folderStructure.filter((elem, idx) => idx <= clickIdx);
        setFolderStructure(newFolderStructure);
    };

    const { isUploadAllowed, uploadFile } = useUploadFile();
    const handleFileUpload = async (e) => {
        if (isUploadAllowed) {
            const file = e.target.files;
            await uploadFile({
                file: file[0],
                parentId: parentFolder._id,
            });
        } else {
            alert("Uploading is already in progress. Please wait...");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="homepage-main-container">
                <h3>Welcome to Cloud Home {email}</h3>
                <button className="create-folderbutton" onClick={handleAllowCreateFolder}>Create Folder</button>
                <input className="file-upload-input" ref={inputRef} type="file" onChange={handleFileUpload} />
                <ul className="breadcrumb">
                    {folderStructure.map((elem, idx) => (
                        <li key={idx} onClick={() => handleBackClick(idx)}>{elem.name}⏭️</li>
                    ))}
                </ul>
                <div className="files-path-showing">
                    {showCreateFolder && (
                        <div className="create-folder-popup">
                            <input value={newFolder} onChange={(e) => setNewFolder(e.target.value)} placeholder="Folder Name" />
                            <button onClick={handleCreateFolder}>Create</button>
                            <button onClick={() => setShowCreateFolder(false)}>Cancel</button>
                        </div>
                    )}
                </div>
                <div className="file-folder-card">
                    {fileFolders.map((elem) => (
                        <div
                            key={elem._id}
                            className="file-folder-item"
                            onDoubleClick={() => handleDoubleClick(elem)}
                        >
                            <div className={elem.type === "folder" ? "folder-icon" : "file-icon"}></div>
                            <p>{elem.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;

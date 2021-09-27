import React, {useState} from 'react';
import Header from "./components/header/Header";
import Dropzone from "./components/dropzone/Dropzone";
import axios from "axios";
import Preview from "./components/preview/Preview";
import css from "./app.module.css";


function App() {
    const [files, setFiles] = useState([]);

    // Add files to state
    const addFiles = (newFiles) => {
        setFiles(files.concat(newFiles));
    }

    // Send files to server and download merged file
    const mergePdf = () => {
        const formData = new FormData();
        files.forEach(file => formData.append('pdf', file));
        axios
            .post('http://localhost:8888/mergePdf', formData, {
                responseType: "arraybuffer",
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                const file = new Blob([response.data], {type: 'application/pdf'});
                const fileURL = URL.createObjectURL(file);
                const fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.download = 'merged_pdf';
                fileLink.click();
                setFiles([]);
            });
    }

    // Move pdf position and reset state
    const movePdf = (index, newIndex) => {
        const element = files.splice(index, 1);
        files.splice(newIndex, 0, element[0]);
        setFiles([...files]);
    }

    // Delete pdf and reset state
    const deletePdf = (index) => {
        const newArray = files.filter((file, i) => i !== index);
        setFiles([...newArray]);
    }

    return (
        <>
            <Header/>
            <div className={css.container}>
                <Dropzone onAdd={addFiles} files={files} mergePdf={mergePdf}/>
                <div className={css.previewContainer}>
                    {files.map((file, index) => (
                        <Preview key={index} file={file} files={files} index={index} movePdf={movePdf}
                                 deletePdf={deletePdf}/>
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;

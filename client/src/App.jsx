import React, {useState} from 'react';
import Header from "./components/header/Header";
import Dropzone from "./components/dropzone/Dropzone";
import axios from "axios";
import Preview from "./components/preview/Preview";
import css from "./app.module.css";


function App() {
    const [files, setFiles] = useState([]);

    // Add files to list
    const addFiles = (newFiles) => {
        setFiles(files.concat(newFiles));
        console.log(files);
    }

    // Send file and download
    const mergePdf = () => {
        const formData = new FormData();
        files.forEach(file => formData.append('pdf', file));
        axios
            .post('http://localhost:8888/', formData, {
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

    return (
        <>
            <Header/>
            <div className={css.container}>
                <Dropzone onAdd={addFiles} files={files} mergePdf={mergePdf}/>
                <div className={css.previewContainer}>
                    {files.map((file, index) => (
                        <Preview key={index} file={file} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;

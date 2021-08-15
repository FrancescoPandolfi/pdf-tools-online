import React, {useState} from 'react';
import Header from "./components/header/Header";
import Dropzone from "./components/dropzone/Dropzone";
import axios from "axios";


function App() {
    const [files, setFiles] = useState([]);

    // Add files
    const addFiles = (newFiles) => {
        setFiles(files.concat(newFiles));
        console.log('ON ADD');
        console.log(files);
    }

    // Send file
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
                    // create <a> tag dinamically
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
            <Dropzone onAdd={addFiles} files={files} mergePdf={mergePdf}/>
            {files.map(f => <span>{f.name}</span>)}
        </>
    );
}

export default App;

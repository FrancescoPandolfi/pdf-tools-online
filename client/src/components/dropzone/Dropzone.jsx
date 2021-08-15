import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
import css from './dropzone.module.css';
import {VscFilePdf} from "react-icons/all";

const Dropzone = ({onAdd, mergePdf, files}) => {


    const onDrop = useCallback(acceptedFiles => {
        onAdd(acceptedFiles)
    }, [onAdd]);

    const {getRootProps, getInputProps, isDragActive, isDragAccept} = useDropzone({
        onDrop,
        accept: 'application/pdf'
    })

    let textToShow = <p>Drag & drop your PDF here, or click to select PDF</p>;
    if(isDragActive && isDragAccept) {
        textToShow = <p>Drop the files here...</p>;
    } else if (isDragActive && !isDragAccept) {
        textToShow = <p style={{color: "red"}}>File not allowed.</p>;
    } else {
        textToShow = <p>Drag & drop your PDF here, or click to select PDF</p>;
    }


    return (
        <div className={css.dropzoneContainer}>
            <h2 className={css.title}>Upload your PDF</h2>
            <span className={css.subtitle}>Only PDF max 30 MB</span>
            <div className={css.dropzone} {...getRootProps()}>
                <input {...getInputProps()} />
                <VscFilePdf className={css.icon} />
                {textToShow}
            </div>
            <button
                className={css.mergeButton}
                disabled={files.length <= 1}
                onClick={mergePdf}
            >MERGE PDF</button>
        </div>
    )
};

export default Dropzone;







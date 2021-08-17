import css from './preview.module.css';
import {Document, Page} from "react-pdf";



const Preview = ({file}) => {
    const onDocumentLoadSuccess = (boh) => {
        console.log(boh);
    }



    return (
        <div className={css.preview}>
            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={console.error}
            >
                <Page  style={{ backgroundColor: 'tomato' }} pageNumber={1}/>
            </Document>
        </div>
    );
};

export default Preview;

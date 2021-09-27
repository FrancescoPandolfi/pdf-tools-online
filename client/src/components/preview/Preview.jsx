import css from './preview.module.css';
import {Document, Page} from "react-pdf";
import {GoArrowLeft, GoArrowRight, MdCancel} from "react-icons/all";
import Spinner from "../../UI/Spinner";


const Preview = ({file, files, index, movePdf, deletePdf}) => {
    // const onDocumentLoadSuccess = (boh) => {
    //     console.log('Document loaded');
    // }

    let showLeft = true;
    let showRight = true;
    if (index === 0) {
        showLeft = false;
        showRight = true;
    }
    if (index === files.length - 1) {
        showLeft = true;
        showRight = false;
    }


    return (
        <div className={css.preview}>
            <Document
                file={file}
                // onLoadSuccess={onDocumentLoadSuccess}
                // onLoadError={console.error}
                loading={<Spinner/>}
            >
                <Page
                    loading={<Spinner/>}
                    pageNumber={1}/>
            </Document>
            <MdCancel className={css.cancelPdf} onClick={() => deletePdf(index)} />
            {showLeft && <GoArrowLeft className={css.arrowsLeft} onClick={() => movePdf(index, (index - 1))} />}
            {showRight && <GoArrowRight className={css.arrowsRight} onClick={() => movePdf(index, (index + 1))} />}
        </div>
    );
};

export default Preview;

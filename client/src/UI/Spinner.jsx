import {CgSpinner} from "react-icons/all";
import css from "./spinner.module.css";

const Spinner = () => {

    return (
        <div style={{textAlign: "center"}}>
            <CgSpinner className={css.spin}/>
        </div>
    );
};

export default Spinner;

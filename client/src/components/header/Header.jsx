import css from './header.module.css';


const Header = () => {
    return (
        <div className={css.header}>
            <div className={css.logo}>PDF Tools</div>
        </div>
    );
};

export default Header;

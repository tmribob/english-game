import style from './Header.module.css'

const Header = ({header}) => {
  return (<header className={style.header}>
    <h1 className={style.text}>{header}</h1>
  </header>)
}
export default Header;
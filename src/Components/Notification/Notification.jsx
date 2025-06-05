import style from "./Notification.module.css"

const Notification = ({context, isVisible, right = false}) => {

  return (
    <div
      className={`${style.notification} ${isVisible ? style.visibility : ""} ${right ? style.right : style.left}`}
    >
      <p>{context}</p>
    </div>)
}

export default Notification;
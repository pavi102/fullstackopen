import { useSelector } from "react-redux";

const Notification = ({ message, className }) => {
  const { message, className } = useSelector(state => state.notification);
  if (message === null) {
    return null;
  }

  return <div className={className}>{message}</div>;
};
export default Notification;

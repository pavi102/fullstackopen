const Notification = ({ text, className }) => {
  if (text === null) {
    return null;
  }

  return <div className={className}>{text}</div>;
};
export default Notification;

const Notification = ({ errorMessage }) => {
  if (!errorMessage) return null;
  return <div style={{ padding: "10px", fontSize: "24px" }}>{errorMessage}</div>;
};
export default Notification;

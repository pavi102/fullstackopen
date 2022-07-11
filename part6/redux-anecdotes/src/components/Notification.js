import { connect } from "react-redux";
const Notification = props => {
  const notification = props.text;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  if (notification) {
    return <div style={style}>{notification}</div>;
  }
};

const mapStateToProps = state => {
  return {
    text: state.notification.text,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;

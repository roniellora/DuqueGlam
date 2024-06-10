import { Card, Tabs, Typography, message } from "antd";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleMarkAsRead = async () => {
    try {
      const res = await axios.post(
        "https://api-lyart-gamma-50.vercel.app/api/v1/users/notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success("All notifications marked as read");
        window.location.reload();
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      console.log(error);
      message.error("Error marking notifications as read!");
    }
  };
  const handleDeleteAllRead = async () => {
    try {
        const res = await axios.post('https://api-lyart-gamma-50.vercel.app/api/v1/users/notification-delete', { userId: user._id }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(res.status === 200){
            message.success("All notifications deleted successfully!")
            window.location.reload();
        } else{
            message.error(res.data.message);
        }
    } catch (error) {
        console.log(error);
        message.error("Error deleting notifications!");
    }
  };
  return (
    <Layout>
      <div className="container">
        <Typography level={2} className="text-center typography font-bold ">
          Notifications
        </Typography>
        <Tabs>
          <Tabs.TabPane tab="Unread" key={0}>
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" onClick={handleMarkAsRead}>
                Mark all as read
              </button>
            </div>
            {user?.notifications.map((notificationMsg) => (
              <Card
                className="card cursor-pointer mt-4 bg-gray-200 border-gray-300 border rounded p-2 transition-all duration-200 ease-in-out transform hover:scale-10 hover:shadow-lg"
                key={notificationMsg.id}
                onClick={() => navigate(notificationMsg.onClickPath)}
              >
                <div className="card-text">
                  <p className="text-gray-700 text-lg">{notificationMsg.message}</p>
                </div>
              </Card>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Read" key={1}>
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" onClick={handleDeleteAllRead}>
                Delete all read
              </button>
            </div>
            {user?.seenNotifications.map((notificationMsg) => (
              <Card
                className="card cursor-pointer mt-4 bg-gray-200 border-gray-300 border rounded p-2 transition-all duration-200 ease-in-out transform hover:scale-10 hover:shadow-lg"
                key={notificationMsg.id}
                onClick={() => navigate(notificationMsg.onClickPath)}
              >
                <div className="card-text">
                  <p className="text-gray-700 text-lg font-semibold">
                    {notificationMsg.message}
                  </p>
                </div>
              </Card>
            ))}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Notifications;

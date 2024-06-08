import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector(state => state.user);
  const [employee, setEmployee] = useState(null);
  const params = useParams()

  //GET EMPLOYEE DETAILS
  //eslint-disable-next-line
  const getEmployeeDetails = async () => {
    try {
      const res = await axios.post(
        "https://api-lyart-gamma-50.vercel.app/api/v1/employee/getEmployee", {userId: params.id}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
      );
      if (res.status === 200) {
        setEmployee(res.data.data)
      }
    } catch (error) {
      console.log(error);
      message.error("Error fetching details!");
    }
  };

  useEffect(() => {
    getEmployeeDetails()
    //eslint-disable-next-line
  }, [])
  return (
    <Layout>
      <h1>Profile</h1>
    </Layout>
  );
};

export default Profile;

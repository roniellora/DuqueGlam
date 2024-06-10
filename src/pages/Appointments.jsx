import { Table, Typography } from "antd";
import Layout from "../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

 const getAppointmentData = async () => {
  try {
    const res = await axios.get(
      "https://api-lyart-gamma-50.vercel.app/api/v1/users/appointment-list",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(res.data); // Log the response data
    if (res.status === 200) {
      setAppointments(res.data.data);
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    getAppointmentData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (record) => {
        <span>
          {record.employeeInfo.firstName} {record.employeeInfo.lastName}
        </span>;
      },
    },
    {
      title: "Contact",
      dataIndex: "phone",
      render: (record) => {
        <span>{record.employeeInfo.phone}</span>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (record) => {
        <span>{moment(record.date).format("MMMM DD YYYY")}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  return (
    <Layout>
      <div className="container">
        <Typography level={2} className="text-center typography font-bold ">
          Appointment List
        </Typography>
      </div>
      <Table dataSource={appointments} columns={columns} />
    </Layout>
  );
};

export default Appointments;

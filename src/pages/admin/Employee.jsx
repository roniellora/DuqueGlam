import { Button, Table, Typography, message } from "antd";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  //GET ALL EMPLOYEES
  const getEmployees = async () => {
    try {
      const res = await axios.get(
        "https://api-lyart-gamma-50.vercel.app/api/v1/admin/getAllEmployees",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        setEmployees(res.data.data);
        message.success("Succesfully fetch employees!");
      }
    } catch (error) {
      console.log(error);
      message.error("Error fetching employees!");
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

const handleApprove = async (record, status) => {
    try {
      const res = await axios.post(
        "https://api-lyart-gamma-50.vercel.app/api/v1/admin/changeStatus",
        { employeeId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res && res.status === 200) {
        message.success("Status approved");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
      message.error("Error approving!");
    }
};

  const columns = [
    {
      title: "Name",
      render: (record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Contact Number",
      dataIndex: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      render: (record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <Button
              type="primary"
              style={{ background: "green" }}
              onClick={() => handleApprove(record, "approved")}
            >
              Approve
            </Button>
          ) : (
            <Button type="primary" danger>
              Reject
            </Button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <div className="container">
        <Typography level={2} className="text-center typography font-bold ">
          Employee List
        </Typography>
        <Table columns={columns} dataSource={employees} />
      </div>
    </Layout>
  );
};

export default Employee;

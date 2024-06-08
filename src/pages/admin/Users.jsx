import { Button, Table, Typography, message } from "antd";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  //GET USERS
  const getUsers = async () => {
    try {
      const res = await axios.get(
        "https://api-lyart-gamma-50.vercel.app/api/v1/admin/getAllUsers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        setUsers(res.data.data);
        message.success("Success fetching users!");
      } else {
        message.error("Error fetching users!");
      }
    } catch (error) {
      console.log(error);
      message.error("Error Fetching Users!");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  //Table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Employee",
      dataIndex: "isEmployee",
      render: (record) => 
        <span>{record.isEmployee ? 'Yes' : 'No'}</span>
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (record) => (
        <div className="d-flex">
          <Button type="primary" danger>
            Block
          </Button>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <div className="container">
        <Typography level={2} className="text-center typography font-bold ">
          Users List
        </Typography>
        <Table dataSource={users} columns={columns} />
      </div>
    </Layout>
  );
};

export default Users;

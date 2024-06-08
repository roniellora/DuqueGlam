import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Col, Row, Typography } from "antd";
import EmployeeList from "../components/EmployeeList";

const HomePage = () => {
  const [employee, setEmployee] = useState([]);

  const getUserData = async () => {
    try {
      const res = await axios.get(
        "https://api-lyart-gamma-50.vercel.app/api/v1/users/getEmployees",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        setEmployee(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <Typography level={2} className="text-center typography font-bold ">
        Home Page
      </Typography>
      <Row gutter={20}>
        <Col xs={24} lg={10} md={12}>
          {employee &&
            employee.map((employee) => (
              <EmployeeList key={employee.id} employee={employee} />
            ))}
        </Col>
      </Row>
    </Layout>
  );
};

export default HomePage;

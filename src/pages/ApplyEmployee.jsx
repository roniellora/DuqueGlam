import { Button, Col, Form, Input, Row, Typography, message } from "antd";
import Layout from "../components/Layout";
import "../styles/Layout.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";

const ApplyEmployee = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle form submission
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://api-lyart-gamma-50.vercel.app/api/v1/users/apply",
        { ...values, userId: user.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.success);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <Typography level={2} className="text-center typography font-bold ">
        Apply
      </Typography>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <Typography className="font-bold" level={5}>
          Personal Details:
        </Typography>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input placeholder="First Name" type="text" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input placeholder="Last Name" type="text" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input placeholder="Phone" type="text" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input placeholder="Address" type="text" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input placeholder="Email" type="email" />
            </Form.Item>
          </Col>
        </Row>
        <Typography className="font-bold" level={5}>
          Professional Details:
        </Typography>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input placeholder="Your Specialization" type="text" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input placeholder="Your Experience" type="text" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fee"
              name="fee"
              required
              rules={[{ required: true }]}
            >
              <Input placeholder="Fee per Booking" type="number" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8} className="justify-flex-end">
            <Button type="primary" htmlType="submit" className="w-100 mt-3">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyEmployee;

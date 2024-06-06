import { Button, Form, Input, message } from "antd"
import Link from "antd/es/typography/Link"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleFinish = async (values) => {
    try {
      // Make a POST request to the provided URL with the form values as the request body
      dispatch(showLoading())
      const res = await axios.post(
        "https://api-blond-pi.vercel.app/api/v1/users/login",
        values
      );

      dispatch(hideLoading())
      if(res.data.success) {
        localStorage.setItem('token', res.data.token)
        message.success(res.data.message)
        navigate('/')
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading())
    }
  }

  return (
    <>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="form-container w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Email" name="email">
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
              type="email"
              required={true}
            />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
              required={true}
            />
          </Form.Item>
          <p className="my-4 text-center">
              Dont have an account?
              <Link
                href="/register"
                className="text-blue-500 hover:text-blue-700 underline"
              >
                Register
              </Link>
            </p>
          <Form.Item>
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  </>
  )
}

export default Login

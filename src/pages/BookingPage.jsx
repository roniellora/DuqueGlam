import { Button, DatePicker, TimePicker, Typography, message } from "antd";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [employee, setEmployee] = useState([]);
  const [date, setDate] = useState();
  const [timings, setTimings] = useState();
  //   const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const res = await axios.post(
        "https://api-lyart-gamma-50.vercel.app/api/v1/employee/getEmployeeById",
        { employeeId: params.employeeId },
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
    //eslint-disable-next-line
  }, []);

  //BOOK APPOINTMENT
  const handleBook = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://api-lyart-gamma-50.vercel.app/api/v1/users/book-appointment",
        {
          employeeId: params.employeeId,
          userId: user._id,
          employeeInfo: employee,
          userInfo: user,
          date: new Date(date).toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        message.success("Appointment Booked Successfully!");
      } else {
        message.error("Error Booking Appointment!");
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error.message);
    }
  };

  //CHECK AVAILABILITY
  const handleCheckAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://api-lyart-gamma-50.vercel.app/api/v1/users/check-availability",
        {
          employeeId: params.employeeId,
          date: new Date(date).toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error.message);
    }
  };

  return (
    <Layout>
      <div className="container">
        <Typography level={2} className="text-center typography font-bold ">
          Book Appointment
        </Typography>
        {employee && (
          <div className="flex flex-col items-start">
            <h4 className="font-bold text-lg">
              {employee.firstName} {employee.lastName}
            </h4>
            <h4 className="font-bold text-lg">Fees: Php {employee.fee}.00</h4>
            <div className="flex flex-col mt-3 space-y-3 w-1/2">
              <DatePicker
                className="border rounded p-2"
                format="DD-MM-YYYY"
                onChange={(value) =>
                  setDate(moment(value).format("DD-MM-YYYY"))
                }
              />
              <TimePicker.RangePicker format="HH:mm" onChange={(value) => setTimings([
                moment(value[0]).format("HH:mm"),
                moment(value[1]).format("HH:mm")
              ])}/>
              <Button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="primary"
                onClick={handleCheckAvailability}
              >
                Check Availability
              </Button>
              <Button
                className="bg-dark hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="primary"
                onClick={handleBook}
              >
                Book Appointment
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;

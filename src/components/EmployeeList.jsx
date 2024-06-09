import { Card } from "antd"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom";

const EmployeeList = ({employee}) => {
    const navigate = useNavigate();
  return (
    <>
    <Card onClick={() => navigate(`/employee/book-appointment/${employee._id}`)} className="cursor-pointer ml-4">
        <div className="card-header">
            {employee.firstName} {employee.lastName}
        </div>
        <div className="card-body">
            <p>
                <b>Specialization: </b> {employee.specialization}
            </p>
            <p>
                <b>Experience: </b> {employee.experience}
            </p>
            <p>
                <b>Fee per Booking: </b> {employee.fee}
            </p>
            <p>
                <b>Timings: </b> {employee.timings[0]} - {employee.timings[1]}
            </p>
        </div>
    </Card>
    </>
  )
}

EmployeeList.propTypes = {
  employee: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    specialization: PropTypes.string.isRequired,
    experience: PropTypes.string.isRequired,
    fee: PropTypes.string.isRequired,
    timings: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
}

export default EmployeeList

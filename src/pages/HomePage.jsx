import axios from "axios";
import { useEffect } from "react";

const HomePage = () => {

  const getUserData = async () => {
    try {
      await axios.post(
        "https://api-blond-pi.vercel.app/api/v1/users/getUserData",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <h1>HomePage</h1>
    </div>
  );
};

export default HomePage;

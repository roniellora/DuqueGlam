import axios from "axios";
import { useEffect } from "react";
import Layout from "../components/Layout";

const HomePage = () => {

  const getUserData = async () => {
    try {
      await axios.post(
        "https://api-zeta-ruby.vercel.app/api/v1/users/getUserData",
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
    <Layout>
      <h1>HomePage</h1>
    </Layout>
  );
};

export default HomePage;

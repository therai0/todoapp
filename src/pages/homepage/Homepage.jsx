import react, { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext/UserContextProvider";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { userid } = useContext(UserContext);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/user/${userid}`);
      if (!res.ok) {
        navigate("/login");
        const data = await res.json();
        throw new Error(data.message);
      }
      const data = await res.json();
      console.log("Response data", data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Hi this is home page</h1>
    </>
  );
}

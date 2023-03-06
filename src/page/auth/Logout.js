import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  let navigate = useNavigate();
  localStorage.clear();
  useEffect(() => {
    navigate("/");
  });
};

export default Logout;

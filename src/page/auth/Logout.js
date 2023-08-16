import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  let navigate = useNavigate();
  sessionStorage.clear();
  useEffect(() => {
    navigate("/");
  });
};

export default Logout;

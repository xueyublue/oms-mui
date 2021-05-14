import React, { useEffect } from "react";
import { sidenavSelected } from "../../store/ui/sidenav";
import { useDispatch } from "react-redux";

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
const LoginPage = () => {
  const dispatch = useDispatch();
  // call API
  useEffect(() => {
    dispatch(sidenavSelected({ selectedMenuIndex: 91 }));
  });

  return <div>Login</div>;
};

export default LoginPage;

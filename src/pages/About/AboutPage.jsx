import React, { useEffect } from "react";
import { sidenavSelected } from "../../store/ui/sidenav";
import { useDispatch } from "react-redux";

//-------------------------------------------------------------
// COMPONENT START
//-------------------------------------------------------------
const AboutPage = () => {
  const dispatch = useDispatch();
  // call API
  useEffect(() => {
    dispatch(sidenavSelected({ selectedMenuIndex: 90 }));
  });

  return <div>About</div>;
};

export default AboutPage;

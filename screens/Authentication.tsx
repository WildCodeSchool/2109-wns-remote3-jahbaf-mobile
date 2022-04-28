import React, { useEffect, useState } from "react";
import { Login, Signup } from "../components";


export const Authentication = ({navigation, onLogIn}: any) => {
  const [isLogin, setIsLogin] = useState(true);

  const updatePage = (value: boolean) => {setIsLogin(value)}
  if (isLogin) return <Login onChange={updatePage}  onLogIn={onLogIn}/>
  return <Signup onChange={updatePage}  onLogIn={onLogIn}/>
};

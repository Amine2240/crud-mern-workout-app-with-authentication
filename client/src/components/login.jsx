import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [seepassword, setseepassword] = useState(false);
  const [loginmessage, setloginmessage] = useState("");
  const [userform, setuserform] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const navigateTo = useNavigate();
  const postloginuserinfo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login", 
        userform
      );
      console.log("response log in ", response);
      setloginmessage(response.data.message);
      // if (response.data.message === "please confirm password") {
      //   setloginmessage("please confirm password");
      // }
      // if (response.data.message === "password very short") {
      //   setloginmessage("password very short");
      // }
      // if (response.data.message === "wrong email or password") {
      //   setloginmessage("wrong email or password");
      // }
      // if (response.data.message === "unauthirastion : invalid token") {
      //   setloginmessage("unauthirastion : invalid token");
      // } else {
      //   setloginmessage("");
      //   navigateTo("/body");
      // } 
      if (response.status === 200) {
        navigateTo("/body");
      }
    } catch (error) {
      console.log(error.message, "error message");
    }
  };
  return (
    <div className=" h-[100vh] flex place-content-center items-start">
      <div className=" shadow-green-200 shadow-xl rounded-lg p-5 mt-14">
        <p className=" capitalize font-normal text-base mb-5 text-center ">
          {loginmessage}
        </p>
        <p className=" capitalize font-bold text-xl mb-5 text-center ">
          log in
        </p>
        <form className=" flex flex-col" onSubmit={postloginuserinfo}>
          <label className=" capitalize font-medium mb-1" htmlFor="email">
            email adress:
          </label>
          <input
            className="  w-96 m-2 h-10 pl-2 rounded-md focus:outline-green-500 border-2"
            type="email"
            name="email"
            id="email"
            required
            placeholder="Enter email"
            onChange={(e) => {
              setuserform({ ...userform, email: e.target.value });
            }}
          />
          <label className=" capitalize font-medium mb-1" htmlFor="password">
            password:
          </label>
          <div className=" relative w-fit">
            <input
              className="  w-96 m-2 h-10 pl-2 rounded-md focus:outline-green-500 border-2"
              type={seepassword ? "text" : "password"}
              name="password"
              id="password"
              required
              placeholder="Enter password"
              onChange={(e) => {
                setuserform({ ...userform, password: e.target.value });
              }}
            />
            {seepassword && (
              <FontAwesomeIcon
                icon={faEye}
                className=" cursor-pointer absolute right-5 top-5 text-green-500"
                onClick={() => setseepassword(!seepassword)}
              />
            )}
            {!seepassword && (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className=" cursor-pointer absolute right-5 top-5 text-green-500"
                onClick={() => setseepassword(!seepassword)}
              />
            )}
          </div>
          <label
            className=" capitalize font-medium mb-1"
            htmlFor="confirmpassword"
          >
            confirm password:
          </label>
          <input
            className="  w-96 m-2 h-10 pl-2 rounded-md focus:outline-green-500 border-2"
            type="password"
            name="password"
            id="confirmpassword"
            required
            placeholder="confirm password"
            onChange={(e) => {
              setuserform({ ...userform, confirmpassword: e.target.value });
            }}
          />
          <p className=" ml-1 capitalize font-medium">
            dont have an account?{" "}
            <Link to="/">
              <span className=" text-green-500 font-semibold cursor-pointer text-lg capitalize hover:border-b-2 border-b-green-500 ">
                sign in
              </span>{" "}
            </Link>
          </p>
          <button
            type="submit"
            className=" text-white font-semibold text-xl bg-green-600 py-2 rounded-lg m-2 mt-5 capitalize"
          >
            log in{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

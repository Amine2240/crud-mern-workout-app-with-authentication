import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const Signin = () => {
  const navigateTo = useNavigate();
  const [userform, setuserform] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [loginmessage, setloginmessage] = useState("");
  const [seepassword, setseepassword] = useState(false);
  const postuserinfo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/signin",
        userform
      );
      console.log("response", response);

      setloginmessage(response.data.message);
      // if (response.data.message === "please confirm password") {
      //   setloginmessage("please confirm password");
      // } else {
      //   if (response.data.message === "password very short") {
      //     setloginmessage("password very short");
      //   } else {
      //     if (response.data.message === "user already exists go log in") {
      //       setloginmessage("user already exists go log in");
      //     } else {
      //       if (response.data.message === "unauthirastion : invalid token") {
      //         setloginmessage("unauthirastion : invalid token");
      //       } else {
      //         setloginmessage("");
      //         navigateTo("/body");
      //       }
      //     }
      //   }
      // }
      if (response.data.message === "") {
        navigateTo("/body");
      }
    } catch (error) {
      console.log("error in posting");
    }
  };
  return (
    <div className=" h-[100vh] flex place-content-center items-start">
      <div className=" shadow-green-200 shadow-xl rounded-lg p-5 mt-14">
        <p className=" capitalize font-normal text-base mb-5 text-center ">
          {loginmessage}{" "}
        </p>

        <p className=" capitalize font-bold text-xl mb-5 text-center ">
          sign in{" "}
        </p>
        <form className=" flex flex-col" onSubmit={postuserinfo}>
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
            you already have an account?{" "}
            <Link to="/login">
              <span className=" text-green-500 font-semibold cursor-pointer text-lg capitalize hover:border-b-2 border-b-green-500 ">
                log in
              </span>{" "}
            </Link>
          </p>
          <button
            type="submit"
            className=" text-white font-semibold text-xl bg-green-600 py-2 rounded-lg m-2 mt-5 capitalize"
          >
            sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;

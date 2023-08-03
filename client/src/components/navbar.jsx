import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Authcontext } from "../context/authcontext";

const Navbar = () => {
  const navigateTo = useNavigate();
  const { loggedin } = useContext(Authcontext);
  console.log("loggedin from navbar", loggedin);
  const postlogout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/logout");
      console.log("response log out ", response.data);

      navigateTo("/login");
    } catch (error) {
      console.log("error during logout front end");
    }
  };

  return (
    <>
      <nav className=" h-[10vh] bg-gray-50  flex place-content-around items-center">
        <p className=" text-2xl font-bold capitalize">workout buddy</p>
        <ul className=" flex w-54 h-12 place-content-between items-center">
          {loggedin === false && (
            <>
              <li className=" mr-3">
                <Link to="/">
                  <button className=" capitalize text-xl font-semibold hover:border-2 border-green-500 px-3 rounded-md duration-75 hover:text-green-600 transition-all">
                    sign in
                  </button>
                </Link>
              </li>
              <li className=" mr-3">
                <Link to="/login">
                  <button className=" capitalize text-xl font-semibold hover:border-2 border-green-500 px-3 rounded-md duration-75 hover:text-green-600 transition-all">
                    log in
                  </button>
                </Link>
              </li>
            </>
          )}
          {loggedin === true && (
            <li className=" mr-3">
              <button
                onClick={postlogout}
                className=" capitalize text-xl font-semibold hover:border-2 border-green-500 px-3 rounded-md duration-75 hover:text-green-600 transition-all"
              >
                log out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

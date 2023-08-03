import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Authcontext = createContext();

const Authcontextprovider = (props) => {
  const [loggedin, setloggedin] = useState(false);
  const getloggedin = async () => {
    try {
      const loggedinresponse = await axios.get(
        "http://localhost:5000/loggedin"
      );
      setloggedin(loggedinresponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getloggedin();
  }, []);
  return (
    <Authcontext.Provider value={{ loggedin, getloggedin }}>
      {
        // eslint-disable-next-line react/prop-types
        props.children
      }
    </Authcontext.Provider>
  );
};

export default Authcontextprovider;

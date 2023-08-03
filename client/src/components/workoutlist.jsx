import "./workoutlist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setworkoutid } from "../redux/workoutslice";

const Workoutlist = () => {
  const dispatch = useDispatch();
  const [workoutarray, setworkoutarray] = useState([]);
  const [loading, setloading] = useState(true);
  const getdatafromdb = async () => {
    try {
      const response = await axios.get("http://localhost:5000/add");
      setworkoutarray(response.data);
      console.log("data from data base", workoutarray);
    } catch (error) {
      console.log("front end error in getting");
    } finally {
      setloading(false);
    }
  };

  const deleteworkout = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      console.log("item deleted");
      setworkoutarray(
        workoutarray.filter((item) => {
          if (item._id == id) {
            return false;
          } else {
            return true;
          }
        })
      );
    } catch (error) {
      console.log("error in deleting", error.message);
    }
  };

  useEffect(() => {
    getdatafromdb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) {
    return <div className=" text-xl font-semibold">loading....</div>;
  }
  return (
    <>
      <div className=" h-[80vh] containlist ">
        <div className=" h-fit    p-5 rounded-sm">
          <p className=" text-2xl font-bold capitalize">List of workouts:</p>
          {workoutarray.length === 0 && (
            <p className=" text-center font-semibold capitalize">
              no workouts, Add new ones from here ={">"}{" "}
            </p>
          )}
          {workoutarray.map((item) => {
            return (
              <>
                <div className=" mt-5 flex w-full place-content-between p-2 rounded-md shadow-green-200 shadow-md">
                  <div>
                    <p className=" text-xl font-bold capitalize text-green-400">
                      {item.title}
                    </p>
                    <p className=" font-medium">load (kg) : {item.load} </p>
                    <p className=" font-medium">
                      number of reps : {item.nreps}
                    </p>
                  </div>
                  <div className="">
                    <FontAwesomeIcon
                      icon={faPen}
                      className=" cursor-pointer   p-2 rounded-full transition-all text-blue-400 hover:bg-blue-100"
                      onClick={() => {
                        dispatch(setworkoutid(item._id));
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className=" cursor-pointer p-2 rounded-full transition-all text-red-500 hover:bg-red-100"
                      onClick={() => deleteworkout(item._id)}
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Workoutlist;

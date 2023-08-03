import Addworkout from "./addworkout";
import Updateworkout from "./updateworkout";
import Workoutlist from "./workoutlist";
import "./workoutlist.css";

const Body = () => {
  return (
    <div className=" lg:grid grid-rows-2 contain w-[80%] mx-auto gap-5 mt-3 ">
      <Workoutlist />
      <Addworkout />
      <Updateworkout />
    </div>
  );
};

export default Body;

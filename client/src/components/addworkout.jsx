import { useState } from "react";
import axios from "axios";

const Addworkout = () => {
  const [workoutform, setworkoutform] = useState({
    title: "",
    load: 0,
    nreps: 0,
  });

  const postworkout = async () => {
    try {
      await axios.post("http://localhost:5000/add", workoutform);
    } catch (error) {
      console.log("front end error posting", error);
    }
  };

  return (
    <div className=" h-fit  rounded-sm shadow-lg shadow-green-200">
      <p className=" font-bold text-xl capitalize ml-2 mt-5">
        add a new workout{" "}
      </p>
      <form onSubmit={postworkout} className=" p-5">
        <label className=" capitalize font-semibold" htmlFor="title">
          exercice title:
        </label>{" "}
        <br />
        <input
          className=" border-2 w-full"
          required
          id="title"
          name="title"
          type="text"
          onChange={(event) => {
            setworkoutform({ ...workoutform, title: event.target.value });
          }}
        />
        <br />
        <label className=" capitalize font-semibold" htmlFor="load">
          load (in kg):{" "}
        </label>
        <br />
        <input
          className=" border-2 w-full"
          required
          id="load"
          name="load"
          type="number"
          onChange={(event) => {
            setworkoutform({ ...workoutform, load: event.target.value });
          }}
        />
        <br />
        <label className=" capitalize font-semibold" htmlFor="reps">
          number of reps:
        </label>
        <br />
        <input
          className=" border-2 w-full"
          required
          id="reps"
          name="reps"
          type="number"
          onChange={(event) => {
            setworkoutform({ ...workoutform, nreps: event.target.value });
          }}
        />
        <br />
        <button
          type="submit"
          className=" text-white text-[15px] capitalize font-semibold bg-green-600 p-1 rounded-md px-2 mt-4"
        >
          add workout
        </button>
      </form>
    </div>
  );
};

export default Addworkout;

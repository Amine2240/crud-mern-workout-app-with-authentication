import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Updateworkout = () => {
  const [updateform, setupdateform] = useState({});
  const workoutid = useSelector((state) => state.workoutid.value);

  const appearupdateworkout = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/update/${id}`);
      setupdateform(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateworkout = async () => {
    await axios.put(`http://localhost:5000/update/${workoutid}`, updateform);
  };
  useEffect(() => {
    appearupdateworkout(workoutid);
  }, [workoutid]);

  return (
    <div className="h-fit rounded-sm lg:mt-0 sm:mt-5 shadow-lg shadow-green-200">
      <p className=" font-bold text-xl capitalize ml-2 mt-5">update workout </p>
      <form onSubmit={updateworkout} className=" p-5">
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
          value={updateform.title}
          onChange={(event) =>
            setupdateform({ ...updateform, title: event.target.value })
          }
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
          value={updateform.load}
          onChange={(event) =>
            setupdateform({ ...updateform, load: event.target.value })
          }
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
          value={updateform.nreps}
          onChange={(event) =>
            setupdateform({ ...updateform, nreps: event.target.value })
          }
        />
        <br />
        <button
          type="submit"
          className="text-white text-[15px] capitalize font-semibold bg-green-600 p-1 rounded-md px-2 mt-4"
        >
          update workout
        </button>
      </form>
    </div>
  );
};

export default Updateworkout;

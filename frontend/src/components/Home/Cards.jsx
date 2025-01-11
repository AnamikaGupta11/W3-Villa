import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const Cards = ({ home, setInputDiv, data, setUpdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `https://task-manager-backend-7doy.onrender.com/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleImportant = async (id) => {
    try {
      const response = await axios.put(
        `https://task-manager-backend-7doy.onrender.com/api/v2/update-imp-task/${id}`,
        {},
        { headers }
      );
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id, title, desc) => {
    setInputDiv("fixed");
    setUpdatedData({ id: id, title: title, desc: desc });
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `https://task-manager-backend-7doy.onrender.com/api/v2/delete-task/${id}`,
        { headers }
      );
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {data &&
        data.map((items, i) => (
          <div
            className="flex flex-col justify-between bg-gray-800 text-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            key={i}
          >
            <div>
              <h3 className="text-xl font-semibold">{items.title}</h3>
              <p className="text-gray-300 mt-2">{items.desc}</p>
            </div>
            <div className="mt-4 w-full flex justify-between items-center">
              <button
                className={`${
                  items.complete === false ? "bg-red-400" : "bg-green-600"
                } p-2 rounded-md text-white w-3/6 transition-all duration-300`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete === true ? "Completed" : "Incomplete"}
              </button>
              <div className="flex space-x-4 text-xl">
                <button
                  onClick={() => handleImportant(items._id)}
                  className="transition-all duration-300"
                >
                  {items.important === false ? (
                    <CiHeart className="text-gray-400 hover:text-red-500" />
                  ) : (
                    <FaHeart className="text-red-500" />
                  )}
                </button>
                {home !== "false" && (
                  <button
                    onClick={() =>
                      handleUpdate(items._id, items.title, items.desc)
                    }
                    className="text-yellow-400 hover:text-yellow-500"
                  >
                    <FaEdit />
                  </button>
                )}
                <button
                  onClick={() => deleteTask(items._id)}
                  className="text-red-600 hover:text-red-500"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          className="flex flex-col justify-center items-center bg-gray-800 rounded-lg p-6 text-gray-300 hover:scale-105 transition-all duration-300"
          onClick={() => setInputDiv("fixed")}
        >
          <IoAddCircleSharp className="text-6xl" />
          <h2 className="text-xl mt-4">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;

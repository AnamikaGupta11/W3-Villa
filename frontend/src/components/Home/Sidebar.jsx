import React, { useEffect, useState } from "react";

// icons
import { CgNotes } from "react-icons/cg";
import { MdOutlineFavorite } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

// Packages
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Data, setData] = useState(null);

  const data = [
    {
      title: "All Tasks",
      icon: <CgNotes color="blue" />,
      link: "/",
    },
    {
      title: "Favorite",
      icon: <MdOutlineFavorite color="red" />,
      link: "/importantTasks",
    },
    {
      title: "Completed Tasks",
      icon: <FaCheckDouble color="green" />,
      link: "/completedTasks",
    },
    {
      title: "Incompleted Tasks",
      icon: <AiOutlineLoading3Quarters color="yellow" />,
      link: "/incompletedTasks",
    },
  ];

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear();
    navigate("/login");
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://task-manager-backend-7doy.onrender.com/api/v2/get-all-tasks",
        { headers }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks data:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetchData();
      return () => setData(null);
    }
  }, []);

  return (
    <>
      {Data && (
        <div>
          <h2 className="text-xl font-semibold">{Data.username}</h2>
          <h4 className="mb-1 text-gray-400">{Data.email}</h4>
          <hr />
        </div>
      )}

      {/* Sidebar links */}
      <div>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300"
          >
            {items.icon}&nbsp; {items.title}
          </Link>
        ))}
      </div>

      {/* Log Out Button */}
      <div>
        <button className="bg-gray-600 w-full p-2 rounded" onClick={logout}>
          Log Out
        </button>
      </div>
    </>
  );
};

export default Sidebar;

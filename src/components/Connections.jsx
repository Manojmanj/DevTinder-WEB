import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  console.log("connections: ", connections);
  const fetchConections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    fetchConections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-3xl ">Connections</h1>

      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div className="flex mx-auto p-4 bg-base-300 rounded-lg w-1/2 my-5">
            <div>
              <img
                className="w-20 h-20 rounded-full"
                alt="photo"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h1 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h1>
              <p>{about}</p>
              {age && gender && <p>{age + " " + gender}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;

import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res?.data?.data));
      setToast(true);
      const i = setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (error) {
      console.log("error: ", error);
      setError(error.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10 gap-10    ">
        <div className="flex justify-center ">
          <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div className="">
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text"> First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="input input-bordered w-full max-w-xs my-2"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text"> Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="input input-bordered w-full max-w-xs my-2"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Photo URL</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    required
                    className="input input-bordered w-full max-w-xs my-2"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text"> Age</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className="input input-bordered w-full max-w-xs my-2"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text"> Gender</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="input input-bordered w-full max-w-xs my-2"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    required
                    className="input input-bordered w-full max-w-xs my-2"
                  />
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../images/mine.jpeg";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const UserProfile = () => {
  axios.defaults.withCredentials = true;
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const token = currentUser?.token;

  const navigate = useNavigate();

  // redirect to login page for any user who is not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      // setIsLoading(true);
      try {
        const API_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
        const response = await axios.get(
          `${API_URL}/users/${currentUser?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserPicture(response?.data?.avatar);
      } catch (error) {
        console.error(error);
      }
      // setIsLoading(false);
    };
    fetchUserDetails();
  }, []);

  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(`${currentUser?.name}`);
  const [email, setEmail] = useState(
    `${currentUser?.newEmail == undefined ? "" : currentUser.newEmail}`
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [pictureError, setPictureError] = useState(null);
  const [userPicture, setUserPicture] = useState(null);
  const [show, setShow] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the selected files
    const reader = new FileReader(); // FileReader object to read the file

    reader.onloadend = () => {
      // When reading is complete
      setShow(reader.result); // Set the avatar state to the data URL of the selected image
      setUserPicture(true);
      setPictureError("Click the green button to set profile picture");
    };

    if (file) {
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
  const updateUserDetails = async (e) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmNewPassword", confirmNewPassword);
    e.preventDefault();
    const API_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    axios
      .patch(`${API_URL}/users/edit-user`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCurrentUser(null);
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const uploadProfilePicture = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);
    const API_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    axios
      .post(`${API_URL}/users/change-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserPicture(response.data.avatar);
        setAvatar(null);
        setPictureError(null);
      })
      .catch((err) => {
        const errorMessage = err.response.data.message;
        setPictureError(errorMessage);
        setAvatar(null);
      });
  };
  return (
    <section className="profile">
      <div className="container profile__container">
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              {!userPicture && (
                <FaRegUser
                  style={{ height: "100%", width: "100%", padding: "2rem" }}
                />
              )}
              {show && (
                <img
                  className=""
                  style={{ height: "100%" }}
                  src={`${show}`}
                  alt=""
                />
              )}
              {userPicture && !avatar && (
                <img
                  style={{ height: "100%" }}
                  src={`${
                    import.meta.env.VITE_REACT_APP_ASSETS_URL
                  }/uploads/${userPicture}`}
                  alt=""
                />
              )}
            </div>
            <form onSubmit={uploadProfilePicture} className="avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => {
                  setAvatar(e.target.files[0]);
                  handleAvatarChange(e);
                }}
                accept="png, jpg, jpeg, webp, avif"
              />
              {!avatar && (
                <label style={{ cursor: "pointer" }} htmlFor="avatar">
                  <FaEdit
                    onClick={() => {
                      setPictureError(null);
                    }}
                  />
                </label>
              )}
              {avatar && (
                <button type="submit" className="profile__avatar-btn">
                  <FaCheck />
                </button>
              )}
            </form>
          </div>
          {pictureError && (
            <>
              {pictureError ==
              "Profile picture too big. Should be less than 500kb" ? (
                <>
                  <p
                    style={{ textAlign: "center" }}
                    className="form__error-message"
                  >
                    {pictureError}
                    <p>
                      Compress your image.{" "}
                      <a
                        href="https://www.iloveimg.com/compress-image"
                        target="_blank"
                        style={{
                          textDecoration: "1px underline blue",
                          color: "blue",
                        }}
                      >
                        iloveimg
                      </a>
                    </p>
                  </p>
                </>
              ) : (
                <p style={{color: "blue"}}>
                  {pictureError}
                </p>
              )}
            </>
          )}

          <h1>{currentUser.name}</h1>

          <form onSubmit={updateUserDetails} className="form profile__form">
            <input
              required
              type="text"
              placeholder="Full Name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              required
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div style={{ position: "relative" }}>
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Current password"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
                style={{ paddingRight: "30px" }} // Add padding to accommodate the icon
              />
              {!showPassword && (
                <FaEyeSlash
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    fontSize: "1.3rem",
                  }}
                />
              )}
              {showPassword && (
                <FaEye
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    fontSize: "1.3rem",
                  }}
                />
              )}
            </div>
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="Confirm new password"
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value);
              }}
            />
            {error && (
              <p
                style={{ textAlign: "center" }}
                className="form__error-message"
              >
                {error}
              </p>
            )}
            <button
              type="submit"
              style={{ marginInline: "auto" }}
              className="btn primary"
            >
              Update details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;

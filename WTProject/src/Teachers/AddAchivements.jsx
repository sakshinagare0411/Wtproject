import React, { useState, useRef } from "react";
import "./AddAchivements.css";
import axios from "axios";
import img from "../Images/student1.jpeg";
import { useNavigate } from "react-router-dom";

function AddAchivements() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const handleInputChangePhoto = (event) => {
    const file = event.target.files[0];
    const fileType = file.type;
    const fileSize = file.size;

    if (!["image/jpeg", "image/gif", "image/png"].includes(fileType)) {
      alert("Only JPG, GIF and PNG files are allowed");
      return;
    }

    if (fileSize > 819200) {
      alert("File size exceeds 800KB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChangeAchivement = (event) => {
    if (event.target.name === "image") {
      setData({
        ...data,
        image: event.target.files[0],
      });
    } else {
      setData({
        ...data,
        [event.target.name]: event.target.value,
      });
    }
    setErrors({});
  };

  const handleSubmitAchivement = async (event) => {
    event.preventDefault();
    const errors = ValidateAchivement(data);
    if (Object.keys(errors).length === 0) {
      try {
        const formDataToSend = new FormData();
        Object.keys(data).forEach((key) => {
          formDataToSend.append(key, data[key]);
        });

        const response = await axios.post(
          "http://localhost:8000/teacher/add_achievements/",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        resetFormAchivement();
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.error("Error adding achivement data: Forbidden");
        } else {
          console.error("Error adding achivement data:", error);
        }
      }
    } else {
      setErrors(errors);
    }
  };

  const ValidateAchivement = (data) => {
    const errors = {};
    if (!data.title) {
      errors.title = "Title is required";
    }
    if (!data.content) {
      errors.content = "Content is required";
    }
    return errors;
  };

  const resetFormAchivement = () => {
    setImage(null);
    setData({
      title: "",
      content: "",
      image: null,
    });
    setErrors({});
    fileInputRef.current.value = "";
  };

  const resetFormPhoto = () => {
    setImage(null);
    fileInputRef.current.value = null;
  };

  return (
    <div id="AddAchivements">
      <div className="student-info-container">
        <div className="student-navbar">
          <div className="student-details">
            <h2 className="student-name">John Doe</h2>
            <p className="student-reg-no">Reg No: 123456789</p>
            <p className="student-reg-no">Seventh - A</p>
          </div>
          <img src={img} alt="Student" className="student-photo" />
        </div>
      </div>
      <div className="home-button-container">
        <button className="home-button" onClick={() => navigate("/")}>
          <i className="fas fa-home"></i> Home
        </button>
      </div>
      <div className="achivement">
        <h1 style={{ textAlign: "center" }} className="heading">Add Achivements</h1>
        <div className="achivement-form-container">
          <div className="left-side">
            <img
              src={image || "https://bootdey.com/img/Content/avatar/avatar1.png"}
              alt="photo"
              className="d-block ui-w-80"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
            <label htmlFor="file-input" className="btn btn-outline-primary">
              Upload new photo
              <input
                type="file"
                className="account-settings-fileinput"
                id="file-input"
                name="image"
                onChange={handleInputChangePhoto}
                ref={fileInputRef}
                accept="image/*"
                aria-label="Upload new photo"
                required
              />
            </label>
            <button
              type="button"
              className="btn btn-default md-btn-flat"
              onClick={resetFormPhoto}
            >
              Reset
            </button>
            <div className="text-light small mt-1">
              Allowed JPG, GIF or PNG. Max size of 800K
            </div>
          </div>
          <div className="right-side">
            <form
              onSubmit={handleSubmitAchivement}
              action="achivement"
              method="post"
              id=""
            >
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="achivementTitle"
                  name="title"
                  placeholder="Enter Achivement title"
                  value={data.title}
                  onChange={handleInputChangeAchivement}
                  required
                />
                {errors.title && (
                  <p className="text-danger">{errors.title}</p>
                )}
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="achivementContent"
                  name="content"
                  rows="5"
                  placeholder="Enter Achivement content"
                  value={data.content}
                  onChange={handleInputChangeAchivement}
                  required
                ></textarea>
                {errors.content && (
                  <p className="text-danger">{errors.content}</p>
                )}
              </div>
              <button type="submit" className="btn btn-primary submit3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAchivements;

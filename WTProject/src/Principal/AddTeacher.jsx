import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Teachers/Form.css";
import axios from "axios";
import img from "../Images/student1.jpeg";
const Principal = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    education: "",
    post: "",
    passw: "",
    image: null, //Add image property to formData
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    if (event.target.name === "image") {
      // If the input is an image, set the image property in formData
      setFormData({
        ...formData,
        image: event.target.files[0], // Set the image file
      });
    } else {
      // For other inputs, update the formData as usual
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
    setErrors({});
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      // Form is valid, submit the data
      try {
        const formDataToSend = new FormData();
        // Append all form data to formDataToSend
        Object.keys(formData).forEach((key) => {
          formDataToSend.append(key, formData[key]);
        });

        const response = await axios.post(
          "http://localhost:8000/principal/add_teacher/",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
            },
          }
        );
        console.log(response.data);
        // Reset the form data and errors
        resetForm();
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.error("Error adding teacher data: Forbidden");
        } else {
          console.error("Error adding teacher data:", error);
        }
      }
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = "Mobile number is invalid";
    }
    if (!formData.education) {
      errors.education = "Education is required";
    }
    if (!formData.post) {
      errors.post = "Post is required";
    }
    if (!formData.passw.trim()) {
      errors.passw = "Password is required";
    } else if (formData.passw.length < 8) {
      errors.passw = "password should be at least 8 char";
    }
    if (!formData.confirmPass.trim()) {
      errors.confirmPass = "Confirm Password is required";
    } else if (formData.confirmPass !== formData.passw) {
      errors.confirmPass = "Password and Confirm Password should be same";
    }
    return errors;
  };

  const fileInputRef = useRef(null);
  const boxSize = 80;

  const resetForm = () => {
    setImage(null);
    // Reset the form data and errors
    setFormData({
      name: "",
      email: "",
      mobile: "",
      education: "",
      post: "",
      passw: "",
      confirmPass: "",
      image: null,
    });
    setErrors({});
    fileInputRef.current.value = "";
  };
  const resetFormPhoto = () => {
    setImage(null); // reset the image state variable to null
    fileInputRef.current.value = null;
  };

  return (
    <div id="AddTeacher">
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
      {/* < div className="format"> */}
      <div className="home-button-container">
        <button className="home-button" onClick={() => navigate("/")}>
          <i className="fas fa-home"></i> Home
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        action="teacher"
        method="post"
        id="teacher-form"
      >
        <div className="card-body media align-items-center">
          <img
            src={image || "https://bootdey.com/img/Content/avatar/avatar1.png"}
            alt="teacher"
            className="d-block ui-w-80"
            style={{
              width: `${boxSize}px`,
              height: `${boxSize}px`,
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
          <div className="media-body ml-4">
            <label htmlFor="file-input" className="btn btn-outline-primary">
              Upload new photo
              <input
                type="file"
                className="account-settings-fileinput"
                id="file-input"
                name="image"
                onChange={handleInputChangePhoto}
                accept="image/*"
                ref={fileInputRef}
                aria-label="Upload new photo"
                required
              />
            </label>{" "}
            <button
              type="button"
              className="btn btn-default md-btn-flat"
              onClick={resetFormPhoto}
            >
              Reset
            </button>
            <div className="text-light small mt-1">
              Allowed JPG,GIF or PNG. Max size of 800K
            </div>
          </div>
        </div>

        <div className="">
          <div className="form-group">
            <input
              type="text"
              className="form-control mb-1"
              id="name-input"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter name"
              required
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email-input"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              required
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          <div className="form-group">
            <input
              type="tel"
              className="form-control mb-1"
              id="mobile-input"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter mobile number"
              required
            />
            {errors.mobile && <p className="text-danger">{errors.mobile}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="education-input"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              placeholder="Enter education"
              required
            />
            {errors.education && (
              <p className="text-danger">{errors.education}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control mb-1"
              id="post-input"
              name="post"
              value={formData.post}
              onChange={handleInputChange}
              placeholder="Enter post"
              required
            />
            {errors.post && <p className="text-danger">{errors.post}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control mb-1"
              id="post-input"
              name="passw"
              value={formData.pass}
              onChange={handleInputChange}
              placeholder="Enter Password"
              required
            />
            {errors.pass && <p className="text-danger">{errors.passw}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control mb-1"
              id="confirm-input"
              name="confirmPass"
              value={formData.confirmPass}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              required
            />
            {errors.confirmPass && (
              <p className="text-danger">{errors.confirmPass}</p>
            )}
          </div>
        </div>
        <div className="text-right mt-3">
          <button type="submit" className="btn btn-primary">
            Save changes
          </button>
          <button type="button" className="btn btn-default" onClick={resetForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Principal;

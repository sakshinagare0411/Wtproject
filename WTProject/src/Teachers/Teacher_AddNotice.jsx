import React, { useState, useEffect } from "react";
import "./Notice.css";
import axios from "axios";
import img from "../Images/student1.jpeg";
import { useNavigate } from "react-router-dom";

function AddNotice() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    noticeTitle: "",
    noticeContent: "",
    noticeDate: "",
  });

  useEffect(() => {
    const handleResize = () => {
      const dateInput = document.getElementById('date-input');
      if (window.innerWidth <= 768) {
        dateInput.type = 'text';
        dateInput.setAttribute('placeholder', 'dd/mm/yyyy');
      } else {
        dateInput.type = 'date';
        dateInput.removeAttribute('placeholder');
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChangeNotice = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setErrors({});
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const errors = validateNotice(form);
    if (Object.keys(errors).length === 0) {
      try {
        const formDataToSend = new FormData();
        Object.keys(form).forEach((key) => {
          formDataToSend.append(key, form[key]);
        });

        const response = await axios.post(
          "http://localhost:8000/teacher/add_notice/",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        resetFormNotice();
      } catch (err) {
        if (err.response && err.response.status === 403) {
          console.error("Error adding notice data: Forbidden");
        } else {
          console.error("Error adding notice data:", err);
        }
      }
    } else {
      setErrors(errors);
    }
  };

  const validateNotice = (form) => {
    const errors = {};
    if (!form.noticeTitle) {
      errors.noticeTitle = "Title is required";
    }
    if (!form.noticeContent) {
      errors.noticeContent = "Content is required";
    }
    if (!form.noticeDate) {
      errors.noticeDate = "Date is required";
    }
    return errors;
  };

  const resetFormNotice = () => {
    setForm({
      noticeTitle: "",
      noticeContent: "",
      noticeDate: "",
    });
    setErrors({});
  };

  return (
    <div id="add_notice">
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
        <button className="home-button" onClick={() => navigate('/')}>
          <i className="fas fa-home"></i> Home
        </button>
      </div>
      <div className="container-notice">
        <h2 className="text-center mb-4">Add Notices</h2>
        <form
          onSubmit={handleFormSubmit}
          action="notice"
          method="post"
          id="form-notice"
        >
          <div className="form-group1">
            <input
              type="text"
              className="form-control"
              id="title-input"
              name="noticeTitle"
              placeholder="Enter notice title"
              value={form.noticeTitle}
              onChange={handleInputChangeNotice}
            />
            {errors.noticeTitle && (
              <p className="text-danger">{errors.noticeTitle}</p>
            )}
          </div>
          <div className="form-group1">
            <textarea
              className="form-control"
              id="content-input"
              name="noticeContent"
              rows="5"
              placeholder="Enter notice content"
              value={form.noticeContent}
              onChange={handleInputChangeNotice}
            ></textarea>
            {errors.noticeContent && (
              <p className="text-danger">{errors.noticeContent}</p>
            )}
          </div>
          <div className="form-group1">
            <input
              type="date"
              className="form-control date"
              max={new Date().toISOString().split("T")[0]}
              id="date-input"
              name="noticeDate"
              value={form.noticeDate}
              onChange={handleInputChangeNotice}
              placeholder="" // This will be managed by JavaScript
            />
            {errors.noticeDate && (
              <p className="text-danger">{errors.noticeDate}</p>
            )}
          </div>
          <div className="submit-container3 hover-effect">
            <button type="submit" className="submit3">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNotice;

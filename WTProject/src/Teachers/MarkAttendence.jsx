import React, { useState } from 'react';
import './MarkAttendence.css';
import axios from "axios";
import QrReader from 'react-qr-reader';
import QrScanner from "qr-scanner";
import { useNavigate } from 'react-router-dom';
import img from '../Images/student1.jpeg';

function MarkAttendance() {
  const navigate = useNavigate();
    const[result, setResult] = useState("")
    //read qr code
    const readCode = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        QrScanner.scanImage(file, { returnDetailedScanResult: true })
            .then(result => setResult(result.data))
            .catch(e => console.log(e));
       }
  

//web cam 
// const qrRef = useRef(null);
const [webCamResult,setWebCamResult] = useState();
const webcamError = (error) => {
  if(error){
      console.log(error);
  }
  };

  const webcamScan = (result) => {
    if (result) {

      const mobile = result.split("-")[0];
      setWebCamResult(mobile);
      sendSMS(mobile);
      alert("Message has been sent successfully");
    }
  };

  const sendSMS = (mobile) => {
    axios.post('http://localhost:8000/teacher/mark_attendance_and_send_message/', {
      mobile_number: mobile,
    })
   .then(response => {
      console.log(response);
    })
   .catch(error => {
      console.error(error);
    });
  };


      return (
        <div id="MarkAttendance">
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
        <button className="home-button" onClick={() => navigate('/')}>
          <i className="fas fa-home"></i> Home
        </button>
      </div>
      <div className="attendence">
            <div className="scan">
                            <h1>Mark Attendence</h1>
                            <input type="file" onChange={(e) => readCode(e)}></input>
                            <p>Result is {result}</p>
                          </div>
                          <div className='webcam'>
                          <div>
                    <div>
                        <h3>Webcam</h3>
                    </div>
                    <div>
                    <QrReader
                        delay={300}
                        onError={webcamError}
                        onScan={webcamScan}
                        legacyMode={false}
                        facingMode={"user"}
                        />
                    </div>
                    <div>
                        <h6>Result {webCamResult}</h6>
                    </div>
                </div>
                          </div>
        </div>
        </div>
      )
}
export default MarkAttendance;
import Swal from 'sweetalert2';
import "./App.css";
import React, { useState, useContext} from 'react';
import { AppContext } from './Context/App_Context'
import { BeatLoader } from 'react-spinners';


function Home() {
  const { API_base_url } = useContext(AppContext)
  const [btnDisbaled, setBtnDisbaled] = useState(false)
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      email: '',
      cv: null, // Store the uploaded CV file
    });

    const [isDragging, setIsDragging] = React.useState(false);
    const [isUploading, setIsUploading] = React.useState(false);
  
    const handleChange = (event) => {
      const { name, value, files } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'cv' ? files[0] : value, // Handle CV and other fields differently
      }));
    };

    const handleDragEnter = (event) => {
      event.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (event) => {
      event.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (event) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files[0];
      setFormData((prevData) => ({
        ...prevData,
        cv: file,
      }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent default form submission behavior
  
      const { name, phone, email, cv } = formData;
  
      // Check if all fields are empty (including CV file)
      if (!name || !phone || !email || !cv) {
        Swal.fire({
          title: "Error!",
          text: "Please fill in all fields and upload your CV.",
          icon: "error",
        });
        return; // Exit the function if any field is empty
      }
      
      // Validate phone number
      const phoneRegex = /^\+?\d{7,15}$/; // Regex for a phone number with optional plus sign and between 7 to 15 digits
      if (!phoneRegex.test(phone)) {
        Swal.fire({
          title: "Error!",
          text: "Please enter a valid phone number (7 to 15 digits) including optional leading '+' for international numbers.",
          icon: "error",
        });
        return; // Exit the function if phone number is invalid
      }
  
      // Handle file upload (replace with your actual backend logic)
      try {
        setBtnDisbaled(true)
        setIsUploading(true); // Set uploading state to true
        const formData = new FormData(); // Create a FormData object for file upload
        formData.append('name', name); // Add other form data if needed
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('files', cv); // Add the CV file

        console.log('formData', formData)

        const url = `${API_base_url}api/v1/supportscv`

        console.log('url', url)
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });
  
        console.log('response.ok', response.ok)

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }
  
        const data = await response.json(); // Parse the response data (if applicable)
  
        Swal.fire({
          title: "Success!",
          text: data?.message || "Your information has been submitted. We will contact you through email for your test.", // Use optional message from response or default message
          icon: "success",
        });
  
        // Reset the form
        setFormData({
          name: '',
          phone: '',
          email: '',
          cv: null,
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred while submitting the form. Possibly user with this email already exist, Please review and try again.",
          icon: "error",
        });
      } finally {
        setIsUploading(false); // Reset uploading state
        setBtnDisbaled(false)
      }
    };
  
  return (
    <>
      <div className="container">
        <div className="row" style={{padding:"10px"}}>
        <h3 className="ceteredText">WELCOME TO M-R SOFT HUB APPLICATION PORTAL</h3>
          <div className="jumbotron col-12">
            <form 
              className={`file-upload-form ${isDragging ? 'dragging' : ''}`}
              // onSubmit={handleSubmit}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <h2 style={{textTransform:"capitalize", fontWeight:"300"}}><strong>Please complete this form with valid details, Check your email for confirmation.</strong></h2>
              <input onChange={handleChange} name="name"  type="text" placeholder="Your Name: " className="formInput" value={formData.name} />
              <input onChange={handleChange} name="phone"  type="tel" placeholder="Your phone: " className="formInput" value={formData.phone} />
              <input onChange={handleChange} name="email"  type="email" placeholder="Your Email: " className="formInput" value={formData.email} />
              <label className="file-upload-label">
                <h3>Upload your CV</h3>
                <div className="file-upload-design">
                  <svg viewBox="0 0 640 512" height="1em">
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                  </svg>
                  <p>Drag and Drop</p>
                  <p>or</p>
                  <span className={`browse-button`}>Browse file</span>
                </div>
                <input 
                  onChange={handleChange} 
                  id="file" 
                  name="cv"  
                  type="file" 
                  accept=".pdf, .doc, .docx"
                  className="file-input" 
                />
              </label>
              {formData.cv && <p className="selected-file">Selected file: <span className="selected-file-name">{formData.cv.name}</span></p>}
              {/* <input type="submit" value="Submit" className="browse-button"  disabled={btnDisbaled}/> */}
              {/* <button onClick={handleSubmit} style={buttonStyle}> */}
              <button onClick={handleSubmit} className="browse-button" disabled={btnDisbaled}>
                {isUploading ? (
                  <BeatLoader color='#ffffff' loading={isUploading} size={8} />
                ) : (
                  'SUBMIT'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
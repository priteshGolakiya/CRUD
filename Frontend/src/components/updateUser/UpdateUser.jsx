import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./styles.css";

const UpdateUser = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/user/${id}`);
        const userData = res.data.data;

        setFormData({
          fname: userData.fname,
          lname: userData.lname,
          email: userData.email,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    let errorsObj = {};

    if (!formData.fname.trim()) {
      isValid = false;
      errorsObj.fname = "First name is required";
    }

    if (!formData.lname.trim()) {
      isValid = false;
      errorsObj.lname = "Last name is required";
    }

    if (!formData.email.trim()) {
      isValid = false;
      errorsObj.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      isValid = false;
      errorsObj.email = "Invalid email format";
    }

    setErrors(errorsObj);
    if (!isValid) {
      setShowModal(true);
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        await axios.put(`http://localhost:5000/user/${id}`, formData);

        // Update form data state after successful update
        setFormData({
          fname: formData.fname,
          lname: formData.lname,
          email: formData.email,
        });
        setSuccessMessage("Updated successfully!");
        setShowModal(true);

        setLoading(false);
      } catch (error) {
        console.error("Error updating user:", error);
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
          />
          {errors.fname && <p className="error">{errors.fname}</p>}
        </div>
        <div>
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
          />
          {errors.lname && <p className="error">{errors.lname}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <button type="submit">Update</button>
        <Link to="/" className="backbtn">Home</Link>
      </form>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <p>{successMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

const User = () => {
  const [userData, setUserData] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/user/");
        if (res.data.success && Array.isArray(res.data.data)) {
          setUserData(res.data.data);
        } else {
          console.error("Invalid data format received from API");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onDeleteUser = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/user/${id}`);
      if (res.data.success) {
        // Filter out the deleted user from the user data state
        setUserData(userData.filter((user) => user._id !== id));
        setMessage("User deleted successfully!");
      } else {
        setMessage("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Error deleting user.");
    }
  };

  return (
    <div className="container">
      <div>
        <div className="add-user-link">
          <Link to="/create">Add User</Link>
        </div>
        {message && <div className="message">{message}</div>}
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{`${user.fname} ${user.lname}`}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => onDeleteUser(user._id)}
                    style={{ backgroundColor: "red" }}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                  <Link to={`/${user._id}/edit`}>
                    <i className="fas fa-edit"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;

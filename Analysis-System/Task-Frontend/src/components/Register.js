import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverErrors, setServerErrors] = useState(null);
  const [clientErrors, setClientErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username,
      email,
      password,
    };

    const errors = {};

    if (username.trim().length === 0) {
      errors.username = "Username is required";
    }
    if (email.trim().length === 0) {
      errors.email = "Email is required";
    } else if (!validator.isEmail(email)) {
      errors.email = "Email should be valid";
    }
    if (password.trim().length === 0) {
      errors.password = "Password is required";
    } else if (password.trim().length < 8 || password.trim().length > 128) {
      errors.password = "Password should be between 8-128 characters";
    }

    if (Object.keys(errors).length === 0) {
      try {
        await axios.post("http://localhost:3050/users/register", formData);
        toast.success("Registration Successful!");
        navigate("/login");
      } catch (err) {
        setServerErrors(err.response.data.errors);
      }
    } else {
      setClientErrors(errors);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {serverErrors && (
        <div>
          <h4>Errors:</h4>
          <ul>
            {serverErrors.map((ele, i) => (
              <li key={i}>{ele.msg}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {clientErrors.username && <p>{clientErrors.username}</p>}

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {clientErrors.email && <p>{clientErrors.email}</p>}

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {clientErrors.password && <p>{clientErrors.password}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

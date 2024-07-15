import React, { useState, useEffect } from "react";
import "../styles/register.css";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Register = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowalert] = useState("");
  const [alertType, setAlertType] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token != null;
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/users/register",
        {
          email: email,
          password: password,
          role: role,
        }
      );
      if (response.data.payload.statusCode === 200) {
        setLoading(false);
        setShowalert(true);
        setMessage(response.data.payload.message);
        setAlertType("succes");
        navigate("/login");
      } else {
        setShowalert(true);
        setMessage(response.data.payload.message);
        setAlertType("error");
        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        setLoading(false);
        setShowalert(true);
        setMessage(error.response.data.payload.message);
        setAlertType("error");
      }
    }
  };

  return (
    <div className="register__content">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      )}
      {showAlert &&
        Swal.fire({
          title: message,
          icon: alertType,
          timer: 1500,
          showConfirmButton: false,
          onClose: setShowalert(false),
        })}
      <Container>
        <Card body className="register__card">
          <p style={{ textAlign: "center", fontSize: "20px", color: "red" }}>
            {message}
          </p>
          <h1>Form Register</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Harap isi email!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="mb-3 input__password"
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <div className="input__password-container">
                <Form.Control
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {showPassword ? (
                  <BsFillEyeFill
                    className="eye__icon"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <BsFillEyeSlashFill
                    className="eye__icon"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              <Form.Control.Feedback type="invalid">
                Harap isi password!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Label>Register Sebagai?</Form.Label>
            <Form.Select
              aria-label="role"
              className="mb-3"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              name="role"
            >
              <option>...</option>
              <option value="MAHASISWA">Calon Mahasiswa/Mahasiswa</option>
              <option value="DOSEN">Dosen</option>
            </Form.Select>
            <p>
              Sudah punya akun? <a href="/login">Login</a>
            </p>
            <Button className="btn__register" type="submit">
              Submit
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/button";
import "../styles/register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowalert] = useState("");
  const [alertType, setAlertType] = useState("");

  const navigate = useNavigate();

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

      const response = await axios.post("http://localhost:5050/login", {
        email: email,
        password: password,
      });
      setLoading(false);
      setShowalert(true);
      setMessage(response.data.payload.message);
      setAlertType("succes");
      if (email !== "" && password !== "") {
        navigate("/dashboard");
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
          <h1>Form Login</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
              />
              <Form.Control.Feedback type="invalid">
                Harap isi email!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                required
                className="input__password"
              />
              {showPassword ? (
                <BsFillEyeFill
                  className="eye__iconLogin"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <BsFillEyeSlashFill
                  className="eye__iconLogin"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
              <Form.Control.Feedback type="invalid">
                Harap isi password!
              </Form.Control.Feedback>
            </Form.Group>

            <p>
              Belum Punya akun? <a href="/register">Register</a>
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

export default Login;

import React, { useState, useEffect } from "react";
import "../styles/tracker.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";

const Project = () => {
  const [showModal, setShowModal] = useState(false);
  const [projectImage, setProjectImage] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [token, setToken] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowalert] = useState("");
  const [alertType, setAlertType] = useState("");

  const [projectData, setProjectData] = useState([]);

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem("token");
    if (refreshToken) {
      setToken(refreshToken);
    }
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(
          "https://server-spmb.vercel.app/tracker/project",
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
          }
        );
        if (response.data.payload.statusCode === 200) {
          const data = response.data.payload.datas;
          if (Array.isArray(data)) {
            // Pastikan data adalah array
            setProjectData(data);
          }
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProjectData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const refreshToken = localStorage.getItem("token");
    if (refreshToken) {
      setToken(refreshToken);
    }

    try {
      setLoading(true);

      const dataProject = {
        imageUrl: projectImage,
        nama: projectName,
        deskripsi: projectDescription,
        refreshToken: token,
      };

      const response = await axios.post(
        "https://server-spmb.vercel.app/tracker/add-project",
        dataProject,
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.payload.statusCode === 200) {
        setLoading(false);
        setShowalert(true);
        setMessage(response.data.payload.message);
        setAlertType("success");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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

    setShowModal(false);
  };

  return (
    <>
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
      <h2 style={{ color: "#004aad", marginTop: "20px" }}>My Project List</h2>
      <Button
        variant="primary"
        onClick={() => setShowModal(true)}
        className="mb-3"
      >
        Tambah Project
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Ganti Gambar Projek</Form.Label>
              <Form.Control
                type="file"
                id="formProfileImage"
                label="Pilih gambar"
                custom
                onChange={handleUploadImage}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Project</Form.Label>
              <Form.Control
                type="text"
                id="Nama Project"
                placeholder="Masukkan nama project"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                id="Deskripsi Project"
                placeholder="Masukkan deskripsi project"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={() => setShowModal(false)}
            >
              Tambahkan
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Row>
        {projectData.map((project, index) => (
          <Col md={4} key={index}>
            <Card className="mb-3">
              <Card.Header>
                <img
                  src={
                    project.imageUrl
                      ? project.imageUrl
                      : "https://via.placeholder.com/150"
                  }
                  alt={`Project ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "300px",
                  }}
                />
              </Card.Header>
              <Card.Body>
                <Card.Title>{project.nama}</Card.Title>
                <Card.Text>{project.deskripsi}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Project;

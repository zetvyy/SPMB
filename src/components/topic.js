import React, { useState, useEffect } from "react";
import "../styles/tracker.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";

const Topic = () => {
  const [showModal, setShowModal] = useState(false);
  const [topic, setTopic] = useState("");
  const [token, setToken] = useState("");
  const [topicData, setTopicData] = useState([]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowalert] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    const refreshToken = localStorage.getItem("token");
    if (refreshToken) {
      setToken(refreshToken);
    }
    const fetchTopicData = async () => {
      try {
        const response = await axios.get(
          "https://server-spmb.vercel.app/tracker/topic",
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
          }
        );
        if (response.data.payload.statusCode === 200) {
          const data = response.data.payload.datas;
          if (Array.isArray(data)) {
            // Pastikan data adalah array
            setTopicData(data);
          }
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchTopicData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const refreshToken = localStorage.getItem("token");
    if (refreshToken) {
      setToken(refreshToken);
    }

    try {
      setLoading(true);

      const dataTopic = {
        topikPembelajaran: topic,
        refreshToken: token,
      };

      const response = await axios.post(
        "https://server-spmb.vercel.app/tracker/add-topic",
        dataTopic,
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
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
      <Row>
        <Col md={12}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Hasil Belajar Minggu Ini</Card.Title>
              {topicData.map((topic, index) => (
                <ListGroup>
                  <ListGroup.Item key={index}>
                    {topic.topikPembelajaran}
                  </ListGroup.Item>
                </ListGroup>
              ))}

              <Button
                variant="primary"
                className="mt-3"
                onClick={() => setShowModal(true)}
              >
                +
              </Button>
              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Tambah Hasil Belajar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group>
                      <Form.Label>Topik Belajar</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan topik yang dipelajari"
                        className="mb-3"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Topic;

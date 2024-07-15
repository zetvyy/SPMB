import React, { useState, useEffect } from "react";
import "../styles/tracker.css";
import Container from "react-bootstrap/esm/Container";
import Header from "../components/navbar";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";

const Tracker = () => {
  const [showModalProfile, setShowModalProfile] = useState(false);
  const [showModalEditProfile, setShowModalEditProfile] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowalert] = useState("");
  const [alertType, setAlertType] = useState("");

  const [profileImage, setProfileImage] = useState("");
  const [fullname, setFullname] = useState("");
  const [department, setDepartment] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [skills, setSkills] = useState("");
  const [token, setToken] = useState("");

  const [profileData, setProfileData] = useState({
    imageUrl: "",
    nama: "",
    jurusan: "",
    peminatan: "",
    keahlian: "",
  });

  useEffect(() => {
    const refreshToken = localStorage.getItem("token");
    if (refreshToken) {
      setToken(refreshToken);
    }
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/tracker/profile",
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
          }
        );
        console.log(response);
        if (response.data.payload.statusCode === 200) {
          setProfileData(response.data.payload.datas);
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    if (profileData) {
      setFullname(profileData.nama);
      setDepartment(profileData.jurusan);
      setSpecialization(profileData.peminatan);
      setSkills(profileData.keahlian);
      setProfileImage(profileData.imageUrl);
    }
  }, [profileData]);

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name) => {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("");
    return initials.toUpperCase();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/tracker/add-profile",
        {
          imageUrl: profileImage,
          nama: fullname,
          jurusan: department,
          peminatan: specialization,
          keahlian: skills,
          refreshToken: token,
        }
      );

      if (response.data.payload.statusCode === 200) {
        setLoading(false);
        setShowalert(true);
        setMessage(response.data.payload.message);
        setAlertType("succes");

        // Update profileData with the new data
        setProfileData({
          imageUrl: profileImage,
          nama: fullname,
          jurusan: department,
          peminatan: specialization,
          keahlian: skills,
        });
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

    setShowModalProfile(false);
  };

  const handleSubmitEditProfile = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axios.put(
        "http://localhost:8000/tracker/edit-profile",
        {
          imageUrl: profileImage,
          nama: fullname,
          jurusan: department,
          peminatan: specialization,
          keahlian: skills,
          refreshToken: token,
        }
      );

      if (response.data.payload.statusCode === 200) {
        setLoading(false);
        setShowalert(true);
        setMessage(response.data.payload.message);
        setAlertType("succes");

        // Update profileData with the new data
        setProfileData({
          imageUrl: profileImage,
          nama: fullname,
          jurusan: department,
          peminatan: specialization,
          keahlian: skills,
        });
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

    setShowModalEditProfile(false);
  };

  return (
    <>
      <Header />
      <div className="tracker">
        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner" />
          </div>
        )}
        {showAlert &&
          Swal.fire({
            title: message,
            icon: alertType,
            timer: 10000,
            showConfirmButton: false,
            onClose: setShowalert(false),
          })}
        <Container>
          <Card body className="tracker__card">
            <Row>
              <Col>
                <h1>Tracker Progress</h1>
              </Col>
              <Col className="backto__dashboard">
                <Button
                  variant="success"
                  href="/dashboard"
                  className="btn_backto__dashboard"
                >
                  Kembali ke Dashboard
                </Button>
              </Col>
            </Row>
            <Row>
              <h2>Profile</h2>

              <Col className="text-center" md={4}>
                <div className="profile-image">
                  {profileData.imageUrl ? (
                    <img
                      src={profileData.imageUrl}
                      alt="Profil"
                      style={{
                        width: "250px",
                        height: "250px",
                        borderRadius: "50%",
                        marginBottom: "20px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "250px",
                        height: "250px",
                        borderRadius: "50%",
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#ccc",
                        fontSize: "100px",
                        color: "#fff",
                      }}
                    >
                      {getInitials(profileData.nama)}
                    </div>
                  )}
                </div>
              </Col>
              <Col md={8}>
                <div className="user-details">
                  <p>Nama Lengkap: {profileData.nama} </p>
                  <p>Jurusan: {profileData.jurusan}</p>
                  <p>Peminatan: {profileData.peminatan} </p>
                  <p>Daftar Keahlian: {profileData.keahlian} </p>
                </div>
                <Button
                  variant="primary"
                  onClick={() => setShowModalProfile(true)}
                  className="mb-3"
                  style={{ marginRight: "10px" }}
                >
                  Add Data Profile
                </Button>
                <Button
                  variant="warning"
                  onClick={() => setShowModalEditProfile(true)}
                  className="mb-3"
                >
                  Edit Profile
                </Button>
                {/* Modal Add Profile */}
                <Modal
                  show={showModalProfile}
                  onHide={() => setShowModalProfile(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Add Profil</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                      <div className="profile-image">
                        <img
                          src="https://via.placeholder.com/50"
                          alt="Profil"
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            marginBottom: "20px",
                          }}
                        />
                      </div>
                      <Form.Group>
                        <Form.Label>Ganti Gambar Profil</Form.Label>
                        <Form.Control
                          type="file"
                          id="formProfileImage"
                          label="Pilih gambar"
                          custom
                          onChange={handleUploadImage}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Nama Lengkap</Form.Label>
                        <Form.Control
                          type="text"
                          id="fullName"
                          placeholder="Masukkan nama lengkap"
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Jurusan</Form.Label>
                        <Form.Control
                          type="text"
                          id="department"
                          placeholder="Masukkan jurusan"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Peminatan</Form.Label>
                        <Form.Control
                          type="text"
                          id="specialization"
                          placeholder="Masukkan peminatan"
                          value={specialization}
                          onChange={(e) => setSpecialization(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Daftar Keahlian</Form.Label>
                        <Form.Control
                          as="textarea"
                          id="skills"
                          rows={3}
                          placeholder="Masukkan keahlian"
                          value={skills}
                          onChange={(e) => setSkills(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="d-none">
                        <Form.Label>Token</Form.Label>
                        <Form.Control
                          type="text"
                          id="token"
                          placeholder="Masukkan token"
                          value={token}
                          onChange={(e) => setToken(e.target.value)}
                        />
                      </Form.Group>

                      <Button
                        variant="primary"
                        onClick={() => setShowModalProfile(false)}
                        type="submit"
                      >
                        Simpan Data
                      </Button>
                    </Form>
                  </Modal.Body>
                </Modal>

                {/* Modal Edit Profile */}
                <Modal
                  show={showModalEditProfile}
                  onHide={() => setShowModalEditProfile(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Profil</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleSubmitEditProfile}>
                      <div className="profile-image">
                        <img
                          src="https://via.placeholder.com/50"
                          alt="Profil"
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            marginBottom: "20px",
                          }}
                        />
                      </div>
                      <Form.Group>
                        <Form.Label>Ganti Gambar Profil</Form.Label>
                        <Form.Control
                          type="file"
                          id="formProfileImage"
                          label="Pilih gambar"
                          custom
                          onChange={handleUploadImage}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Nama Lengkap</Form.Label>
                        <Form.Control
                          type="text"
                          id="fullName"
                          placeholder="Masukkan nama lengkap"
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Jurusan</Form.Label>
                        <Form.Control
                          type="text"
                          id="department"
                          placeholder="Masukkan jurusan"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Peminatan</Form.Label>
                        <Form.Control
                          type="text"
                          id="specialization"
                          placeholder="Masukkan peminatan"
                          value={specialization}
                          onChange={(e) => setSpecialization(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Daftar Keahlian</Form.Label>
                        <Form.Control
                          as="textarea"
                          id="skills"
                          rows={3}
                          placeholder="Masukkan keahlian"
                          value={skills}
                          onChange={(e) => setSkills(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="d-none">
                        <Form.Label>Token</Form.Label>
                        <Form.Control
                          type="text"
                          id="token"
                          placeholder="Masukkan token"
                          value={token}
                          onChange={(e) => setToken(e.target.value)}
                        />
                      </Form.Group>

                      <Button
                        variant="primary"
                        onClick={() => setShowModalEditProfile(false)}
                        type="submit"
                      >
                        Simpan Perubahan
                      </Button>
                    </Form>
                  </Modal.Body>
                </Modal>
              </Col>
            </Row>

            <h2>My Project List</h2>
            <Row>
              <Col md={6}>
                <Card className="mb-3">
                  <Row>
                    <Col md={4}>
                      <img
                        src="https://via.placeholder.com/150"
                        alt="Pproject 1"
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <Card.Title>Project 1</Card.Title>
                        <Card.Text>
                          Ini adalah deskripsi dari Project 1. Project ini
                          melibatkan pengembangan aplikasi dengan React.
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="mb-3">
                  <Row>
                    <Col md={4}>
                      <img
                        src="https://via.placeholder.com/150"
                        alt="Pproject 2"
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <Card.Title>Project 2</Card.Title>
                        <Card.Text>
                          Deskripsi dari Project 2 di sini. Project ini fokus
                          pada pengembangan backend menggunakan Node.js.
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Hasil Belajar Minggu Ini</Card.Title>
                    <ListGroup>
                      <ListGroup.Item>React Hooks dan Komponen</ListGroup.Item>
                      <ListGroup.Item>Asynchronous JavaScript</ListGroup.Item>
                      <ListGroup.Item>
                        State Management dengan Redux
                      </ListGroup.Item>
                    </ListGroup>
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
                        <Form>
                          <Form.Group>
                            <Form.Label>Topik Belajar</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Masukkan topik yang dipelajari"
                              className="mb-3"
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

            <Row>
              <Col>
                <Card>
                  <h2>Jumlah Projek</h2>
                </Card>
              </Col>
              <Col>
                <Card>
                  <h2>Jumlah Topik yang sudah dipelajari</h2>
                </Card>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Tracker;

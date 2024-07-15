import React, { useEffect } from "react";

import { Helmet } from "react-helmet";

import "../styles/home.css";
import Header from "../components/navbar";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "../assets/img/stikma.png";
import Card from "react-bootstrap/Card";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import feature1 from "../assets/img/features1.svg";
import feature2 from "../assets/img/feature2.svg";

const Home = (props) => {
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

  return (
    <div className="home-container">
      <Helmet>
        <title>SPMB | Home</title>
        <meta property="og:title" content="Landing Page" />
      </Helmet>

      <Header />

      {/* Jumbotron */}
      <Container className="jumbotron">
        <Row>
          <Col xs={0} md={4}>
            <img src={Logo} className="logo__stikma mb-3" alt="logo stikma" />
          </Col>
          <Col xs={12} md={8}>
            <h1>Sistem Pengenalan Minat Bakat</h1>
            <h2>Calon Mahasiswa dan Mahasiswa</h2>
            <h2>STT STIKMA Internasional</h2>
            <br />
            <br />

            <a className="button__login" href="/login">
              Masuk
            </a>
            <a className="button__register" href="/register">
              Buat Akun
            </a>
          </Col>
        </Row>
      </Container>

      {/* Content */}
      <Container className="content justify-content-center">
        <h1 style={{ color: "#004aad" }}>Features</h1>
        <Row>
          <Col md={4}>
            <img src={feature1} alt="feature1" className="feature1" />
          </Col>
          <Col md={8}>
            <Card
              style={{
                backgroundColor: "#004aad",
                color: "#fff",
              }}
              className="card__features"
            >
              <Card.Body>
                <Card.Title>Tes Minat Bakat</Card.Title>
                <Card.Text>
                  Untuk Calon Mahasiswa dan Mahasiswa STT STIKMA Internasional,
                  yang ingin mengetahui minat bakat dan memantapkan pilihan
                  jurusan dan peminatan, dimana di STT STIKMA Internasional
                  sendiri terdapat dua Jurusan, yaitu
                  <ol>
                    <li>Teknik Informatika</li> dengan peminatan,
                    <ol>
                      <li>TI Murni</li>
                      <li>Teknik Animasi dan Grafis Komputer</li>
                      <li>Komputer Akuntansi</li>
                    </ol>
                    <li>Arsitek</li>
                  </ol>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <img src={feature2} alt="feature2" className="feature2" />
          </Col>
          <Col md={8}>
            <Card
              style={{
                backgroundColor: "#004aad",
                color: "#fff",
              }}
              className="card__features"
            >
              <Card.Body>
                <Card.Title>Tracking Proggres Keahlian</Card.Title>
                <Card.Text>
                  Fitur lanjutan untuk merekam progres keahlian mahasiswa
                  sebagai portofolio, sesuai minat bakat mereka sebagai bekal
                  persiapan terjun ke industri karir.
                  <ol>
                    <li>Profile</li>
                    <li>Project List</li>
                    <li>Hasil Belajar</li>
                    <li>Tracker</li>
                  </ol>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;

import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import spmbLogo from "../assets/img/spmb.png";
import "../styles/home.css";

const footer = () => {
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col>
            <a href="/">
              {" "}
              <img
                src={spmbLogo}
                className="logo__footer"
                alt="spmb logo"
              />{" "}
            </a>
            <p
              style={{
                color: "#004aad",
                fontSize: "20px",
                marginTop: "5px",
                fontWeight: "bold",
              }}
            >
              Sistem Pengenalan Minat Bakat
            </p>
            <p
              style={{
                color: "#54C5FF",
                fontSize: "20px",
                marginTop: "5px",
                fontWeight: "bold",
              }}
            >
              Calon Mahasiswa dan Mahasiswa
            </p>
            <p
              style={{
                color: "#54C5FF",
                fontSize: "20px",
                marginTop: "5px",
                fontWeight: "bold",
              }}
            >
              STT STIKMA Internasional
            </p>
            <p
              style={{
                color: "#004aad",
                fontSize: "15px",
                marginTop: "5px",
                fontWeight: "bold",
              }}
            >
              &copy; Zaidan 2023
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default footer;

import { useState, useEffect } from "react";
import "../styles/dashboard.css";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Header from "../components/navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Dashboard = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5050/token");
      setToken(response.data.payload.datas.accessToken);
      const decoded = jwt_decode(token);
      setExpire(decoded.exp);
    } catch (error) {
      console.log(error);
    }
  };

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5050/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="dashboard">
        <Container>
          <Card body className="dashboard__card">
            <Row>
              <Col>
                <h1>Dashboard</h1>
              </Col>
              <Col className="logout">
                <Button
                  variant="danger"
                  className="button__logout"
                  onClick={Logout}
                >
                  Logout
                </Button>
              </Col>
            </Row>
            <Container>
              <Row className=" dashboard__content">
                <Col xs={12} md={6} className="mb-3">
                  <h2>Tes Minat</h2>
                  <p style={{ textAlign: "left" }}>
                    Terdapat 28 Pasang Kata. Pilihlah Satu Kata Dari Pasangan
                    Kata Itu Yang Sesuai Dengan Diri Anda, Atau Yang Paling Anda
                    Sukai.{" "}
                  </p>

                  <p style={{ textAlign: "left" }}>
                    Kadang Anda Merasa Menyukai Kedua Kata Itu, Namun Demikian
                    Anda Harus Tetap Memilih Satu Kata Yang Paling Anda Sukai.
                  </p>
                  <Button variant="primary" style={{ marginRight: "10px" }}>
                    Mulai Tes
                  </Button>
                  <Button variant="success"> Lihat Hasil</Button>
                </Col>
                <Col xs={12} md={6}>
                  <h2>Tes Bakat</h2>
                  <p style={{ textAlign: "left" }}>
                    Alat tes bakat ini merupakan rangkaian dari beberapa subtes
                    yang akan disajikan dalam beberapa bentuk persoalan. Dalam
                    beberapa subtes mewakili variabel yang hendak diukur, di
                    bawah ini merupakan subtes yang disajikan
                  </p>
                  <ol style={{ textAlign: "left" }}>
                    <li>Tes Penalaran Visual</li>
                    <li>Tes Penalaran Numerik</li>
                    <li>Tes Analisa Verbal</li>
                    <li>Tes Penalaran Urutan</li>
                    <li>Tes Penalaran Spasial</li>
                    <li>Tes Tiga Dimensi</li>
                    <li>Tes Sistematisasi</li>
                    <li>Tes Kosa Kata</li>
                    <li>Tes Figural</li>
                  </ol>

                  <Button variant="primary" style={{ marginRight: "10px" }}>
                    Mulai Tes
                  </Button>
                  <Button variant="success"> Lihat Hasil</Button>
                </Col>
              </Row>
            </Container>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;

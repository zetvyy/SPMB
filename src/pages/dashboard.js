import { useEffect } from "react";
import { Helmet } from "react-helmet";
import "../styles/dashboard.css";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Header from "../components/navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
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

  const Logout = async () => {
    try {
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>SPMB | Dashboard</title>
        <meta property="og:title" content="Landing Page" />
      </Helmet>
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
                  <Link to={"/tes-minat"}>
                    <Button
                      variant="primary"
                      style={{ marginRight: "10px" }}
                      className="btn__tesminat"
                    >
                      Mulai Tes
                    </Button>
                  </Link>
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

                  <Link to={"/tes-bakat"}>
                    <Button
                      variant="primary"
                      style={{ marginRight: "10px" }}
                      className="btn__tesbakat"
                    >
                      Mulai Tes
                    </Button>
                  </Link>
                  <Button variant="success"> Lihat Hasil</Button>
                </Col>
              </Row>
              <Row>
                <h2>Tracking Progress Keahlian</h2>
                <p>
                  Fitur lanjutan untuk merekam progres keahlian mahasiswa
                  sebagai portofolio, sesuai minat bakat mereka sebagai bekal
                  persiapan terjun ke industri karir.
                </p>
                <Link to={"/tracker-progress"}>
                  <Button
                    variant="primary"
                    style={{ marginRight: "10px" }}
                    className="btn__tesbakat"
                  >
                    Coba Fitur Tracking Progress
                  </Button>
                </Link>
              </Row>
            </Container>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;

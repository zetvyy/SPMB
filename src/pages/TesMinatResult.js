import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import "../styles/testresult.css";
import axios from "axios";

const TesMinatResult = () => {
  const [token, setToken] = useState("");
  const [testMinatResult, setTestMinatResult] = useState([]);
  const [sortedInterests, setSortedInterests] = useState([]);

  useEffect(() => {
    const refreshToken = localStorage.getItem("token");
    if (refreshToken) {
      setToken(refreshToken);
    }

    const fetchTesMinatResult = async () => {
      try {
        const response = await axios.get(
          "https://server-spmb.vercel.app/response/tes-minat-response",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.payload.statusCode === 200) {
          setTestMinatResult(response.data.payload.datas);
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchTesMinatResult();
  }, [token]);

  useEffect(() => {
    if (testMinatResult) {
      const interestCounts = {};
      testMinatResult.answers.forEach((answer) => {
        interestCounts[answer] = (interestCounts[answer] || 0) + 1;
      });
      const sorted = Object.entries(interestCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([interest]) => interest);
      setSortedInterests(sorted);
    }
  }, [testMinatResult]);

  if (!testMinatResult) {
    return <div>Memuat hasil tes minat...</div>;
  }

  return (
    <>
      <Helmet>
        <title>SPMB | Hasil Tes Minat</title>
        <meta property="og:title" content="Landing Page" />
      </Helmet>
      <div className="tes_minat_result">
        <Container>
          <Card className={"tesminat_result_card"}>
            <Container>
              <Row>
                <Col>
                  <h1>Hasil Tes Minat</h1>
                </Col>
                <Col className={"backto__dashboard"}>
                  <Button
                    variant="success"
                    href="/dashboard"
                    className="btn_backto__dashboard"
                  >
                    Dashboard
                  </Button>
                </Col>
              </Row>
              <Row>
                <h2>Hai {testMinatResult.nama}, Bidang Minat mu adalah :</h2>
                <ul>
                  {sortedInterests.map((interest, index) => (
                    <li key={index}>{interest}</li>
                  ))}
                </ul>
              </Row>
            </Container>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default TesMinatResult;

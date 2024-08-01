import React from "react";
import { Helmet } from "react-helmet";

import Container from "react-bootstrap/esm/Container";
import Header from "../components/navbar";

const TesMinat = () => {
  return (
    <>
      <Helmet>
        <title>SPMB | Tes Minat</title>
        <meta property="og:title" content="Landing Page" />
      </Helmet>
      <Header />
      <Container
        classname="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", paddingBottom: "257.5px" }}
      >
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdPlwLjkO5edQlRm5GA1d2pY4wLtz6AasLvxvGK_ByZm43aKA/viewform?embedded=true"
          width="100%"
          height="800"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          title="soal-tes-minat"
        >
          Loading…
        </iframe>{" "}
      </Container>
    </>
  );
};

export default TesMinat;

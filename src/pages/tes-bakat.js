import React from "react";
import Container from "react-bootstrap/esm/Container";
import Header from "../components/navbar";

const TesBakat = () => {
  return (
    <>
      <Header />
      <Container>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfkJ2NTLVgh-TQMFlvapvn0W3KvYMjkNdkq2CMlOW51UsF5RQ/viewform?embedded=true"
          width="100%"
          height="800"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        >
          Loading…
        </iframe>
      </Container>
    </>
  );
};

export default TesBakat;

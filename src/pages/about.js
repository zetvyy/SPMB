import React from "react";
import { Container } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Header from "../components/navbar";
import Footer from "../components/footer";
import "../styles/home.css";
import stikmakampus from "../assets/img/stikmakampus.jpg";

const About = () => {
  return (
    <div>
      <Header />
      <Container>
        <h1 className="mt-3 text-center" style={{ color: "#004aad" }}>
          About Page
        </h1>

        <Tabs
          defaultActiveKey="about-project"
          id="uncontrolled-tab-example"
          className="mt-3 mb-3 tab__nav"
          fill
        >
          <Tab eventKey="about-project" title="About Project">
            <h1 style={{ color: "#004aad" }}>Sistem Pengenalan Minat Bakat</h1>
            <h2 style={{ color: "#54c5ff" }}>Calon Mahasiswa dan Mahasiswa</h2>
            <h2 style={{ color: "#54c5ff" }}>
              STT STIKMA Internasional Malang
            </h2>

            <p style={{ color: "#004aad" }}>
              {" "}
              Website ini didedikasikan guna Kampus dan untuk memenuhi tugas
              Skripsi.
            </p>
            <p>Adapun fitur yang ada dalam website ini adalah : </p>

            <ol>
              <li style={{ color: "#004aad" }}>Tes Minat Bakat</li>
              Untuk Calon Mahasiswa dan Mahasiswa STT STIKMA Internasional, yang
              ingin mengetahui minat bakat dan memantapkan pilihan jurusan dan
              peminatan, dimana di STT STIKMA Internasional sendiri terdapat dua
              Jurusan, yaitu
              <ol>
                <li>Teknik Informatika</li> dengan peminatan,
                <ol>
                  <li>TI Murni</li>
                  <li>Teknik Animasi dan Grafis Komputer</li>
                  <li>Komputer Akuntansi</li>
                </ol>
                <li>Arsitek</li>
              </ol>
              <li style={{ color: "#004aad" }}>Tracking Progress Keahlian</li>
              Fitur lanjutan untuk merekam progres keahlian mahasiswa sebagai
              portofolio, sesuai minat bakat mereka sebagai bekal persiapan
              terjun ke industri karir.
              <ol>
                <li>Profile</li>
                <li>Project List</li>
                <li>Hasil Belajar</li>
                <li>Tracker</li>
              </ol>
            </ol>
          </Tab>
          <Tab eventKey="about-stikma" title="About STIKMA">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={stikmakampus}
                alt="stikmakampus"
                className="m-3"
                style={{ width: "500px", height: "300px" }}
              />
            </div>
            <p>
              Sekolah Tinggi Teknologi STIKMA Internasional, awalnya (tahun
              1995) merupakan lembaga pendidikan luar sekolah, bernama PIKMA
              (Pendidikan Ilmu Komputer Malang), yang menyelenggarakan
              pendidikan singkat tentang informatika, animasi, dan komunikasi.
            </p>

            <p>
              Di bawah Yayasan Media Abyan Lintas Buana, PIKMA dipersiapkan
              untuk diajukan menjadi pendidikan tinggi. Setelah melengkapi semua
              persyaratan yang ditentukan dan perubahan nama menjadi Sekolah
              Tinggi Teknologi STIKMA Internasional, status terdaftar diperoleh
              dengan SK Mendikbud RI nomor 03/D/O/1999 tanggal 8 Januari 1999,
              untuk dua program studi jenjang sarjana (S1), yaitu Program Studi
              Teknik Informatika dan Program Studi Teknik Arsitektur.
            </p>

            <p>
              STIKMA telah mengalami beberapa kali perpindahan lokasi. Ketika
              pertama kali berdiri, menempati sebuah gedung di Jalan Panjaitan,
              lalu berpindah ke kampus Karanglo, kemudian jalan panji suroso,
              lalu jalan simpang sulfat utara dan sekarang STIKMA telah
              menempati kampus di Jl. Tumenggung Suryo No.37, Bunulrejo, Kec.
              Blimbing, Kota Malang, Jawa Timur 65123.
            </p>
            <p>
              Untuk lebih lengkapnya silahkan kunjungi website STIKMA{" "}
              <a
                href="https://www.stikma.ac.id/"
                rel="noreferrer"
                target="_blank"
              >
                disini
              </a>{" "}
            </p>
          </Tab>
          <Tab eventKey="about-me" title="About Me">
            Tab content for Contact
          </Tab>
        </Tabs>
      </Container>
      <Footer />
    </div>
  );
};

export default About;

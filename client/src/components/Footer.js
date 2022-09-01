import React from "react";

const Footer = () => {
  return (
    <footer
      className="page-footer font-small blue pt-4"
      style={{
        marginTop: "2em",
        boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-12 mt-md-0">
            <img src="https://res.cloudinary.com/takan0/image/upload/v1661101721/AnG/ang_iconFichier_1_l9xzjs.png" />
          </div>
        </div>
      </div>
      <div className="row  text-center py-2">
        <div className="col-md-12 mt-md-0">
          <i
            className="bi bi-facebook"
            style={{ margin: "10px", fontSize: "1.5em" }}
          ></i>
          <i
            className="bi bi-instagram"
            style={{ margin: "10px", fontSize: "1.5em" }}
          ></i>
        </div>
      </div>

      <div className="row text-center py-2">
        <div className="col-md-12 mt-md-0">
          © AnG, 2022. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

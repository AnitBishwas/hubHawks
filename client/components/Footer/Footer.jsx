import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="snpr-footer">
      <div className="snpr-footer-container">
        {/* Brand / About */}
        <div className="snpr-footer-col snpr-footer-brand">
          <div className="snpr-footer-logo">
            <div className="snpr-footer-icon">
              <img
                src="/logo-ss.png"
                className="snpr-footer-logo-img"
                width="55"
                height="55"
                alt="logo"
              />
            </div>
          </div>
          <p>
            Precision targeting for book services.
            <br />
            Connecting authors with expert service providers.
          </p>
        </div>

        {/* Quick Links */}
        <div className="snpr-footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="#service-section" id="service-footer">
                Services
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="snpr-footer-col">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="/contact-us">Contact</a>
            </li>
            <li>
              <a href="/terms">Terms and Conditions</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/refund">Refund Policy</a>
            </li>
          </ul>
        </div>

        {/* Address */}
        <div className="snpr-footer-col">
          <h4>Address</h4>
          <p>
            Unit-125, First floor, Vipul Trade Centre, Sector-48, Sohna Road,
            South City-2, Gurugram, Haryana, 122018
          </p>
        </div>

        {/* Contact / Social */}
        <div className="snpr-footer-col">
          <h4>Contact us</h4>
          <div className="snpr-footer-icons">
            <span className="snpr-footer-contact-icon" title="Email">
              {/* envelope */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
              </svg>
            </span>
            <span className="snpr-footer-contact-icon" title="Phone">
              {/* phone */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z" />
              </svg>
            </span>
            <span className="snpr-footer-contact-icon" title="Location">
              {/* geo */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            </span>

            <a
              href="https://www.instagram.com/hubhawks_in/"
              target="_blank"
              rel="noopener noreferrer"
              className="snpr-footer-contact-icon"
              aria-label="Instagram"
            >
              {/* instagram */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045z" />
                <circle cx="12.99" cy="2.77" r="0.96" />
                <path d="M8 4.99a3.01 3.01 0 1 0 0 6.02 3.01 3.01 0 0 0 0-6.02z" />
              </svg>
            </a>

            <a
              href="https://www.facebook.com/hubhawks/"
              target="_blank"
              rel="noopener noreferrer"
              className="snpr-footer-contact-icon"
              aria-label="Facebook"
            >
              {/* facebook */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625H4.718V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/company/hubhawks?originalSubdomain=in"
              target="_blank"
              rel="noopener noreferrer"
              className="snpr-footer-contact-icon"
              aria-label="LinkedIn"
            >
              {/* linkedin */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zM4.943 13.394V6.169H2.542v7.225zm-.482-9.836c-.822 0-1.327.539-1.342 1.248 0 .694.521 1.248 1.327 1.248.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.343-1.248zM10.65 13.394V9.359c0-.973-.347-1.635-1.216-1.635-.664 0-1.06.447-1.232.878-.064.154-.08.37-.08.586v4.206H5.922V6.169h2.4v.046c.32-.493.891-1.193 2.165-1.193 1.58 0 2.764 1.032 2.764 3.252v5.12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="snpr-footer-bottom">
        <p>
          © 2024 Hubhawks Live. All rights reserved. Precision targeting for
          your book services.
        </p>
        <p>
          Designed By{" "}
          <a
            href="https://unnity.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unnity
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

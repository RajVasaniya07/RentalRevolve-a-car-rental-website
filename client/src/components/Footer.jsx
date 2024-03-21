// Footer.js

import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
            <div className="container">
              <div className="footer-top">
                <div className="footer-brand">
                  <a href="#" className="logo">
                    {/* <img src={logo} alt="Ridex logo" /> */}
                  </a>
                  <p className="footer-text">
                    Search for cheap rental cars in Gujarat. With a diverse fleet of 1200 type of vehicles, RentalRevolve offers its
                    consumers an
                    attractive and fun selection.
                  </p>
                </div>
                <ul className="footer-list">
                  <li>
                    <p className="footer-list-title">Company</p>
                  </li>
                  <li>
                    <a href="#" className="footer-link">About us</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Pricing plans</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Our blog</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Contacts</a>
                  </li>
                </ul>
                <ul className="footer-list">
                  <li>
                    <p className="footer-list-title">Support</p>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Help center</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Ask a question</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Privacy policy</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Terms &amp; conditions</a>
                  </li>
                </ul>
                <ul className="footer-list">
                  <li>
                    <p className="footer-list-title">Neighborhoods of Rajkot</p>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Ahmedabad</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Surat</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Vadodara</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Bhavnagar</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Jamnagar</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Gandhinagar</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Anand</a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">Junagadh</a>
                  </li>
                </ul>
              </div>
              <div className="footer-bottom">
                <ul className="social-list">
                  <li>
                    <a href="#" className="social-link">
                      <ion-icon name="logo-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="social-link">
                      <ion-icon name="logo-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="social-link">
                      <ion-icon name="logo-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="social-link">
                      <ion-icon name="logo-linkedin" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="social-link">
                      <ion-icon name="logo-skype" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="social-link">
                      <ion-icon name="mail-outline" />
                    </a>
                  </li>
                </ul>
                <p className="copyright">
                  © 2024 <a href="#">RentalRevolve</a>. All Rights Reserved
                </p>
              </div>
            </div>
          </footer>  );
};

export default Footer;
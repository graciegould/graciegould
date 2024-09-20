import { useRef } from "react";
import XpScrollbar from "../../../utils/components/scrollbars/XpScrollbar";

function About() {
  const scrollbarRef = useRef(null);
  return (
    <div className="xp-box  about-container">
      <ProfilePicture />
      <div className="xp-box about-info-top-right">
        <Title />
      </div>
      <div className="xp-box about-info-bottom-right">
        <ContactInfo />
      </div>
        <XpScrollbar ref={scrollbarRef} className={"xp-box about-info-bottom-left"}>
            <Description />
        </XpScrollbar>
    </div>
  );
}

function Description() {
  const scrollbarRef = useRef(null);
  return (
    <div className="xp-box about-description">
      <h3>
        <h1>Greetings,</h1>
        <h2>ABOUT ME</h2>
        <ul>
        <li>
          Multifaceted gal, who loves to craft code.            
          </li>
          <li>
          Although I love the fun creative stuff -- I devote equal care to backend. 
          </li>
        </ul>
      </h3>
      <h2>A bit of background:</h2>
      <h3>
        <ul>
          <li>
            2 years of work experience as a full stack software engineer
            focusing on B2B automotive & healthcare data solutions, document
            management, and e-signing.
          </li>
          <li>
            Bachelor of Science at the University of Oregon in Art and
            Technology & a minor in Computer information Technology.
          </li>
          <li>
            Laboratory technician maintaining the fusion lab at University of Oregon 
          </li>
        </ul>
      </h3>
    </div>
  );
}
function Title() {
  return (
    <div className="xp-box about-title">
      <div className="about-title-container">
        <div className="about-title-name">
          <h1>GRACIE E. GOULD </h1>
        </div>
        <div className="about-role">
          <h2>
            <strong>FULL STACK SOFTWARE ENGINEER</strong>
          </h2>
        </div>
        <div className="about-title-age">
          <h2>24 YO</h2>
        </div>
        <div className="about-title-location-container">
          <h2>
            <strong>PORTLAND, OR</strong>
          </h2>
        </div>
      </div>
    </div>
  );
}
function ProfilePicture() {
  return (
    <div className="xp-box about-profile-pic">
      <div className="xp-box about-profile-pic-container">
        <img
          className="about-profile-pic-image"
          src="/images/landing/profile-image.jpg"
        />
      </div>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="xp-box about-contact-info-container">
      <div className="about-contact-info">
        <div className="about-contact-info-item">
          <h3>
            <strong>PHONE: </strong>{" "}
            <a href="tel:+14053236056">
              <strong>(405)-323-6056</strong>
            </a>
          </h3>
        </div>
        <div className="about-contact-info-item">
          <h3>
            <strong>EMAIL: </strong>{" "}
            <a href="mailto:graciegould5@gmail.com">
              <strong>graciegould5@gmail.com</strong>
            </a>
          </h3>
        </div>
        <div className="about-contact-info-item">
          <h3>
            <strong>LINKEDIN: </strong>
            <a href="https://www.linkedin.com/in/gracie-gould-7b6b3b1b4/">
              <strong>Gracie Gould</strong>
            </a>
          </h3>
        </div>
        <div className="about-contact-info-item">
          <h3>
            <strong>GITHUB: </strong>
            <a href="https://www.linkedin.com/in/gracie-gould-7b6b3b1b4/">
              <strong>graciegould</strong>
            </a>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default About;

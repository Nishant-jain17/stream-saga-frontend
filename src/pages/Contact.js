import React, { useEffect, useRef, useState } from "react";
import "./Contact.css";

function Contact() {
  const useOnScreen = (ref) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const currentElement = ref.current; // cache the element here
      if (!currentElement) return;

      const observer = new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { threshold: 0.3 }
      );

      observer.observe(currentElement);

      return () => {
        if (currentElement) observer.unobserve(currentElement);
      };
    }, [ref]);

    return isVisible;
  };

  const headerRef = useRef();
  const paraRef = useRef();
  const listRef = useRef();
  const imageRef = useRef();

  const headerVisible = useOnScreen(headerRef);
  const paraVisible = useOnScreen(paraRef);
  const listVisible = useOnScreen(listRef);
  const imageVisible = useOnScreen(imageRef);

  return (
    <div className="contact-page">
      <h1
        ref={headerRef}
        className={`contact-title ${headerVisible ? "fade-in" : "fade-out"}`}
      >
        Contact Me
      </h1>

      <div className="contact-content">
        <div className="contact-info">
          <p
            ref={paraRef}
            className={`contact-intro ${paraVisible ? "fade-in" : "fade-out"}`}
          >
            If you'd like to connect, collaborate, or just say hi 👋 — here’s
            how you can reach me:
          </p>

          <ul
            ref={listRef}
            className={`contact-list ${listVisible ? "fade-in" : "fade-out"}`}
          >
            <li>
              <span className="icon">📧</span>
              Email:{" "}
              <a href="mailto:jnishant.work@gmail.com">
                jnishant.work@gmail.com
              </a>
            </li>
            <li>
              <span className="icon">💻</span>
              GitHub:{" "}
              <a
                href="https://github.com/Nishant-jain17"
                target="_blank"
                rel="noreferrer"
              >
                Nishant-jain17
              </a>
            </li>
            <li>
              <span className="icon">🔗</span>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/nishant-jain17/"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/nishant-jain17
              </a>
            </li>
            <li>
              <span className="icon">📸</span>
              Instagram:{" "}
              <a
                href="https://instagram.com/_.nishantjain._/"
                target="_blank"
                rel="noreferrer"
              >
                @_.nishantjain._/
              </a>
            </li>
          </ul>
        </div>

        <div
          ref={imageRef}
          className={`contact-image-container ${
            imageVisible ? "fade-in" : "fade-out"
          }`}
          aria-hidden="true"
        >
          <img
            src="/contact.gif"
            alt="Contact animation"
            className="contact-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;

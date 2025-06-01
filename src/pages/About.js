// src/pages/About.js
import React, { useEffect, useRef, useState } from "react";
import "./About.css";

function About() {
  // Custom hook to add fade-in class on scroll into view
  const useOnScreen = (ref) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const currentElement = ref.current; // copy ref.current locally
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
  const paraRef1 = useRef();
  const paraRef2 = useRef();
  const listRef = useRef();
  const gifRef = useRef();

  const headerVisible = useOnScreen(headerRef);
  const para1Visible = useOnScreen(paraRef1);
  const para2Visible = useOnScreen(paraRef2);
  const listVisible = useOnScreen(listRef);
  const gifVisible = useOnScreen(gifRef);

  return (
    <div className="about-page">
      <h1
        ref={headerRef}
        className={`about-title ${headerVisible ? "fade-in" : "fade-out"}`}
      >
        About StreamSaga
      </h1>

      <div className="about-content">
        <div className="about-text">
          <p
            ref={paraRef1}
            className={`fade-text ${para1Visible ? "fade-in" : "fade-out"}`}
          >
            <strong>StreamSaga</strong> is your personalized recommendation
            platform for Anime and Manga lovers. Powered by data from the Jikan
            API, it brings you the most trending titles, smart suggestions, and
            a way to save favorites.
          </p>
          <p
            ref={paraRef2}
            className={`fade-text ${para2Visible ? "fade-in" : "fade-out"}`}
          >
            Whether you're looking for what to watch next or revisiting
            classics, StreamSaga provides a seamless and modern experience
            tailored to your tastes.
          </p>
          <ul
            ref={listRef}
            className={`features-list ${listVisible ? "fade-in" : "fade-out"}`}
          >
            <li>🔥 Discover top trending anime and manga</li>
            <li>⭐ Save your favorites to revisit them anytime</li>
            <li>📈 Receive smart suggestions based on your preferences</li>
          </ul>
        </div>

        <div
          ref={gifRef}
          className={`about-gif-container ${
            gifVisible ? "fade-in" : "fade-out"
          }`}
        >
          <img src="/anime.gif" alt="Anime demo" className="about-gif" />
        </div>
      </div>
    </div>
  );
}

export default About;

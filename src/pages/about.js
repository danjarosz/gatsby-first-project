import React from 'react';
import { Link } from 'gatsby';
import Footer from '../components/footer';

const AboutPage = () => {
  return (
    <div>
      <h1>About me</h1>
      <p>I currently work as a React Developer.</p>
      <p>
        <Link to="/contact">Want to work with me? Reach out.</Link>
      </p>
      <Footer />
    </div>
  )
};

export default AboutPage;
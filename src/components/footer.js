import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import footerStyles from "./footer.module.scss";

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

  const { author } = data.site.siteMetadata;

  return (
    <footer className={footerStyles.footer}>
      <p>Created by {author}. This page was created for learning Gatsby purposes.</p>
    </footer>
  )
};

export default Footer;
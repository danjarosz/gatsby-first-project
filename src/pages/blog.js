import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from "../components/layout";

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
            }
          }
        }
      }
    }
  `);

  const posts = data.allMarkdownRemark.edges;
  const postItems = posts.map(post => {
    const { node: { 
      frontmatter: { 
        title, date 
      } 
    } } = post;
    return (
      <li key={title}>
        <h2>{title}</h2>
        <p>{date}</p>
      </li>
    )
  })

  return (
    <Layout>
      <h1>Blog</h1>
      <ol>
        {postItems}
      </ol>
    </Layout>
  )
};

export default BlogPage;
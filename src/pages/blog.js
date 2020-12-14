import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Layout from "../components/layout";
import blogStyles from "./blog.module.scss";

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
            fields {
              slug
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
      },
      fields: {
        slug
      } 
    } } = post;
    return (
      <li key={title} className={blogStyles.post}>
        <Link to={`/blog/${slug}`}>
          <h2>{title}</h2>
          <p>{date}</p>
        </Link>
      </li>
    )
  })

  return (
    <Layout>
      <h1>Blog</h1>
      <ol className={blogStyles.posts}>
        {postItems}
      </ol>
    </Layout>
  )
};

export default BlogPage;
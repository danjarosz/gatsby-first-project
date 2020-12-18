import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Layout from "../components/layout";
import Head from "../components/head";
import blogStyles from "./blog.module.scss";

const BlogPage = () => {

  //-------------------------------------------------
  // // Searchnig the posts given as markdown
  // const data = useStaticQuery(graphql`
  //   query {
  //     allMarkdownRemark {
  //       edges {
  //         node {
  //           frontmatter {
  //             title
  //             date
  //           }
  //           fields {
  //             slug
  //           }
  //         }
  //       }
  //     }
  //   }
  // `);

  // const posts = data.allMarkdownRemark.edges;
  // const postItems = posts.map(post => {
  //   const { node: { 
  //     frontmatter: { 
  //       title, date 
  //     },
  //     fields: {
  //       slug
  //     } 
  //   } } = post;
  //   return (
  //     <li key={title} className={blogStyles.post}>
  //       <Link to={`/blog/${slug}`}>
  //         <h2>{title}</h2>
  //         <p>{date}</p>
  //       </Link>
  //     </li>
  //   )
  // });
  //-------------------------------------------------

  // Searchnig the posts given from CMS (Contentify)
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost (
        sort: {
          fields:publishedDate
          order:DESC
        }
      ) {
        edges {
          node {
            title
            slug,
            publishedDate(formatString: "MMMM Do, YYYY")
          }
        }
      }
    }
  `);

  const posts = data.allContentfulBlogPost.edges;
  const postItems = posts.map(post => {
    const { node: { 
      title,
      publishedDate, 
      slug
    } } = post;

    return (
      <li key={title} className={blogStyles.post}>
        <Link to={`/blog/${slug}`}>
          <h2>{title}</h2>
          <p>{publishedDate}</p>
        </Link>
      </li>
    )
  });

  return (
    <Layout>
      <Head title="Blog"/>
      <h1>Blog</h1>
      <ol className={blogStyles.posts}>
        {postItems}
      </ol>
    </Layout>
  )
};

export default BlogPage;
import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout";


// // Searching the posts given from CMS (Contentify)
export const query = graphql`
  query($slug: String) {
    contentfulBlogPost(slug: {eq: $slug}) {
      title,
      publishedDate(formatString: "MMMM Do, YYYY")
    }
  }
`

// Searchnig the posts given as markdown
// slug variable comes from pageContext
// export const query = graphql`
//   query (
//     $slug: String
//   ) {
//     markdownRemark (
//       fields: {
//         slug: {
//           eq: $slug
//         }
//       }
//     ) {
//       frontmatter {
//         title
//         date
//       }
//       html
//     }
//   }
// `

 const Blog = (props) => {
  // data comes from the query from above and it is given with props 
  const { data } = props;

  const {title, publishedDate} = data.contentfulBlogPost;


  return (
    <Layout>
      <h1>{title}</h1>
      <p>{publishedDate}</p>
    </Layout>
  )

  // // Solution for markdown
  // const { markdownRemark: { 
  //   frontmatter: { title, date },
  //   html
  // } } = data

  // return (
  //   <Layout>
  //     <h1>{title}</h1>
  //     <p>{date}</p>
  //     <div dangerouslySetInnerHTML={{ __html: html }}></div>
  //   </Layout>
  // )
 }

 export default Blog;
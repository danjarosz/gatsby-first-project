import React from 'react';
import { graphql } from 'gatsby';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Layout from "../components/layout";


// // Searching the posts given from CMS (Contentify)
export const query = graphql`
  query($slug: String) {
    contentfulBlogPost(slug: {eq: $slug}) {
      title
      publishedDate(formatString: "MMMM Do, YYYY")
      body {
        raw,
        references {
          file {
           url
          }
          title
          contentful_id
        }
      }
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

  const {title, publishedDate, body: { raw, references }} = data.contentfulBlogPost;

  const rawPostData = JSON.parse(raw);

  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        const nodeId = node.data.target.sys.id;
        const assetData = references.filter(reference => reference.contentful_id === nodeId)[0];
        const alt = assetData.title
        const url = assetData.file.url
        return <img alt={alt} src={url}/>
      }
    }
  };

  const content = documentToReactComponents(rawPostData, options);

  return (
    <Layout>
      <h1>{title}</h1>
      <p>{publishedDate}</p>
      {content}
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
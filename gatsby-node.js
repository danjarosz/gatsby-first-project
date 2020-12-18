const path = require('path');

//-------------------------------------
// // It is used to create dynamic path from markdown (.md)
// // creating new fields to setup dynamic routes for blog posts
// module.exports.onCreateNode = ({ node, actions }) => {
//   const { createNodeField } = actions;

//   if(node.internal.type === 'MarkdownRemark') {
//     const slug = path.basename(node.fileAbsolutePath, '.md')
//     createNodeField({
//       node,
//       name: 'slug',
//       value: slug
//     })
//   }
// }
//-------------------------------------

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  //1. Get path to template
  const blogTemplate = path.resolve('./src/templates/blog.js');
  //2. Get markdown data
  //-------------------------------------
  // //2a creating pages of markdown (.md)
  // const res = await graphql(`
  //   query {
  //     allMarkdownRemark {
  //       edges {
  //         node {
  //           fields {
  //             slug
  //           }
  //         }
  //       }
  //     }
  //   }
  // `);
  //-------------------------------------
  // //2b creating pages from CMS (Contentful)
  const res = await graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  //3. Get new pages
  //-------------------------------------
  // 3a Form markdown
  // res.data.allMarkdownRemark.edges.forEach((edge) => {
  //   createPage({
  //     component: blogTemplate,
  //     path: `/blog/${edge.node.fields.slug}`,
  //     context: {
  //       slug: edge.node.fields.slug
  //     }
  //   })
  // })
  //-------------------------------------
  //3b from CMS (Contentful)
  res.data.allContentfulBlogPost.edges.forEach((edge) => {
    console.log(edge)
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.slug}`,
      context: {
        slug: edge.node.slug
      }
    })
  })
}
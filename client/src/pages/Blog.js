import React from 'react';

function Blog() {
  return (
    <div className="Blogdiv">
      <section id="blog-section">
        <h3>Blog</h3>
        <article id="blog" className="imageArticle">
          <img className="textwrap-img" src="./MHC.jpg" alt="Profile photo" />
          <div>
            This section will be for the blog.
          </div>
        </article>
      </section>
    </div>
  );
}

export default Blog;
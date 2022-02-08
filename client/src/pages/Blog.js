import React from 'react';

function Blog() {
  return (
    <div className="Blogdiv">
      <h3>Blog</h3>
      <article id="blog" className="imageArticle">
        <h4>Current blog posting</h4>
        <img className="textwrap-img" src="./MHC.jpg" alt="Profile photo" />
        <p>
          This section will be for the current blog posting.
        </p>
      </article>
    </div>
  );
}

export default Blog;
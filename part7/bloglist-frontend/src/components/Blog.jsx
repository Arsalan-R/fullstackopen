import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog, likeBlog }) => {

  return (
    <div className="blog">
      <div className="title">
        <Link to={`/blogs/${blog.id}`} > {blog.title} {blog.author}{" "} </Link>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;

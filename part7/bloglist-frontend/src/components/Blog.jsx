import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Blog = ({ blog, likeBlog }) => {

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
            <TableRow>
              <TableCell>
                <Link style={{ textDecoration: 'none' }} to={`/blogs/${blog.id}`}> {blog.title} </Link>
              </TableCell>
              <TableCell align="right">
              By {blog.author}
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
</TableContainer>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;


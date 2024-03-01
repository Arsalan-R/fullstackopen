import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const User = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell></TableCell>
            <TableCell className="rightTD" align="right">
              <strong>Blogs created</strong>
            </TableCell>
          </TableRow>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link style={{ textDecoration: 'none' }} to={`${user.id}`}> {user.username} </Link>
              </TableCell>
              <TableCell className="rightTD" align="right">{user.blogs?.length || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </>
  );
};

export default User;

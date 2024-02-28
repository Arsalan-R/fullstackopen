import { Link } from "react-router-dom";

const User = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td className="rightTD">
              <strong>Blogs created</strong>
            </td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`${user.id}`}> {user.username} </Link>
              </td>
              <td className="rightTD">{user.blogs?.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default User;

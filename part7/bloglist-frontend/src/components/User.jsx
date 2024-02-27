import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
const User = ({ blogs }) => {

    const result = useQuery({
        queryKey: ['notes'],
        queryFn: () => axios.get('http://localhost:3003/api/users').then(res => res.data)
      })

      if ( result.isLoading ) {
        return <div>loading data...</div>
      }

      const users = result.data

    return(
      <>
        <h2>Users</h2>
        <table>
            <tbody>
                <tr>
                    <td></td>
                    <td className='rightTD' ><strong>Blogs created</strong></td>
                </tr>
                {users.map(user => (
                <tr key={user.id}>
                    <td>{user.username}</td>
                    <td className='rightTD'>{user.blogs?.length || 0}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </>
    )
}

export default User
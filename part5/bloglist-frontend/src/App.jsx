import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/blogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import {Success, Error} from './components/notifications'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  

  const [successM, setSuccesM] = useState('')
  const [errorM, setErrorM] = useState('')
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();
    try{
    const user = await loginService.login({
      username,
      password
    })
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('') 
    setSuccesM('successfully logged in')
    setTimeout(() => {
      setSuccesM('')
    }, 5000);
    } catch {
      setErrorM('wrong credentials')
      setTimeout(() => {
        setErrorM('')
      }, 5000);
    }
  }

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedInUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    setSuccesM('logged out')
    setTimeout(() => {
      setSuccesM('')
    }, 5000);
  }

  const loginPage = () => {
    return (
      <div>
        <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
        <input type='text' 
        value={username} 
        name='username' 
        onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
        <input type='password' 
        value={password} 
        name='username' 
        onChange={({target}) => setPassword(target.value)} />
        </div>
        <div>
        <button type='submit'>log in</button>
        </div>
      </form>
      </div>
    )
  }

  const addBlog = async (blogObject) => {
    try{
    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    setSuccesM(`A new blog "${newBlog.title}" by "${newBlog.author}" added`)
    setTimeout(() => {
      setSuccesM('')
    }, 5000);
  } catch {
    setErrorM('Something went wrong when posting the blog')
    setTimeout(() => {
      setErrorM('')
    }, 5000);
  }
  }

  const blogPage = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.username} is logged in</p> <button onClick={logout}>Logout</button>
        <BlogForm createBlog={addBlog} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <Success message={successM}/>
      <Error message={errorM}/>
      {user === null ? 
      loginPage() :
      blogPage()}
    </div>
  )
}

export default App
import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, username }) => {
  const [buttonLable, setButtonLable] = useState('show')
  const [visible, setVisible] = useState(false)

  const changeVisibility = () => {
    setVisible(!visible)
    setButtonLable(visible? 'show' : 'hide')
  }

  const hideOrShow = { display : visible? '' : 'none' }

  const addlike = (blog) => {
    likeBlog({ ...blog, likes: blog.likes + 1 })
  }

  return(
    <div className="blog">
      <div className='title'>
        {blog.title} {blog.author} <button onClick={changeVisibility}>{buttonLable}</button>
      </div>
      <div style={hideOrShow} className='moreInfo'>
        <div>url: {blog.url}</div>
        <div>likes: {blog.likes} <button id="like" onClick={() => addlike(blog)}>like</button></div>
        <div>name: {blog.user ? blog.user.name : 'Unkown'}</div>
        {username === blog.user.username? <button onClick={() => removeBlog(blog)}>Remove</button> : null}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog
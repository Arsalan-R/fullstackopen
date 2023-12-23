import { useState } from "react"

const Blog = ({ blog, likeBlog, removeBlog }) => {

  const [buttonLable, setButtonLable] = useState('show')
  const [visible, setVisible] = useState(false)

  const changeVisibility = () => {
    setVisible(!visible)
    setButtonLable(visible? 'show' : 'hide')
}

const hideOrShow = {display : visible? '' : 'none'}

const addlike = (blog) => {
 likeBlog({...blog, likes: blog.likes + 1})
}

return(
  <div className="blog">
    {blog.title} {blog.author} <button onClick={changeVisibility}>{buttonLable}</button> 
    <div style={hideOrShow}>
      <div>url: {blog.url}</div>
      <div>likes: {blog.likes} <button onClick={() => addlike(blog)}>like</button></div>
      <div>name: {blog.user ? blog.user.name : 'Unkown'}</div>
      <button onClick={() => removeBlog(blog)}>Remove</button>
    </div>
  </div>  
)
}

export default Blog
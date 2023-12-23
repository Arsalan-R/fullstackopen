import { useState } from "react"

const Blog = ({ blog }) => {

const changeName = () => {
  buttonLable === 'View' ? setButtonLable('Hide') : setButtonLable('View')
}

  const [buttonLable, setButtonLable] = useState('View')
return(
  <div>
    {blog.title} {blog.author} {blog.likes} {blog.url} {blog.user ? blog.user.name : ''}
  </div>  
)
}

export default Blog
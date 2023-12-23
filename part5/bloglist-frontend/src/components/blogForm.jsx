import { useState } from "react"
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const[title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const AddBlog = async(event) => {
    event.preventDefault()
    
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    }

    return(
        <div>
            <h2>Create new</h2>
                <form onSubmit={AddBlog}>
                <div>
                    <input type="text" value={title} name='title' onChange={({target}) => setTitle(target.value)} required/>
                </div>
                <div>
                    <input type="text" value={author} name='author' onChange={({target}) => setAuthor(target.value)} required/>
                </div>
                <div>
                    <input type="text" value={url} name='url' onChange={({target}) => setUrl(target.value)} required/>
                </div>
                <div>
                    <button type='submit'>Create</button>
                </div>
                </form>
        </div>
    )
}

BlogForm.propTypes = {createBlog : PropTypes.func.isRequired}

export default BlogForm
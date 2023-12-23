const BlogForm = (props) => {
  
    return(
        <div>
            <h2>Create new</h2>
                <form onSubmit={props.handleSubmit}>
                <div>
                    <input type="text" value={props.title} name='title' onChange={props.handleTitle} required/>
                </div>
                <div>
                    <input type="text" value={props.author} name='author' onChange={props.handleAuthor} required/>
                </div>
                <div>
                    <input type="text" value={props.url} name='url' onChange={props.handleUrl} required/>
                </div>
                <div>
                    <button type='submit'>Create</button>
                </div>
                </form>
        </div>
    )
}

export default BlogForm
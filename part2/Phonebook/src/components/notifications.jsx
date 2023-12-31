const Success = ({message}) => {
    if (message === ''){
        return null
    }
    else {
        return (
            <div className="success">
                {message}
            </div>
        )
    }
}

const Error = ({message}) => {
    if (message === ''){
        return null
    }
    else {
        return (
            <div className="error">
                {message}
            </div>
        )
    }
}

export {Success, Error}
const _ = require('lodash');

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    const result = blogs.reduce((sum, blog) => sum += blog.likes ,0)
    return blogs.length ? result : 0
}

const favoriteBlog = (blogs) => {
    if (blogs.length > 0) {
    const getMax = (a, b) => Math.max(a, b);
    const biggestNum = blogs.reduce((acc, item) => getMax(acc,item.likes), 0)
    const mostLiked = blogs.find(item => item.likes === biggestNum)
    const result = {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes
    }
    return result } else {
        return 'not found'
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length > 0 ){
const authors = _.groupBy(blogs, 'author')
const sumsOfBLogs = _.mapValues(authors, (o) => o.length)
const biggestNum = _.maxBy(Object.entries(sumsOfBLogs), ([author, blogs]) => blogs)
const result = {
    author: biggestNum[0],
    blogs: biggestNum[1]
  }
return result } else {
    return 'not found'
}
}

const mostLikes = (blogs) =>{
    if (blogs.length > 0){
        const authors = _.groupBy(blogs, 'author')
        const sumOfLikes = _.mapValues(authors, (blogs) => _.sumBy(blogs, (blog) => blog.likes))
        const biggestLike = _.maxBy(Object.entries(sumOfLikes), ([author, likes]) => likes)
        const result = {
            author: biggestLike[0],
            likes: biggestLike[1]
        }
        return result
    } else {
        return 'not found'
    }
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
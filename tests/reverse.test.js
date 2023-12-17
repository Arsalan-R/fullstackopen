const listHelper = require('../utils/list_helper.js')
const Allblogs = require('./blogs.js') // get the lists of blogs

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(Allblogs.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has more than one blog, equals the sums of their likes', () => {
    const result = listHelper.totalLikes(Allblogs.blogs)
    expect(result).toBe(36)
  })

  test('if the list has no blogs returns zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})

describe('favoriteBlog ', () => {
test('gets the most likes', () => {
  const result = listHelper.favoriteBlog(Allblogs.blogs)
  expect(result).toEqual({
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12
  })
})
test('if there is no item return not found', () => {
  const result = listHelper.favoriteBlog([])
  expect(result).toEqual('not found')
})

})

describe('the author with most blogs', () => {
  test('returns the author who has the largest amount of blogs', () => {
  const result = listHelper.mostBlogs(Allblogs.blogs)
  expect(result).toEqual({
    author: "Robert C. Martin",
    blogs: 3
  })
  })
  test('if there is no blog return not found', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual('not found')
  })
}) 

describe('the author with most likes', () => {
  test('returns the author who has the largest amount of likes', () => {
  const result = listHelper.mostLikes(Allblogs.blogs)
  expect(result).toEqual({
    author: "Edsger W. Dijkstra",
    likes: 17
  })
  })
  test('if there is no blog return not found', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual('not found')
  })
  })

const { BlogPost, Comment, User } = require("../models")

async function getPost(id) {
    const res = await BlogPost.findByPk(id, {
        include: [
            {
                model: User,
                attributes: {
                    exclude: "password"
                }
            },
            {
                model: Comment,
                all: true,
                include: {
                    model: User,
                    attributes: {
                        exclude: "password"
                    }
                }
            }
        ]
    })

    if (!res) return null

    const comments = res.dataValues.comments.map((entry) => {
        return {
            ...entry.dataValues,
            author: entry.dataValues.user.dataValues
        }
    })

    const post = {
        ...res.dataValues,
        author: res.dataValues.user.dataValues,
        comments
    }

    return post
}

async function getPosts() {
    const res = await BlogPost.findAll({
        include: [
            {
                model: User,
                attributes: {
                    exclude: "password"
                }
            },
            {
                model: Comment,
                all: true,
                include: {
                    model: User,
                    attributes: {
                        exclude: "password"
                    }
                }
            }
        ]
    })

    const posts = res.map((post) => {
        const comments = post.dataValues.comments.map((comment) => {
            return {
                ...comment.dataValues,
                author: comment.dataValues.user.dataValues
            }
        })

        return {
            ...post.dataValues,
            author: post.dataValues.user.dataValues,
            comments
        }
    })

    return posts
}

module.exports = {
    getPost,
    getPosts
}
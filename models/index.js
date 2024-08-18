const User = require('./User')
const BlogPost = require("./BlogPost")
const Comment = require('./Comment');

User.hasMany(BlogPost, {
    foreignKey: 'author',
    onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
    foreignKey: 'author'
});

BlogPost.hasMany(Comment)
Comment.belongsTo(BlogPost)

User.hasMany(Comment)
Comment.belongsTo(User)

module.exports = { User, BlogPost, Comment };
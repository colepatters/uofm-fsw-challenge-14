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

module.exports = { User, BlogPost, Comment };
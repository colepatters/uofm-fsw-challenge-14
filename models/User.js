const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    async checkPassword(loginPw) {
        return await bcrypt.compare(loginPw, this.password);
    }
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
        },
        {
            hooks: {
                async beforeCreate(newUserData) {
                    newUserData.password = await bcrypt.hash(newUserData.password, 10);
                    return newUserData;
                },
            },
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'users'
        }
);

module.exports = User;
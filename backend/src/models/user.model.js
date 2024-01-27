const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db/config');
const { hashPassword, comparePassword } = require('../utils/hashPassword');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING(30),
            allowNull: {
                args: false,
                msg: 'first name is required',
            },
        },
        lastName: {
            type: DataTypes.STRING(30),
            allowNull: {
                args: false,
                msg: 'last name is required',
            },
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: {
                args: false,
                msg: 'email is required',
            },
            unique: {
                args: true,
                msg: 'email already exists',
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: 'enter a valid email',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: 'password is required',
            },
            validate: {
                len: {
                    args: [6, 12],
                    msg: 'password must be in between 6 to 12 characters',
                },
            },
            set(value) {
                this.setDataValue('password', hashPassword(value))
            },
        },
    },
    {
        sequelize,
        modelName: 'users',
        timestamps: false,
    }
);

(async function () {
    try {
        await User.sync({ alter: true });
        console.log('The table for the User model was just (re)created!');
    } catch (error) {
        console.log('Unable to sync User model', error);
    }
})();

User.prototype.compareEnteredPassword = async function(password){
    return await comparePassword(password, this.password)
}

module.exports = {
    User,
};

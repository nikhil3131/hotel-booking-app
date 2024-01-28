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
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
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
            allowNull: false,
            validate: {
                len: {
                    args: [6, Infinity],
                    msg: 'password must be in between 6 to 12 characters',
                },
            },
        },
        refreshToken: {
            type: DataTypes.STRING,
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

User.prototype.compareEnteredPassword = async function (password) {
    return await comparePassword(password, this.password);
};

User.beforeSave(async (user) => {
    if (user.changed('password')) {
        user.password = await hashPassword(user.password);
    }
});

module.exports = {
    User,
};

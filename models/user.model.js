const {DataTypes} = require("sequelize");
const sequelize = require("../connection");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataType.UUID,
            primaryKey: true,
            // autoincrement: true,
            defaultValue: DataTypes.UUIDV4,
        },

        fullname:{
            type: DataTypes.STRING,
            allowNull: false,
            DATETIME : true,

        },

        lastName:{type: DataTypes.STRING},

        phone:{ type: DataTypes.STRING},
        email:{
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },

        password:{
             type: DataTypes.STRING,
             allowNull :false,
        },

    },
    {
        timestamps: true,
        paranoid: true,
        tableName: "users",
        getterMethods:{
            generateToken(){
                const token =JWT.sign(
                    {id:this.id,
                    email:this.email,},
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: "2h",
                        issuer: "amox-server",
                    }
                );
                return token;
            },
            getFullName() {
                return this.firstName + " " + this.lastName;
            },
        },

        hooks:{ //
            beforeCreate: function (user, option){
                const saltRounds =10;
                const salt = bycript.genSaltSync(saltRounds);
                user.password = bycript.hashSync(user.password, salt);
            },
        },
    }
);

module.exports = User;
'use strict'
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      
    }
  }
  User.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already in use!'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email address!'
        }
      }
    },
    password: {
      type: DataTypes.STRING(300),
      allowNull: false,
      set(val) {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(val, salt)
        this.setDataValue('password', hash)
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  })
  return User
}

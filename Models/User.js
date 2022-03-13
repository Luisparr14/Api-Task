const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const bcrypt = require('bcrypt')

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
      isUnique: function (value, next) {
        User.findOne({ where: { email: value } })
          .then(user => {
            if (user) {
              return next('Email already in use!')
            }
            return next()
          })
      }
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    set: function (value) {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(value, salt)
      this.setDataValue('password', hash)
    }
  },
});

(async () => {
  await sequelize.sync({ force: true });
  create()
})();

const create = async () => {
  try {
    const luis = await User.create({
      name: 'Anegl',
      lastName: 'Gonzalez',
      email: 'luispar@gmail.com',
      password: '123456'
    })

    console.log(luis instanceof User)
    console.log(luis.name)
    await luis.save()
  } catch (error) {
    console.error(error)
  }
}


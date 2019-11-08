const { Sequelize } = require('sequelize')

sequelize = new Sequelize({
  database: 'sourc_db',
  dialect: 'postgres',
  define: {
    underscored: true
  }
});

class User extends Sequelize.Model { }
class Project extends Sequelize.Model { }
class Team extends Sequelize.Model { }

User.init({
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password_digest: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: Sequelize.STRING,
  image_url: Sequelize.TEXT,
  description: Sequelize.TEXT,
},
  {
    sequelize,
    modelName: 'users'
  })

Project.init({
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
}, {
  sequelize,
  modelName: 'projects'
})

Team.init({
  user_id: Sequelize.INTEGER,
  project_id: Sequelize.INTEGER,
  is_leader: Sequelize.BOOLEAN
},
  {
    sequelize,
    modelName: 'teams'
  })

User.belongsToMany(Project,
  {
    through: Team,
    as: "projects",
    foreignKey: 'user_id',
    otherKey: 'project_id',
    onDelete: 'cascade'
  });
Project.belongsToMany(User,
  {
    through: Team,
    as: "users",
    foreignKey: 'project_id',
    otherKey: 'user_id',
    onDelete: 'cascade'
  });

module.exports = {
  sequelize,
  User,
  Project,
  Team
}
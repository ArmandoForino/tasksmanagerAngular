import { Task, User, Tag, Project } from "../models"

import sequelize from "../database/connection";

const init = () => {
    // RELAZIONI
    User.hasMany(Task, {
        onDelete:'CASCADE'
    })
    Task.belongsTo(User, {
        foreignKey: { allowNull: false } 
    })

    User.hasMany(Tag, {
        onDelete:'CASCADE'
    })
    Tag.belongsTo(User, {
        foreignKey: { allowNull: false } 
    })

    Task.belongsToMany(Tag, {
        through: 'TaskTag',
        onDelete:'CASCADE'
    })
    Tag.belongsToMany(Task, {
        through: 'TaskTag'
    })  

    User.hasMany(Project, {
        onDelete:'CASCADE'
    })
    Project.belongsTo(User, {
        foreignKey: { allowNull: false } 
    })

    Project.hasMany(Task, {
        onDelete:'CASCADE'
    })
    Task.belongsTo(Project, {
        foreignKey: { allowNull: false } 
    })

    // sincronizza tutti i modelli
    return sequelize.sync();
}
 
export default init; 
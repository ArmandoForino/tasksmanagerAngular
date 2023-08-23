import { BelongsToSetAssociationMixin, DataTypes, Model } from "sequelize";
import sequelize from "../database/connection";
import { ProjectInterface, ProjectInput } from "../utils/interfaces/ProjectInterface";
import User from "./User";

class Project extends Model<ProjectInterface, ProjectInput> implements ProjectInterface {
    public id!: number
    public name!: string
    public description!: string
    public status!: boolean

    public setUser!: BelongsToSetAssociationMixin<User, User['id']>;
}
  
Project.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(800),
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    timestamps: true,
    sequelize: sequelize
})


  
export default Project
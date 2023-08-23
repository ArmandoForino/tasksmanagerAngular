import { BelongsToSetAssociationMixin,BelongsToManySetAssociationsMixin, DataTypes, Model } from "sequelize";
import sequelize from "../database/connection";
import { TaskInterface, TaskInput } from "../utils/interfaces/TaskInterface";
import User from "./User";
import Project from "./Project";

class Task extends Model<TaskInterface, TaskInput> implements TaskInterface {
    public id!: number
    public title!: string
    public content!: string
    public dueDate!: Date

    public tagsList!: number[];

    public setUser!: BelongsToSetAssociationMixin<User, User['id']>;
    public setTags!: BelongsToManySetAssociationsMixin<User, User['id']>;
    public setProject!: BelongsToSetAssociationMixin<Project, Project['id']>;

} 

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(800),
            allowNull: true,
        },
        dueDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        }
    },
    {
        sequelize
    }
);

export default Task
 
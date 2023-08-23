import { BelongsToSetAssociationMixin, DataTypes, Model } from "sequelize";
import sequelize from "../database/connection";
import { TagInterface, TagInput } from "../utils/interfaces/TagInterface";
import User from "./User";


class Tag extends Model<TagInterface, TagInput> implements TagInterface {
    public id!: number
    public name!: string
    public description!: string
    public color!: string

    public setUser!: BelongsToSetAssociationMixin<User, User['id']>;
} 


Tag.init(
    {
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
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        color: {
            type: DataTypes.STRING(50),
            allowNull: true,
        }
    },
    {
        sequelize
    }
);


export default Tag

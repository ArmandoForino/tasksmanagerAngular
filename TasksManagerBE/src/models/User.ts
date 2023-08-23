import { DataTypes, Model } from "sequelize";
import sequelize from "../database/connection";
import { UserInterface, UserInput } from "../utils/interfaces/UserInterface";

class User extends Model<UserInterface, UserInput> implements UserInterface {
    public id!: number
    public email!: string
    public name!: string
    public passwordHash!: string
}
  
User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true,
    sequelize: sequelize
})


  
export default User
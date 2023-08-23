import { Optional } from "sequelize";

export interface UserInterface {
    id: number;
    email: string;
    name:string;
    passwordHash: string;
}

// Interfaccia per rendere id opzionale in inserimento
export interface UserInput extends Optional<UserInterface, 'id'> {}

// Interfaccia in output che rende tutti i campi required
export interface UserOutput extends Required<UserInterface> {}

import { Optional } from "sequelize";

export interface ProjectInterface {
    id: number;
    name: string;
    description:string;
    status: boolean;
}

// Interfaccia per rendere id opzionale in inserimento
export interface ProjectInput extends Optional<ProjectInterface, 'id'> {}

// Interfaccia in output che rende tutti i campi required
export interface ProjectOutput extends Required<ProjectInterface> {}

import { Optional } from "sequelize";

export interface TaskInterface {
    id: number;
    title: string;
    content: string;
    dueDate: Date;
}

// Interfaccia per rendere id opzionale in inserimento
export interface TaskInput extends Optional<TaskInterface, 'id'|'content'> {
    tagsList?: number[]
    project: number;
}

// Interfaccia in output che rende tutti i campi required
export interface TaskOutput extends Required<TaskInterface> {}

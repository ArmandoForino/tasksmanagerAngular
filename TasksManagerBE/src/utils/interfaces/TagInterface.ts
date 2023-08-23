import { Optional } from "sequelize";

export interface TagInterface {
    id: number;
    name: string;
    description: string;
    color: string;
}

// Interfaccia per rendere id opzionale in inserimento
export interface TagInput extends Optional<TagInterface, 'id'|'description'|'color'> {}

// Interfaccia in output che rende tutti i campi required
export interface TagOutput extends Required<TagInterface> {}

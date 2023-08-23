// Tipo Project
export type ProjectType = {
    id: number,
    name: string,
    description: string,
    status: boolean,
}

// Tipo di dato passato quando viene fatta la modifica
export type ProjectEditType = Omit<ProjectType, 'id'>
// Tipo Task
export type TaskType = {
    id: number,
    title: string,
    content: string,
    date: Date
}

// Tipo di dato passato quando viene fatta la modifica
export type TaskEditType = Omit<TaskType, 'id'>
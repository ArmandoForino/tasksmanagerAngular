// Tipo Tag
export type TagType = {
    id: number,
    name: string,
    description: string,
    color: string,
}

// Tipo di dato passato quando viene fatta la modifica
export type TagEditType = Omit<TagType, 'id'>
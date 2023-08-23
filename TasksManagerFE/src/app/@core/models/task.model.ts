import { Project } from "./project.model";
import { Tag } from "./tag.model";

export class Task {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public dueDate: Date,
    public Tags: Tag[],
    public ProjectId: number,
    public Project: Project,

    public tagsList: number[],
    public project: number
  ) {}
}

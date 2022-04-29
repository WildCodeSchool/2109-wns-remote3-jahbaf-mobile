export interface ProjectInput {
    name: string,
    description?: string,
    role: string
};

export interface Project {
    id: string,
    name: string,
    description?: string,
    createdAt?: Date,
    updatedAt?: Date,
    createdBy?: string
};

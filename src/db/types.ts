export interface INote extends Common {
    phone: string,
    asset: string,
    email: string,
    description: string,
    current: number
}

export interface ITemplate extends Common {
    title: string;
    content: string;
    tag: string
}

export interface Common {
    id:  number;
    created_at: Date
    updated_at: Date
}

export class Template implements Omit<ITemplate, 'id' | 'created_at' | 'updated_at'>{
    title: string;
    content: string;
    tag: string;
    constructor(fields: Omit<ITemplate, 'id' | 'created_at' | 'updated_at'>){
        this.tag = fields.tag
        this.content = fields.content
        this.title = fields.title
    }
}

export class Note implements Omit<INote, 'id' | 'created_at' | 'updated_at'> {
    phone: string;
    asset: string;
    email: string;
    description: string;
    current: number;
    constructor(fields?: any) {
        this.phone = fields?.phone ?? '';
        this.asset = fields?.asset ?? '';
        this.email = fields?.email ?? '';
        this.description = fields?.description ?? '';
        this.current = fields?.current ?? 1
    }
}

export class NoteDTO implements INote {
    phone: string;
    asset: string;
    email: string;
    description: string;
    id: number;
    created_at: Date;
    updated_at: Date;
    current: number;
    constructor(fields: any) {
        this.id = fields.id ?? '';
        this.current = fields.current ?? 0
        this.phone = fields.phone ?? '';
        this.asset = fields.asset ?? '';
        this.email = fields.email?? '';
        this.description = fields.description ?? '';
        this.created_at = fields.created_at ?? new Date(Date.now());
        this.updated_at = fields.updated_at ?? new Date(Date.now());
    }
}

export class TemplateDTO implements ITemplate{
    title: string;
    content: string;
    tag: string;
    id: number;
    created_at: Date;
    updated_at: Date;
    constructor(fields: ITemplate){
        this.id = fields.id
        this.tag = fields.tag
        this.content = fields.content
        this.title = fields.title
        this.created_at = fields.created_at
        this.updated_at = fields.updated_at
    }
}
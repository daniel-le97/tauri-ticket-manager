export interface Note extends Common {
    phone: string,
    asset: string,
    email: string,
    description: string,
    ipv4: string
}

export interface Template extends Common {
    title: string;
    content: string;
    tag: string
}

export interface Common {
    id:  number;
    created_at: Date
    updated_at: Date
}
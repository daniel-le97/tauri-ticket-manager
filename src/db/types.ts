export type Notes = {
    id: string,
    phone: string,
    asset: string,
    email: string,
    description: string,
    ipv4: string
}

export type CheckLists = {
    id: string;
    title: string;
    questions: string;
    isTemplate: boolean
    template: string
}
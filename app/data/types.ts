export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    image?: string | null;
    github?: string | null;
    demo?: string | null;
    type: "pro" | "perso";
    is_abort?: boolean | null;
}


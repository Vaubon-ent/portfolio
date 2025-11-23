export interface Project {
    id: number;
    title: string;
    description: string;
    "description-plus"?: string;
    problématique?: string;
    technologies: string[];
    image?: string | null;
    "image__file"?: string | null;
    github?: string | null;
    demo?: string | null;
    type: "pro" | "perso";
    is_abort?: boolean | null;
}


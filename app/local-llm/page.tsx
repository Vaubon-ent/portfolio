import { getProjectById } from "@/app/utils/getProjectById";
import ProjectDetail from "@/app/components/ui/ProjectDetail";
import { notFound } from "next/navigation";

export default function LocalLlmPage() {
    const project = getProjectById(3);
    
    if (!project) {
        notFound();
    }

    return <ProjectDetail project={project} />;
}


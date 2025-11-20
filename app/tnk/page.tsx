import { getProjectById } from "@/app/utils/getProjectById";
import ProjectDetail from "@/app/components/ui/ProjectDetail";
import { notFound } from "next/navigation";

export default function TnkPage() {
    const project = getProjectById(1);
    
    if (!project) {
        notFound();
    }

    return <ProjectDetail project={project} />;
}


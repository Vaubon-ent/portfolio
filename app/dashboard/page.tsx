import { getProjectById } from "@/app/utils/getProjectById";
import ProjectDetail from "@/app/components/ui/ProjectDetail";
import { notFound } from "next/navigation";

export default function DashboardPage() {
    const project = getProjectById(2);
    
    if (!project) {
        notFound();
    }

    return <ProjectDetail project={project} />;
}


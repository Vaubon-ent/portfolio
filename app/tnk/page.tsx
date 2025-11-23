import { getProjectById } from "@/app/utils/getProjectById";
import { getProjectImages } from "@/app/utils/getProjectImages";
import ProjectDetail from "@/app/components/ui/ProjectDetail";
import { notFound } from "next/navigation";

export default function TnkPage() {
    const project = getProjectById(1);
    
    if (!project) {
        notFound();
    }

    const images = getProjectImages(project["image__file"]);

    return <ProjectDetail project={project} images={images} />;
}


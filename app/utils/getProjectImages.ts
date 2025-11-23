import fs from "fs";
import path from "path";

/**
 * Récupère toutes les images d'un dossier spécifié dans le dossier public
 * @param imageFolder - Chemin du dossier relatif à /public (ex: "/tnk" ou "/defi")
 * @returns Tableau des chemins des images (ex: ["/tnk/image1.png", "/tnk/image2.png"])
 */
export function getProjectImages(imageFolder: string | null | undefined): string[] {
    if (!imageFolder) {
        return [];
    }

    // Nettoyer le chemin (enlever le slash initial si présent)
    const cleanFolder = imageFolder.startsWith("/") ? imageFolder.slice(1) : imageFolder;
    
    // Chemin complet vers le dossier public
    const publicPath = path.join(process.cwd(), "public", cleanFolder);
    
    // Vérifier si le dossier existe
    if (!fs.existsSync(publicPath)) {
        return [];
    }

    try {
        // Lire les fichiers du dossier
        const files = fs.readdirSync(publicPath);
        
        // Filtrer pour ne garder que les images
        const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
        const imageFiles = files
            .filter(file => {
                const ext = path.extname(file).toLowerCase();
                return imageExtensions.includes(ext);
            })
            .map(file => `/${cleanFolder}/${file}`)
            .sort(); // Trier pour un ordre cohérent
        
        return imageFiles;
    } catch (error) {
        console.error(`Erreur lors de la lecture du dossier ${publicPath}:`, error);
        return [];
    }
}

/**
 * Récupère la première image d'un dossier spécifié dans le dossier public
 * @param imageFolder - Chemin du dossier relatif à /public (ex: "/tnk" ou "/defi")
 * @returns Chemin de la première image ou null si aucune image trouvée
 */
export function getFirstProjectImage(imageFolder: string | null | undefined): string | null {
    const images = getProjectImages(imageFolder);
    return images.length > 0 ? images[0] : null;
}


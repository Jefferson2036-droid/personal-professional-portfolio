export const siteConfig = {
  title: "BSEAI Pitch Presentation",
  description: "A cinematic, evidence-based presentation for NJIT's B.S. in Enterprise AI.",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export function resolveRoute(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  
  if (siteConfig.basePath) {
    const normalizedBase = siteConfig.basePath.replace(/\/+$/, "");
    
    // Avoid double-prefixing
    if (normalizedPath.startsWith(`${normalizedBase}/`) || normalizedPath === normalizedBase) {
      return normalizedPath;
    }
    
    // Handle root path
    if (normalizedPath === "/") {
        return normalizedBase || "/";
    }

    return `${normalizedBase}${normalizedPath}`;
  }
  
  return normalizedPath;
}

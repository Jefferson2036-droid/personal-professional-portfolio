import { ContentRepository } from "@/lib/content/repository";
import { PageLayoutFactory } from "@/components/layouts/PageLayoutFactory";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import path from "node:path";

const getPagesRepo = () => new ContentRepository(path.join(process.cwd(), "content/pages"));

export const dynamicParams = false;

export async function generateStaticParams() {
  const repo = getPagesRepo();
  const slugs = await repo.getAllSlugs();
  
  return slugs
    .filter((slug) => slug !== "home") // Root page.tsx handles home
    .map((slug) => ({ slug: [slug] }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slugStr = resolvedParams.slug.join("/");
  const repo = getPagesRepo();
  
  try {
    const page = await repo.getPageBySlug(slugStr);
    return {
      title: page.frontmatter.seo?.title || page.frontmatter.title,
      description: page.frontmatter.seo?.description,
      openGraph: page.frontmatter.seo?.openGraphImage ? {
        images: [page.frontmatter.seo.openGraphImage]
      } : undefined
    };
  } catch {
    return {};
  }
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;
  const slugStr = resolvedParams.slug.join("/");
  const repo = getPagesRepo();
  
  try {
    const page = await repo.getPageBySlug(slugStr);
    return <PageLayoutFactory page={page} />;
  } catch {
    notFound();
  }
}

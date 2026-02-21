import React, { useEffect, useState } from "react";
import { getSiteContent } from "../../services/firestore-service";
import { SiteContent } from "../../types";
import { Loader2 } from "lucide-react";

interface StaticPageProps {
  pageId: string;
  defaultTitle?: string;
  defaultContent?: string;
}

export function StaticPage({
  pageId,
  defaultTitle,
  defaultContent,
}: StaticPageProps) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const data = await getSiteContent(pageId);
        setContent(data);
      } catch (error) {
        console.error(`Error loading content for ${pageId}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [pageId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-slate-50 to-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const title = content?.title || defaultTitle || "Page";
  const body =
    content?.content || defaultContent || "<p>Content coming soon...</p>";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-4 md:pt-6 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-8 text-center md:text-left">
          {title}
        </h1>
        <div
          className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 prose prose-blue max-w-none text-slate-600"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
    </div>
  );
}

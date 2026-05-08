import { PortableText } from "@portabletext/react";

interface DetailedDescriptionBlockProps {
  detailedDescription: any[];
}

export function DetailedDescriptionBlockRenderer({ detailedDescription }: DetailedDescriptionBlockProps) {
  if (!detailedDescription || detailedDescription.length === 0) {
    return null;
  }

  return (
    <div className="prose prose-lg sm:prose-xl prose-gray [font-family:system-ui,-apple-system,sans-serif] text-gray-700 leading-relaxed mx-auto max-w-4xl bg-white p-12 sm:p-20 rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.02)] border border-[#f0eee9]">
      <PortableText value={detailedDescription} />
    </div>
  );
}

import { PortableText } from "@portabletext/react";

interface IntroBlockProps {
  intro: any[];
}

export function IntroBlockRenderer({ intro }: IntroBlockProps) {
  if (!intro || intro.length === 0) {
    return null;
  }

  return (
    <div className="prose prose-xl prose-gray [font-family:system-ui,-apple-system,sans-serif] text-[#333333] leading-[1.8] text-center mx-auto font-light max-w-4xl">
      <PortableText value={intro} />
    </div>
  );
}

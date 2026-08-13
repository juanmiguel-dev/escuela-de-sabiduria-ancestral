"use client";

import { useEffect, useRef, useState } from "react";

interface HtmlCourseViewerProps {
  html: string;
  title?: string;
}

export function HtmlCourseViewer({ html, title }: HtmlCourseViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState<number>(850);

  const isFullDocument =
    html.includes("<!DOCTYPE") ||
    html.includes("<html") ||
    html.includes("<body");

  useEffect(() => {
    if (!isFullDocument) return;

    const updateHeight = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          const doc = iframeRef.current.contentWindow.document;
          if (doc && doc.body) {
            const h = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight, 800);
            if (h > 0) setIframeHeight(h + 20);
          }
        } catch (e) {
          // ignore cross origin
        }
      }
    };

    const timer = setTimeout(updateHeight, 500);
    const interval = setInterval(updateHeight, 1500);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [html, isFullDocument]);

  if (isFullDocument) {
    return (
      <div className="w-full my-8 rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white">
        <iframe
          ref={iframeRef}
          srcDoc={html}
          title={title || "Curso HTML"}
          className="w-full border-none transition-all duration-300"
          style={{ height: `${iframeHeight}px`, minHeight: "750px" }}
          onLoad={() => {
            if (iframeRef.current && iframeRef.current.contentWindow) {
              try {
                const doc = iframeRef.current.contentWindow.document;
                if (doc && doc.body) {
                  setIframeHeight(Math.max(doc.body.scrollHeight, 850));
                }
              } catch (e) {}
            }
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="my-6 prose max-w-none w-full text-gray-800"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-slate prose-sm sm:prose-base max-w-none">
      <ReactMarkdown
        components={{
          h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-slate-900 mt-6 mb-4" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-semibold text-slate-900 mt-5 mb-3 border-b pb-2 border-slate-200" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-slate-900 mt-4 mb-2" {...props} />,
          p: ({node, ...props}) => <p className="text-slate-600 leading-relaxed mb-4" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 space-y-1 mb-4 text-slate-600" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-5 space-y-1 mb-4 text-slate-600" {...props} />,
          li: ({node, ...props}) => <li className="pl-1" {...props} />,
          strong: ({node, ...props}) => <strong className="font-semibold text-slate-900" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-orange-500 pl-4 italic text-slate-600 bg-slate-50 py-2 pr-2 rounded-r mb-4" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

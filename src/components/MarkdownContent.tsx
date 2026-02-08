'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
  content: string;
}

/**
 * Pre-traite le Markdown pour transformer ==texte== en balise custom
 * avant que react-markdown ne le parse (car == n'est pas du Markdown standard)
 */
function preprocessGradient(content: string): string {
  return content.replace(/==([^=]+)==/g, '<gradient>$1</gradient>');
}

/**
 * Transforme les enfants texte d'un noeud React pour appliquer le gradient
 * sur les marqueurs <gradient>...</gradient> presents dans le texte brut
 */
function processChildren(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (typeof child !== 'string') return child;

    const parts = child.split(/(<gradient>.*?<\/gradient>)/g);
    if (parts.length === 1) return child;

    return parts.map((part, i) => {
      const match = part.match(/^<gradient>(.*?)<\/gradient>$/);
      if (match) {
        return (
          <span key={i} className="gradient-text font-semibold">
            {match[1]}
          </span>
        );
      }
      return part;
    });
  });
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const processed = preprocessGradient(content);

  return (
    <ReactMarkdown
      components={{
        // Liens stylisés avec effet gradient
        a: ({ href, children }) => (
          <a
            href={href}
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d55] to-[#7928ca] font-medium hover:from-[#7928ca] hover:to-[#00d4ff] transition-all duration-300 border-b border-[#7928ca]/50 hover:border-[#00d4ff]"
          >
            {children}
          </a>
        ),
        // Titres
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold text-white mt-10 mb-4">{processChildren(children)}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">{processChildren(children)}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold text-white mt-6 mb-3">{processChildren(children)}</h3>
        ),
        // Paragraphes
        p: ({ children }) => (
          <p className="text-zinc-300 leading-relaxed mb-4">{processChildren(children)}</p>
        ),
        // Listes
        ul: ({ children }) => (
          <ul className="list-disc list-inside text-zinc-300 space-y-2 mb-4 ml-4">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside text-zinc-300 space-y-2 mb-4 ml-4">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-zinc-300">{processChildren(children)}</li>
        ),
        // Gras et italique
        strong: ({ children }) => (
          <strong className="text-white font-semibold">{processChildren(children)}</strong>
        ),
        em: ({ children }) => (
          <em className="text-zinc-200 italic">{processChildren(children)}</em>
        ),
        // Citations
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-[#7928ca] pl-4 my-6 italic text-zinc-400">
            {children}
          </blockquote>
        ),
        // Code inline
        code: ({ children }) => (
          <code className="bg-zinc-800 text-[#00d4ff] px-1.5 py-0.5 rounded text-sm font-mono">
            {children}
          </code>
        ),
        // Séparateur
        hr: () => (
          <hr className="border-zinc-800 my-8" />
        ),
      }}
    >
      {processed}
    </ReactMarkdown>
  );
}

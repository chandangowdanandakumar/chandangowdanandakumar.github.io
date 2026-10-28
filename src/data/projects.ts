export interface Project {
  slug: string
  name: string
  tagline: string
  /** Short blurb shown on the project card (distinct from the detail-page tagline). */
  description: string
  tech: string[]
  github: string
  updated: string
  readTime: string
  heroLabel: string
  sections: Section[]
}

export interface Section {
  type: 'heading' | 'paragraph' | 'callout'
  title?: string
  body: string
  calloutItems?: { heading: string; body: string }[]
}

export const projects: Project[] = [
  {
    slug: 'mini-search-engine',
    name: 'Mini Search Engine',
    tagline: 'Building search from the ground up',
    description: 'A mini search engine exploring indexing, ranking, and query algorithms from scratch.',
    tech: ['Java'],
    github: 'https://github.com/chandangowdanandakumar/mini-search-engine',
    updated: 'January 2025',
    readTime: '2 min read',
    heroLabel: 'Search Engine',
    sections: [
      {
        type: 'heading',
        title: 'Why build a search engine?',
        body: 'Most engineers use search as a black box — you query it, it returns results. I wanted to understand exactly what happens in between. This project is a search engine implemented from scratch in Java, with no external search libraries.',
      },
      {
        type: 'paragraph',
        body: 'The core pipeline mirrors how real search engines work: documents are ingested, tokenized, and indexed into an inverted index. At query time, TF-IDF scoring ranks documents by relevance, so the most meaningful results surface first.',
      },
      {
        type: 'callout',
        body: '',
        calloutItems: [
          {
            heading: 'The inverted index',
            body: 'The central data structure maps each term to the list of documents containing it — the same structure used at the heart of Lucene, Elasticsearch, and every major search engine.',
          },
          {
            heading: 'TF-IDF ranking',
            body: 'Term Frequency measures how often a term appears in a document. Inverse Document Frequency penalizes terms that appear everywhere. Their product gives each document a relevance score for a given query.',
          },
        ],
      },
      {
        type: 'heading',
        title: 'What I took away',
        body: 'Writing every component by hand — tokenizer, stemmer, indexer, ranker — made abstract IR concepts concrete. It also built a much stronger intuition for why distributed search systems are designed the way they are at scale.',
      },
    ],
  },
  {
    slug: 'behavioral-questions',
    name: 'Behavioral Questions',
    tagline: 'Turning Leadership Principles into muscle memory',
    description: 'A curated collection of behavioral interview questions with structured STAR answers.',
    tech: ['Markdown', 'STAR Framework'],
    github: 'https://github.com/chandangowdanandakumar/behavioral-questions',
    updated: 'January 2025',
    readTime: '1 min read',
    heroLabel: 'Behavioral Questions',
    sections: [
      {
        type: 'heading',
        title: 'The problem with interview prep',
        body: "Most behavioral interview prep is scattered — notes in one place, answers in another, no structure. When you're under pressure in an interview, you need your examples to come instantly.",
      },
      {
        type: 'paragraph',
        body: "This repository is a structured collection of behavioral questions organized around Amazon's Leadership Principles, each answered using the STAR framework: Situation, Task, Action, Result. Every answer is written to be concrete, specific, and outcome-focused.",
      },
      {
        type: 'callout',
        body: '',
        calloutItems: [
          {
            heading: 'Why STAR?',
            body: 'The STAR format forces you to move from vague claims ("I\'m a good communicator") to specific evidence ("I reduced on-call noise by 40% by rewriting alert thresholds"). Interviewers remember stories, not adjectives.',
          },
          {
            heading: 'Leadership Principles as a lens',
            body: "Amazon's Leadership Principles aren't just interview criteria — they're a useful framework for reflecting on what kinds of problems you've solved and how. Mapping your experience to them surfaces patterns you might not have noticed.",
          },
        ],
      },
      {
        type: 'heading',
        title: 'How I use it',
        body: 'I review it before interviews and update it after new experiences worth capturing. It\'s a living document — the goal is never "done", just current.',
      },
    ],
  },
]

export const getProject = (slug: string) => projects.find(p => p.slug === slug)

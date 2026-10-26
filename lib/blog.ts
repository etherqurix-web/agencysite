export type BlogPost = {
  slug: string;
  category: string;
  date: string;
  read: string;
  title: string;
  excerpt: string;
  tags: readonly string[];
  body: readonly string[];
};

export const blogPosts = [
  {
    slug: 'ai-automation-modern-business',
    category: 'AI & Automation',
    date: '26 September, 2026',
    read: '6 min read',
    title: 'How AI Automation Is Changing Modern Business Workflows',
    excerpt: 'A practical look at where intelligent automation creates real operational value — from repetitive tasks to connected decision-making systems.',
    tags: ['AI', 'Automation', 'Business'],
    body: [
      'AI automation is moving beyond isolated experiments. Modern businesses are connecting documents, internal tools, approvals, reporting, and customer workflows into systems that can interpret information and take the next action.',
      'The strongest automation opportunities usually begin with repetitive work that already follows a recognizable process. Once those steps are mapped, AI can be introduced where interpretation, classification, summarization, or decision support is needed.',
      'At Aetherquorix, we approach automation as a complete workflow rather than a single AI feature: understand the process, connect the systems, add the intelligence layer, and measure the operational result.'
    ]
  },
  {
    slug: 'from-idea-to-ai-product',
    category: 'Software & Products',
    date: '18 September, 2026',
    read: '5 min read',
    title: 'From Idea to AI Product: What Actually Needs to Be Built',
    excerpt: 'The essential product, engineering, and AI layers behind turning a promising idea into something people can actually use.',
    tags: ['Product', 'Software', 'AI'],
    body: [
      'An AI product is more than a model connected to a button. A usable product needs a clear user problem, an interface, reliable data flows, business logic, integrations, security, and a way to monitor what happens after launch.',
      'The AI layer should serve the product rather than define it. Depending on the problem, that may mean retrieval, document intelligence, classification, agents, computer vision, or a combination of techniques.',
      'The practical path is to build the smallest useful workflow first, validate it with real users, and then expand the product around the evidence gathered from actual usage.'
    ]
  },
  {
    slug: 'why-3d-visualization-matters',
    category: '3D & Design',
    date: '10 September, 2026',
    read: '4 min read',
    title: 'Why 3D Visualization Matters Before Construction Begins',
    excerpt: 'How realistic interior and exterior visualization helps teams communicate ideas, refine decisions, and present spaces before they exist.',
    tags: ['3D', 'Architecture', 'Design'],
    body: [
      'Before a space is constructed, teams still need to make decisions about materials, proportions, lighting, finishes, furniture, landscaping, and the overall visual direction. 3D visualization gives those decisions a shared visual reference.',
      'Photoreal visualization can also make presentations easier to understand. Clients, architects, contractors, and stakeholders can review a proposed environment before committing to the physical execution.',
      'The result is not simply a polished image. A good visualization workflow becomes a communication tool that helps teams explore options and make decisions earlier.'
    ]
  }
] as const;

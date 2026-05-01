export type Profile = {
  name: string;
  title: string;
  bio: string;
  location: string;
  avatarUrl: string;
  links: Array<{
    label: string;
    href: string;
    variant?: "default" | "secondary" | "outline";
  }>;
  projects: Array<{
    name: string;
    description: string;
    tags: string[];
    href: string;
  }>;
  websites: Array<{
    name: string;
    description: string;
    url: string;
    tags: string[];
  }>;
  posts: Array<{
    title: string;
    date: string;
    summary: string;
    href: string;
  }>;
  contact: {
    email: string;
    city: string;
    status: string;
  };
  site: {
    title: string;
    description: string;
  };
  footer: {
    beian: {
      text: string;
      href: string;
    };
    version: string;
    owner: string;
    rights: string;
    nav: Array<{
      label: string;
      href: string;
    }>;
  };
};

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

export const profile: Profile = {
  name: "fishcpy",
  title: "你好👋",
  bio: "平时喜欢折腾点新奇的玩意，偶尔做点小网站&小项目。",
  location: "中国",
  avatarUrl: "https://file.fis.ink/img/fishcpy/logo_c.png",
  links: [
    { label: "GitHub", href: "https://github.com/fishcpy", variant: "outline" },
    { label: "Blog", href: "https://blog.fis.ink/", variant: "outline" },
  ],
  site: {
    title: "fishcpy的个人主页",
    description: "个人简介、作品与文章集合页。",
  },
  footer: {
    beian: {
      text: "京ICP备2025138063号",
      href: "https://beian.miit.gov.cn/",
    },
    version: "Fishcpy Home V3",
    owner: "fishcpy",
    rights: "保留所有权利。",
    nav: [
      { label: "首页", href: "#" },
    ],
  },
  projects: [
    {
      name: "Skyimage",
      description: "云端图床。",
      tags: ["图床"],
      href: "https://github.com/fishcpy/skyimage",
    },
  ],
  posts: [
    {
      title: "测试",
      date: "2026-03-18",
      summary: "测试。",
      href: "https://blog.fis.ink",
    },
  ],
  contact: {
    email: "fishcpy@qq.com",
    city: "中国",
    status: "联系我",
  },
};

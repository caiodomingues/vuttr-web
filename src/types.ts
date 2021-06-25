export type Tag = {
  name: string;
};

export type Tool = {
  id: number;
  title: string;
  description: string;
  link: string;
  tags: Array<string>;
};

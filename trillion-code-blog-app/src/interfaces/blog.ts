import { blogItem } from "./blogItem";

export interface Blog {
  name: string;
  slug: string;
  imagePath: string;
  content: string;
  date: string;
  relatedBlogs: blogItem[];
}

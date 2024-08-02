import { Plugin } from "unified";
import { matter } from "vfile-matter";

export const parseFrontmatter: Plugin = () => {
  return function (tree, file) {
    matter(file);
  };
};

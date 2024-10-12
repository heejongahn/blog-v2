import { HTMLAttributes } from "react";
import styles from "./style.module.css";
import classNames from "classnames";

export default function ArticleContent({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <article className={classNames(styles.content, className)} {...props} />
  );
}

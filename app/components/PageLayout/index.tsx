/* eslint-disable react/display-name */
import { forwardRef, HTMLAttributes } from "react";
import styles from "./style.module.css";
import classNames from "classnames";

const Inner = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }: HTMLAttributes<HTMLDivElement>, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(styles.inner, className)}
        {...props}
      />
    );
  }
);

const PageLayout = Object.assign(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }: HTMLAttributes<HTMLDivElement>, ref) => {
      return (
        <div
          ref={ref}
          className={classNames(styles.layout, className)}
          {...props}
        />
      );
    }
  ),
  { Inner }
);

PageLayout.displayName = "PageLayout";
Inner.displayName = "PageLayout.Inner";

export { PageLayout };

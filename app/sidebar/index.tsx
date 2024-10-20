import { NavLink, NavLinkProps, useLocation } from "@remix-run/react";
import classNames from "classnames";
import { ReactNode, HTMLAttributes, useState, useEffect } from "react";
import { prettifyDate } from "utils/date";
import { Article } from "utils/parseArticle";

interface Props {
  articles: Article[];
}

const favotieSlugs = [
  "bitter-day-sweet-home",
  "stairway-and-field",
  "30days-run",
  "on-climbing-sandhill",
];

function isFavorite(article: Article) {
  return favotieSlugs.includes(article.slug);
}

export default function Sidebar({ articles }: Props) {
  const favorites = articles.filter(isFavorite);
  const recentNonFavorites = articles
    .filter((article) => !isFavorite(article))
    .slice(0, 5);

  const [isExpanded, setIsExpanded] = useState(false);

  const location = useLocation();
  useEffect(() => {
    setIsExpanded(false);
  }, [location.hash, location.pathname, location.search]);

  return (
    <>
      <nav
        id="sidebar"
        className={classNames({ "sidebar-is-expanded": isExpanded })}
      >
        <SidebarGroup className="sidebar-group-home">
          <h1 className="sidebar-title">
            <NavLink to="/" className="sidebar-title-link">
              사색송어
            </NavLink>
            <span className="sidebar-title-subtext">Wondering Trout</span>
          </h1>
          <NavLink to="/about" className="sidebar-about-link">
            누구세요?
          </NavLink>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupTitle>아카이브</SidebarGroupTitle>
          <SidebarGroupItemList className="sidebar-group-item-list-mobile-row ">
            <SidebarGroupItem to="/articles">전체</SidebarGroupItem>
          </SidebarGroupItemList>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupTitle>최근 글</SidebarGroupTitle>
          <SidebarGroupItemList>
            {recentNonFavorites.map((article) => (
              <SidebarGroupItem
                key={article.slug}
                to={`/articles/${article.slug}`}
                className={({ isActive }) => {
                  return isActive
                    ? "sidebar-group-item-link sidebar-group-item-link-active"
                    : "sidebar-group-item-link";
                }}
              >
                {article.frontmatter.title}
                <SidebarGroupItemSubtext>
                  {prettifyDate(article.frontmatter.date)}
                </SidebarGroupItemSubtext>
              </SidebarGroupItem>
            ))}
          </SidebarGroupItemList>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupTitle>좋아하는 글</SidebarGroupTitle>
          <SidebarGroupItemList>
            {favorites.map((article) => (
              <SidebarGroupItem
                key={article.slug}
                to={`/articles/${article.slug}`}
                className={({ isActive }) => {
                  return isActive
                    ? "sidebar-group-item-link sidebar-group-item-link-active"
                    : "sidebar-group-item-link";
                }}
              >
                {article.frontmatter.title}
                <SidebarGroupItemSubtext>
                  {prettifyDate(article.frontmatter.date)}
                </SidebarGroupItemSubtext>
              </SidebarGroupItem>
            ))}
          </SidebarGroupItemList>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupTitle>링크</SidebarGroupTitle>
          <SidebarGroupItemList>
            <SidebarGroupItem
              to="mailto:heejongahn@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              Mail
            </SidebarGroupItem>
            <SidebarGroupItem
              to="https://twitter.com/heejongahn"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </SidebarGroupItem>
            <SidebarGroupItem
              to="https://instagram.com/heejongahn"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </SidebarGroupItem>
            <SidebarGroupItem
              to="https://github.com/heejongahn"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </SidebarGroupItem>
            <SidebarGroupItem
              to="https://www.linkedin.com/in/heejongahn/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </SidebarGroupItem>
          </SidebarGroupItemList>
        </SidebarGroup>
      </nav>
      <button
        className={classNames("sidebar-logo-wrapper", {
          "sidebar-logo-wrapper-expanded": isExpanded,
        })}
        onClick={() => {
          setIsExpanded((prev) => !prev);
        }}
      >
        <img
          alt="로고"
          className="sidebar-logo"
          srcSet="/images/logo/logo.png 1x, /images/logo/logo@2x.png 2x, /images/logo/logo@3x.png 3x"
          src="/images/logo/logo.png"
        />
      </button>
    </>
  );
}

function SidebarGroup({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classNames("sidebar-group", className)} {...props}>
      {children}
    </div>
  );
}

function SidebarGroupTitle({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={classNames("sidebar-group-title", className)} {...props}>
      {children}
    </h2>
  );
}

function SidebarGroupItemList({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={classNames("sidebar-group-item-list", className)} {...props}>
      {children}
    </ul>
  );
}

function SidebarGroupItem({
  children,
  className,
  ...props
}: { children: ReactNode } & NavLinkProps) {
  return (
    <li className={classNames("sidebar-group-item", className)}>
      <NavLink className="sidebar-group-item-link" {...props}>
        {children}
      </NavLink>
    </li>
  );
}

function SidebarGroupItemSubtext({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <span
      className={classNames("sidebar-group-item-subtext", className)}
      {...props}
    >
      {children}
    </span>
  );
}

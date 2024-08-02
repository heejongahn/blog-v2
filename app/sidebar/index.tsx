import { Form, Link } from "@remix-run/react";
import { prettifyDate } from "utils/date";
import { Article } from "utils/parseArticle";

interface Props {
  articles: Article[];
}

export default function Sidebar({ articles }: Props) {
  return (
    <div id="sidebar">
      <div>
        <Form id="search-form" role="search">
          <input
            id="q"
            aria-label="Search contacts"
            placeholder="Search"
            type="search"
            name="q"
          />
          <div id="search-spinner" aria-hidden hidden={true} />
        </Form>
        <Form method="post">
          <button type="submit">New</button>
        </Form>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">대문</Link>
          </li>
          <li>
            {articles.map((article) => {
              const { frontmatter, slug } = article;
              return (
                <Link key={slug} to={`/articles/${slug}`}>
                  <SidebarItem
                    title={frontmatter.title}
                    description={prettifyDate(frontmatter.date)}
                  />
                </Link>
              );
            })}
          </li>
        </ul>
      </nav>
    </div>
  );
}

function SidebarItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="sidebar-item">
      <div className="sidebar-item-title">{title}</div>
      {description != null ? (
        <div className="sidebar-item-description">{description}</div>
      ) : null}
    </div>
  );
}

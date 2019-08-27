import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();

  // language=CSS
  return (
    <nav className="main-navigation">
      <ActiveLink
        href="/typing"
        text="Type text"
        isActive={router.pathname.endsWith("typing")}
      />
      <ActiveLink
        href="/test/writing"
        text="Test your writing skills"
        isActive={router.pathname.endsWith("writing")}
      />
      <ActiveLink
        href="/test/reading"
        text="Test your reading skills"
        isActive={router.pathname.endsWith("reading")}
      />
      <ActiveLink
        href="/progress"
        text="See your progress"
        isActive={router.pathname.endsWith("progress")}
      />

      <style jsx>{`
        .main-navigation {
          display: flex;
        }
        .main-navigation > :global(a),
        .main-navigation > :global(span) {
          font-size: 1.5rem;
          margin-right: 1.5rem;
          color: black;
          text-decoration: none;
        }
        .main-navigation > :global(a) {
          margin-left: 1rem;
        }
        .main-navigation > :global(a:hover) {
          text-decoration: underline;
        }
        .main-navigation > :global(span) {
          padding-left: 0.5rem;
          color: var(--active-color);
          border-left: 0.5rem solid var(--active-color);
        }
      `}</style>
    </nav>
  );
};

const ActiveLink = ({ href, text, isActive }) =>
  isActive ? (
    <span>{text}</span>
  ) : (
    <Link href={href}>
      <a>{text}</a>
    </Link>
  );

export default Nav;

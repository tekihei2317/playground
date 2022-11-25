import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import us from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({ allPostsData }: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${us.headingMd} ${us.padding1px}`}>
        <h2 className={us.headingLg}>Blog</h2>
        <ul className={us.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={us.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={us.lightText}>
                <time>{date}</time>
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

import { getAllPostIds, getPostData } from "../../lib/posts";
import { InferGetStaticPropsType } from "next";
import Layout from "../../components/layout";
import Head from "next/head";
import us from "../../styles/utils.module.css";

export function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

type Params = {
  params: {
    id: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

type PostProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Post({ postData }: PostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={us.headingXl}>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </Layout>
  );
}

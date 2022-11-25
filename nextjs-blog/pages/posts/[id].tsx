import { getAllPostIds, getPostData } from "../../lib/posts";
import { InferGetStaticPropsType } from "next";
import Layout from "../../components/layout";

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
  const postData = getPostData(params.id);

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
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}

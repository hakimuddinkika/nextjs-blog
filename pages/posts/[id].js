import Layout from "../../components/layout";
// Add this import
import Head from 'next/head';

import { getAllPostIds, getPostData } from "../../lib/posts";

// Add this import at the top of the file
import utilStyles from '../../styles/utils.module.css';

// Add this import
import Date from '../../components/date';

export default function Post({ postData }) {
    return (
      <Layout>
        {/* Add this <Head> tag */}
        <Head>
            <title>{postData.title}</title>
        </Head>
        {postData.title}
        <br />
        {postData.id}
        <br />
        {/* Replace {postData.date} with this */}
        <small className={utilStyles.lightText}>
        <Date dateString={postData.date} />
        </small>
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </Layout>
    );
  }

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
      paths,
      fallback: false,
    };
  }

  export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
      props: {
        postData,
      },
    };
  }
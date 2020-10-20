import { withUrqlClient } from 'next-urql';
import NavBar from '../components/NavBar';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const IndexPage = () => {
  const [{ data, fetching: postsFetching }] = usePostsQuery();

  return (
    <>
      <NavBar />
      <div>Hello chakra-ui</div>
      <br />
      {data
        ? data.posts.map((post) => <p key={post.id}>{post.title}</p>)
        : null}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(IndexPage);

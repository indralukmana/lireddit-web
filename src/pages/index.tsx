import { withUrqlClient } from 'next-urql';
import NavBar from '../components/NavBar';
import { createUrqlClient } from '../utils/createUrqlClient';

const IndexPage = () => (
  <>
    <NavBar />
    <div>Hello chakra-ui</div>
  </>
);

export default withUrqlClient(createUrqlClient, { ssr: false })(IndexPage);

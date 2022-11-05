import Home from "../components/Home";
import Layout from "../components/layout/Layout";
import { getRooms } from "../redux/actions/roomActions";
import {wrapper} from "../redux/store"
export default function Index() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async ({req,store}) => {
  await store.dispatch(getRooms(req))
})

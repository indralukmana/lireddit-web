import { useRouter } from 'next/router';
import * as React from 'react';
import { useMeQuery } from '../generated/graphql';

export const useAuth = () => {
  const router = useRouter();

  const [{ data, fetching }] = useMeQuery();

  React.useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace('/login' + `?next=${router.pathname}`);
    }
  }, [data, fetching]);
};

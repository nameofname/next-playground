import dynamic from 'next/dynamic'
import { RequestContext } from 'next/dist/server/base-server';

const LazyOne = dynamic(() => import('./components/LazyComponentOne'), {
  loading: () => <p>Loading...</p>,
});

const LazyTwo = dynamic(() => import('./components/LazyComponentTwo'), {
  loading: () => <p>Loading...</p>,
});

export default function Home({ type }: { type: string}) {
  return (
    <div>
      {
        type === 'two' ? <LazyTwo string={type} /> : <LazyOne string={type} />
      }
    </div>
  );
}

export function getServerSideProps(context: RequestContext) {
  console.log('query', context.query)
  return {
    props: { type: context.query?.type || 'one' }
  }
}

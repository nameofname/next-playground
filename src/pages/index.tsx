import dynamic from 'next/dynamic'

const LazyOne = dynamic(() => import('./components/LazyComponentOne'), {
  loading: () => <p>Loading...</p>,
});

const LazyTwo = dynamic(() => import('./components/LazyComponentTwo'), {
  loading: () => <p>Loading...</p>,
});

export default function Home({ type }: { type: string}) {
  return (
    <div>
      hey there yall
      {
        type === 'two' ? <LazyTwo string={type} /> : <LazyOne string={type} />
      }
    </div>
  );
}

export function getServerSideProps(context) {
  console.log('query', context.query)
  return {
    props: { type: context.query?.type || 'one' }
  }
}

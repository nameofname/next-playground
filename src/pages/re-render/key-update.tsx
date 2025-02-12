import React, { useEffect, useState } from 'react';

/**
 * This example shows the app re-rendering client side due when the key prop is updated
 */

type DataType = {
    data: {
        foo: string;
    }, 
    currKey: string
};

const MyComponent1 = ({ data, currKey }: DataType) => {
    console.log('inside MyComponent1', currKey);
    useEffect(() => {
        console.log('inside useEFfect', currKey);
    }, [])
    return (
        <div>
            <p>This is my component 1 : {JSON.stringify(data)}</p>
        </div>
    )
}

export default function Home(props: DataType) {
    const [string, setString] = useState('');
    if (string === '') {
        setString('ronald');
    }
    console.log('component rendering', string);
    return (
        <>
            <MyComponent1 {...props} key={string} currKey={string} />
        </>
    )
}

// export default function Home(props: DataType) {
//     console.log('component rendering');
//     return (
//         <>
//             <p>here is some crap</p>
//         </>
//     )
// }

export function getServerSideProps() {
    return {
        props: {
            data: {
                foo: 55,
            }
        }
    }
}

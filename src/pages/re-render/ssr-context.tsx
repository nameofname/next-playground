import React, { useState, createContext, useContext } from 'react';

/**
 * This example shows the app re-rendering server side due to context updates.
 */

type DataType = {
    data: {
        foo: string;
    }
};

const StringContext = createContext<string | null>(null);

const MyComponent1 = ({ data }: DataType) => {
    const str = useContext(StringContext);
    return (
        <div>
            <p>This is my component 1 : {JSON.stringify(data)}</p>
            <p>Here's a string from context: {str}</p>
        </div>
    )
}

const strArr = 'rendering'.split('');

export default function Home(props: DataType) {
    const [string, setString] = useState('');
    if (string.length < strArr.length) {
        const newString = string + strArr[string.length];
        setString(newString);
    }
    console.log('component rendering', string);
    return (
        <StringContext.Provider value={string}>
            <MyComponent1 {...props} />
        </StringContext.Provider>
    )
}

export function getServerSideProps() {
    return {
        props: {
            data: {
                foo: 55,
            }
        }
    }
}

import React, { useState, PropsWithChildren, useEffect, useMemo } from 'react';

/**
 * This file shows the pattern of using an injector component, and highlights
 * the how memoizing the injector component changes the behavior
 */


const IndividualWrapper = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <p>This is the individual wrapper</p>
            {children}
        </div>
    )
}

function getComponentInjector() {
    // Try this with and without use memo.
    // Without it you will see the `useEffect` hooks being called repeatedly,
    // even though their dependency arrays are empty. That is because the 
    // component is re-created each time. 
    const Injector = useMemo(() => ({ Component }: { Component: React.FC }) => {
        return (
            <IndividualWrapper>
                <Component />
            </IndividualWrapper>
        )
    }, []);
    return Injector;
}

const MyComponent1 = () => {
    useEffect(() => {
        console.log('my component 1 rendered');
    }, []);

    return (
        <div>
            <p>This is my component 1</p>
        </div>
    )
}

const MyComponent2 = () => {
    useEffect(() => {
        console.log('my component 2 rendered');
    }, []);

    return (
        <div>
            <p>This is my component 2</p>
        </div>
    )
}

const Wrapper = ({ count }: { count: number }) => {
    const Injector = getComponentInjector();
    return (
        <>
            <p>This is the wrapper for the whole page</p>
            <p>{count}</p>
            <Injector Component={MyComponent1} />
            <Injector Component={MyComponent2} />
        </>
    )
}

// Doing a test to show that components are re-created
export default function Home({ type }: { type: string }) {
    const [count, setCount] = useState(0);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <Wrapper count={count} />
        </div>
    );
}


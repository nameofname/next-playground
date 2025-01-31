import React, { useState, PropsWithChildren, FC, useEffect, useMemo } from 'react';

/**
 * This file builds on the example in the sibling file injector.tsx, 
 * but instead of memoizing the injector component, we show how memoizing 
 * the props to the injector works with multiple components, and between re-renders
 */

const initialData = { foo: 'adsf' };

const IndividualWrapper = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <p>This is the individual wrapper</p>
            {children}
        </div>
    )
}

type DataType = {
    foo: string;
};

type Injector = FC<{ Component: FC<DataType> }>;

const Injector = ({ Component, data }: { Component: FC<DataType>, data: DataType }) => {
    const dataMemo = useMemo(() => {
        console.log('inside useMemo', Component.toString().split("\n").filter(s => s.includes("This is my component"))[0].trim(), data);
        return data;
    }, [data]);

    return (
        <IndividualWrapper>
            <Component foo={dataMemo.foo} />
        </IndividualWrapper>
    )
};

/**
 * This pattern is the problelm. If we call a function each time we render to get the injector, then a new component is 
 * created each time.
 */
function getComponentInjector(data: DataType) {
    const DecoratedInjector: Injector = ({ Component }: { Component: FC<DataType> }) => Injector({ data, Component })
    return DecoratedInjector;
}

const MyComponent1 = ({ foo }: DataType) => {
    useEffect(() => {
        console.log('my component 1 rendered');
    }, []);

    return (
        <div>
            <p>This is my component 1 : {foo}</p>
        </div>
    )
}

const MyComponent2 = ({ foo }: DataType) => {
    useEffect(() => {
        console.log('my component 2 rendered');
    }, []);

    return (
        <div>
            <p>This is my component 2 : {foo}</p>
        </div>
    )
}

// Doing a test to show that components are re-created
export default function Home() {
    const Injector = getComponentInjector(initialData);
    return (
        <>
            <p>This is the wrapper for the whole page</p>
            <Injector Component={MyComponent1} />
            {/* { initialData.foo = 'fdsa' } */}
            <Injector Component={MyComponent2} />
        </>
    )
}


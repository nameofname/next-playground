import React, { ComponentType, useEffect, useMemo } from 'react';

/**
 * This file builds on the example in the sibling file injector.tsx, 
 * but instead of memoizing the injector component, we show how memoizing 
 * the props to the injector works with multiple components, and between re-renders
 */

const initialData = { foo: 'adsf' };

type DataType = {
    foo: string;
};

type InjectorType = ComponentType<{ Component: ComponentType<DataType> }>;

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

const Injector = ({ Component, data }: { Component: ComponentType<DataType>, data: DataType }) => {
    return (
        <div>
            <p>This is the Injector</p>
            <Component foo={data.foo} />
        </div>
    )
};

function GetComponentInjector({ data }: { data: DataType }) {
    const [dataMemo, DecoratedInjector ] = useMemo(() => {
        console.log('inside useMemo', data);
        const DecoratedInjector: InjectorType = ({ Component }: { Component: ComponentType<DataType> }) => <Injector data={dataMemo} Component={Component} />
        return [ data, DecoratedInjector ];
    }, [data]);

    return <DecoratedInjector />;
}

// OK let's re-think this. If I were designing it from scratch, how would it work ? 
export default function Home() {
    const Injector = <GetComponentInjector data={initialData} />
    return (
        <>
            <p>This is the wrapper for the whole page</p>
            <Injector Component={MyComponent1} />
            {/* { initialData.foo = 'fdsa' } */}
            <Injector Component={MyComponent2} />
        </>
    )
}

let int = 0;

export function getServerSideProps() {
    return {
        props: {
            data: {
                foo: ++int,
            }
        }
    }
}
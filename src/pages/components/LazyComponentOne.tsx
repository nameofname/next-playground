export default function MyLazyComponent({ string }: { string: string;}) {
    return (
        <div>
            <h1>Lazy component 1</h1>
            <p>{string}</p>
        </div>
    )
}
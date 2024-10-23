export default function MyLazyComponent({ string }: { string: string;}) {
    return (
        <div>
            <h1>Lazy component 2</h1>
            <p>This is a totally differenet component</p>
            <p>{string}</p>
        </div>
    )
}
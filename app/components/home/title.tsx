
export default function Title(props: {title:string}) {

    return (
        <div className="mx-auto text-center m-2">
            <h1 className="text-xl font-bold text-orange-600">{props.title}</h1>
        </div>
       
    )
}
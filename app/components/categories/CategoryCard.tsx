
export default function CategoryCard (
    props:{name:string, image:string}
) {

    return(
        <div className="shadow bg-black px-2 py-3 w-full">
            <div className="flex flex-col items-center justify-center gap-2">
                <img src={props.image} alt={props.name} className="w-32 h-32 object-cover rounded-full" />
                <p className="text-white text-lg font-bold">{props.name}</p>
            </div>
        </div>
    )
}   
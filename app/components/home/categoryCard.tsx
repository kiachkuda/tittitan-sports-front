import Image from "next/image";

export default function CategoryCard(props: { image: string; title: string }) {
    return (
        <div className="min-w-full p-3">
            <div className="border">
                <Image src={props.image} alt={props.title} width={400} height={400}  />
            </div>

            <h4 className="font-bold text-lg">
                {props.title}
            </h4>
        </div>
    );
}
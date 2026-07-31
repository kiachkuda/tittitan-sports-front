import { StaticImageData } from "next/image";

export default function CategoryCard(props: { image: string; title: string }) {
    return (
        <div className="min-w-full p-3">
            <div className="border">
                <img src={props.image} alt={props.title}  />
            </div>

            {props.title}
        </div>
    );
}
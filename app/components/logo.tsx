
import Link from "next/link"
import Image from "next/image"

export default function Logo() {
    return (
        <Link href="/" className="flex p-2 flex-col md:flex-row md:items-center gap-3">
          <Image
            src="/titan-logo.jpg"
            alt="Titan Sports"
            width={55}
            height={55}
            className="rounded-md p-2"
          />

          <div>
            <h1 className="text-md md:text-lg font-bold hidden md:block">
              TITAN<span className="text-orange-600">SPORTSKE</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] hidden md:block text-gray-500">
              Your Sports Shop
            </p>
          </div>
        </Link>
    )
}
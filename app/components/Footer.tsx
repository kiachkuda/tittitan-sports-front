import Image from "next/image";
import Link from "next/link";
import {
  
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const shopLinks = [
  { name: "Jerseys", href: "/products" },
  { name: "Boots", href: "/boots" },
  { name: "Accessories", href: "/accessories" },
  { name: "Custom Jerseys", href: "/customize" },
];

const helpLinks = [
  { name: "Shipping", href: "#" },
  { name: "Returns", href: "#" },
  { name: "Size Guide", href: "#" },
  { name: "Contact Us", href: "#" },
];

const companyLinks = [
  { name: "About Us", href: "/" },
  { name: "Our Stores", href: "/" },
  { name: "Careers", href: "/" },
  { name: "Press", href: "/" },
];

const socialLinks = [
  { icon: Mail, href: "#" },
  { icon: Mail, href: "#" },
  { icon: Mail, href: "#" },
  { icon: Mail, href: "#" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-neutral-950 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/titan-logo.jpg"
              alt="Titan Sports"
              width={45}
              height={45}
              className="rounded-md p-2"
            />

            <div>
              <h2 className="text-xl font-black text-white">
                TITAN
                <span className="text-orange-600">SPORTSKE</span>
              </h2>

              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                Your Sports Shop
              </p>
            </div>
          </Link>

          <p className="mt-5 leading-7 text-gray-400">
            Premium football jerseys, boots and accessories for players,
            collectors and passionate fans.
          </p>

          <div className="mt-6 flex gap-3">
            {socialLinks.map(({ icon: Icon, href }, index) => (
              <Link
                key={index}
                href={href}
                className="rounded-full border border-gray-700 p-2 transition hover:border-orange-600 hover:bg-orange-600 hover:text-white"
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>

          <div className="mt-8 space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-orange-600" />
              Nairobi, Kenya
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-orange-600" />
              +254 700 000 000
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-orange-600" />
              info@titansportke.co.ke
            </div>
          </div>
        </div>

        {/* Shop */}
        <FooterColumn title="Shop" links={shopLinks} />

        {/* Help */}
        <FooterColumn title="Help" links={helpLinks} />

        {/* Company */}
        <FooterColumn title="Company" links={companyLinks} />
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Titan Sports. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="" className="hover:text-orange-600">
              Privacy
            </Link>

            <Link href="" className="hover:text-orange-600">
              Terms
            </Link>

            <Link href="" className="hover:text-orange-600">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-gray-400">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="transition hover:text-orange-600"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
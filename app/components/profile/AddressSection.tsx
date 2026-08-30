import { MapPin } from "lucide-react";
import { SectionHeader } from "./PersonalInformation";

export function AddressesSection(props: { addressess: any[] }) {
    return (
        <div className="space-y-6">
            <SectionHeader
                title="My Addresses"
                description="Manage your delivery addresses."
                action={
                    <button className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600">
                        + Add Address
                    </button>
                }
            />

            <div className="grid gap-4 md:grid-cols-2">
                {props.addressess.map((address) => {
                    return (
                        <AddressCard
                            title="Home"
                            name="Samuel Kiarie"
                            phone="+254 7XX XXX XXX"
                            address="Nairobi, Kenya"
                            details="Apartment / House details"
                            defaultAddress
                        />
                    )
                })}

            </div>
        </div>
    );
}


export function AddressCard({
    title,
    name,
    phone,
    address,
    details,
    defaultAddress,
}: {
    title: string;
    name: string;
    phone: string;
    address: string;
    details: string;
    defaultAddress?: boolean;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-orange-500" />
                    <h3 className="font-semibold">{title}</h3>
                </div>

                {defaultAddress && (
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                        Default
                    </span>
                )}
            </div>

            <div className="mt-4 space-y-1 text-sm text-slate-600">
                <p className="font-medium text-slate-900">{name}</p>
                <p>{phone}</p>
                <p>{address}</p>
                <p>{details}</p>
            </div>

            <div className="mt-5 flex gap-2">
                <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium hover:bg-slate-50">
                    Edit
                </button>

                <button className="rounded-lg border border-red-100 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50">
                    Remove
                </button>
            </div>
        </div>
    );
}
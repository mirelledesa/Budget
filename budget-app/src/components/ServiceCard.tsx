import type { ReactNode } from 'react';
import texts from '../data/ca.json';
import type { Service, ServiceId } from '../types/budget';
import { Price } from './Price'

interface ServiceCardProps {
    service : Service;
    isSelected: boolean;
    onToggle: (serviceId: ServiceId) => void;
    children?: ReactNode;
}
export const ServiceCard = ({ service, isSelected, onToggle, children }: ServiceCardProps) => (
    <article
    className={`rounded-2xl border-2 bg-white p-5 shadow-md transition-colors ${isSelected ? 'border-brand' : 'border-transparent' 
    }`}
    >
    <div className="flex flex-col gap-3 md:flex-row md-items-center md:justify-between">
        <div className="md:w-2/5">
        <h2 className="text-lg font-bold">{service.name}</h2>
        <p className="text-xs font-semibold">{service.description}</p>
        </div>
        <Price amount={service.price} />
        <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggle(service.id)} 
            arial-label={`${texts.services.add} ${service.name}`}
            className="h-4 w-4 accent-brand-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong"
            />
            {texts.services.add} 
        </label>
    </div>
    {isSelected && children && <div className="mt-4 space-y-2">{children}</div>}
    </article>
);
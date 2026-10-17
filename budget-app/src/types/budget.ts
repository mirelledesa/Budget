export type ServiceId = 'seo' | 'ads' | 'web' ;
export interface Service {
    id: ServiceId;
    name: string;
    description: string;
    price: number;
    configurable: boolean; 
} 
export interface WebConfig{
    pages: number;
    languages: number;
}
export interface ServicesConfig{
    services = Service[];
    webConfig = {
        constPerUnit: number;
        minPages: number;
        minlanguage: number;
    };
}
export interface ClientData{
    fullName: string;
    email: string;
    phone: string;
}
export interface Budget{
    id: string;
    createdAt: string;
    client: ClientData;
    selectedServices: ServiceId[];
    webConfig?: WebConfig;
    total: number;
}


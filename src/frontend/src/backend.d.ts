import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    age: string;
    country: string;
    name: string;
    timestamp: bigint;
    phone: string;
    medicalIssue: string;
}
export interface backendInterface {
    getInquiries(): Promise<Array<Inquiry>>;
    submitInquiry(name: string, country: string, phone: string, medicalIssue: string, age: string, timestamp: bigint): Promise<void>;
}

import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CustomerProfile {
    principal: Principal;
    displayName: string;
    email?: string;
    registrationTimestamp: Time;
}
export interface Booking {
    id: bigint;
    status: BookingStatus;
    serviceName: string;
    customer: Principal;
    date: string;
    timestamp: Time;
}
export type Time = bigint;
export enum BookingStatus {
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBooking(serviceName: string, date: string): Promise<bigint>;
    getCallerUserProfile(): Promise<CustomerProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCustomerBookings(): Promise<Array<Booking>>;
    getCustomerProfile(): Promise<CustomerProfile | null>;
    getUserProfile(user: Principal): Promise<CustomerProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    registerCustomer(displayName: string, email: string | null): Promise<void>;
    saveCallerUserProfile(profile: CustomerProfile): Promise<void>;
    updateBookingStatus(bookingId: bigint, newStatus: BookingStatus): Promise<void>;
}

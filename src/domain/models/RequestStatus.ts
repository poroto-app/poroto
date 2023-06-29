export const RequestStatuses = {
    PENDING: "PENDING",
    REJECTED: "REJECTED",
    FULFILLED: "FULFILLED",
};
export type RequestStatus =
    (typeof RequestStatuses)[keyof typeof RequestStatuses];

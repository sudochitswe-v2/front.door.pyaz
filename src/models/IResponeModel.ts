/* eslint-disable @typescript-eslint/no-unused-vars */
export interface ResponseModel<T> {
    hits: T[];
    query: string;
    processingTimeMs: number;
    limit: number;
    offset: number;
    estimatedTotalHits: number;
}
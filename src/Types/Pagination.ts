export interface Pagination {
    currentPage: number;
    firstPageUrl: string;
    lastPageUrl: string;
    nextPageUrl: string;
    prevPageUrl: string;
    lastPage: number;
    perPage: number;
    total: number;
}
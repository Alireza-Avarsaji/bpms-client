export class PageList<T>{
    isEmpty!: boolean;
    pageIndex!: number;
    totalPages!: number;
    totalCount!: number;
    pageSize!: number;
    hasPreviousPage!: boolean;
    hasNextPage!: boolean;
    items!: T[];
}

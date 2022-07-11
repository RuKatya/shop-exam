export interface InputProps {
    setCountry: Function
}

export interface SliderProps {
    numberOfPopulation: number[]
    setNumberOfPopulation: Function
}

export interface RowData {
    id: string;
    country: string;
    countryCode: string;
    latitude: number;
    longitude: number;
    name: string;
    population: number;
    region: string;
    regionCode: string;
    wikiDataId: string;
}

export interface Pagination {
    page: number
    page_size: Array<number>
}

export interface Sort {
    field_name: string
    sort_direction: "asc" | "desc"
}
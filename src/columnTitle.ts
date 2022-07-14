import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
    { field: "id", headerName: "item-id", width: 90 },
    { field: "country", headerName: "country", width: 100 },
    { field: "countryCode", headerName: "countryCode", width: 150 },
    { field: "latitude", headerName: "latitude", width: 100, type: "number" },
    { field: "longitude", headerName: "longitude", width: 160, type: "number" },
    { field: "name", headerName: "name", width: 160 },
    {
        field: "population",
        headerName: "population",
        width: 160,
        type: "number",
    },
    { field: "region", headerName: "region", width: 160 },
    { field: "regionCode", headerName: "regionCode", width: 160 },
    { field: "wikiDataId", headerName: "wikiDataId", width: 160 },
];
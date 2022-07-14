import { useCallback, useEffect, useState } from "react"; //REACT
import axios from "axios"; //AXIOS
import InputSearch from "./Components/InputSearch"; //COMPONENTS
import SliderInput from "./Components/SliderInput";
import { Pagination, RowData, Sort } from "./interface"; //IMTERFACE
import { Box } from "@mui/material"; //MUI
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { selectCountry } from "./store/reducers/countryReducer";
import { selectPopulation } from "./store/reducers/populationReducer";

const columns: GridColDef[] = [
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

function DataTableWrapper() {
  const country = useSelector(selectCountry);
  const numberOfPopulation = useSelector(selectPopulation);
  const [rowData, setRowData] = useState<Array<RowData>>([]);
  const [totalCount, settTotalCount] = useState<number>(0);
  const [pagination, setPagination] = useState<Pagination>({
    page: 3,
    page_size: [3, 5, 10],
  });
  const [sortData, setSortData] = useState<Sort>({
    field_name: "name",
    sort_direction: "asc",
  });

  // const filtered = (value: any) => value.countryCode === country;

  const filtered = useCallback(
    (value: any) => value.countryCode === country,
    [country]
  );

  useEffect(() => {
    const getData = async (
      pagination: Pagination,
      filters: Object,
      sorting: Sort
    ) => {
      const options = {
        method: "GET",
        url: "https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions",
        params: {
          maxPopulation: numberOfPopulation[1],
          minPopulation: numberOfPopulation[0],
          sort: sorting.field_name,
          countryIds: country,
        },
        headers: {
          "X-RapidAPI-Key":
            "2713a434c6msh599b35c76f97756p1a7fc2jsn1777ee9fbc59",
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          const countRow = response.data;
          const { data } = response.data;
          console.log(data);
          const filteredData = data.filter(filters);

          console.log(filteredData);

          setRowData(filteredData);
          setPagination(pagination);
          setSortData(sorting);
          settTotalCount(countRow.metadata.totalCount);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    getData(pagination, filtered, sortData);
  }, [numberOfPopulation, country, sortData, filtered, pagination]);

  return (
    <Box className="tableWrapper">
      <Box className="tableWrapper__filters">
        <SliderInput />
        <InputSearch />
      </Box>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rowData}
          columns={columns}
          rowCount={totalCount}
          initialState={{
            sorting: {
              sortModel: [
                { field: sortData.field_name, sort: sortData.sort_direction },
              ],
            },
          }}
          pageSize={pagination.page}
          onPageSizeChange={(newPageSize) =>
            setPagination({
              ...pagination,
              page: newPageSize,
            })
          }
          rowsPerPageOptions={pagination.page_size}
          pagination
          disableSelectionOnClick
          disableColumnFilter
        />
      </Box>
    </Box>
  );
}

export default DataTableWrapper;

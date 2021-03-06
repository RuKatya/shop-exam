import { useCallback, useEffect, useState } from "react"; //REACT
import axios from "axios"; //AXIOS
import InputSearch from "./Components/InputSearch"; //COMPONENTS
import SliderInput from "./Components/SliderInput";
import { Pagination, RowData, Sort } from "./interface"; //INTERFACE
import { columns } from "./columnTitle"; //COLUMNS
import { Box } from "@mui/material"; //MUI
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux"; //REDUX
import { selectCountry } from "./store/reducers/countryReducer";
import { selectPopulation } from "./store/reducers/populationReducer";

function DataTableWrapper() {
  const countryCode = useSelector(selectCountry);
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
  const filtered = useCallback(
    (location: RowData) => location.countryCode === countryCode,
    [countryCode]
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
          countryIds: countryCode,
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
          const filteredData = data.filter(filters);
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
  }, [numberOfPopulation, countryCode, sortData, filtered, pagination]);

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

import { FC } from 'react'
import "./table.css"

import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';


interface RowData {
    id: number;
    name: string;
    action: string;
}


interface tableProps {
    rowsData: RowData[];
    columnsData: GridColDef[]
}

const Table: FC<tableProps> = ({ rowsData, columnsData }) => {


    // const columns: GridColDef[] = [
    //     // { field: 'id', headerName: 'ID', "width": 150, "sortable": false },
    //     { field: 'name', headerName: 'Name', "sortable": false, flex: 7 },
    //     { field: 'action', headerName: 'Action', "sortable": false, flex: 3 },
    // ];

    // const rows: GridRowsProp<RowData> = [
    //     { id: 1, "name": "User.txt", "action": "Shared" },
    //     { id: 2, "name": "User.txt", "action": "Shared" }
    // ];

    return (
        <div className='table-parent'>
            <DataGrid
                rows={rowsData}
                columns={columnsData}
                disableColumnMenu
                disableColumnFilter
                rowSelectionModel={[]}
                getRowId={(row) => row.id}
                initialState={{ pagination: { paginationModel: { pageSize: 5 }, }, }}
                pageSizeOptions={[5, 10]}
                className="custom-header"
            />
        </div>
    )
}

export default Table;
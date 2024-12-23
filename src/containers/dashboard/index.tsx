import { useState, useEffect, useRef } from 'react'
import { faFolderOpen, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen as folderRegular, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiServices';

import "./dashboard.css"

import SideBar from '../../components/sidebar'
import DashBoardCard from '../../components/dashbord-card'
import Table from '../../components/table';
import UserForm from '../../components/user-form';
import FileUpload from "../../containers/dashboard/file-uploade/index"
import UserDrive from './user-drive';
import SharePopUp from './share-popup';
import DeletePopUp from './delete-popup';

import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const Dashboard = () => {

    interface feedData {
        logInName: string,
        fileShared: string,
        availableSpace: string,
        usedSpace: string,
        billing: string
    }


    interface RowData {
        id: number;
        name: string;
        action: string;
    }

    interface tableProps { rowsData: RowData[]; columnsData: GridColDef[] }

    const [sidebarItem, setSidebarItem] = useState("Dashboard")
    const [userFiles, setUserFiles] = useState([])
    const [userFeedData, setUserFeedData] = useState<feedData>({ logInName: "0", fileShared: "0", availableSpace: "0", usedSpace: "0", billing: "0" })
    const [showSharePopUp, setShowSharePopUp] = useState(false)
    const [shoDeletePopUp, setShowDeletePopUp] = useState(true)

    const [tableData, setTableData] = useState<tableProps>({ rowsData: [], columnsData: [] })

    const popUpRef = useRef<HTMLDivElement>(null);
    const deletePopUpRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        apiService.userFeed()
            .then((response: any) => {
                if (response.status) {
                    setUserFeedData(
                        { "logInName": response.data.userName, "fileShared": response.data.fileShared, "availableSpace": response.data.availableSpace, "usedSpace": response.data.usedSpace, "billing": response.data.bling }
                    )

                    const fileList = response.data.fileList;

                    const columnList = [
                        { field: 'name', headerName: 'Name', "sortable": false, flex: 7 },
                        { field: 'action', headerName: 'Action', "sortable": false, flex: 3 },
                    ]

                    // const rows: RowData[] = [
                    //     { id: 1, "name": "User.txt", "action": "Shared" },
                    //     { id: 2, "name": "User.txt", "action": "Shared" }
                    // ];

                    const rows: RowData[] = fileList.map((ele: any) => (
                        {
                            "id": ele._id,
                            "name": ele.fileIdentifierName || ele.fileName,
                            "action": ele.attachType
                        }
                    ))
                    setTableData(
                        {
                            columnsData: columnList,
                            rowsData: rows
                        }
                    )
                }
            })
            .catch((error) => { console.log(error) })

    }, []);


    useEffect(() => {

        if (sidebarItem == "Your Drive") {
            apiService.getUserFile()
                .then((userFiles: any) => {
                    setUserFiles(userFiles.data)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);

                })

        }

    }, [sidebarItem]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popUpRef.current && !popUpRef.current.contains(event.target as Node)) {
                setShowSharePopUp(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (deletePopUpRef.current && !deletePopUpRef.current.contains(event.target as Node)) {
                setShowDeletePopUp(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const onClickSideBar = (clickedItem: string) => {
        setSidebarItem(clickedItem)
    }

    return (
        <>
            <div className='dashboard-parent'>
                <div className='dash-section1'>
                    <SideBar onMenuClicked={onClickSideBar} />
                </div>
                {/* ************************************* Sidebar end ************************************* */}
                <div className='dash-section2'>
                    <div className={`${sidebarItem === "Dashboard" ? "" : "display-none"}`}>
                        <div className='dash-title'>
                            <div className='dash-title-child'>
                                <div>Welcome back, {userFeedData.logInName}</div>
                                <button className='logout-btn' onClick={() => navigate("/")}> logout</button>
                            </div>
                        </div>
                        <div className='sub-section'>
                            <div className='sub-section1'>
                                <div className='card-row1'>
                                    <div className='dashboard-card1'>
                                        <DashBoardCard title="Available Space" icon={folderRegular} val={userFeedData.availableSpace} />
                                    </div>
                                    <div className='dashboard-card1'>
                                        <DashBoardCard title="Used Space" icon={faFolderOpen} val={userFeedData.usedSpace} />
                                    </div>
                                </div>

                                <div className='card-row1'>
                                    <div className='dashboard-card1'>
                                        <DashBoardCard title="File Shared" icon={faShareFromSquare} val={userFeedData.fileShared} />
                                    </div>
                                    <div className='dashboard-card1'>
                                        <DashBoardCard title="Billing" icon={faPenToSquare} val={userFeedData.billing} />
                                    </div>
                                </div>
                            </div>
                            <div className='sub-section2'>
                                <div className='dash-title'>Recent Files</div>
                                <div className='dash-table'>

                                    {sidebarItem == "Dashboard" ?
                                        <Table rowsData={tableData.rowsData} columnsData={tableData.columnsData} />
                                        : ""
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ************************************* dashboard end ************************************* */}
                    <div className={`${sidebarItem === "Profile" ? "" : "display-none"}`}>
                        <UserForm />
                    </div>
                    <div className={`${sidebarItem === "Upload" ? "dash-upload-file" : "display-none"}`}>
                        <FileUpload />
                    </div>
                    <div className={`${sidebarItem === "Your Drive" ? "your-drive" : "display-none"}`}>
                        {/* <div className={shoDeletePopUp ? 'delete-popup' : "display-none"} ref={popUpRef}>
                            {
                                shoDeletePopUp ? <DeletePopUp setShowDeletePopUp={setShowDeletePopUp} /> : ""
                            }
                        </div> */}
                        <div className='your-drive-parent'>
                            <div className='your-drive-title'>Your Drive</div>

                            <div className={showSharePopUp ? '' : "display-none"} ref={popUpRef}>
                                {
                                    showSharePopUp ? <SharePopUp setShowSharePopUp={setShowSharePopUp} /> : ""
                                }
                            </div>


                            <div className={shoDeletePopUp ? '' : "display-none"} ref={deletePopUpRef}>
                                {
                                    shoDeletePopUp ? <DeletePopUp setShowDeletePopUp={setShowDeletePopUp} /> : ""
                                }
                            </div>

                            <div className='your-drive-item'>
                                {userFiles && userFiles.length > 0 ?
                                    userFiles.map((ele: any) =>
                                        <UserDrive fileName={ele.fileIdentifierName} fileSize={ele.fileSize} setShowSharePopUp={setShowSharePopUp} setShowDeletePopUp={setShowDeletePopUp} fileId={ele._id} />
                                    )
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
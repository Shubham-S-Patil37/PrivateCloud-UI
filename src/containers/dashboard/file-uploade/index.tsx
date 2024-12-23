import { useState, useRef, ChangeEvent } from 'react';
import axios from 'axios';

import uploadFiles from "./../../../assets/uploadfiles.png";
import "./file-upload.css";
import FileInfo from './file-info';

const FileUpload = () => {

    interface FilesDetails {
        fileName: string;
        fieSize: string;
    }

    const [selectedFilesDetails, setSelectedFilesDetails] = useState<FilesDetails[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const triggerFileInput = () => { if (fileInputRef.current) fileInputRef.current.click(); };

    const onFileSelected = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files;
        const fileObj = file?.[0];
        if (fileObj) {

            const fileSizeInMB: number = fileObj.size / (1024 * 1024);


            if (fileSizeInMB > 15) {
                alert("File size is too large. Please select a file less than 15MB");
            }
            else {
                const fileSize: string = fileSizeInMB.toFixed(2);

                const formData = new FormData();
                formData.append('file', fileObj);
                formData.append("fileName", fileObj.name)
                formData.append("fileSize", fileSize)

                // setSelectedFilesDetails({ fileName: fileObj.name, fieSize: fileSize, });

                setSelectedFilesDetails((prevFiles) => [...prevFiles, { fileName: fileObj.name, fieSize: fileSize, }]);
                const userId = localStorage.getItem("userId")?.toString();

                await axios.post('http://localhost:8080/file-upload/' + userId, formData, {

                    headers: {
                        // 'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json, text/plain, */*',
                    },
                });
            }
        }
    }



    console.log("++++++++++++++++++++ " + JSON.stringify(selectedFilesDetails))


    return (
        <div className="file-upload-parent">
            <div className="file-upload-child">
                <div className='file-upload-section-1'>
                    <div onClick={triggerFileInput}>
                        <img
                            src={uploadFiles}
                            style={{ width: "100%", height: "100%", cursor: "pointer" }}
                            alt="Upload Files"
                        />
                    </div>
                    <div className="file-upload-section2">
                        <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={onFileSelected} />
                    </div>
                </div>
                <div className='file-upload-section-2'>
                    {
                        selectedFilesDetails && selectedFilesDetails.length > 0 ?
                            selectedFilesDetails.map((ele: FilesDetails) =>
                                <FileInfo fileName={ele.fileName} fileSize={ele.fieSize} />
                            )
                            : ""
                    }
                </div>
            </div>
        </div>
    );
};

export default FileUpload;

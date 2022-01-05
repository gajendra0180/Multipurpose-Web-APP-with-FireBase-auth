import React from "react";
import AddFolderButton from "./Components/AddFolderButton";
import AddFileButton from "./Components/AddFileButton";
import { useAuth } from "./Contexts/AuthContext.js";
import Form1 from "./Components/Form1";
import Navbar from "./Components/Navbar";
import { useFolder } from "./Hooks/useFolder";
import "./Drive.css";
import Folder from "./Components/Folder";
import { useParams, useLocation } from "react-router-dom";
import File from "./Components/File";
import FolderBreadcrumbs from "./Components/FolderBreadcrumbs";
import { write } from "fs";
const LOCAL_STORAGE_KEY = "USERS_APP";

export const Drive = () => {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  var { currentUser, logout } = useAuth();
  var users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (currentUser == undefined) {
    currentUser = users;
  }

  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );

  return (
    <div className="background_image1">
      <Navbar signedIn={true} Dashboard={false} name={currentUser.email} />
      {/* <div style={{ marginLeft: "5vw", marginTop: "10vh" }}> */}

      <div className="d-flex flex-col  align-items-center">
        <FolderBreadcrumbs currentFolder={folder} />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.263)",
        }}
        className="px-5 py-0 mx-5 rounded-lg"
      >
        <AddFileButton currentFolder={folder} />
        <AddFolderButton currentFolder={folder} />
      </div>

      <div className="d-flex flex-col flex-wrap justify-center">
        {/* Child Folders start here */}
        <div className="child_folders">
          {childFolders && (
            <>
              {childFolders.map((childFolder) => (
                <div
                  key={childFolder.id}
                  style={{ maxWidth: "150px" }}
                  className="p-2 d-flex flex-wrap mx-5 my-3"
                >
                  <Folder folder={childFolder} />
                </div>
              ))}
            </>
          )}
        </div>
        {/* Child Folders ends here */}

        {/* Child Files start here */}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        <div className="child_files">
          {childFiles && (
            <div className="d-flex flex-wrap justify-center">
              {childFiles.map((childFile) => (
                <div
                  key={childFile.id}
                  style={{ maxWidth: "250px", marginRight: "2vw",marginTop:"2vh" }}
                  className="d-flex flex-wrap mx-5 my-3"
                >
                  <File file={childFile} />
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Child Files ends here */}
      </div>
    </div>
  );
};

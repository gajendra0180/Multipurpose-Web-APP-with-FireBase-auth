import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { ROOT_FOLDER } from "../Hooks/useFolder";
import { Link } from "react-router-dom";
export default function FolderBreadcrumbs({ currentFolder }) {
  let path = currentFolder == ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) {
    // console.log("Hi I am here", currentFolder);
    if (currentFolder.path) path = [...path, ...currentFolder.path];
  }
  return (
    <>
      <Breadcrumb
        className="flex-grow-1  my-11 px-5 py-4 rounded-lg mx-5 BreadCrumb"
        listProps={{ className: "bg-transparent pl-3 m-0" }}
        style={{ backgroundColor : "rgba(255, 255, 255, 0.763)"}}
      >
        {path.map(
          (folder, index) =>
            folder && (
              <Breadcrumb.Item
                className="text-truncate d-inline pl-6 text-3xl"
                key={folder.id}
                linkAs={Link}
                linkProps={{
                  to: {
                    pathname: folder.id ? `/folder/${folder.id}` : "/drive",
                    state: {
                      folder: { ...folder, path: path.slice(1, index) },
                    },
                  },
                }}
              >
                {folder.name}
              </Breadcrumb.Item>
            )
        )}
        {currentFolder && (
          <Breadcrumb.Item
            className="text-truncate d-inline pl-6 text-4xl text-black"
            active
          >
            {currentFolder.name}
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </>
  );
}
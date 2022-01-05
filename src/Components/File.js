import React from "react";

export default function File({ file }) {
  console.log(file);
  return (
    <a
      href={file.url}
      target="_blank"
      // className="btn btn-outline-dark text-truncate w-100 text-white"
      className="d-flex hover:text-black ease-in-out  duration-500 hover:scale-150 hover:bg-gray-100 text-amber-100 font-semibold py-2 px-4  border border-white-400 rounded shadow"
      style={{
        backgroundColor: "rgba(150, 150, 150, 0.663)",
        transform: "scale(1.15)",
        marginRight: "2vw",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {file.name}
    </a>
  );
}

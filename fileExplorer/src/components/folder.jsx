/* eslint-disable react/prop-types */
import { useState } from "react";

function Folder({ files }) {
  const [expanded, setExpanded] = useState(false);
  const [newFile, setNewFile] = useState({
    show: false,
    isFolder: false,
  });

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const toggleInput = (e, isFolder) => {
    setNewFile({
      show: true,
      isFolder,
    });
    e.stopPropogation();
  };

  const hideInput = () => {
    setNewFile({
      show: false,
      isFolder: false,
    });
  };

  const handleAdd = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      const newItem = {
        id: Date.now(), // Use timestamp for unique ID
        name: e.target.value.trim(),
        isFolder: newFile.isFolder,
        items: newFile.isFolder ? [] : undefined, // Folder should have an `items` array
      };
      files.items.unshift(newItem); // Directly modify the current folder's `items`
      hideInput();
    }
  };

  return (
    <div className="folder__list">
      {files.isFolder ? (
        <div>
          <div
            className="folder__container"
            onClick={toggleExpand}
            role="button"
            tabIndex={0}
          >
            <span className="folder__icon">{expanded ? "📂" : "📁"}</span>
            {files.name}
            <div className="folder__buttons--container">
              <button onClick={(e) => toggleInput(e, false)}>Add File</button>
              <button onClick={(e) => toggleInput(e, true)}>Add Folder</button>
            </div>
          </div>
          {newFile.show && (
            <div
              className="folder__input"
              style={{ marginLeft: "38px", gap: "10px" }}
            >
              <span>{newFile.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                placeholder={`Enter ${
                  newFile.isFolder ? "folder" : "file"
                } name`}
                onKeyDown={handleAdd}
                autoFocus
              />
              <button onClick={hideInput}>Cancel</button>
            </div>
          )}
          {expanded && (
            <div className="folder__items">
              {files.items.map((file) => (
                <Folder key={file.id} files={file} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="file__container">
          <span className="file__icon">📄</span> {files.name}
        </div>
      )}
    </div>
  );
}

export default Folder;

import React from "react";
import type { FilePickerProps } from "../Hooks/useAppContainer";
import useAppStylesCustom from "../Hooks/useAppStylesCustom";
const FilePicker: React.FC<FilePickerProps> = ({
  files,
  selectedFile,
  onChange,
  label,
}) => {
    const {FilePickerContainer, FileSelectContainer} = useAppStylesCustom();
  return (
    <div
      style={FilePickerContainer}
    >
      {label && (
        <label style={{ fontWeight: 500, fontSize: 20, marginRight: 20 }}>
          {label}
        </label>
      )}
      <select
        style={FileSelectContainer}
        value={selectedFile}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Select a file --</option>
        {files.map((file) => (
          <option key={file} value={file}>
            {file}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilePicker;

import type { SelectFileTypeProp } from "../AppType";
import useAppStylesCustom from "../Hooks/useAppStylesCustom";
const SelectFileType = ({
  selectedType,
  setSelectedType,
  setSelectedFile,
  setResult,
}: SelectFileTypeProp) => {
  const { selectConatinerStyle, labelStyle, selectStyle } =
    useAppStylesCustom();
  return (
    <div style={selectConatinerStyle}>
      <label style={labelStyle}>Select Type:</label>
      <select
        style={selectStyle}
        value={selectedType}
        onChange={(e) => {
          setSelectedType(e.target.value as "closest_pair" | "integer_mul");
          setSelectedFile("");
          setResult(null);
        }}
      >
        <option value="closest_pair">Closest Pair</option>
        <option value="integer_mul">Integer Multiplication</option>
      </select>
    </div>
  );
};
export default SelectFileType;

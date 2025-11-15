import type { CSSProperties } from "react";
import type {
  AppStyleContainerProps,
  AppStyleContainerReturnType,
} from "../AppType";

const useAppStylesCustom = ({
  selectedFile,
  isLoading,
}: AppStyleContainerProps = {}): AppStyleContainerReturnType => {
  const containerStyle: CSSProperties = {
    padding: 24,
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    width: "100vw",
    height: "100vh",
  };

  const labelStyle: CSSProperties = {
    display: "block",
    fontWeight: 600,
    marginBottom: 4,
  };

  const selectStyle: CSSProperties = {
    width: "100%",
    maxWidth: 600,
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: 4,
    marginBottom: 16,
  };

  const buttonStyle: CSSProperties = {
    padding: "8px 16px",
    backgroundColor: "#1d4ed8",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: selectedFile && !isLoading ? "pointer" : "not-allowed",
    opacity: selectedFile && !isLoading ? 1 : 0.6,
  };

  const resultContainerStyle: CSSProperties = {
    marginTop: 24,
    padding: 16,
    border: "1px solid #ccc",
    borderRadius: 4,
    backgroundColor: "black",
    overflowX: "auto",
  };
  const headingContainerStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  };
  const selectConatinerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: 10,
    justifySelf: "center",
  };
  const FilePickerContainer: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  };
  const FileSelectContainer: CSSProperties = {
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    width: "full",
  };
  return {
    containerStyle,
    labelStyle,
    selectStyle,
    buttonStyle,
    resultContainerStyle,
    headingContainerStyle,
    selectConatinerStyle,
    FilePickerContainer,
    FileSelectContainer,
  };
};
export default useAppStylesCustom;

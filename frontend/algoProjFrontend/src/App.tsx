import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FilePicker from "./components/FilePicker";
import useAppContainer from "./Hooks/useAppContainer";
import useAppStylesCustom from "./Hooks/useAppStylesCustom";
import SelectFileType from "./components/SelectFileType";
import Output from "./components/Output";
import useAppApis from "./Hooks/useAppApis";

const queryClient = new QueryClient();

const App = () => {
  const {
    selectedType,
    selectedFile,
    setSelectedFile,
    setResult,
    result,
    setSelectedType,
  } = useAppContainer();
  const { isLoading, isGetCallLoading, filesData, runMutation } = useAppApis({
    selectedFile,
    selectedType,
    setResult,
  });
  const { containerStyle, buttonStyle, headingContainerStyle } =
    useAppStylesCustom({ selectedFile, isLoading });
  return isGetCallLoading ? (
    <div style={{ padding: 16 }}>Loading files...</div>
  ) : (
    <div style={containerStyle}>
      <div style={headingContainerStyle}>
        <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          Divide & Conquer Runner
        </h1>
      </div>

      <SelectFileType
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        setSelectedFile={setSelectedFile}
        setResult={setResult}
      />

      <FilePicker
        files={filesData?.[selectedType] || []}
        selectedFile={selectedFile}
        onChange={setSelectedFile}
        label="Select File"
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={buttonStyle}
          onClick={() => runMutation.mutate()}
          disabled={!selectedFile || isLoading}
        >
          {isLoading ? "Running..." : "Run"}
        </button>
      </div>

      <Output result={result} />
    </div>
  );
};

const AppWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

export default AppWrapper;

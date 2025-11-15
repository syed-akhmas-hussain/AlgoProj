import type { OutputProp } from "../AppType";
import useAppStylesCustom from "../Hooks/useAppStylesCustom";

const Output = ({ result }: OutputProp) => {
  const { resultContainerStyle } = useAppStylesCustom();
  return (
    result && (
      <div style={resultContainerStyle}>
        <h2 style={{ fontWeight: "bold", marginBottom: 8 }}>Result:</h2>
        <pre style={{ fontSize: 12 }}>{JSON.stringify(result, null, 2)}</pre>
      </div>
    )
  );
};
export default Output;

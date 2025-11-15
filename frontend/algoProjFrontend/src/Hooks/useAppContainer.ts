import { useState } from "react";
import type { UseAppContainerReturnType } from "../AppType";

const useAppContainer = (): UseAppContainerReturnType => {
  const [selectedType, setSelectedType] = useState<
    "closest_pair" | "integer_mul"
  >("closest_pair");
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  return {
    result,
    setSelectedType,
    setSelectedFile,
    selectedFile,
    setResult,
    selectedType
  };
};
export default useAppContainer;

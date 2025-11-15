import type { Dispatch, SetStateAction, CSSProperties } from "react";
import type { UseMutationResult } from "@tanstack/react-query";
export interface FilePickerProps {
  files: string[];
  selectedFile: string;
  onChange: (file: string) => void;
  label?: string;
}
export type OutputProp = {
  result: any;
};
export type SelectFileTypeProp = {
  selectedType: "closest_pair" | "integer_mul";
  setSelectedType: Dispatch<SetStateAction<"closest_pair" | "integer_mul">>;
  setSelectedFile: Dispatch<SetStateAction<string>>;
  setResult: Dispatch<SetStateAction<any>>;
};
export type DatasetFiles = Record<"closest_pair" | "integer_mul", string[]>;
export type UseAppContainerReturnType = {
  result: any;
  setSelectedType: Dispatch<SetStateAction<"closest_pair" | "integer_mul">>;
  setSelectedFile: Dispatch<SetStateAction<string>>;
  selectedType: "closest_pair" | "integer_mul";
  selectedFile: string;
  setResult: Dispatch<SetStateAction<any>>;
};
export type AppApisProp = {
  selectedType: "closest_pair" | "integer_mul";
  selectedFile: string;
  setResult: Dispatch<SetStateAction<any>>;
};
export type AppApisReturnType = {
  isLoading: boolean;
  isGetCallLoading: boolean;
  filesData: DatasetFiles | undefined;
  runMutation: UseMutationResult<any, Error, void, unknown>;
};
export type AppStyleContainerProps = {
  selectedFile?: string;
  isLoading?: boolean;
};
export type AppStyleContainerReturnType = Record<
  | "containerStyle"
  | "labelStyle"
  | "selectStyle"
  | "buttonStyle"
  | "resultContainerStyle"
  | "headingContainerStyle"
  | "selectConatinerStyle"
  | "FilePickerContainer"
  | "FileSelectContainer",
  CSSProperties
>;

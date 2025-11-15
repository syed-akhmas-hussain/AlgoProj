import { useMutation, useQuery } from "@tanstack/react-query";
import type { AppApisProp, AppApisReturnType, DatasetFiles } from "../AppType";
import axios from "axios";

const useAppApis = ({
  selectedFile,
  selectedType,
  setResult,
}: AppApisProp): AppApisReturnType => {
  const { data: filesData, isLoading: isGetCallLoading } = useQuery<
    DatasetFiles,
    Error
  >({
    queryKey: ["files"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/files");
      return res.data;
    },
  });
  //Post call for triggering algorithms
  const runMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post("http://localhost:3000/run", {
        type: selectedType,
        filename: selectedFile,
      });
      return res.data;
    },
    onSuccess: (data) => setResult(data),
  });

  const isLoading = runMutation.status === "pending";
  return { isLoading, isGetCallLoading, filesData, runMutation };
};
export default useAppApis;

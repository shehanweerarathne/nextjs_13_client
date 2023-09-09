import { CircularProgress } from "@mui/material";

export default function Loading() {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Make the container cover the entire viewport height
  };

  return (
    <div style={style}>
      <CircularProgress />
    </div>
  );
}

import { Box } from "@mui/material";

export const Card = ({ children, sx }) => {
  return (
    <Box
      sx={{
        ...sx,
        width: "162px",
        borderRadius: "12px",
        border: "solid 1px rgba(0, 0, 0, 0.1)",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        p: "8px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        flexGrow: 1,
      }}
    >
      {children}
    </Box>
  );
};

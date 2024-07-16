import { useTheme, useMediaQuery } from "@mui/material";

const useBreakpoints = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));
  const isXl = useMediaQuery(theme.breakpoints.down("xl"));

  return { isXs, isSm, isMd, isLg, isXl };
};

export default useBreakpoints;

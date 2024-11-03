import { createTheme } from "@mui/material/styles";
import Colors from "constants/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.Primary,
    },
    secondary: {
      main: Colors.Secondary,
    },
  },
});

export default theme;

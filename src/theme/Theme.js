import { blue, red, blueGrey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        // primary: {
        //     main: red[500], // works
        // },
        backDrop: {
            main: blueGrey[900]
        },
        text: {
            // main: red[300],
            // secondary: red[400],
            // disabled: red[900],
            subText: "#c4c4c4"
        }
    },
    typography: {
        fontFamily: [
            "Russo One",
            "Roboto",
            "Linden Hill"
        ],
        // span: {
        //     fontFamily: "Russo One"
        // },
        button: {
           letterSpacing: "2px"
        }
    },
    
})
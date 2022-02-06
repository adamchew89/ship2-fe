import "@fontsource/raleway";
import "@fontsource/trirong";
import { ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

/**
 * Colors
 */

export const Black = "#000000";
export const White = "#FFFFFF";

export const Midnight = "#344B59";

export const Steel = "#7794A6";
export const Steel40 = "#BBC9D2";
export const Steel30 = "#DDE4E9";
export const Steel20 = "#EBEFF2";
export const Steel10 = "#F8FAFB";

export const Sage = "#B0BFB2";
export const Sage40 = "#D7DFD8";
export const Sage30 = "#EBEFEC";
export const Sage20 = "#F3F5F3";
export const Sage10 = "#FBFCFB";

export const Ivory = "#F2EBDF";
export const Ivory40 = "#F7F3EC";
export const Ivory30 = "#F8F5EF";
export const Ivory20 = "#FCFAF7";
export const Ivory10 = "#FDFCFA";

export const Pink = "#F2C9C9";
export const Pink40 = "#F8E4E4";
export const Pink30 = "#FCF1F1";
export const Pink20 = "#FDF7F7";
export const Pink10 = "#FEFCFC";

export const Red = "#F27166";

/**
 * Fonts
 */

export const H1Font = {
  fontFamily: "Trirong",
  fontWeight: 275,
  fontSize: "2rem",
  lineHeight: "2.5rem",
  color: Midnight,
};

export const Subtitle1Font = {
  fontFamily: "Raleway",
  fontWeight: 400,
  fontSize: "1.125rem",
  lineHeight: "1.5rem",
  color: Midnight,
};

export const Subtitle2Font = {
  fontFamily: "Trirong",
  fontStyle: "italic",
  fontWeight: 400,
  fontSize: "0.75rem",
  lineHeight: "1rem",
  color: Steel,
};

export const Body1Font = {
  fontFamily: "Raleway",
  fontWeight: 700,
  fontSize: "0.875rem",
  lineHeight: "1.5rem",
  color: Steel,
};

export const Body2Font = {
  fontFamily: "Raleway",
  fontWeight: 400,
  fontSize: "0.875rem",
  lineHeight: "1.5rem",
  color: Midnight,
};

export const ButtonFont = {
  fontFamily: "Raleway",
  fontWeight: 700,
  fontSize: "0.75rem",
  lineHeight: "1rem",
  letterSpacing: "0.05em",
  color: Midnight,
};

export const CaptionFont = {
  fontFamily: "Raleway",
  fontWeight: 700,
  fontSize: "0.75rem",
  lineHeight: "0.75rem",
  color: Steel,
};

/**
 * Theme
 */

export const baseTheme: ThemeOptions = {
  palette: {
    primary: {
      main: Midnight,
      contrastText: White,
    },
    secondary: {
      main: Steel,
      contrastText: White,
    },
  },
  typography: {
    fontFamily: "Raleway, Trirong, Arial",
    h1: H1Font,
    subtitle1: Subtitle1Font,
    body1: Body1Font,
    body2: Body2Font,
    button: ButtonFont,
    caption: CaptionFont,
  },
  spacing: 4,
  // breakpoints: {},
  // zIndex: {},
  // transitions: {},
  components: {
    MuiTextField: {
      defaultProps: {
        InputLabelProps: { shrink: false },
        InputProps: {
          sx: {
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: Steel,
            fontSize: "0.875rem",
            lineHeight: "1.5rem",
            color: Steel,
          },
        },
        variant: "outlined",
        color: "primary",
        sx: {
          color: Steel40,
          fontSize: "0.875rem",
          marginBottom: "1rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            borderRadius: "0.25rem",
            backgroundColor: Steel30,
            color: White,
          },
        },
      },
      defaultProps: {
        variant: "contained",
        color: "primary",
        sx: { height: "3rem" },
      },
    },
  },
};

export default createTheme(baseTheme);

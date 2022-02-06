import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import PlaceHolderImage1 from "z@Assets/images/placeholder-image1.jpeg";
import * as ThemeValues from "z@Themes/theme";

interface TopNavBarProps {
  drawerToggle: () => void;
}

function TopNavBar(props: TopNavBarProps) {
  return (
    <AppBar
      data-testid="TopNavBar"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        padding: "1rem",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "flex-end",
          gap: "1.5rem",
        }}
      >
        <Avatar
          src={PlaceHolderImage1}
          alt="Placeholder Image1"
          sx={{ width: "2.5rem", height: "2.5rem" }}
        />
        <IconButton
          data-testid="ShowSideNavDrawerBtn"
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{
            width: "2.5rem",
            height: "2.5rem",
            backgroundColor: ThemeValues.Midnight,
          }}
          onClick={props.drawerToggle}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default TopNavBar;

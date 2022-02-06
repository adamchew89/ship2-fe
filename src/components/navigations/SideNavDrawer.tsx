import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import PlaceHolderImage1 from "z@Assets/images/placeholder-image1.jpeg";
import { action as ActionAuth } from "z@Stores/slices/auths/slice-auth";
import { action as ActionAccount } from "z@Stores/slices/auths/slice-auth";
import { useAppSelector, useAppDispatch } from "z@Stores/utils/hooks";
import Theme, * as ThemeValues from "z@Themes/theme";

export const menuItems = [
  {
    id: "CreateAccountPageBtn",
    url: "/accounts/new",
    label: "Create Account",
    isPublic: false,
  },
];

function SideNavDrawer() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.authState);

  const logoutClickHander = () => {
    dispatch(ActionAuth.logout(undefined));
    dispatch(ActionAccount.clearAccounts(undefined));
    navigate("/");
  };

  const navigateHandler = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      data-testid="SideNavDrawer"
      component={List}
      sx={{
        width: "100vw",
        height: "100%",
        marginTop: "2em",
        backgroundColor: ThemeValues.White,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        [Theme.breakpoints.up("sm")]: {
          maxWidth: "20rem",
        },
      }}
    >
      <ListItem disablePadding>
        <ListItemButton
          data-testid="LandingPageBtn"
          onClick={() => navigateHandler("/")}
          sx={{ justifyContent: "center" }}
        >
          <ListItemAvatar>
            <Avatar
              src={PlaceHolderImage1}
              alt="Placeholder Image1"
              sx={{ width: "5rem", height: "5rem" }}
            />
          </ListItemAvatar>
        </ListItemButton>
      </ListItem>
      {!user && (
        <ListItem disablePadding>
          <ListItemButton
            data-testid="LoginPageBtn"
            onClick={() => navigateHandler("/login")}
          >
            <ListItemText
              primary="Login"
              primaryTypographyProps={{
                variant: "h1",
                sx: { textAlign: "center" },
              }}
            />
          </ListItemButton>
        </ListItem>
      )}
      {menuItems.map(
        (item) =>
          /**
           * Show menu items if:
           * - Item has 'isPublic' or;
           * - 'user' exists
           */
          (item.isPublic || user) && (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                data-testid={item.id}
                onClick={() => navigateHandler(item.url)}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    variant: "h1",
                    sx: { textAlign: "center" },
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
      )}
      {!!user && (
        <ListItem disablePadding sx={{ alignSelf: "flex-end" }}>
          <ListItemButton data-testid="LogoutBtn" onClick={logoutClickHander}>
            <ListItemText secondary="Log Out" />
          </ListItemButton>
        </ListItem>
      )}
    </Box>
  );
}

export default SideNavDrawer;

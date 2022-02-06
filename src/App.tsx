import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import SideNavDrawer from "z@Components/navigations/SideNavDrawer";
import TopNavBar from "z@Components/navigations/TopNavBar";
import AccountDetailsPage from "z@Pages/Account/AccountDetails/AccountDetailsPage";
import LandingPage from "z@Pages/Landing/LandingPage";
import LoginPage from "z@Pages/Login/LoginPage";
import {
  action as ActionAuth,
  asyncVerifyTokenThunk,
} from "z@Stores/slices/auths/slice-auth";
import { useAppDispatch, useAppSelector } from "z@Stores/utils/hooks";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authState);

  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

  /**
   * Listens to changes in 'location':
   * - Closes drawer when a change occurs in 'location'
   */
  React.useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  /**
   * Listens to changes in 'dispatch':
   * - Initialize user token from localstorage when 'dispatch' is ready
   */
  React.useEffect(() => {
    dispatch(ActionAuth.init(undefined));
    dispatch(asyncVerifyTokenThunk());
  }, [dispatch]);

  const drawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  const drawerCloseHandler = () => {
    setDrawerOpen(false);
  };

  const drawerOpenHandler = () => {
    setDrawerOpen(true);
  };

  return (
    <Box data-testid="App">
      <TopNavBar drawerToggle={drawerToggle} />
      <Box component="main">
        <Routes>
          {!!user && (
            <>
              <Route path="/accounts/new" element={<AccountDetailsPage />} />
              <Route path="/accounts/:id" element={<AccountDetailsPage />} />
            </>
          )}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LandingPage />} />
          {!!user && <Route path="*" element={<LandingPage />} />}
          {!user && <Route path="*" element={<LoginPage />} />}
        </Routes>
      </Box>
      <SwipeableDrawer
        open={drawerOpen}
        anchor="right"
        onOpen={drawerOpenHandler}
        onClose={drawerCloseHandler}
      >
        <SideNavDrawer />
      </SwipeableDrawer>
    </Box>
  );
}

export default App;

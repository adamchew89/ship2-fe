import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Carousel from "z@Components/carousels/Carousel";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "z@Stores/utils/hooks";
import { asyncGetAllAccountThunk } from "z@Stores/slices/accounts/slice-account";
import * as ThemeValues from "z@Themes/theme";
import { Account } from "z@Types/type-account";

const uploads = [
  { _id: "0", uri: "https://picsum.photos/id/237/200/300" },
  { _id: "1", uri: "https://picsum.photos/id/1003/200/300" },
  { _id: "2", uri: "https://picsum.photos/id/1004/200/300" },
  { _id: "3", uri: "https://picsum.photos/id/101/200/300" },
];

function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.authState);
  const { accounts } = useAppSelector((state) => state.accountState);

  const refreshAccountsList = () => {
    dispatch(asyncGetAllAccountThunk());
  };

  const onEditAccountHandler = (id: number) => {
    navigate(`/accounts/${id}`);
  };

  const onCreateAccountHandler = () => {
    navigate("/accounts/new");
  };

  return (
    <Box
      data-testid="LandingPage"
      sx={{
        height: "100%",
        overflowX: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Box sx={{ position: "absolute", top: 0, left: 0, width: "100vw" }}>
        <Carousel settings={{ autoplay: true }}>
          {uploads &&
            uploads.map((upload: { _id: string; uri: string }) => (
              <Box
                data-testid="PublicUploads"
                key={upload._id}
                component="img"
                src={upload.uri}
                sx={{
                  width: "100vw",
                  height: "85vh",
                  objectFit: "cover",
                  objectPosition: "center center",
                  [ThemeValues.default.breakpoints.up("sm")]: {
                    width: `${ThemeValues.default.breakpoints.values.md}px !important`,
                  },
                }}
              />
            ))}
        </Carousel>
      </Box>
      <Box
        sx={{
          zIndex: 1000,
          minHeight: "95vh",
          padding: "0rem 2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
          backgroundColor: ThemeValues.Ivory,
          opacity: "70%",
        }}
      >
        <Typography variant="caption" color="primary">
          Demo Ship 2.0 PWA
        </Typography>
        <Typography variant="h1">
          SparesCNX
          <br />
          <br />
        </Typography>
        <Button
          data-testid="CreateAccountPageLink"
          onClick={onCreateAccountHandler}
          sx={{
            width: 160,
            height: 60,
            marginBottom: "2rem",
          }}
        >
          CREATE ACCOUNT
        </Button>
        <Box
          sx={{
            marginBottom: "1rem",
            borderStyle: "solid",
            borderWidth: 1,
            width: 0,
            padding: 0,
            height: 141,
            borderColor: ThemeValues.Steel,
          }}
        />
        <Typography
          variant="caption"
          color="secondary"
          sx={{ marginBottom: "1rem" }}
        >
          HAPPY TIGER NEW YEAR!!!
        </Typography>
        <Box
          sx={{
            marginBottom: "1rem",
            borderStyle: "solid",
            borderWidth: 1,
            width: 0,
            height: 141,
            borderColor: ThemeValues.Steel,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Typography variant="h1" textAlign="center">
          Accounts List
        </Typography>
        {!user && <Button>Please login to view accounts list</Button>}
        {accounts &&
          accounts.map((account: Account) => (
            <Button
              key={account._id}
              color="secondary"
              onClick={() => {
                onEditAccountHandler(account._id!);
              }}
            >
              {account.name}
            </Button>
          ))}
        {!!user && (
          <Button onClick={refreshAccountsList}>Refresh Accounts List</Button>
        )}
      </Box>
    </Box>
  );
}

export default LandingPage;

import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import Theme from "z@Themes/theme";
import { Account } from "z@Types/type-account";

export interface SlideProps {
  user?: Account;
  imageUrl?: string;
  sentiment?: string;
  ActionIcon?: JSX.Element;
  cardSx?: SxProps;
  onActionClick?: () => void;
}

function Slide(props: SlideProps) {
  return (
    <Card
      data-testid="Slide"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        margin: 4,
        ...props.cardSx,
      }}
    >
      {props.user && (
        <CardHeader
          avatar={<Avatar>{!!props.user && props.user.name.charAt(0)}</Avatar>}
          title={
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" color="text.secondary">
                {props.user?.name}
              </Typography>
            </Box>
          }
          action={
            <IconButton onClick={props.onActionClick}>
              {props.ActionIcon || <MoreVertIcon />}
            </IconButton>
          }
        />
      )}
      {props.imageUrl && (
        <CardMedia
          component="img"
          image={props.imageUrl}
          alt={props.imageUrl}
          sx={{
            height: 200,
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      )}
      <CardContent
        sx={{
          height: "100%",
          [Theme.breakpoints.up("sm")]: {
            minHeight: 100,
          },
        }}
      >
        <Typography variant="body2">
          {_.truncate(props.sentiment, { length: 150, omission: "..." })}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Slide;

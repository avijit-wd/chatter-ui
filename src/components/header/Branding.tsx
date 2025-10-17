import { Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import router from "../Routes";

const Branding = () => {
  return (
    <>
      <ChatBubbleOutlineIcon
        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
      />

      <Typography
        variant="h6"
        noWrap
        component="a"
        onClick={() => router.navigate("/")}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Chatter
      </Typography>
    </>
  );
};
export default Branding;

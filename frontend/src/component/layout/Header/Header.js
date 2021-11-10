import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import FavoriteBorderSharpIcon from "@material-ui/icons/FavoriteBorderSharp";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";

const theme = createTheme({
  typography: {
    h3: {
      fontFamily: "'Italiana', serif;",
      color: "#1d1d1d",
      letterSpacing: 3,
    },
  },
});

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: "#f2f1ef" }}>
        <Toolbar style={{ minHeight: 80, justifyContent: "space-between" }}>
          <ThemeProvider theme={theme}>
            <Typography
              variant="h3"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              TENET
            </Typography>
          </ThemeProvider>
          <Box>
            <SearchBar></SearchBar>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show items in cart"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <ShoppingCartOutlinedIcon style={{ color: "black" }} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show items in wishlist"
              color="inherit"
            >
              <Badge badgeContent={12} color="error">
                <FavoriteBorderSharpIcon style={{ color: "black" }} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircleOutlinedIcon style={{ color: "black" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}

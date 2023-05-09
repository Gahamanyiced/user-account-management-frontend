import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Button,
  Stack,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useNavigate } from "react-router-dom";
import CircularImage from "./Avatar";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("none");
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#70d8bd !important",
        },
        "& .pro-menu-item.active": {
          color: "#70d8bd !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Stack alignItems="center">
                <IconButton
                  sx={{ float: "right" }}
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <MenuOutlinedIcon />
                </IconButton>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml={2}
                  mt={4}
                  mb={0}
                >
                  <Typography
                    variant="h3"
                    sx={{ textAlign: "center" }}
                    color={colors.grey[100]}
                  >
                    USER
                  </Typography>
                </Box>
              </Stack>
            )}
          </MenuItem>

          {!isCollapsed && (
            <>
              <Stack alignItems="center" mb={6}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <CircularImage
                    //   alt="profile-user"
                    //   width="100px"
                    //   height="100px"

                    //                   style={{ cursor: "pointer", borderRadius: "50%" }}
                    src={props.photo}
                  />
                </Box>
                {!props.admin && props.status === "UNVERIFIED" && (
                  <Button
                    color="secondary"
                    sx={{
                      backgroundColor: "secondary.main",
                      color: "white !important",
                      fontWeight: "bold",
                      fontSize: "12px",
                      padding: "10px 20px",
                      width: "50%",
                      my: 5,
                    }}
                    onClick={() => {
                      props.handleChangePanel("verify");
                    }}
                  >
                    Verify your account{" "}
                  </Button>
                )}

                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {props.name}
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    {props.role}
                  </Typography>
                </Box>
                <Box></Box>
              </Stack>
              <Stack
                alignItems="center"
                paddingLeft={isCollapsed ? undefined : "10%"}
              >
                <Box onClick={() => props.handleChangePanel("dash")}>
                  <Item
                    title="Dashboard"
                    to="/dash"
                    icon={<HomeOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
                {/* {props.admin !== false && (
                  <Box onClick={() => props.handleChangePanel("verify")}>
                    <Item
                      title="Verify Accounts"
                      to="/verify"
                      icon={<PeopleOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </Box>
                )} */}

                {props.admin && (
                  <Box onClick={() => props.handleChangePanel("verify")}>
                    <Item
                      title="Verify Accounts"
                      to="/verify"
                      icon={<PeopleOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </Box>
                )}
                <Button
                  color="secondary"
                  sx={{
                    backgroundColor: "secondary.dark",
                    color: "white !important",
                    fontWeight: "bold",
                    fontSize: "12px",
                    padding: "10px 20px",
                    width: "60%",
                    my: 5,
                  }}
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                >
                  Log out
                </Button>
              </Stack>
            </>
          )}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

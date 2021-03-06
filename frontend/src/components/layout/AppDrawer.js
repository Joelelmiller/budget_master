import React, { Fragment } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import BarChartIcon from "@material-ui/icons/BarChart";
import Link from "@material-ui/core/Link";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import { Route, Switch, Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

import AddExpense from "../expenses/AddExpense";
import AddIncome from "../income/AddIncome";
import Expenses from "../expenses/Expenses";
import Income from "../income/Income";
import ExpenseByCategory from "../expenses/ExpenseByCategory";
import ExpenseByOwner from "../expenses/ExpenseByOwner";
import IncomeByCategory from "../income/IncomeByCategory";
import IncomeByOwner from "../income/IncomeByOwner";
import IncomeVsExpense from "../graphs/IncomeVsExpense";
import Login from "../accounts/Login";
import Register from "../accounts/Register";
import PrivateRoute from "../common/PrivateRoute";
import ResponsiveLine from "../common/ResponsiveLine";
import LogOut from "./LogOut";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  alertSpacer: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 500,
  },
}));

export default function AppDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const user = auth.user;

  const authLinks = (
    <Fragment>
      <List>
        <Link
          underline="none"
          component={RouterLink}
          to="/income-vs-expenses"
          color="inherit"
        >
          <ListItem button>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Expenses Vs Income" />
          </ListItem>
        </Link>
        <Divider />
        <Link
          underline="none"
          component={RouterLink}
          to="/income"
          color="inherit"
        >
          <ListItem button>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Enter Income" />
          </ListItem>
        </Link>
        <Link
          underline="none"
          component={RouterLink}
          to="/manage-income"
          color="inherit"
        >
          <ListItem button>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Income" />
          </ListItem>
        </Link>

        <Link
          underline="none"
          component={RouterLink}
          to="/monthly-income-by-category"
          color="inherit"
        >
          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Income by Category" />
          </ListItem>
        </Link>
        <Link
          underline="none"
          component={RouterLink}
          to="/monthly-income-by-owner"
          color="inherit"
        >
          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Income by Owner" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link underline="none" component={RouterLink} to="/" color="inherit">
          <ListItem button>
            <ListItemIcon>
              <CreditCardIcon />
            </ListItemIcon>
            <ListItemText primary="Enter Expense" />
          </ListItem>
        </Link>
        <Link
          underline="none"
          component={RouterLink}
          to="/manage-expenses"
          color="inherit"
        >
          <ListItem button>
            <ListItemIcon>
              <CreditCardIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Expenses" />
          </ListItem>
        </Link>
        <Link
          underline="none"
          component={RouterLink}
          to="/monthly-expense-by-category"
          color="inherit"
        >
          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Expense by Category" />
          </ListItem>
        </Link>
        <Link
          underline="none"
          component={RouterLink}
          to="/monthly-expense-by-owner"
          color="inherit"
        >
          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Expense by Owner" />
          </ListItem>
        </Link>
      </List>
      <LogOut />
    </Fragment>
  );

  const guestLinks = (
    <List>
      <Link
        underline="none"
        component={RouterLink}
        to="/register"
        color="inherit"
      >
        <ListItem button>
          <ListItemIcon>
            <AccessibilityNewIcon />
          </ListItemIcon>
          <ListItemText primary="Register User" />
        </ListItem>
      </Link>
      <Link underline="none" component={RouterLink} to="/login" color="inherit">
        <ListItem button>
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
      </Link>
    </List>
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Budget Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        onClick={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {isAuthenticated ? authLinks : guestLinks}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div onClick={handleDrawerClose}>
          <Switch>
            <PrivateRoute exact path="/" component={AddExpense} />
            <PrivateRoute exact path="/income" component={AddIncome} />
            <PrivateRoute
              exact
              path="/income-vs-expenses"
              component={IncomeVsExpense}
            />
            <PrivateRoute
              exact
              path="/monthly-expense-by-category"
              component={ExpenseByCategory}
            />
            <PrivateRoute
              exact
              path="/monthly-expense-by-owner"
              component={ExpenseByOwner}
            />
            <PrivateRoute
              exact
              path="/monthly-income-by-category"
              component={IncomeByCategory}
            />
            <PrivateRoute
              exact
              path="/monthly-income-by-owner"
              component={IncomeByOwner}
            />
            <PrivateRoute exact path="/manage-expenses" component={Expenses} />
            <PrivateRoute exact path="/manage-income" component={Income} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </main>
    </div>
  );
}

import React, { useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header1 from "../../componentsc/Header";
import StatBox from "../../componentsc/StatBox";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Sidebar from "../global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import Cardata from "../../pages/admindashboard/Cardata"
import Revenue from "../../pages/admindashboard/Revenue"
import UserBookings from "../../pages/admindashboard/UserBookings"
import Usersdata from "../../pages/admindashboard/Usersdata"

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [theme1, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  
  const handleLogout = () => {
    window.location ="/BookingCar";
  };
  
  const onclick = () => {
    window.location ="/";
  };
  
  const onclick2 = () => {
    window.location ="/Dashboard";
  };
  
  
  const handleLogout1 = () => {
    if (localStorage.getItem('email')) {
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('seller');
      localStorage.removeItem('customer');
      localStorage.removeItem('admin');
      localStorage.removeItem('id');
      window.location = "/";
    }
    else{
      window.location = "/afterHome";
    }
    };
  
  const handleLogout2 = () => {
		window.location ="/addCar";
	};

  return (
    <Box m="20px" >
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme1}>
          <div>
            <CssBaseline />
            
            {/* <Topbar setIsSidebar={setIsSidebar} /> */}
            <main className="content" style={{ display: "flex" }}>
              {isSidebar && <Sidebar isSidebar={isSidebar} />}
              <Box flexGrow={1}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Header1
                    title="Welcome back admin!!!"
                    subtitle=""
                  />

                  <Box></Box>
                </Box>

                {/* GRID & CHARTS */}
                <Box 
                      paddingLeft="20px"
                  display="grid"
                  gridTemplateColumns="repeat(12, 1fr)"
                  gridAutoRows="140px"
                  gap="20px"
                >
                  {/* ROW 1 */}
                  {/* <Box
                  
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <StatBox
                    
                      title="12,361"
                      subtitle="Emails Sent"
                      // progress="0.75"
                      // increase="+14%"
                      icon={
                        <MonetizationOnIcon
                        
                          sx={{
                            color: colors.greenAccent[600],
                            fontSize: "26px",
                          }}
                        />
                      }
                    />
                  </Box>
                  <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <StatBox
                      title="431,225"
                      subtitle="Sales Obtained"
                      // progress="0.50"
                      // increase="+21%"
                      icon={
                        <PointOfSaleIcon
                          sx={{
                            color: colors.greenAccent[600],
                            fontSize: "26px",
                          }}
                        />
                      }
                    />
                  </Box>
                  <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <StatBox
                      title="32,441"
                      subtitle="New Clients"
                      // progress="0.30"
                      // increase="+5%"
                      icon={
                        <PersonAddIcon
                          sx={{
                            color: colors.greenAccent[600],
                            fontSize: "26px",
                          }}
                        />
                      }
                    />
                  </Box>
                  <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <StatBox
                      title="12,361"
                      subtitle="Car Bookings"
                      // progress="0.75"
                      // increase="+14%"
                      icon={
                        <DirectionsCarIcon
                          sx={{
                            color: colors.greenAccent[600],
                            fontSize: "26px",
                          }}
                        />
                      }
                    />
                  </Box> */}

                  {/* ROW 2 */}
                  <Box
                    gridColumn="span 7"
                    gridRow="span 3"
                    backgroundColor={colors.primary[400]}
                  >
                    <Box
                      mt="25px"
                      p="0 30px"
                      display="flex "
                      // justifyContent="space-between"
                      alignItems="center"
                    >
                      <UserBookings/>
                      
                    </Box>
                   
                  </Box>
                  <Box
                    gridColumn="span 5"
                    gridRow="span 3"
                    backgroundColor={colors.primary[400]}
                    // overflow="auto"
                  >
                     <Box
                      mt="25px"
                      p="0 30px"
                      display="flex "
                      // justifyContent="space-between"
                      alignItems="center"
                    >
                       <Revenue/>
                      
                    </Box>
                    
                    
                  </Box>

                  {/* ROW 3 */}
                  <Box
                    gridColumn="span 7"
                    gridRow="span 3"
                    backgroundColor={colors.primary[400]}
                  >
                    <Box
                      mt="25px"
                      p="0 30px"
                      display="flex "
                      // justifyContent="space-between"
                      alignItems="center"
                    >
                      <Cardata/>
                      
                    
                   
                  </Box>
                   
                  </Box>
                  <Box
                    gridColumn="span 5"
                    gridRow="span 3"
                    backgroundColor={colors.primary[400]}
                    // overflow="auto"
                  >
                     <Box
                      mt="25px"
                      p="0 30px"
                      display="flex "
                      // justifyContent="space-between"
                      alignItems="center"
                    >
                       <Usersdata/>
                      
                    </Box>
                    
                    
                  </Box>
                </Box>
              </Box>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Box>
  );
};

export default Dashboard;

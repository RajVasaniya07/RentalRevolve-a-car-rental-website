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
import  Footer  from "../../components/Footer";

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
    <div>
    <Box m="20px" >
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme1}>
          <div>
            <CssBaseline />
            <header className="header" data-header>
            <div className="container">
              <div className="overlay" data-overlay />
              <h1 className="h2" style={{fontSize:"35px",marginTop:"10px",color:"#1A9DF4"}}>RentalRevolve</h1>

              <a href="#" className="logo">
              </a>
              <nav className="navbar" data-navbar>
                <ul className="navbar-list">
                  
                </ul>
              </nav>
              <div className="header-actions">

              
                
              {/* <button className="btn" aria-labelledby="aria-label-txt" onClick={onclick}>
                  <span id="aria-label-txt">Home</span>
                </button> */}

                


                <button className="btn" aria-labelledby="aria-label-txt" onClick={handleLogout1}>
                  <span id="aria-label-txt">			{localStorage.getItem('email') ? 'Logout' : 'Login'}
</span>
                </button>


             
                <button className="btn user-btn" aria-label="Profile">
                <ion-icon name="person-outline" />
                </button>

                <button className="nav-toggle-btn" data-nav-toggle-btn aria-label="Toggle Menu">
                  <span className="one" />
                  <span className="two" />
                  <span className="three" />
                </button>
              </div>
            </div>
          </header>
            
            {/* <Topbar setIsSidebar={setIsSidebar} /> */}
            <main className="content" style={{ display: "flex",marginTop:"90px"}}>
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
                  

                  {/* ROW 2 */}
                  <Box
                    gridColumn="span 7"
                    gridRow="span 3"
                    backgroundColor='#EDF1F7'
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
                    backgroundColor='#EDF1F7'
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
                    backgroundColor='#EDF1F7'
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
                    backgroundColor='#EDF1F7'
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
    <Footer/>
    </div>
  );
};

export default Dashboard;

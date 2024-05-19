import React, { useState } from "react";
import GameState from "../../models/GameState";
import useDebugCommand from "../../state/useDebugCommand";
import { Button, IconButton, List, ListItemButton, Typography } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Close, QuestionMarkRounded } from "@mui/icons-material";
import { GAME_STORAGE_KEY } from "../../state/GameStateProvider";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const tabButtonStyle = {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1.05rem',
  flex: 1
};

export default function DebugOverlay({ state }: { state: GameState }) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const {availableCommands, executeCommand} = useDebugCommand();
  const [currentTab, setCurrentTab] = useState<'state' | 'commands'>('commands');
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (<div
      style={{
        position: "fixed",
        maxHeight: "100%",
        overflow: "scroll",
        top: '0rem',
        left: '0rem',
        zIndex: 502,
        backgroundColor: isOverlayVisible ? "rgba(255, 255, 255, 0.95)" : "transparent",
      }}
    >
    {isOverlayVisible ? <Box sx={{ width: '100%' }}>
      <Box display="flex" sx={{position: "relative", borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Cheat" {...a11yProps(0)} />
          <Tab label="Debug" {...a11yProps(1)} />
        </Tabs>

        <IconButton style={{position: "absolute", right: "5px"}} onClick={() => setIsOverlayVisible(false)}>
          <Close />
        </IconButton>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Typography variant="caption">
          Most cheats have a one-time effect, and they must be applied during a specific activity.
        </Typography>
        <List>
        {availableCommands.map(command => (
          <Typography>
            <ListItemButton
              dense
              key={command}
              onClick={() => {
                executeCommand(command);
              }}>{command}</ListItemButton>
            </Typography>
        ))}
        </List>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Box display="flex" gap="5px" flexDirection="column" style={{marginBottom: '25px'}}>
        <Button onClick={() => {
          window.localStorage.removeItem(GAME_STORAGE_KEY);
          window.location.reload();
        }} variant="outlined" >Erase Local Storage</Button>
      </Box>


          <pre style={{width: "100%", height: '100%', maxHeight: '800px', overflow: 'scroll',}}>
            {JSON.stringify(state, null, 2)}</pre>

        <Button sx={{mt: 10}} color="error" variant="contained" onClick={()=> {
          throw new Error('foobar');
        }} >Throw exception</Button>
        
      </CustomTabPanel>
    </Box> : (
      <Button
        size="small"
        sx={{color: '#444', opacity: 0.5}}
        onClick={() => setIsOverlayVisible(true)}>
         <QuestionMarkRounded />
      </Button>
    )}
    </div>
  );
}

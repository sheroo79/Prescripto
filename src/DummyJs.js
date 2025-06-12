import { Box, Button, Drawer, Typography } from "@mui/material";
import { useState } from "react";

export default function RightDrawerExample() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        Right Drawer Content
      </Typography>
      {/* Add your menu items or content here */}
    </Box>
  );

  return (
    <div style={{height:'30vh'}}>
      <Button onClick={toggleDrawer(true)}>Open Right Drawer</Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
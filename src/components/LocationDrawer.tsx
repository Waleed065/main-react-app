import React from "react";
import './css/LocationDrawer.css'
import { Button, Drawer } from "@material-ui/core";
import Location from "./Location";
import { locationSchema } from "../types";

interface schema{
  showDrawer: boolean;
  setShowDrawer: (arg: boolean) => void;
  location: locationSchema;
  setLocation: ((arg: locationSchema) => void) 
}
export default function LocationDrawer({showDrawer, setShowDrawer, location, setLocation}:schema) {  
  return (
    <Drawer
      anchor={"bottom"}
      variant={"temporary"}
      open={showDrawer}
      // onClose={() => setShowDrawer(false)}
    >
      <div id={'location-drawer-container'}>
        <Location location={location} setLocation={setLocation} />
        <Button
          variant="outlined"
          color={"primary"}
          onClick={() => setShowDrawer(false)}
          style={{ marginTop: 10 }}
        >
          Cancel
        </Button>
      </div>
    </Drawer>
  );
}

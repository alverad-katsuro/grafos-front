import React, { Fragment, useEffect, useRef, useState } from 'react';
import {Button, Dialog, DialogHeader, DialogBody, DialogFooter} from "@material-tailwind/react";
import { PopUp } from '../components/PopUp';

export default function text() {
  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <PopUp></PopUp>
  );
}
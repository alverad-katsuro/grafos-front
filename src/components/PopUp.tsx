import { Component, ReactNode, useEffect, useState } from "react";
import {Button, Dialog, DialogHeader, DialogBody, DialogFooter} from "@material-tailwind/react";

export class PopUp extends Component {
    label: string = "sem nome";
    value: number = 0;
    open = false;
    setOpen = false;

    constructor(props:any) {
        super(props)
    }

    handleOpen(){
        this.setOpen = !this.open;
    }

    render(): ReactNode {
        return (
            <>
                <Button onClick={this.handleOpen} variant="gradient">
                    Open Dialog
                </Button>
                <Dialog open={true} handler={this.handleOpen}>
                    <DialogHeader>Its a simple dialog.</DialogHeader>
                    <DialogBody divider>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus ad
                        reprehenderit omnis perspiciatis aut odit! Unde architecto
                        perspiciatis, dolorum dolorem iure quia saepe autem accusamus eum
                        praesentium magni corrupti explicabo!
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={this.handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" onClick={this.handleOpen}>
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </>
        )
    }

}
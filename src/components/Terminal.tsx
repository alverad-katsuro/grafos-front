import { Component, ReactNode, useEffect, useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";



type TerminalProps = {
    lines: Array<string>;
    onClose: () => void;
}

export function Terminal(props: TerminalProps) {
    return (
        <div className="mx-auto fixed w-full h-full flex items-center justify-center">
            <div className="w-2/5">
                <div className="w-full shadow-2xl subpixel-antialiased rounded h-64 bg-black border-black mx-auto">
                    <div className="flex items-center h-6 rounded-t bg-gray-100 border-b border-gray-500 text-center text-black" id="headerTerminal">
                        <button onClick={props.onClose}>
                            <div className="flex ml-2 items-center text-center border-red-900 bg-red-500 shadow-inner rounded-full w-3 h-3" id="closebtn">
                            </div>

                        </button>
                        <div className="mx-auto pr-16" id="terminaltitle">
                            <p className="text-center text-sm">Terminal</p>
                        </div>

                    </div>
                    <div className="pl-1 pt-1 h-auto  text-green-200 font-mono text-xs bg-black" id="console">
                        <div className="pl-1 pt-1 h-auto  text-green-200 font-mono text-xs bg-black" id="console">
                            <p className="pb-1">Last login: Wed Sep 25 09:11:04 on ttys002</p>
                            {//@ts-ignore
                                props.lines.map((resultado) => {
                                    return (
                                        <p>{resultado}</p>
                                    );
                                })}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
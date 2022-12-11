import React, { Component, DetailedHTMLProps, useEffect } from 'react';
import { Data, Edge, Network, Node, Options } from "vis-network";
import { DataSet } from "vis-data";
import { PopUp } from './PopUp';
import { fontSize } from '@mui/system';

var nodesDefault: DataSet<Node> = new DataSet<Node>({});
var edgesDefault: DataSet<Edge> = new DataSet({});
/*
nodesDefault.add([
    { id: 0, label: "0" },
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" },
    { id: 5, label: "5" }
]);

const edgesDefault: DataSet<Edge> = new DataSet({});
edgesDefault.add([  
    { id: 0, from: 0, to: 1, value: 1, label: "1" },
    { id: 1, from: 0, to: 4, value: 1, label: "1" },
    { id: 2, from: 1, to: 2, value: 1, label: "1" },
    { id: 3, from: 1, to: 4, value: 1, label: "1" },
    { id: 4, from: 2, to: 3, value: 1, label: "1" },
    { id: 5, from: 3, to: 1, value: 1, label: "1" },
    { id: 6, from: 4, to: 3, value: 1, label: "1" },
    { id: 7, from: 5, to: 0, value: 1, label: "1" },
    { id: 8, from: 5, to: 4, value: 1, label: "1" },
    { id: 9, from: 5, to: 5, value: 1, label: "1" }
]);

const edgesDefault: DataSet<Edge> = new DataSet({});
edgesDefault.add([  
    { id: 0, from: 0, to: 1, value: 6, label: "6" },
    { id: 1, from: 0, to: 2, value: 1, label: "1" },
    { id: 2, from: 0, to: 3, value: 5, label: "5" },
    { id: 3, from: 1, to: 2, value: 2, label: "2" },
    { id: 4, from: 1, to: 4, value: 5, label: "5" },
    { id: 5, from: 2, to: 3, value: 2, label: "2" },
    { id: 6, from: 2, to: 4, value: 6, label: "6" },
    { id: 7, from: 2, to: 5, value: 4, label: "4" },
    { id: 8, from: 3, to: 5, value: 4, label: "4" },
    { id: 9, from: 4, to: 5, value: 3, label: "3" }
]);

nodesDefault.add([
    { id: 0, label: "0" },
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" }
]);

const edgesDefault: DataSet<Edge> = new DataSet({});
edgesDefault.add([  
    { id: 0, from: 0, to: 1, value: 1, label: "1" },
    { id: 1, from: 0, to: 3, value: 3, label: "3" },
    { id: 2, from: 0, to: 4, value: 10, label: "10" },
    { id: 3, from: 1, to: 2, value: 5, label: "5" },
    { id: 4, from: 2, to: 4, value: 1, label: "1" },
    { id: 5, from: 3, to: 2, value: 2, label: "2" },
    { id: 6, from: 3, to: 4, value: 6, label: "6" },
]);
*/

nodesDefault.add([
    { id: 0, label: "0" },
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" },
    { id: 5, label: "5" },
    { id: 6, label: "6" },
    { id: 7, label: "7" },
    { id: 8, label: "8" },
    { id: 9, label: "9" }
]);

edgesDefault.add([  
    { id: 0, from: 0, to: 1, value: 1, label: "1" },
    { id: 1, from: 0, to: 2, value: 1, label: "1" },
    { id: 2, from: 0, to: 3, value: 1, label: "1" },
    { id: 3, from: 0, to: 5, value: 1, label: "1" },
    { id: 4, from: 1, to: 2, value: 1, label: "1" },
    { id: 5, from: 2, to: 3, value: 1, label: "1" },
    { id: 6, from: 2, to: 4, value: 1, label: "1" },
    { id: 7, from: 4, to: 6, value: 1, label: "1" },
    { id: 8, from: 5, to: 4, value: 1, label: "1" },
    { id: 9, from: 5, to: 6, value: 1, label: "1" },
    { id: 10, from: 6, to: 7, value: 1, label: "1" },
    { id: 11, from: 6, to: 8, value: 1, label: "1" },
    { id: 12, from: 7, to: 8, value: 1, label: "1" },
    { id: 13, from: 9, to: 6, value: 1, label: "1" },
    
]);

const optionsDefault: Options = {
    autoResize: true,
    height: '100%',
    width: '100%',
    locale: 'pt',
    clickToUse: false,
    layout: {
        hierarchical: {
            enabled: false,
            direction: 'LR',
            sortMethod: 'directed',
            shakeTowards: 'roots',
        }
    },
    edges: {
        arrows: {
            to: {
                enabled: true,
            }
        },
        length: 100,
        scaling: {
            min: 2,
            max: 2
        },
        font: {
            size: 8
        }

    },
    interaction: {
        multiselect: true,
        hover: true,
    },
    manipulation: {
        enabled: true,
        //@ts-ignore
        addNode: function (nodeData, callback) {
            nodeData.id = Grafo.idCountNode;
            Grafo.idCountNode++;
            nodeData.label = prompt("Digite um nome para o vertice");
            callback(nodeData);
        },

        //@ts-ignore
        addEdge: function (edgeData, callback) {
            edgeData.id = Grafo.idCountEdge;
            Grafo.idCountEdge++;
            edgeData.label = prompt("Digite um nome/valor para a aresta");
            edgeData.value = Number(edgeData.label);
            callback(edgeData);
        },
    },
    physics: true   
}


export class Grafo {
    static idCountNode: number = 6;
    static idCountEdge: number = 9;
    private grafo?: Network;
    private digrafo: boolean = true;
    private options: Options;
    private nodes: DataSet<Node>;
    private edges: DataSet<Edge>;
    private container?: HTMLElement | null;

    constructor(nodes?: DataSet<Node>, edges?: DataSet<Edge>, options?: Options) {
        this.options = options ?? optionsDefault;
        this.nodes = nodes ?? nodesDefault;
        this.edges = edges ?? edgesDefault;
    }

    public createGrafo() {
        this.grafo = new Network(this.container!, this.Data, this.options);
    }

    public deleteSelection() {
        this.grafo?.deleteSelected()
    }

    public addEdge(from:number, to:number, label:string){
        this.edges.add({id:Grafo.idCountEdge, from:from, to:to, label:label, value:Number(label)});
        Grafo.idCountEdge++;
    }

    public addNode(id:number, label:string){
        this.nodes.add({id:id, label:label})
    }

    public addNodeNoId(label:string){
        this.nodes.add({id:Grafo.idCountNode, label:label});
        Grafo.idCountNode++;
    }

    public get Edges(): DataSet<Edge> {
        return this.edges;
    }


    public set Edges(edges: DataSet<Edge>) {
        this.edges = edges;
    }


    public get Grafo(): Network | undefined {
        return this.grafo;
    }


    public set Grafo(grafo: Network | undefined) {
        this.grafo = grafo;
    }

    public get Digrafo(): boolean {
        return this.digrafo;
    }

    public set Digrafo(isDigrafo: boolean) {
        this.digrafo = isDigrafo;
        this.options.edges = (
            {
                arrows: {
                    to: {
                        enabled: isDigrafo,
                    }
                },
                length: 100,
                scaling: {
                    min: 2,
                    max: 2
                },
                font: {
                    size: 8
                }

            })
        this.grafo?.setOptions(this.options);
    }

    public get Options(): Options {
        return this.options
    }

    public set Options(options: Options) {
        this.options = options;
    }


    public get Nodes(): DataSet<Node> {
        return this.nodes;
    }


    public set Nodes(nodes: DataSet<Node>) {
        this.nodes = nodes;
    }


    public set Container(container: HTMLElement | undefined | null) {
        this.container = container;
    }


    public get Container(): HTMLElement | undefined | null {
        return this.container;
    }



    public get Data(): Data {
        const data: Data = {
            nodes: this.nodes,
            edges: this.edges
        };
        return data;
    }

    public disableEditMode() {
        this.grafo?.disableEditMode()
    }

    public enableEditMode() {
        this.grafo?.enableEditMode();
    }
}
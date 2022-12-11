import React, { Component, DetailedHTMLProps, useEffect } from 'react';
import { Data, Edge, Network, Node, Options } from "vis-network";
import { DataSet } from "vis-data";
import { PopUp } from './PopUp';
import { fontSize } from '@mui/system';

var nodesDefault: DataSet<Node> = new DataSet<Node>({});
nodesDefault.add([
    { id: 1, label: "a" },
    { id: 2, label: "b" },
    { id: 3, label: "c" },
    { id: 4, label: "d" },
    { id: 5, label: "e" }
]);

const edgesDefault: DataSet<Edge> = new DataSet({});
edgesDefault.add([  
    { id: 1, from: 1, to: 3, value: 1.5, label: "1.5" },
    { id: 2, from: 1, to: 2, value: 1.5, label: "1.5" },
    { id: 3, from: 2, to: 4, value: 1.5, label: "1.5" },
    { id: 4, from: 2, to: 5, value: 1.5, label: "1.5" },
    { id: 5, from: 3, to: 3, value: 1.5, label: "1.5" }
]);

const optionsDefault: Options = {
    autoResize: true,
    height: '100%',
    width: '100%',
    locale: 'pt',
    clickToUse: false,
    layout: {
        hierarchical: {
            enabled: true,
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
    physics: false   
}


export class Grafo {
    static idCountNode: number = 6;
    static idCountEdge: number = 6;
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
        this.edges.add({from:from, to:to, label:label, value:Number(label)})
    }

    public addNode(id:number, label:string){
        this.nodes.add({id:id, label:label})
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
import React, { Component, DetailedHTMLProps, useEffect } from 'react';
import { Data, Edge, Network, Node, Options } from "vis-network";
import { DataSet } from "vis-data";
import { PopUp } from './PopUp';

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
    { from: 1, to: 3, value:1.5, label:"1.5"},
    { from: 1, to: 2, value:1.5, label:"1.5"},
    { from: 2, to: 4, value:1.5, label:"1.5"},
    { from: 2, to: 5, value:1.5, label:"1.5"},
    { from: 3, to: 3, value:1.5, label:"1.5"}
]);

var optionsDefault: Options = {
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
            shakeTowards: 'leaves',
        }
    },
    edges: {
        arrows: {
            to: {
                enabled: true
            }
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
          nodeData.id = Grafo.idCount;
          Grafo.idCount++;
          nodeData.label = prompt("Digite um nome para o vertice");
          callback(nodeData);
        },
        
        //@ts-ignore
        addEdge: function (edgeData, callback) {
          edgeData.label = prompt("Digite um nome/valor para a aresta");
          edgeData.value = Number(edgeData.label);
          callback(edgeData);
      },
    },
}


export class Grafo {
    static idCount:number = 1000;
    private grafo?: Network;
    private digrafo: boolean = true;
    private options: Options;
    private nodes: DataSet<Node>;
    private edges: DataSet<Edge>;
    private container?: HTMLElement;

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
        this.digrafo = !this.digrafo;
        this.options.edges = (
            {
                arrows: {
                    to: {
                        enabled: isDigrafo
                    }
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


    public set Container(container: HTMLElement | undefined) {
        this.container = container;
    }


    public get Container(): HTMLElement | undefined {
        return this.container;
    }



    public get Data(): Data {
        const data: Data = {
            nodes: this.nodes,
            edges: this.edges
        };
        return data;
    }
}
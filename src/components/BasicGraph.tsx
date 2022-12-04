import React, { Component, DetailedHTMLProps, useEffect } from 'react';
import { Data, Edge, Network, Node, Options } from "vis-network";
import { DataSet } from "vis-data";
import { PopUp } from './PopUp';

var nodesDefault: DataSet<Node> = new DataSet<Node>({});
nodesDefault.add([
    { id: 1, label: "Node 1" },
    { id: 2, label: "Node 2" },
    { id: 3, label: "Node 3" },
    { id: 4, label: "Node 4" },
    { id: 5, label: "Node 5" }
]);

const edgesDefault: DataSet<Edge> = new DataSet({});
edgesDefault.add([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 3 }
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
                enabled: false
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
          nodeData.label = prompt("Digite um nome para o vertice");
          nodeData.value = Number(prompt("Digite o valor do vertice"));
          callback(nodeData);
        },
        
        //@ts-ignore
        addEdge: function (edgeData, callback) {
          edgeData.label = prompt("Digite um nome para o vertice");
          edgeData.value = Number(edgeData.label);
          callback(edgeData);
      },
    },
}



export class Grafo {
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



    private get Data(): Data {
        const data: Data = {
            nodes: this.nodes,
            edges: this.edges
        };
        return data;
    }
}
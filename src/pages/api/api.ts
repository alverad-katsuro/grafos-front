import axios, { Axios } from "axios";
import { DataSet, Edge, Node } from "vis-network";

export type NodeModel = {
  id: number,
  label: string
}

export type EdgesModel = {
      from: number,
      to: number,
      value: number,
      label: string,
      tipoAresta: string
}

export type GrafoModel = {
  origem: string,
  destino: string | null,
  quantidadeAresta: number | null,
  quantidadeVertice: number | null,
  nodes: NodeModel[],
  edges: EdgesModel[]
}

export default class GrafoApi{
  private api: Axios;
  
  constructor(url?:string) {
    this.api = axios.create({baseURL: url ?? "http://localhost:8080/"})
  }

  async verificarAresta(verticeA:string, verticeB:string, Nodes:DataSet<Node>, Edges: DataSet<Edge>): Promise<boolean> {
    var grafo = {
      origem: verticeA,
      destino: verticeB,
      nodes: Nodes.get(),
      edges: Edges.get()
    }
    const resp = (await this.api.post<boolean>("/matriz/verificarAresta/", grafo)).data;
    return resp;
  }

  async classificarAresta(verticeA:string, Nodes:DataSet<Node>, Edges: DataSet<Edge>): Promise<GrafoModel> {
    var grafo = {
      origem: verticeA,
      nodes: Nodes.get(),
      edges: Edges.get()
    }
    const resp = (await this.api.post<GrafoModel>("/matriz/obterClassificacaoAresta/", grafo)).data;
    console.log(resp)
    return resp;
  }

}
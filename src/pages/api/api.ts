import axios, { Axios } from "axios";
import { DataSet, Edge, Node } from "vis-network";

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

}
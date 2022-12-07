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

  async verificarAresta(verticeA:string, verticeB:string, Nodes:DataSet<Node>, Edges: DataSet<Edge>, matriz:boolean): Promise<boolean> {
    var grafo = {
      origem: verticeA,
      destino: verticeB,
      nodes: Nodes.get(),
      edges: Edges.get()
    }
    if (matriz) {
      const resp = (await this.api.post<boolean>("/matriz/verificarAresta/", grafo)).data;
      return resp;
    } else {
      const resp = (await this.api.post<boolean>("/listaAdjacencia/verificarAresta/", grafo)).data;
      return resp;
    }
  }

  async obterListaAdj(verticeA:string, Nodes:DataSet<Node>, Edges: DataSet<Edge>, matriz:boolean): Promise<string[]> {
    var grafo = {
      origem: verticeA,
      nodes: Nodes.get(),
      edges: Edges.get()
    }
    if (matriz) {
      const resp = (await this.api.post<string[]>("/matriz/obterListaAdj/", grafo)).data;
      return resp;
    } else {
      const resp = (await this.api.post<string[]>("/listaAdjacencia/obterListaAdj/", grafo)).data;
      return resp;
    }
  }

  async classificarAresta(verticeA:string, Nodes:DataSet<Node>, Edges: DataSet<Edge>, matriz:boolean): Promise<GrafoModel> {
    var grafo = {
      origem: verticeA,
      nodes: Nodes.get(),
      edges: Edges.get()
    }
    if (matriz) {
      const resp = (await this.api.post<GrafoModel>("/matriz/obterClassificacaoAresta/", grafo)).data;
      return resp;
    } else {
      const resp = (await this.api.post<GrafoModel>("/listaAdjacencia/obterClassificacaoAresta/", grafo)).data;
      return resp;
    }
  }


  async quantidadeVerticesArestas(Nodes:DataSet<Node>, Edges: DataSet<Edge>, matriz:boolean): Promise<GrafoModel> {
    var grafo = {
      nodes: Nodes.get(),
      edges: Edges.get()
    }
    if (matriz) {
      const resp = (await this.api.post<GrafoModel>("/matriz/quantidadeVerticesArestas/", grafo)).data;
      return resp;
    } else {
      const resp = (await this.api.post<GrafoModel>("/listaAdjacencia/quantidadeVerticesArestas/", grafo)).data;
      return resp;
    }
  }

  async buscaLargura(verticeA:string, verticeB:string, Nodes:DataSet<Node>, Edges: DataSet<Edge>, matriz:boolean): Promise<string[]> {
    var grafo = {
      origem: verticeA,
      destino: verticeB,
      nodes: Nodes.get(),
      edges: Edges.get()
    }
    if (matriz) {
      const resp = (await this.api.post<string[]>("/matriz/buscaLargura/", grafo)).data;
      return resp;
    } else {
      const resp = (await this.api.post<string[]>("/listaAdjacencia/buscaLargura/", grafo)).data;
      return resp;
    }
  }


  async obterGrauVertice(verticeA:string, Nodes:DataSet<Node>, Edges: DataSet<Edge>, matriz:boolean): Promise<number> {
    var grafo = {
      origem: verticeA,
      nodes: Nodes.get(),
      edges: Edges.get()
    }
    if (matriz) {
      const resp = (await this.api.post<number>("/matriz/obterGrauVertice/", grafo)).data;
      return resp;
    } else {
      const resp = (await this.api.post<number>("/listaAdjacencia/obterGrauVertice/", grafo)).data;
      return resp;
    }
  }


  async verificarCiclo(verticeA:string, Nodes:DataSet<Node>, Edges: DataSet<Edge>, matriz:boolean): Promise<boolean> {
    var grafo = {
      origem: verticeA,
      nodes: Nodes.get(),
      edges: Edges.get()
    }
    if (matriz) {
      const resp = (await this.api.post<boolean>("/matriz/verificarCiclo/", grafo)).data;
      return resp;
    } else {
      const resp = (await this.api.post<boolean>("/listaAdjacencia/verificarCiclo/", grafo)).data;
      return resp;
    }
  }


  async prim(verticeA:string, Nodes:DataSet<Node>, Edges: DataSet<Edge>, matriz:boolean): Promise<string[]> {
    var grafo = {
      origem: verticeA,
      nodes: Nodes.get(),
      edges: Edges.get()
    }
    if (matriz) {
      const resp = (await this.api.post<string[]>("/matriz/prim/", grafo)).data;
      return resp;
    } else {
      const resp = (await this.api.post<string[]>("/listaAdjacencia/prim/", grafo)).data;
      return resp;
    }
  }


  async obterDijkstra(verticeA:string, Nodes:DataSet<Node>, Edges: DataSet<Edge>, matriz:boolean): Promise<string[]> {
    var grafo = {
      origem: verticeA,
      nodes: Nodes.get(),
      edges: Edges.get()
    }
    if (matriz) {
      const resp = (await this.api.post<string[]>("/matriz/dijkstra/", grafo)).data;
      return resp;
    } else {
      const resp = (await this.api.post<string[]>("/listaAdjacencia/dijkstra/", grafo)).data;
      return resp;
    }
  }


}
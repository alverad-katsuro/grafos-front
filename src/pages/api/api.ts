import axios, { Axios } from "axios";
import { DataSet, Edge, Node } from "vis-network";
import { Grafo } from "../../components/BasicGraph";



export type NodeModel = {
	id: number,
	label: string,
	color: string
}

export type EdgesModel = {
	id: number,
	from: number,
	to: number,
	value: number,
	label: string,
	tipoAresta?: string,
	color?: string
}

export type GrafoModel = {
	origem: string | null,
	destino: string | null,
	quantidadeAresta: number | null,
	quantidadeVertice: number | null,
	nodes: NodeModel[],
	edges: EdgesModel[]
}

export default class GrafoApi {
	private api: Axios;

	constructor(url?: string) {
		this.api = axios.create({ baseURL: url ?? "http://localhost:8080/" })
	}

	async verificarAresta(verticeA: string, verticeB: string, Nodes: DataSet<Node>, Edges: DataSet<Edge>, matriz: boolean, digrafo: boolean): Promise<boolean> {
		var grafo = {
			origem: verticeA,
			destino: verticeB,
			nodes: Nodes.get(),
			edges: Edges.get()
		}
		if (!digrafo) {
			grafo.edges.map((ed) => {
				if (ed.to != ed.from) {
					grafo.edges.push({
						id: Grafo.idCountEdge,
						from: ed.to,
						to: ed.from,
						value: ed.value,
						label: ed.label
					})
					Grafo.idCountEdge++;
				}
			})
		}
		if (matriz) {
			const resp = (await this.api.post<boolean>("/matriz/verificarAresta/", grafo)).data;
			return resp;
		} else {
			const resp = (await this.api.post<boolean>("/listaAdjacencia/verificarAresta/", grafo)).data;
			return resp;
		}
	}

	async obterListaAdj(verticeA: string, Nodes: DataSet<Node>, Edges: DataSet<Edge>, matriz: boolean, digrafo: boolean): Promise<string[]> {
		var grafo = {
			origem: verticeA,
			nodes: Nodes.get(),
			edges: Edges.get()
		}
		if (!digrafo) {
			grafo.edges.map((ed) => {
				if (ed.to != ed.from) {
					grafo.edges.push({
						id: Grafo.idCountEdge,
						from: ed.to,
						to: ed.from,
						value: ed.value,
						label: ed.label
					})
					Grafo.idCountEdge++;
				}
			})
		}
		if (matriz) {
			const resp = (await this.api.post<string[]>("/matriz/obterListaAdj/", grafo)).data;
			return resp;
		} else {
			const resp = (await this.api.post<string[]>("/listaAdjacencia/obterListaAdj/", grafo)).data;
			return resp;
		}
	}

	async classificarAresta(verticeA: string, Nodes: DataSet<Node>, Edges: DataSet<Edge>, matriz: boolean, digrafo: boolean): Promise<GrafoModel> {
		var grafo = {
			origem: verticeA,
			nodes: Nodes.get(),
			edges: Edges.get()
		}
		if (!digrafo) {
			grafo.edges.map((ed) => {
				if (ed.to != ed.from) {
					grafo.edges.push({
						id: Grafo.idCountEdge,
						from: ed.to,
						to: ed.from,
						value: ed.value,
						label: ed.label
					})
					Grafo.idCountEdge++;
				}
			})
		}
		if (matriz) {
			const resp = (await this.api.post<GrafoModel>("/matriz/obterClassificacaoAresta/", grafo)).data;
			return resp;
		} else {
			const resp = (await this.api.post<GrafoModel>("/listaAdjacencia/obterClassificacaoAresta/", grafo)).data;
			return resp;
		}
	}


	async quantidadeVerticesArestas(Nodes: DataSet<Node>, Edges: DataSet<Edge>, matriz: boolean, digrafo: boolean): Promise<GrafoModel> {
		var grafo = {
			nodes: Nodes.get(),
			edges: Edges.get()
		}
		if (!digrafo) {
			grafo.edges.map((ed) => {
				if (ed.to != ed.from) {
					grafo.edges.push({
						id: Grafo.idCountEdge,
						from: ed.to,
						to: ed.from,
						value: ed.value,
						label: ed.label
					})
					Grafo.idCountEdge++;
				}
			})
		}
		if (matriz) {
			const resp = (await this.api.post<GrafoModel>("/matriz/quantidadeVerticesArestas/", grafo)).data;
			return resp;
		} else {
			const resp = (await this.api.post<GrafoModel>("/listaAdjacencia/quantidadeVerticesArestas/", grafo)).data;
			return resp;
		}
	}

	async buscaLargura(verticeA: string, verticeB: string, Nodes: DataSet<Node>, Edges: DataSet<Edge>, matriz: boolean, digrafo: boolean): Promise<string[]> {
		var grafo = {
			origem: verticeA,
			destino: verticeB,
			nodes: Nodes.get(),
			edges: Edges.get()
		}
		if (!digrafo) {
			grafo.edges.map((ed) => {
				if (ed.to != ed.from) {
					grafo.edges.push({
						id: Grafo.idCountEdge,
						from: ed.to,
						to: ed.from,
						value: ed.value,
						label: ed.label
					})
					Grafo.idCountEdge++;
				}
			})
		}
		if (matriz) {
			const resp = (await this.api.post<string[]>("/matriz/buscaLargura/", grafo)).data;
			return resp;
		} else {
			const resp = (await this.api.post<string[]>("/listaAdjacencia/buscaLargura/", grafo)).data;
			return resp;
		}
	}


	async obterGrauVertice(verticeA: string, Nodes: DataSet<Node>, Edges: DataSet<Edge>, matriz: boolean, digrafo: boolean): Promise<number> {
		var grafo = {
			origem: verticeA,
			nodes: Nodes.get(),
			edges: Edges.get()
		}
		if (!digrafo) {
			grafo.edges.map((ed) => {
				if (ed.to != ed.from) {
					grafo.edges.push({
						id: Grafo.idCountEdge,
						from: ed.to,
						to: ed.from,
						value: ed.value,
						label: ed.label
					})
					Grafo.idCountEdge++;
				}
			})
		}
		if (matriz) {
			const resp = (await this.api.post<number>("/matriz/obterGrauVertice/", grafo)).data;
			return resp;
		} else {
			const resp = (await this.api.post<number>("/listaAdjacencia/obterGrauVertice/", grafo)).data;
			return resp;
		}
	}


	async verificarCiclo(verticeA: string, Nodes: DataSet<Node>, Edges: DataSet<Edge>, matriz: boolean, digrafo: boolean): Promise<boolean> {
		var grafo = {
			origem: verticeA,
			nodes: Nodes.get(),
			edges: Edges.get()
		}
		if (!digrafo) {
			grafo.edges.map((ed) => {
				if (ed.to != ed.from) {
					grafo.edges.push({
						id: Grafo.idCountEdge,
						from: ed.to,
						to: ed.from,
						value: ed.value,
						label: ed.label
					})
					Grafo.idCountEdge++;
				}
			})
		}
		if (matriz) {
			const resp = (await this.api.post<boolean>("/matriz/verificarCiclo/", grafo)).data;
			return resp;
		} else {
			const resp = (await this.api.post<boolean>("/listaAdjacencia/verificarCiclo/", grafo)).data;
			return resp;
		}
	}


	async prim(verticeA: string, Nodes: DataSet<Node>, Edges: DataSet<Edge>, matriz: boolean, digrafo: boolean): Promise<string[]> {
		var grafo = {
			origem: verticeA,
			nodes: Nodes.get(),
			edges: Edges.get()
		}
		if (!digrafo) {
			grafo.edges.map((ed) => {
				if (ed.to != ed.from) {
					grafo.edges.push({
						id: Grafo.idCountEdge,
						from: ed.to,
						to: ed.from,
						value: ed.value,
						label: ed.label
					})
					Grafo.idCountEdge++;
				}
			})
		}
		if (matriz) {
			const resp = (await this.api.post<string[]>("/matriz/prim/", grafo)).data;
			return resp;
		} else {
			const resp = (await this.api.post<string[]>("/listaAdjacencia/prim/", grafo)).data;
			return resp;
		}
	}


	async obterDijkstra(verticeA: string, Nodes: DataSet<Node>, Edges: DataSet<Edge>, matriz: boolean, digrafo: boolean): Promise<string[]> {
		var grafo = {
			origem: verticeA,
			nodes: Nodes.get(),
			edges: Edges.get()
		}
		if (!digrafo) {
			grafo.edges.map((ed) => {
				if (ed.to != ed.from) {
					grafo.edges.push({
						id: Grafo.idCountEdge,
						from: ed.to,
						to: ed.from,
						value: ed.value,
						label: ed.label
					})
					Grafo.idCountEdge++;
				}
			})
		}
		if (matriz) {
			const resp = (await this.api.post<string[]>("/matriz/dijkstra/", grafo)).data;
			return resp;
		} else {
			const resp = (await this.api.post<string[]>("/listaAdjacencia/dijkstra/", grafo)).data;
			return resp;
		}
	}


	async obterDijkstraPesosAtt(verticeA: string, Nodes: DataSet<Node>, Edges: DataSet<Edge>, matriz: boolean, digrafo: boolean): Promise<string[]> {
		var grafo = {
			origem: verticeA,
			nodes: Nodes.get(),
			edges: Edges.get()
		}
		if (!digrafo) {
			grafo.edges.map((ed) => {
				if (ed.to != ed.from) {
					grafo.edges.push({
						id: Grafo.idCountEdge,
						from: ed.to,
						to: ed.from,
						value: ed.value,
						label: ed.label
					})
					Grafo.idCountEdge++;
				}
			})
		}
		if (matriz) {
			const resp = (await this.api.post<string[]>("/matriz/dijkstraPesosAtt/", grafo)).data;
			return resp;
		} else {
			const resp = (await this.api.post<string[]>("/listaAdjacencia/dijkstraPesosAtt/", grafo)).data;
			return resp;
		}
	}


	async obterFortementeConexo(verticeA: string, Nodes: DataSet<Node>, Edges: DataSet<Edge>, matriz: boolean, digrafo: boolean): Promise<string[]> {
		var grafo = {
			origem: verticeA,
			nodes: Nodes.get(),
			edges: Edges.get()
		}
		if (!digrafo) {
			grafo.edges.map((ed) => {
				if (ed.to != ed.from) {
					grafo.edges.push({
						id: Grafo.idCountEdge,
						from: ed.to,
						to: ed.from,
						value: ed.value,
						label: ed.label
					})
					Grafo.idCountEdge++;
				}
			})
		}
		if (matriz) {
			const resp = (await this.api.post<string[]>("/matriz/fortementeConexo/", grafo)).data;
			return resp;
		} else {
			const resp = (await this.api.post<string[]>("/listaAdjacencia/fortementeConexo/", grafo)).data;
			return resp;
		}
	}

	async obterOrdenacaoTopologica(verticeA: string, Nodes: DataSet<Node>, Edges: DataSet<Edge>, matriz: boolean, digrafo: boolean): Promise<string[]> {
		var grafo = {
			origem: verticeA,
			nodes: Nodes.get(),
			edges: Edges.get()
		}
		if (!digrafo) {
			grafo.edges.map((ed) => {
				if (ed.to != ed.from) {
					grafo.edges.push({
						id: Grafo.idCountEdge,
						from: ed.to,
						to: ed.from,
						value: ed.value,
						label: ed.label
					})
					Grafo.idCountEdge++;
				}
			})
		}
		if (matriz) {
			const resp = (await this.api.post<string[]>("/matriz/ordenacaoTopologica/", grafo)).data;
			return resp;
		} else {
			const resp = (await this.api.post<string[]>("/listaAdjacencia/ordenacaoTopologica/", grafo)).data;
			return resp;
		}
	}
}
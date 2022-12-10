import MailIcon from '@mui/icons-material/Mail';
import { Badge } from "@mui/material";
import Link from 'next/link';
import "node_modules/vis-network/dist/dist/vis-network.min.css";
import { useEffect, useRef, useState } from 'react';
import { Grafo } from '../components/BasicGraph';
import { Terminal } from '../components/Terminal';
import GrafoApi, { GrafoModel } from './api/api';
import { setCookie } from 'cookies-next';

export default function Home() {
  const isMatrix = useRef(null);
  const isDigrafo = useRef(null);
  const grafoDiv = useRef(null);
  const popup = useRef(null);
  var inDraw: boolean = false;
  const grafo: Grafo = new Grafo();
  const api = new GrafoApi();
  const [logFunctions, setLogFunctions] = useState<string[]>([]);

  function changeDigrafo() {
    //@ts-ignore
    if (isDigrafo.current.checked) {
      grafo.Digrafo = true;
    } else {
      grafo.Digrafo = false;
    }
  }

  function changeStatePop() {
    if (popup.current != null) {
      //@ts-ignore
      popup.current.hidden = !popup.current.hidden;
    }
  }

  useEffect(() => {
    const container: HTMLElement = document.getElementById("graphId") as HTMLElement;
    grafo.Container = container;
    grafo.createGrafo();
  })

  function verificarAresta() {
    if (api == null) {
      console.log("bug verificar aresta")
    }
    var vertices = prompt("Digite os vertices")?.split(" ");
    if (vertices?.length == 2) {
      var [verticeA, verticeB] = vertices;
      //@ts-ignore
      const resp = api.verificarAresta(verticeA, verticeB, grafo.Nodes, grafo.Edges, isMatrix.current.checked);
      resp.then((e) => {
        console.log("Existe um vertice entre" + verticeA + " e " + verticeB + " : " + e);
        setLogFunctions([
          ...logFunctions,
          `Existe um vertice entre ${verticeA} e ${verticeB} : ${e}`
        ])

      })
    }
  }

  function classificarAresta() {
    var origem = prompt("Digite a origem");
    if (origem != null) {
      //@ts-ignore
      const resp = api.classificarAresta(origem, grafo.Nodes, grafo.Edges, isMatrix.current.checked);
      resp.then((e) => {
        console.log("Classificação: \n" + e);
        setCookie("grafo", e, {path: "/", maxAge:3600, sameSite:true})
        window.open("/resposta", "_blank")
        var resposta: string = "";
        e.edges.map((edge) => {
          resposta += `${(grafo.Nodes.get(edge.from))?.label} ${(grafo.Nodes.get(edge.to))?.label} ${edge.tipoAresta} `
        })
        setLogFunctions([
          ...logFunctions,
          `Foi gerado a classificação do grafo. ${resposta}`
        ])
        return e;
      })
      return resp;
    }
  }

  function prim() {
    if (api == null) {
      console.log("bug prim");
    } else {
      var origem = prompt("Digite a origem");
      if (origem != null) {
        //@ts-ignore
        const resp = api.prim(origem, grafo.Nodes, grafo.Edges, isMatrix.current.checked);
        resp.then((e) => {
          console.log("Prim: \n" + e);
          setLogFunctions([
            ...logFunctions,
            `Prim a partide do v: ${origem} é ${e}`
          ])
        })
      }
    }
  }

  function obterGrauVertice() {
    if (api == null) {
      console.log("bug classificar aresta")
    }
    var origem = prompt("Digite a origem");
    if (origem != null) {
      //@ts-ignore
      const resp = api.obterGrauVertice(origem, grafo.Nodes, grafo.Edges, isMatrix.current.checked);
      resp.then((e) => {
        console.log("Classificação: \n" + e);
        setLogFunctions([
          ...logFunctions,
          `O grau de ${origem} é ${e}`
        ])
        //alert("Classificação: \n" + e)
      })
    }
  }

  function obterListaAdj() {
    if (api == null) {
      console.log("bug obterListaAdj")
    }
    var origem = prompt("Digite a origem");
    if (origem != null) {
      //@ts-ignore
      const resp = api.obterListaAdj(origem, grafo.Nodes, grafo.Edges, isMatrix.current.checked);
      resp.then((e) => {
        setLogFunctions([
          ...logFunctions,
          `Lista de adj de ${origem} ${e}`
        ])
      })
    }
  }

  function obterDijkstra() {
    if (api == null) {
      console.log("bug obterDijkstra")
    }
    var origem = prompt("Digite a origem");
    if (origem != null) {
      //@ts-ignore
      const resp = api.obterDijkstra(origem, grafo.Nodes, grafo.Edges, isMatrix.current.checked);
      resp.then((e) => {
        setLogFunctions([
          ...logFunctions,
          `Caminho a partir de v ${origem} ${e}`
        ])
      })
    }
  }

  function obterOrdenacaoTopologica() {
    if (api == null) {
      console.log("bug obterOrdenacaoTopologica")
    }
    var origem = prompt("Digite a origem");
    if (origem != null) {
      //@ts-ignore
      const resp = api.obterOrdenacaoTopologica(origem, grafo.Nodes, grafo.Edges, isMatrix.current.checked);
      resp.then((e) => {
        setLogFunctions([
          ...logFunctions,
          `Ordenação topologica do vertice ${origem} -> ${e}`
        ])
      })
    }
  }

  function quantidadeVerticesArestas() {
    if (api == null) {
      console.log("bug quantidadeVerticesArestas")
    }
    //@ts-ignore
    const resp = api.quantidadeVerticesArestas(grafo.Nodes, grafo.Edges, isMatrix.current.checked);
    resp.then((e) => {
      setLogFunctions([
        ...logFunctions,
        `Quantidade de Vertices ${e.quantidadeVertice} Quantidade de Aresta ${e.quantidadeAresta}`
      ])
    })
  }

  function buscaLargura() {
    if (api == null) {
      console.log("bug buscaLargura")
    }
    var vertices = prompt("Digite os vertices")?.split(" ");
    if (vertices?.length == 2) {
      const [origem, destino] = vertices;
      if (origem != null) {
        //@ts-ignore
        const resp = api.buscaLargura(origem, destino, grafo.Nodes, grafo.Edges, isMatrix.current.checked);
        resp.then((e) => {
          setLogFunctions([
            ...logFunctions,
            `Busca em lagura: ${e}`
          ])
        })
      }
    }
  }

  return (
    <>
      <div className='xl:h-screen bg-gradient-to-tl from-green-900 via-slate-700 to-pink-800'>
        <div className="flex overflow-hidden xl:max-h-screen">
          <div ref={popup} hidden={true} className="bg-gray-900 bg-opacity-50 fixed inset-0 z-10" id="sidebarBackdrop">

            {/* AQUI VAI O POPUP */}

            <Terminal lines={logFunctions} onClose={changeStatePop}></Terminal>

          </div>
          <div id="main-content" className="h-screen w-full relative overflow-y-auto">
            <main>
              <div className="pt-6 px-4">
                <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-4">
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-1">
                    <div className="h-full w-full flex">
                      <div className="h-full" ref={grafoDiv} id="graphId"></div>

                    </div>
                  </div>
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Funções disponiveis</h3>
                      </div>
                      <div>
                        <button onClick={changeStatePop}>
                          <Badge badgeContent={logFunctions.length} color="primary">
                            <MailIcon color="action" />
                          </Badge>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col mt-8">
                      <div className="overflow-x-auto rounded-lg">
                        <div className="align-middle inline-block min-w-full">
                          <div className="shadow max-h-[500px] overflow-y-scroll sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                                  </th>
                                  <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Descrição
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                <tr>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                    <div className="form-check">
                                      <input ref={isMatrix} defaultChecked={true} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="isMatrix" />
                                    </div>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    True -&gt; Matriz | False -&gt; Lista
                                  </td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                    <div className="form-check">
                                      <input ref={isDigrafo} defaultChecked={true} onClick={changeDigrafo} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="isDigrafo" />
                                    </div>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    True -&gt; Digrafo | False -&gt; Não digrafo
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                    <button onClick={verificarAresta} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                                      Verificar Aresta
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Verifica se existe uma determinada aresta.
                                  </td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                    <button onClick={obterListaAdj} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                      Lista de Adjacencia
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Retorna uma lista de adjacencia a partir do grafo inserido.
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                    <button onClick={quantidadeVerticesArestas} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                      Contador
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Retorna a contagem de vertices e arestas.
                                  </td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                    <button onClick={obterGrauVertice} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                      Verifica Grau
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Retorna o grau de um vertice.
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                      Busca em Profundidade.
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Realiza a busca em profundidade.
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                    <button onClick={classificarAresta} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                      Classificação de arestas.
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Realiza a classificação de arestas
                                  </td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                    <button onClick={buscaLargura} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                      Busca em Largura.
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Realiza a busca em largura no grafo dado.
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                    <button onClick={prim} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                      AGM.
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Retorna a arvore geradora minima segundo Prim.
                                  </td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                    <button onClick={obterDijkstra} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                      Dijkstra.
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Retorna um grafo com os pesos relaxados.
                                  </td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                    <button onClick={obterOrdenacaoTopologica} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                      Ordenação Topologica.
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Retorna a ordenação topologica.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>

            <p className="text-center text-sm text-white my-5">
              &copy; 2022-2022 <a href="https://github.com/alverad-katsuro/grafos-front" className="hover:underline" target="_blank">Alverad Katsuro</a>. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </>
  )
}
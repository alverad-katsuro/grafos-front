import { Textarea } from '@material-tailwind/react';
import MailIcon from '@mui/icons-material/Mail';
import { Badge } from "@mui/material";
import { removeCookies, setCookie } from 'cookies-next';
import "node_modules/vis-network/dist/dist/vis-network.min.css";
import { useEffect, useRef, useState } from 'react';
import { Grafo } from '../components/BasicGraph';
import ItemListaButton from '../components/ItemListaButton';
import ItemListaCheckBox from '../components/ItemListaCheckBox';
import { Terminal } from '../components/Terminal';
import GrafoApi from './api/api';

export default function Home() {
  const grafoDiv = useRef(null);
  const grafo: Grafo = new Grafo();
  const api = new GrafoApi();
  const [isDigrafo, setIsDigrafo] = useState<boolean>(true);
  const [isMatrix, setIsMatrix] = useState<boolean>(true);
  const [isPopup, setPopup] = useState<boolean>(true);
  grafo.Digrafo = isDigrafo;
  const [logFunctions, setLogFunctions] = useState<string[]>([]);
  const [formularioCriaGrafo, setformularioCriaGrafo] = useState<string>("");
  grafo.Container = grafoDiv.current;

  function changeDigrafo() {
    setIsDigrafo(!isDigrafo);
  }

  function changeMatrix() {
    setIsMatrix(!isMatrix);
  }

  function changeStatePop() {
    setPopup(!isPopup);
  }

  useEffect(() => {
    //const container: HTMLElement = document.getElementById("graphId") as HTMLElement;
    //grafo.Container = container;
    grafo.Container = grafoDiv.current;
    grafo.createGrafo();
  })

  function criaGrafoDoForm() {
    console.log(formularioCriaGrafo);
    clear()
    var nodesMap = new Map<string,number>();
    var edgesText = formularioCriaGrafo.split("\n");
    var contador:number = 0;
    edgesText.map((ed) => {
      var edg:string[] = ed.split(" ");
      if(!nodesMap.has(edg[0])) {
        nodesMap.set(edg[0], contador);
        contador++;
      }
      if(!nodesMap.has(edg[1])) {
        nodesMap.set(edg[1], contador);
        contador++;
      }
    })
    console.log(nodesMap);
    nodesMap.forEach((v, k) => {
      grafo.addNode(v, k);
    })
    edgesText.map((ed) => {
      var respostas:string[] = ed.split(" ");
      if (respostas.length == 3) {
        grafo.addEdge(Number(nodesMap.get(respostas[0])), Number(nodesMap.get(respostas[1])), respostas[2]);
      }
    })   
  }

  function clear() {
    grafo.Nodes.clear();
    grafo.Edges.clear();
    Grafo.idCountEdge = 0;
    Grafo.idCountNode = 0;
    setLogFunctions([])
  }

  function verificarAresta() {
    var verticeA = prompt("Digite a origem")?.split(" ")[0];
    var verticeB = prompt("Digite o destino")?.split(" ")[0];
    if (verticeA != null && verticeB != null) {
      const resp = api.verificarAresta(verticeA, verticeB, grafo.Nodes, grafo.Edges, isMatrix, isDigrafo);
      resp.then((e) => {
        console.log("Existe um vertice entre" + verticeA + " e " + verticeB + " : " + e);
        setLogFunctions([
          ...logFunctions,
          `Existe um vertice entre ${verticeA} e ${verticeB} : ${e}`
        ])
      }).catch((e) => {
        console.log(e);
      })
    }
  }

  function classificarAresta() {
    var origem = prompt("Digite a origem")?.split(" ")[0];
    if (origem != null) {
      const resp = api.classificarAresta(origem, grafo.Nodes, grafo.Edges, isMatrix, isDigrafo);
      resp.then((e) => {
        console.log("Classifica????o: \n" + e);
        e.fisica = true;
        removeCookies("grafoResposta", { path: "/", maxAge: 3600, sameSite: true });
        setCookie("grafoResposta", e, { path: "/", maxAge: 3600, sameSite: true })
        window.open("/resposta", "_blank")
        var resposta: string = "";
        e.edges.map((edge) => {
          resposta += `${(grafo.Nodes.get(edge.from))?.label} ${(grafo.Nodes.get(edge.to))?.label} ${edge.tipoAresta} `
        })
        setLogFunctions([
          ...logFunctions,
          `Foi gerado a classifica????o do grafo. ${resposta}`
        ])
        return e;
      }).catch((e) => {
        console.log(e);
      })
      return resp;
    }
  }

  function prim() { // fazer grafo em new aba | refatorar backend to return GRAFOMODEL
    if (api == null) {
      console.log("bug prim");
    } else {
      var origem = prompt("Digite a origem")?.split(" ")[0];
      if (origem != null) {
        const resp = api.prim(origem, grafo.Nodes, grafo.Edges, isMatrix, isDigrafo);
        resp.then((e) => {
          console.log("Prim: \n" + e);
          e.fisica = true;
          removeCookies("grafoResposta", { path: "/", maxAge: 3600, sameSite: true });
          setCookie("grafoResposta", e, { path: "/", maxAge: 3600, sameSite: true })
          window.open("/resposta", "_blank")
          setLogFunctions([
            ...logFunctions,
            `Prim a partide do v: ${origem} ?? ${e}`
          ])
        }).catch((e) => {
          console.log(e);
        })
      }
    }
  }

  function obterGrauVertice() {
    if (api == null) {
      console.log("bug classificar aresta")
    }
    var origem = prompt("Digite a origem")?.split(" ")[0];
    if (origem != null) {
      const resp = api.obterGrauVertice(origem, grafo.Nodes, grafo.Edges, isMatrix, isDigrafo);
      resp.then((e) => {
        setLogFunctions([
          ...logFunctions,
          `O grau de ${origem} ?? ${e}`
        ])
        //alert("Classifica????o: \n" + e)
      }).catch((e) => {
        console.log(e);
      })
    }
  }

  function obterListaAdj() {
    if (api == null) {
      console.log("bug obterListaAdj")
    }
    var origem = prompt("Digite a origem")?.split(" ")[0];
    if (origem != null) {
      const resp = api.obterListaAdj(origem, grafo.Nodes, grafo.Edges, isMatrix, isDigrafo);
      resp.then((e) => {
        setLogFunctions([
          ...logFunctions,
          `Lista de adj de ${origem} \{${e}\}`
        ])
      }).catch((e) => {
        console.log(e);
      })
    }
  }

  function obterDijkstra() {// fazer grafo em new aba | refatorar backend to return GRAFOMODEL
    if (api == null) {
      console.log("bug obterDijkstra")
    }
    var origem = prompt("Digite a origem")?.split(" ")[0];
    if (origem != null) {
      const resp = api.obterDijkstra(origem, grafo.Nodes, grafo.Edges, isMatrix, isDigrafo);
      resp.then((e) => {
        setLogFunctions([
          ...logFunctions,
          `Caminho a partir da oridem ${origem}: ${e}`
        ])
      }).catch((e) => {
        console.log(e);
      })
    }
  }

  function obterDijkstraPesosAtt() {// fazer grafo em new aba | refatorar backend to return GRAFOMODEL
    if (api == null) {
      console.log("bug obterDijkstraPesosAtt")
    }
    var origem = prompt("Digite a origem")?.split(" ")[0];
    if (origem != null) {
      const resp = api.obterDijkstraPesosAtt(origem, grafo.Nodes, grafo.Edges, isMatrix, isDigrafo);
      resp.then((e) => {
        e.fisica = true;
        removeCookies("grafoResposta", { path: "/", maxAge: 3600, sameSite: true });
        setCookie("grafoResposta", e, { path: "/", maxAge: 3600, sameSite: true });
        window.open("/resposta", "_blank");
        setLogFunctions([
          ...logFunctions,
          `Caminho a partir de v ${origem} foi calculado e aberto em nova pagina a resposta.`
        ])
        console.log(e);
      }).catch((e) => {
        console.log(e);
      })
    }
  }

  function verificarCiclo() {
    if (api == null) {
      console.log("bug verificarCiclo")
    }
    var origem = prompt("Digite a origem")?.split(" ")[0];
    if (origem != null) {
      const resp = api.verificarCiclo(origem, grafo.Nodes, grafo.Edges, isMatrix, isDigrafo);
      resp.then((e) => {
        setLogFunctions([
          ...logFunctions,
          `H?? ciclo? v ${origem} ${e}`
        ])
      }).catch((e) => {
        console.log(e);
      })
    }
  }

  function obterFortementeConexo() {
    if (api == null) {
      console.log("bug verificarCiclo")
    }
    var origem = prompt("Digite a origem")?.split(" ")[0];
    if (origem != null) {
      const resp = api.obterFortementeConexo(origem, grafo.Nodes, grafo.Edges, isMatrix, isDigrafo);
      resp.then((e) => {
        removeCookies("grafoResposta", { path: "/", maxAge: 3600, sameSite: true });
        setCookie("grafoResposta", e, { path: "/", maxAge: 3600, sameSite: true });
        window.open("/resposta", "_blank");
        setLogFunctions([
          ...logFunctions,
          `Foi calculado os fortmentes conexos? origem: ${origem}`
        ])
      }).catch((e) => {
        console.log(e);
      })
    }
  }

  function obterOrdenacaoTopologica() {
    if (api == null) {
      console.log("bug obterOrdenacaoTopologica")
    }
    var origem = prompt("Digite a origem")?.split(" ")[0];
    if (origem != null) {
      const resp = api.obterOrdenacaoTopologica(origem, grafo.Nodes, grafo.Edges, isMatrix, isDigrafo);
      resp.then((e) => {
        removeCookies("grafoResposta", { path: "/", maxAge: 3600, sameSite: true });
        var distanciaX:number = 0;
        e.fisica = false;
        e.nodes.map((e) => {
          e.y = 0;
          e.x = distanciaX;
          distanciaX += 100;
        });
        setCookie("grafoResposta", e, { path: "/", maxAge: 3600, sameSite: true })
        window.open("/resposta", "_blank")
        setLogFunctions([
          ...logFunctions,
          `Ordena????o topologica do vertice ${origem} -> ${e.nodes.map((e) => { return e.label })}`
        ])
      }).catch((e) => {
        console.log(e);
      })
    }
  }

  function quantidadeVerticesArestas() {
    if (api == null) {
      console.log("bug quantidadeVerticesArestas")
    }
    const resp = api.quantidadeVerticesArestas(grafo.Nodes, grafo.Edges, isMatrix, isDigrafo);
    resp.then((e) => {
      setLogFunctions([
        ...logFunctions,
        `Quantidade de Vertices ${e.quantidadeVertice} Quantidade de Aresta ${e.quantidadeAresta}`
      ])
    }).catch((e) => {
      console.log(e);
    })
  }

  function buscaLargura() {
    if (api == null) {
      console.log("bug buscaLargura")
    }
    var origem = prompt("Digite a origem")?.split(" ")[0];
    var destino = prompt("Digite o destino")?.split(" ")[0];
    if (origem != null && destino != null) {
      const resp = api.buscaLargura(origem, destino, grafo.Nodes, grafo.Edges, isMatrix, isDigrafo);
      resp.then((e) => {
        setLogFunctions([
          ...logFunctions,
          `Busca em lagura: ${e}`
        ])
      }).catch((e) => {
        console.log(e);
      })
    }
  }

  return (
    <>
      <div className='xl:h-screen bg-gradient-to-tl from-green-900 via-slate-700 to-pink-800'>
        <div className="flex overflow-hidden xl:max-h-screen">
          <div hidden={isPopup} className="bg-gray-900 bg-opacity-50 fixed inset-0 z-10" id="sidebarBackdrop">
            <Terminal lines={logFunctions} onClose={changeStatePop}></Terminal>
          </div>
          <div id="main-content" className="h-screen w-full relative overflow-y-auto">
            <main>
              <div className="pt-6 px-4">
                <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-4">
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-1">
                    <div className="h-full w-full flex">
                      <div className="h-full w-full" ref={grafoDiv} id="graphId"></div>

                    </div>
                  </div>
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Fun????es disponiveis</h3>
                      </div>
                      <div>
                        <button onClick={() => { setPopup(!isPopup) }}>
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
                                    Descri????o
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                <ItemListaCheckBox onChange={changeMatrix} schemaColor={false} defaultCheck={true} check={isMatrix} describe='True -&gt; Matriz | False -&gt; Lista' ></ItemListaCheckBox>
                                <ItemListaCheckBox onChange={changeDigrafo} schemaColor={true} defaultCheck={true} check={isDigrafo} describe='True -&gt; Digrafo | False -&gt; N??o digrafo' ></ItemListaCheckBox>
                                <ItemListaButton onClick={clear} schemaColor={false} buttonName={"Limpa o grafo."} describe={"Limpa o Grafo."} ></ItemListaButton>
                                <ItemListaButton onClick={obterListaAdj} schemaColor={true} buttonName={"Lista de Adjacencia"} describe={"Retorna uma lista de adjacencia a partir do grafo inserido."} ></ItemListaButton>
                                <ItemListaButton onClick={quantidadeVerticesArestas} schemaColor={false} buttonName={"Contador"} describe={"Retorna a contagem de vertices e arestas."} ></ItemListaButton>
                                <ItemListaButton onClick={obterGrauVertice} schemaColor={true} buttonName={"Verifica Grau."} describe={"Retorna o grau de um vertice."} ></ItemListaButton>
                                <ItemListaButton onClick={classificarAresta} schemaColor={false} buttonName={"Classifica????o de arestas."} describe={"Realiza a classifica????o de arestas."} ></ItemListaButton>
                                <ItemListaButton onClick={buscaLargura} schemaColor={true} buttonName={"Busca em Largura."} describe={"Realiza a busca em largura no grafo dado."} ></ItemListaButton>
                                <ItemListaButton onClick={prim} schemaColor={false} buttonName={"Prim."} describe={"Retorna a arvore geradora minima segundo Prim."} ></ItemListaButton>
                                <ItemListaButton onClick={obterDijkstra} schemaColor={true} buttonName={"Dijkstra."} describe={"Retorna um grafo com os pesos relaxados."} ></ItemListaButton>
                                <ItemListaButton onClick={verificarCiclo} schemaColor={false} buttonName={"Ciclo."} describe={"Verifica se h?? ciclo no grafo."} ></ItemListaButton>
                                <ItemListaButton onClick={obterOrdenacaoTopologica} schemaColor={true} buttonName={"Ordena????o Topologica."} describe={"Retorna a ordena????o topologica."} ></ItemListaButton>
                                <ItemListaButton onClick={obterFortementeConexo} schemaColor={false} buttonName={"Fortemente Conexo."} describe={"Retorna os grupos conexos."} ></ItemListaButton>
                                <ItemListaButton onClick={verificarAresta} schemaColor={true} buttonName={"Verificar Aresta"} describe={"Verifica se existe uma determinada aresta."} ></ItemListaButton>
                                <tr className="">
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                    <button onClick={criaGrafoDoForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                                      Cria um grafo.
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    <Textarea value={formularioCriaGrafo} onChange={e => setformularioCriaGrafo(e.target.value)}></Textarea>
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
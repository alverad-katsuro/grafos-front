import { useEffect, useRef } from 'react';
import { Edge, IdType, Options } from "vis-network";
import { Grafo } from '../components/BasicGraph';
import "node_modules/vis-network/dist/dist/vis-network.min.css"
import { PopUp } from '../components/PopUp';

export default function Home() {
  const isMatrix = useRef(null);
  const isDigrafo = useRef(null);
  const grafoDiv = useRef(null);
  var inDraw:boolean = false;
  const grafo: Grafo = new Grafo();

  function changeDraw(entrou:boolean) {
    inDraw = entrou;
    console.log(inDraw);
  }
  
  function createNodeAresta() {
    var nos = grafo.Grafo?.getSelectedNodes();
    if (nos?.length == 2) {
      //grafo.Edges.push({from:nos[0], to:nos[1]})
      
    }
    console.log(grafo.Grafo?.getSelectedNodes())
    grafo.Grafo?.on('click', function(params){
      
  }) 
  }
  

  function changeDigrafo() {
    //@ts-ignore
    if (isDigrafo.current.checked) {
      grafo.Digrafo = true;
    } else {
      grafo.Digrafo = false;
    }
  }

  function deleteSelection() {
    grafo.deleteSelection();
  }
 
  useEffect(() => {
    {onkeydown = (e) => {
      if (e.key == 'a') {
        console.log(e)}}
      }
    
    const container: HTMLElement = document.getElementById("graphId") as HTMLElement;
    grafo.Container = container;
    console.log(grafo.Edges.get());
    grafo.createGrafo();
  })

  return (
    <>
      <div className="">
        <div className="flex overflow-hidden bg-white xl:max-h-screen">
          <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
          <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto ">
            <main>
              <div className="pt-6 px-4">
                <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-4">
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-1">
                    <div id="main-chart" className="h-full w-full flex">
                      <div ref={grafoDiv} onMouseEnter={() => changeDraw(true)} onMouseLeave={() => changeDraw(false)} className="w-full" id="graphId">
          
                      </div>
                    </div>
                  </div>
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Funções disponiveis</h3>
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
                                      <input ref={isMatrix} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="isMatrix" />
                                    </div>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    True -&gt; Matriz | False -&gt; Lista
                                  </td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                    <div className="form-check">
                                      <input ref={isDigrafo} onClick={changeDigrafo} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="isDigrafo" />
                                    </div>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    True -&gt; Digrafo | False -&gt; Não digrafo
                                  </td>
                                </tr>
                                {/*
                                <tr>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                    <button onClick={createNodeAresta} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                      Criar
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Vertice | Aresta
                                  </td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                    <button onClick={deleteSelection} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                      Deletar
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Deleta seleção -&gt; Vertice | Aresta
                                  </td>
                                </tr>
                              
                                */}
                                <tr>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                      Verificar Aresta
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Verifica se existe uma determinada aresta.
                                  </td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                      Lista de Adjacencia
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Retorna uma lista de adjacencia a partir do grafo inserido.
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                      Contador
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Retorna a contagem de vertices e arestas.
                                  </td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                      Verifica Grau
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Retorna o grau de um vertice.
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                      Busca em Profundidade.
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Realiza a busca em profundidade.
                                  </td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                      Busca em Largua.
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Realiza a busca em largura no grafo dado.
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                      AGM.
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Retorna a arvore geradora minima segundo Prim.
                                  </td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                      Dijkstra.
                                    </button>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    Retorna um grafo com os pesos relaxados.
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

            <p className="text-center text-sm text-gray-500 my-10">
              &copy; 2022-2022 <a href="https://github.com/alverad-katsuro/grafos-front" className="hover:underline" target="_blank">Alverad Katsuro</a>. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </>
  )
}
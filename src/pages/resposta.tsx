import { getCookie } from "cookies-next";
import { useEffect, useRef } from "react";
import { Edge, Node } from "vis-network";
import { Grafo } from "../components/BasicGraph";
import { GrafoModel } from "./api/api";
import "node_modules/vis-network/dist/dist/vis-network.min.css";

export default function Resposta() {
    const grafoDiv = useRef(null);
    var grafo: Grafo = new Grafo();
    grafo.Nodes.clear();
    grafo.Edges.clear();
    let grafoModelString = getCookie("grafoResposta")?.toString() ?? "{'bugo':true}";
    let grafoModel: GrafoModel = eval("(" + grafoModelString + ")");

    console.log(grafoModel);

    let ed: Edge[] = grafoModel.edges?.map((e) => {
        delete e['tipoAresta'];
        return e;
    });

    let nod: Node[] = grafoModel.nodes?.map((e) => {
        return e
    })

    if (ed != null && nod != null) {
        grafo.Nodes.add(nod);
        grafo.Edges.add(ed);

    }

    useEffect(() => {
        const container: HTMLElement = document.getElementById("graphId") as HTMLElement;
        grafo.Container = container;
        grafo.createGrafo();
    })

    return (
        <>
            <div className='xl:h-screen bg-gradient-to-tl from-green-900 via-slate-700 to-pink-800'>
                <div className="flex overflow-hidde xl:max-h-screen">
                    <div className="h-full w-full overflow-y-auto">
                        <main>
                            <div className="pt-6 px-4 xl:h-[650px] h-screen">
                                <div className="h-full bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                                    <div className="overflow-hidden h-full w-full">
                                        <div className="h-full w-full" ref={grafoDiv} id="graphId"></div>
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


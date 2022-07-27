import React, { useEffect, useState } from "react";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";
import "./UserGraphs.scss";

interface IGraph {
  acessos: string;
  id: number;
  title: string;
}

interface IUserGraphs {
  data: IGraph[];
}

const UserGraphs = ({ data }: IUserGraphs) => {
  const [graph, setGraph] = useState<{ x: string; y: number }[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const graphData = data.map((item) => {
      return {
        x: item.title,
        y: Number(item.acessos),
      };
    });

    setTotal(
      data.map(({ acessos }) => Number(acessos)).reduce((a, b) => a + b, 0)
    );
    setGraph(graphData);
  }, [data]);

  return (
    <section className="user_graph animeLeft">
      <div className="user_graph-total user_graph-item">
        <p>Acessos: {total}</p>
      </div>
      <div className="user_graph-item">
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: "#fff",
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: "#333",
            },
          }}
        />
      </div>
      <div className="user_graph-item">
        <VictoryChart>
          <VictoryBar alignment="start" data={graph}></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserGraphs;

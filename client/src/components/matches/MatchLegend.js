import React from "react";
import styled from "styled-components";

const MatchLegend = () => {
  return (
    <LegendBox>
      <Legend>
        <h3>Legenda</h3>
          <ul>
            <li>
              <div className="value bg-hit-result d-inline-block mr-2" />
              <label>Trafiony wynik</label>
            </li>
            <li>
              <div className="value bg-hit-winner d-inline-block mr-2" />
              <label>Trafiona wygrana</label>
            </li>
          </ul>
      </Legend>
      <Points>
        <table className="table">
          <thead>
            <tr>
              <th>[punktacja]</th>
              <th>Trafiona wygrana</th>
              <th>Trafiony wynik</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Pierwsza połowa</th>
              <td>1 pkt.</td>
              <td>2 pkt.</td>
            </tr>
            <tr>
              <th>Druga połowa</th>
              <td>2 pkt.</td>
              <td>3 pkt.</td>
            </tr>
          </tbody>
        </table>
      </Points>
    </LegendBox>
  );
};

export default MatchLegend;

const LegendBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const Legend = styled.div`
  ul {
    list-style-type: none;
    margin: 0px;
    li {
      margin-right: 5px;
      .value {
        width: 15px;
        height: 15px;
      }
    }
  }
`;

const Points = styled.div`

`;
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import LeftSlider from "../components/LeftSlider";
import axios from "axios";
import "../styles/endprocess.css"
const EndProcess = () => {
  const [data, setData] = useState();
  function formatDate(matchDate) {
    const date = new Date(matchDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}/${month}/${day}`;

    return formattedDate;
  }
  useEffect(() => {
    axios
      .get(`https://localhost:7283/api/Match/EndProcess`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const myjson = [
    {
      MatchId: "4",
      MatchName: "Abdullah",
      FemaleName: "Saba",
      Dateofreconciliation: "8-4-2010",
      WeddingDate: "1-4-2024",
    },
    {
      MatchId: "4",
      MatchName: "Abubakar",
      FemaleName: "Komal",
      Dateofreconciliation: "10-2-2010",
      WeddingDate: "03-10-2024",
    },
  ];
  return (
    <div className="container">
      <NavBar />
      <div class="mainSection">
        <LeftSlider />
        <div style={{ display: "block", margin: "auto" }}>
          <h3 class="userstext">Matchmaking End</h3>
          <h3 class="usersdescription">Below All the Matches in Process</h3>
          <table class="table" id="table">
            <thead>
              <tr>
                <th>Match ID</th>
                <th>Male Name:</th>
                <th>Female Name</th>
                <th>Match Rating</th>
                <th>Match Date</th>
                <th>Date of Wedding</th>
              </tr>
            </thead>
            {/* <tbody id="table-body"></tbody> */}
            <tbody id="table-body">
              {data &&
                data.map((item, index) => {
                  const formattedDate = formatDate(item.match.matchDate);
                  const weddingDate = formatDate(item.match.weddingDate);
                  return (
                    <>
                      <tr>
                        <td className="endtd">{item.match.id}</td>
                        <td className="endtd">
                          {item.maleChildren[0].user_name}
                        </td>
                        <td className="endtd">
                          {item.femaleChildren[0].user_name}
                        </td>
                        <td className="endtd">{item.match.match_Rating}</td>
                        <td className="pointer endtd">{formattedDate} </td>
                        <td className="pointer endtd">{weddingDate}</td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EndProcess;

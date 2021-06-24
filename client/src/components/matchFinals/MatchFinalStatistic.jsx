import React from "react";
import { useSelector } from 'react-redux';
import Styled from "styled-components";

const MatchFinalStatistic = () => {
    const finalMatches = useSelector(state => state.matchFinal.matchFinals);
    let users = useSelector(state => state.user.users);
    
    // reset users points first round result first round winner second round result second half winner
    users = users.map(user => {
        user.totalPoints = 0;
        user.firstHalfHitWinner = 0;
        user.firstHalfHitResult = 0;
        user.secondHalfHitWinner = 0;
        user.secondHalfHitResult = 0;
        return user;
    });

    // count points for matches
    if(finalMatches.length > 0){
        finalMatches.forEach(match => {
            users.forEach(user => {
                if(user._id == match.userId){
                    user.totalPoints = user.totalPoints ? user.totalPoints + match.totalPoints : match.totalPoints;
                    user.firstHalfHitWinner = user.firstHalfHitWinner ? user.firstHalfHitWinner + match.firstHalfHitWinner : match.firstHalfHitWinner;
                    user.firstHalfHitResult = user.firstHalfHitResult ? user.firstHalfHitResult + match.firstHalfHitResult : match.firstHalfHitResult;
                    user.secondHalfHitWinner = user.secondHalfHitWinner ? user.secondHalfHitWinner + match.secondHalfHitWinner : match.secondHalfHitWinner;
                    user.secondHalfHitResult = user.secondHalfHitResult ? user.secondHalfHitResult + match.secondHalfHitResult : match.secondHalfHitResult;
                }
            });
        });
        users.sort((a, b) => (a.totalPoints > b.totalPoints) ? -1 : 1);
    }

    const bestUser = users.reduce((prev, current) => (prev.totalPoints > current.totalPoints) ? prev : current);

    let counter = 1;
    const usersContent = users.map(user=> (
        <tr key={ user._id }>
            <td>{ counter++ }</td>
            <td>{ user.name }</td>
            <td>{ user.firstHalfHitWinner }</td>
            <td>{ user.firstHalfHitResult }</td>
            <td>{ user.secondHalfHitWinner }</td>
            <td>{ user.secondHalfHitResult }</td>
            <td style={{color:"green",fontWeight:"bold"}}>{ user.totalPoints }</td>
        </tr>
    ));

    return (
        <React.Fragment>
            {/* <h1>Ranking graczy - według punktacji</h1> */}
            <LeaderBox>
                <img src="img/logo_euro_2020.png" alt="" />
                <div className="info">
                    <div className="ranks">RANKS LEADER</div>
                    <div className="name">{ bestUser.name }</div>
                    <div className="points">Liczba zdobytych punktów: { bestUser.totalPoints }</div>
                </div>
            </LeaderBox>
            <table className="table" style={{textAlign:"center"}}>
                <thead>
                    <tr>
                        <th>Miejsce</th>
                        <th>Imię / nazwisko</th>
                        <th>I połowa trafiona wygrana</th>
                        <th>I połowa trafiony wynik</th>
                        <th>II połowa trafiona wygrana</th>
                        <th>II połowa trafiony wynik</th>
                        <th style={{color:"green"}}>Łączna liczba punktów</th>
                    </tr>
                </thead>
                <tbody>
                    { usersContent }
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default MatchFinalStatistic;

const LeaderBox = Styled.div`
    display:flex;
    flex:direction:row;
    align-items:center;
    img{
        max-width:130px;
    }
    .info{
        color:green;
    }
`;
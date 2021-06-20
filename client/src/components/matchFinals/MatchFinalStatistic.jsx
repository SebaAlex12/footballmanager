import React from "react";
import { useSelector } from 'react-redux';

const MatchFinalStatistic = () => {
    const finalMatches = useSelector(state => state.matchFinal.matchFinals);
    let users = useSelector(state => state.user.users);

    // reset users points
    users = users.map(user => {
        user.totalPoints = 0;
        return user;
    });

    // count points for matches
    if(finalMatches.length > 0){
        finalMatches.forEach(match => {
            users.forEach(user => {
                if(user._id == match.userId){
                    user.totalPoints = user.totalPoints ? user.totalPoints + match.totalPoints : match.totalPoints;
                }
            });
        });
        users.sort((a, b) => (a.totalPoints > b.totalPoints) ? -1 : 1);
    }

    let counter = 1;
    const usersContent = users.map(user=> (
        <tr key={ user._id }>
            <td>{ counter++ }</td>
            <td>{ user.name }</td>
            <td>{ user.totalPoints }</td>
        </tr>
    ));

    return (
        <React.Fragment>
            <h1>Ranking graczy - według punktacji</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Miejsce</th>
                        <th>Imię / nazwisko</th>
                        <th>Łączna liczba punktów</th>
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
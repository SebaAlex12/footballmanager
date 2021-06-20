import React from "react";
import Styled from "styled-components";


const MatchesFilter = (props) => {
    const { matchesTypes, matchesTypesActionHandler } = props;
    return(
        <FilterBox>
            <button onClick={() => matchesTypesActionHandler({...matchesTypes,toPlay: !matchesTypes.toPlay})} className={`btn btn-light ${matchesTypes.toPlay && 'active'}`}>Do rozegrania</button>
            <button onClick={() => matchesTypesActionHandler({...matchesTypes,inProgress: !matchesTypes.inProgress})} className={`btn btn-light ${matchesTypes.inProgress && 'active'}`}>W trakcie</button>
            <button onClick={() => matchesTypesActionHandler({...matchesTypes,finished: !matchesTypes.finished})} className={`btn btn-light ${matchesTypes.finished && 'active'}`}>Zakończone</button>
        </FilterBox>
    )
}

export default MatchesFilter;

const FilterBox = Styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
`;
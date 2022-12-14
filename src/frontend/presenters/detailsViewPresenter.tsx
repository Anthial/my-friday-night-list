import DetailsView from "../views/detailsView.jsx";
import { useEffect } from "react";
import { selectedSeasonState, selectedTitle } from "../../backend/model/atoms.js";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import Spinner from "../views/spinnerView.js";
import { Title } from "../../backend/model/title";
import { loggedInUserAtom } from "../../backend/model/user";
import { useNavigate } from "react-router-dom";


function DetailsViewPresenter() {
  const [user, setUser] = useRecoilState(loggedInUserAtom);
  const values = useRecoilValue(selectedTitle);
  const setSeason = useSetRecoilState(selectedSeasonState);

  function setSelectedSeason (s: any) {
    setSeason(s);
  } 
  function onUserModifiedList(title: Title) {
		if(user) {
			let newWatchList = [...user.watchlist];

			if(newWatchList.includes(title.id)) {
				newWatchList = newWatchList.filter(id => id !== title.id);
			}
			else {
				newWatchList.push(title.id);
			}

			setUser({...user, watchlist: newWatchList});
		}
	}	
  const navigate = useNavigate();

  useEffect(() => {
    if (!user){
      navigate("/")
     }
  }, [])

  return (!(Object.keys(values).length === 0) ? 
    <div>
      <DetailsView
        title={values ? values.name : "Loading..."}
        year={values ? values.year : "Loading..."}
        plot= {values ? values.plot : "Loading..."}
        stars= {values ? values.stars : "Loading..."}
        image = {values ? values.imageUrl : "spinner.svg"}
        seasons = {values ? values.seasons : null}
        setSelectedSeason = {setSelectedSeason}
        userWatchlist={user ? user.watchlist : []}
        onUserModifiedList = {onUserModifiedList}
        values = {values ? values : null}
      ></DetailsView>
    </div>
    :
    <Spinner/>)
}

export default DetailsViewPresenter;

import { useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from "react-router-dom"

import Header from "./frontend/presenters/headerPresenter"
import DetailsViewPresenter from "./frontend/presenters/detailsViewPresenter"
import TriviaViewPresenter from "./frontend/presenters/triviaViewPresenter"
import PersonalList from "./frontend/presenters/personalListPresenter"
import SearchResults from './frontend/presenters/searchResultsPresenter'
import LoginViewPresenter from "./frontend/presenters/LoginPresenter"
import RegisterViewPresenter from "./frontend/presenters/registerPresenter"
import EpisodeViewPresenter from './frontend/presenters/episodeViewPresenter'

import { addLoginObserver, removeLoginObserver, loggedInUserAtom, loginUserWithCookie, UserData } from "./backend/model/user";
import { useRecoilState } from 'recoil';

function App() {
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserAtom);

  useEffect(() => {
    const observer = (data: UserData | null) => {
      setLoggedInUser(data);
    }

    addLoginObserver(observer);
    return () => removeLoginObserver(observer);
  }, []);

  return (
    <HashRouter>
      <div id="app" className="flex flex-col w-full h-full">
        <Header></Header>

        <Routes>
          <Route path="" element={<LoginViewPresenter />}></Route>
          <Route path="register" element={<RegisterViewPresenter />}></Route>
          <Route path="details" element={<DetailsViewPresenter></DetailsViewPresenter>}></Route>
          <Route path="episodes" element={<EpisodeViewPresenter></EpisodeViewPresenter>}></Route>
          <Route path="trivia" element={<TriviaViewPresenter></TriviaViewPresenter>}></Route>
          <Route path="mylist" element={<PersonalList></PersonalList>}></Route>
          <Route
            path="search"
            element={<SearchResults></SearchResults>}
          ></Route>
        </Routes>

        {/*<CherryworksButton x={count}></CherryworksButton>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      */}
      </div>
    </HashRouter>
  );
}

export default App;

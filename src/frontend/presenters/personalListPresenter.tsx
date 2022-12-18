import PersonalListView from "../views/personalListView";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  selectedSeasonState,
  selectedRegionState,
  selectedTitleAtom,
  selectedTitle,
} from "../../backend/model/atoms";
import regions from "../../backend/data/ISO-3166-Alpha-2-country-codes";
import Spinner from "../views/spinnerView";
import { useState, useEffect } from "react";
import { getTitleById } from "../../backend/model/imdb";
import { Title, TitleId, TitleType } from "../../backend/model/title";
import { loggedInUserAtom } from "../../backend/model/user";
import { getAvailabilityById } from "../../backend/model/streamingAvailability";

function PersonalList(props: any) {
  const [userData, setMyList] = useRecoilState(loggedInUserAtom);
  const [concatObject, setConcatObject] = useState<any>([]);
  const [region, setRegion] = useRecoilState(selectedRegionState);
  const [expandedState, setExpandedState] = useState<any>({});
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    const myList = userData?.watchlist;
    const fetchData = async (id: string) => {
      const response = await getTitleById(id, false);
      let networks = await getAvailabilityById(id, region, false).catch(
        (error) => console.log(error)
      );
      if (!networks) {
        networks = { streamingInfo: {}, imdbID: id, region: region };
      }
      return [response, networks];
    };
    if (myList) {
      let newExpandedState = expandedState;
      setIsFetching(true);
      Promise.all(
        myList.map((titleId) => {
          if (!newExpandedState[titleId]) {
            newExpandedState[titleId] = false;
          }
          return fetchData(titleId).then(handleContent);
        })
      ).then((values) => {
        setExpandedState(newExpandedState);
        setConcatObject(values);
        setIsFetching(false);
      });
    }
  }, [region, userData]);
  function handleContent(handle: any) {
    return { ...handle[1], ...handle[0] };
  }
  function removeTitleFromList(titleId: string) {
    if (userData) {
      let newWatchList = [...userData.watchlist];

      newWatchList = newWatchList.filter((id) => id !== titleId);
      setMyList({ ...userData, watchlist: newWatchList });
    }
  }
  const [, setSeason] = useRecoilState(selectedSeasonState);
  function saveSelectedSeason(seasonId: string) {
    setSeason(seasonId);
  }
  const setSelectedTitleId = useSetRecoilState(selectedTitleAtom);
  const setSelectedTitle = useSetRecoilState(selectedTitle);
  function saveSelectedTitle(id: TitleId) {
    setSelectedTitle({} as Title);
    setSelectedTitleId(id);
    getTitleById(id, false)
      .then((title) => setSelectedTitle(title))
      .catch((e: Error) => setSelectedTitle({} as Title));
  }

  function saveSelectedRegion(regionName: string) {
    const findRegionObject = regions.find(({ name }) => name === regionName);
    if (findRegionObject != null) {
      setRegion(findRegionObject["alpha-2"].toLowerCase());
    } else {
      console.error("Region could not be set");
    }
  }
  const findRegionObject = regions.find(
    (obj) => obj["alpha-2"].toLowerCase() == region
  );

  if (isFetching) {
    return <Spinner />;
  }
  return (
    <PersonalListView
      tvShow={concatObject}
      saveSelectedSeason={saveSelectedSeason}
      saveSelectedRegion={saveSelectedRegion}
      regions={regions}
      region={findRegionObject ? findRegionObject.name : ""}
      saveSelectedTitle={saveSelectedTitle}
      removeTitle={removeTitleFromList}
      expandedState={expandedState}
      toggleExpanded={(id: TitleId) => {
        let newExpandedState = { ...expandedState };
        newExpandedState[id] = !newExpandedState[id];
        setExpandedState(newExpandedState);
      }}
    />
  );
}

export default PersonalList;

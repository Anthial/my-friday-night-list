import React from "react";
import { Link } from "react-router-dom";

function PersonalListView(props: any) {
  // console.log(props);

  console.log(props.tvShow);
  return (
    <div className="flex flex-col xs:items-center  ">
      <h1 className="flex justify-center underline decoration-solid decoration-4 underline-offset-4  mt-4 mb-4">
        My list
      </h1>
      <div className="flex justify-center flex-wrap  max-w-[406px] items-center">
        <select
          name="selected-country"
          id="country-select"
          className="p-1 hover:shadow-lg bg-[#312244] rounded-lg border-transparent hover:border-[#646cff] outline-[0px] hover:outline hover:outline-[1px] outline-[#646cff]
          text-center min-w-full"
          onChange={(event) => props.saveSelectedRegion(event.target.value)}
        >
          <option className="" disabled value="">
            - - - Select watch region - - -
          </option>
          {generateRegions(props)}
        </select>
      </div>
      <div className="flex lg:flex-row flex-col lg:justify-around justify-center max-lg:items-center flex-wrap w-full ">
        {props.tvShow.map((tvshow: any) => renderMainContent(tvshow, props))}
      </div>
    </div>
  );
}

function renderSeasons(season: any, saveSelectedSeason: any) {
  return (
    <div key={season} className="mt-2 inline-block whitespace-pre pl-[120px]">
      <Link to="/details" 
      className="ml-2.5 bg-[#312244] py-0  px-1.5 hover:shadow-lg hover:bg-[#251a33] rounded-lg border-transparent hover:border-[#646cff] outline-[0px] hover:outline hover:outline-[1px] outline-[#646cff]" 
      onClick={() => saveSelectedSeason(season)}>
        Season {season}
      </Link>
    </div>
  );
}
function renderLinks(links: any) {
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const region: string = Object.keys(links[1])[0];
  return (
    <a
      className="border bg-[#312244] border-[#312244] px-2 rounded-lg hover:border-[#646cff] mx-2 text-white"
      href={links[1][region].link}
      target="_blank"
    >
      {capitalizeFirstLetter(links[0])}
    </a>
  );
}
function renderCountriesCB(country: string) {
  return <span>{country} / </span>;
}

function generateRegions(props: any) {
  return props.regions.map((regions: any) => {
    return <option value={regions.name}>{regions.name}</option>;
  });
}

function renderMainContent(tvShow: any, props: any) {
  const [expand, setExpand] = React.useState(false);

  function expandACB() {
    setExpand(!expand);
  }

  function renderIconCB() {
    if (expand) {
      return (
        <img
          id="expand-icon"
          className="w-4 bg-transparent rotate-180 h-[20px] w-[20px]"
          src="/expand-down-arrow-ico.png"
          alt="expand down arrow"
        />
      );
    }
    return (
      <img
        id="expand-icon"
        className="w-4 bg-transparent rotate-0 h-[20px] w-[20px]"
        src="/expand-down-arrow-ico.png"
        alt="expand down arrow"
      />
    );
  }
  function expandedContentACB(seasons: any, saveSelectedSeason: any) {
    if (expand) {
      return (
        <div className="pl-6">
          {seasons.map((season: string) =>
            renderSeasons(season, saveSelectedSeason)
          )}
        </div>
      );
    }
    return <div></div>;
  }
  function generateStreamingLinksCB(streamingInfo: object) {
    // console.log(Object.entries(streamingInfo)); //gives me an array containing the keys for the streaming objects
    return <div>{Object.entries(streamingInfo).map(renderLinks)}</div>;
  }
  function getCountriesCB(countries: any) {
    // console.log(countries);
    return <span>{countries.map(renderCountriesCB)}</span>;
  }
  return (
    <div key={tvShow.id} className="flex flex-col text-lg mt-2  lg:w-[34%] ">
      <div className="lg:ml-2 items-center flex flex-col lg:flex-row text-lg mt-2">
        <img
          src={tvShow.imageUrl}
          className="inline w-[100px] object-cover rounded-lg mr-8"
        ></img>
        <div className="flex flex-col ">
          <div className="flex flex-row border-box">
            {tvShow.seasons && (
              <div
                className="hover:border-b hover:pb-0 pb-[1px] border-solid border-[#b7e4c7] hover:cursor-pointer flex lg:flex-row flex-col"
                onClick={expandACB}
              >
                <div>
                  <span className="mr-2">{tvShow.name}</span>
                  <div>
                    <span className="text-[#b7e4c7] whitespace-pre">
                      Origin:{" "}
                    </span>
                    {/*getCountriesCB(tvShow.country)*/}
                    <span>{tvShow.country}</span>
                  </div>
                </div>
              </div>
            )}
            {!tvShow.seasons && (
              <div className="flex lg:flex-row flex-col hover:border-b hover:pb-0 pb-[1px] border-solid border-[#b7e4c7] hover:cursor-pointer">
                <Link to="/details">
                <div>
                  <span className="mr-2.5">{tvShow.name}</span>
                  <div>
                    <span className="text-[#b7e4c7] whitespace-pre">
                      Origin:{" "}
                    </span>
                    {/*getCountriesCB(tvShow.country)*/}
                    <span>{tvShow.country}</span>
                  </div>
                </div>
                </Link>
              </div>
            )}

            {tvShow.seasons && (
              <div className="w-[30px] h-[30px]">
                <button
                  id="expand-icon"
                  className="ml-2.5 bg-[#312244] py-0 px-1.5 hover:shadow-lg w-[30px] h-[30px]"
                  onClick={expandACB}
                >
                  {renderIconCB()}
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col flex-wrap lg:flex-row pt-1">
            <div className="flex flex-row flex-wrap text-[#b7e4c7]">
              <span>Watch at: </span>
              <span> {generateStreamingLinksCB(tvShow.streamingInfo)}</span>
            </div>
          </div>
        </div>
      </div>
      {expandedContentACB(
        tvShow.seasons ? tvShow.seasons : null,
        props.saveSelectedSeason
      )}
    </div>
  );
}
export default PersonalListView;

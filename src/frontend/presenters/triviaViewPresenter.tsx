import TriviaView from "../views/triviaView.jsx";
import { getTriviaByID } from "../../backend/model/imdb";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { selectedTitle } from "../../backend/model/atoms.js";
import { loggedInUserAtom } from "../../backend/model/user.js";
import Spinner from "../views/spinnerView.js";

function TriviaViewPresenter() {
  //const id = "tt1630029";
  //const query = "cats";
  const user = useRecoilValue(loggedInUserAtom);
  const [items, setItems] = useState(null);
  const title = useRecoilValue(selectedTitle);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user){
      navigate("/")
    }  
    const fetchData = async () => {
      const resp = await getTriviaByID(title.id);
      setItems(resp.items);
    };
    if (title.id){
        fetchData();
    }
  }, [items]);
 

  return ((title) ? 
      <TriviaView
        items={items ? items : null}
        title={title ? title.name : "Loading..."}
        year={title && title.year ? title.year.toString() : "Loading..."}
        image={title ? title.imageUrl : "spinner.svg"}
      ></TriviaView>
      :
      <Spinner></Spinner>
  );
}

export default TriviaViewPresenter;

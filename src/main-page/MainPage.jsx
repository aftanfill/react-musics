import { Input } from "@mui/material";
import { useState, useEffect } from "react";
import "./main-page.scss";
import axios from "axios";
import Track from "../components/track/Track";

const searchMusic = (searchText, array) => {
  if (searchText.length === 0) return array;
  const lowerText = searchText.toLowerCase().trim();

  const foundTracks = array.filter((track) => {
    return (
      track.title.toLowerCase().includes(lowerText) ||
      track.artists.toLowerCase().includes(lowerText)
    );
  });
  return foundTracks;
};

const MainPage = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState("")

  useEffect(() => {
    const fetchMusics = async () => {
      const { data } = await axios.get("/db.json");
      console.log(data);
      setData(data);
    };
    fetchMusics();
  }, []);

  const handleChange = ({ target }) => {
    const inputValue = target.value
    setText(inputValue)
  };

  if (data.length === 0) return <h4>Loading...</h4>;

  return (
    <div className="search">
      <Input onChange={handleChange} className="input" placeholder="Поиск треков" />
      <div className="list">
        {searchMusic(text, data).map((track) => (
          <Track key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;

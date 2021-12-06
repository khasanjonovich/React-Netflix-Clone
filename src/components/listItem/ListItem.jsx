// Core
import { useContext, useEffect, useState } from "react";
import axios from "utils/axios";
import { Link } from "react-router-dom";
// UI
import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
// Custom
import "./ListItem.scss";
import AuthContext from "context/auth/AuthContext";

const ListItem = ({ id, i }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState(null);
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const getItem = async () => {
      try {
        const { data } = await axios.get(`/movies/find/${id}`, {
          headers: {
            token: user.token,
          },
        });
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    };
    getItem();
  }, [id, user.token]);
  return (
    <Link
      to={{ pathname: `/watch` }}
      state={{ movie }}
      className="listItem"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ left: isHovered && i * 231 - 50 }}
    >
      {movie && <img src={`${movie.img}`} alt="" />}
      {isHovered && movie && (
        <>
          <video
            className="video"
            src={`${movie.trailer}`}
            autoPlay={true}
            loop={true}
          ></video>
          <div className="info">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>

            <div className="moreInfo">
              {movie.duration} min
              {/* <span>{movie.duration} min</span> */}
              <span className="limit">+{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">{movie.desc}</div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </Link>
  );
};

export default ListItem;

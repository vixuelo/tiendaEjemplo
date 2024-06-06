import React, { useEffect, useState } from 'react';
import { traductor } from '../../Traductor/traductor';

export const LikeContent = ({ item }) => {
  const likedJSON = JSON.parse(localStorage.getItem("loveList")) || [];
  const [Like, setLike] = useState(false);
  const [renderCount, setRenderCount] = useState(0); // Nuevo estado para forzar la re-renderización

  const addLikeList = () => {
    const likeList = JSON.parse(localStorage.getItem("loveList")) || [];
    console.log({ likeList })
    if (!likeList.includes(item)) {
      likeList.push(item);
      const likeJSON = JSON.stringify(likeList);
      localStorage.setItem("loveList", likeJSON);
      setLike(true);
    } else {
      likeList.pop(item);
      setLike(false);
      const likeJSON = JSON.stringify(likeList);
      localStorage.setItem("loveList", likeJSON);
    }
    setRenderCount(prevCount => prevCount + 1); // Incrementar el contador para forzar la re-renderización
  };

  useEffect(() => {
    const likedJSON = JSON.parse(localStorage.getItem("loveList")) || [];
    console.log({ likedJSON })
    setLike(likedJSON.includes(item));
  }, [item]); // Agregar renderCount como dependencia

  return (
    <button className="btn dataSeller m-1 p-3 d-flex justify-content-center" onClick={() => addLikeList()}>
      {!Like ? <img className="" src="Layout\Button\likeIt.svg" alt="like" /> : <img src="Layout\Button\likedIt2.svg" alt="like" />}
      <h3 className="text-primary m-1 d-flex justify-content-center">{traductor("Save4Ltr")}</h3>
    </button>
  );
};

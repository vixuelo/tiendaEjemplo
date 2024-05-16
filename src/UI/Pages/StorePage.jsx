"use client";

import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  Marker,
} from "@vis.gl/react-google-maps";
import { NavBar } from "../Components/NavBar";
import { Bottom } from "../Components/Bottom";

export  const StorePage=()=>{
    // 40.48603089063002, -3.663164605674842 madrid
    //41.3946114,2.198671 barna
  const [madrid, setmadrid] = useState(true)
  const [position, setPosition] = useState({ lat: 40.486020963002, lng: -3.66316461567486 });
  const setOffice =(option)=>{
      if(option==="madrid"){
        setmadrid(true)
        setPosition({ lat: 40.486020963002, lng: -3.66316461567486 })
      }else{
        setmadrid(false)
        setPosition({ lat: 41.39457682881863, lng: 2.200441585398579 })
      }
  }
  return (
    <>
    <NavBar/>
    
    <APIProvider apiKey={"AIzaSyAI_3YTNtUMvKhzheFBQ7XCGOUnSuYHBCM"}>
      <div style={{display:"flex", justifyContent:"center", height: "50vh", width: "100%" }}>
        <Map zoom={18} center={position} mapId={"AIzaSyAI_3YTNtUMvKhzheFBQ7XCGOUnSuYHBCM"} controlled= {true}>
         
        <AdvancedMarker position={position}>
        <Pin
          />
        </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
<div className="d-flex flex-column">
  <hr />
<button className={(madrid?'bg-ligth border border-white':'')+`btn text-start`} onClick={() => setOffice("madrid")}>
  <div className="">
    <div className="fw-bold">Madrid: Novus Building</div>
    <small className="btn btn-link"> Cam. de la Fuente de la Mora, 1, Hortaleza, 28050 Madrid</small>
  </div>
</button>
<hr />
<button className={(!madrid?'bg-light border border-white':'')+`btn text-start`} onClick={() => setOffice("barna")}>
<div className="">
    <div className="fw-bold">Barcelona: NTT Data Barcelona</div>
    <small className="btn btn-link"> Av. d'Icària, 211, Sant Martí, 08005 Barcelona</small>
  </div>
</button>
<hr />
</div>
   
    <Bottom/></>
  );
}


export const getClientByKey = (key) => {
    
  const cookies = JSON.parse(localStorage.getItem("cookiesHistorial"));
  // console.log(cookies)
  
  return cookies.find((client)=>client["keyID"]===key); 
  

}
export const addItemOnCookies = (item) => {
  const key = localStorage.getItem("actualKeyID");
  // console.log({key});
  const client = getClientByKey(key);
  // console.log({client});
  client["itemsCount"]=client["itemsCount"]+1;
  client[`item${client["itemsCount"]}`]=item.nombre;
  client["items"].push(item.nombre);
  // console.log({client});
    const cookies = JSON.parse(localStorage.getItem("cookiesHistorial"));
    const cookiesFinal = cookies.filter((client) => client["keyID"] !== key);
    cookiesFinal.push(client);
    localStorage.setItem("cookiesHistorial", JSON.stringify(cookiesFinal));
    
  
  }
  
  

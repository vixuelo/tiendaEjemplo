

export const getClientByKey = (key) => {
    
  const cookies = JSON.parse(localStorage.getItem("cookiesHistorial"));
  // console.log(cookies)
  
  return cookies.find((client)=>client["keyID"]===key); 
  

}
export const addItemOnCookies = (item) => {
  const arrayItemsCliente=[]
  const arrayItemsClienteRet=[]
  if (item!==null){
  const lastItem = JSON.parse(localStorage.getItem("cookiesLastItem"))||[];
  console.log(lastItem)
  if (item.nombre!==null){

    if(lastItem.length>0 )
    {
      if(lastItem[length-1]!==item.nombre)
      {
        lastItem.push(item.referencia);
      }
    }else{
      lastItem.push(item.referencia);
    }
    
  }
    localStorage.setItem("cookiesLastItem", JSON.stringify(lastItem));
    return lastItem;
  }
  }
  
  

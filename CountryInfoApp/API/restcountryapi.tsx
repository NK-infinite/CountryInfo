 const RestCountryAPI = async(Countryname:string ) =>{
  try {
      
  let url = "";
    if (Countryname && Countryname.trim() !== "") {
      Countryname.trim();
      if (Countryname.length <= 3) {
        url = `https://restcountries.com/v3.1/alpha/${Countryname}`;
      } else {
        url = `https://restcountries.com/v3.1/name/${Countryname}`;
      }
    } else {
      url = "https://restcountries.com/v3.1/independent?status=true";
    }//https://restcountries.com/v3.1/independent?status=true

    const response = await fetch(url);
    const data = await response.json();

    console.log(data[0].name.common); 
    console.log(data[0].capital[0]);  
    console.log(data[0].population);  
   return data; 
   } catch (error) {
      console.log("This Is Errorr" , error);
   }
}

export default RestCountryAPI;
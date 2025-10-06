
const countryProfile = async(officialName1:string ) =>{
 try {
    const url = `https://restcountries.com/v3.1/alpha/${officialName1}`;
   const response = await fetch(url);
   const data = await response.json();
   console.log("ProfileAPi", data);
   return data;
} catch (error) {
    console.log(error);
    
 }

}
export default countryProfile;
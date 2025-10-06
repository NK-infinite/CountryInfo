const getEconomicApi = async (ID: string) => {
  try {
    const indicators = [
      "NY.GDP.MKTP.CD",
      "NY.GDP.PCAP.CD",  
      "FP.CPI.TOTL",
      "NE.EXP.GNFS.ZS",//Export
      "NE.IMP.GNFS.ZS",//IMport
    ];

  let results: any[] = [];
      for (let i = 0; i < indicators.length; i++) {
      const indicator = indicators[i];
      const res = await fetch(
        `https://api.worldbank.org/v2/country/${ID}/indicator/${indicator}?format=json`
      );
      const data = await res.json();
      results.push(data[1]);
    }

    console.log("All Economic Data:", results);
    return results;
  } catch (err) {
    console.error(err);
    return null;
  }
};


export default getEconomicApi
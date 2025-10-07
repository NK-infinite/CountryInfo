
const getHumandevlopment = async (ID: string) => { 
    try {
        const indicators = [  

            // Population
            "SP.POP.TOTL",
            "SP.POP.GROW",

            // Health
            "SP.DYN.LE00.IN", //Average life expectancy
            "SH.DYN.MORT",  //Deaths under age 5 per 1000 births
            "SH.XPD.CHEX.GD.ZS", //Health spending

            // Education
            "SE.ENR.PRIM.FM.ZS",//Total children enrolled in primary school
            "SE.ADT.LITR.ZS", //Percentage of literate adults
            "SE.XPD.TOTL.GD.ZS", //Education spending


             //GDP
            "NY.GDP.MKTP.CD",
        ]

        let results: any[] = [];

        for (let i = 0; i < indicators.length; i++) {
            const indicator = indicators[i];
            const res = await fetch(
                `https://api.worldbank.org/v2/country/${ID}/indicator/${indicator}?format=json`
            );
            const data = await res.json();
            results.push(data[1]);
        }
        console.log("All Human Development Data:", results);
        return results;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export default getHumandevlopment;
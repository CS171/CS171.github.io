(function(cs171) {
    "use strict";

    var choroPlethChart = cs171.choroplethChart;
    var treeChart = cs171.treeChart;
    var int = cs171.int;

   // Cleans up data and casts the correct data type for a single item of
    // data in the malaria dataset.
    function dataType(d) {
        return {
            highRisk: int(d.At_high_risk),
            risk: int(d.At_risk),
            code: d.Code,
            country: d.Country,
            cases: int(d.Malaria_cases),
            suspected: int(d.Suspected_malaria_cases),
            population: int(d.UN_population),
            region: d.WHO_region
        };
    }

    // Massage the dataset to have keys for each country
    function byCountry(data) {
        return data.reduce(function(acc, d) {
            acc[d.code] = d;
            return acc;
        }, {});
    }

    queue()
        .defer(d3.json, "data/africa.topo.json")
        .defer(d3.csv, "data/global-malaria-2015.csv")
        .defer(d3.json, "data/malaria-parasites.json")
        .await(function(error, mapTopJson, malariaDataCsv, parasitesData) {

            malariaDataCsv = malariaDataCsv.map(dataType).filter(function(d){
                return d.region === "African";
            })

            choroPlethChart(
                mapTopJson,
                malariaDataCsv,
                byCountry(malariaDataCsv),
                parasitesData,
                "cases");

            treeChart(parasitesData);
        });

})(window.d3.cs171);
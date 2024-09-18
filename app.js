function countryObg (img, name, capital, region, subregion){
    this.img = img;
    this.name = name;
    this.capital = capital;
    this.region = region;
    this.subregion = subregion
}

const allCountrys = [];


const input = document.querySelector("#input");
const all = document.querySelector(".all");

const selectCountry = document.querySelector("#selectCountry");


const fillingAll = (allCountrys) => {
    all.innerHTML = "";
    for(const countryObg of allCountrys){
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${countryObg.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${countryObg.name}</h5>
                    <p class="card-text">${countryObg.capital}</p>
                    <p class="card-text">${countryObg.region}</p>
                    <p class="card-text">${countryObg.subregion}</p>`
        document.querySelector(".all").appendChild(div);
    }
}



document.addEventListener("click", async (e) => {
    try{
        if(input.value != ""){
            const res = await fetch(`https://restcountries.com/v3.1/name/${input.value}`);
            const data = await res.json();
            const newCountry = new countryObg(data[0].flags.svg, data[0].name.common, data[0].capital, data[0].region, data[0].subregion);
            // console.log(newCountry);
            allCountrys.push(newCountry);
            fillingAll(allCountrys);
            input.value = "";
            }
    }catch(error){
        console.log("error = " + error);
    }
}
)


const filingSelect = async () => {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    for(let i = 0; i < data.length; i++){
        const option = document.createElement("option");
        option.value = data[i].name.common;
        option.innerHTML = data[i].name.common;
        selectCountry.appendChild(option);
    }
}

selectCountry.addEventListener("change", async (e) => {
    const country = e.target.value;
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();
    const newCountry = new countryObg(data[0].flags.svg, data[0].name.common, data[0].capital, data[0].region, data[0].subregion);
    allCountrys.push(newCountry);
    fillingAll(allCountrys);
    selectCountry.value = "";
})

filingSelect()


input.addEventListener("keyup", async (e) => {
    if(e.key === "Enter"){
        e.preventDefault();
        try{
            const res = await fetch(`https://restcountries.com/v3.1/name/${input.value}`);
            const data = await res.json();
            const newCountry = new countryObg(data[0].flags.svg, data[0].name.common, data[0].capital, data[0].region, data[0].subregion);
            // console.log(newCountry);
            allCountrys.push(newCountry);
            fillingAll(allCountrys);
            input.value = "";
    }catch(error){
        console.log("error = " + error);
    }
    }   
})
$(document).ready(function(){
    
    $.ajax({
        type: "GET",
        url : "https://restcountries.com/v3.1/all"
        }).done(res => {
            console.log(res);   // Wyświetlanie API w konsoli
    });


    $("button").click(function(){

        if($("#search").val() == ""){       // Sprawdzanie czy wyszukiwarka z państwem nie jest pusta
            alert("Please enter name or capital of the country");
        }

        // Deklaracja zmiennych:
        let Search = $("#search").val().toLowerCase();
        let Cname = "";
        let Ccapital = "";
        let Cregion = "";
        let Cpopulation = 0;
        let Clanguages = "";
        let Cborders = "";
        let newClanguages = "";


        fetch("https://restcountries.com/v3.1/all")
            .then(res => {
                return res.json();  // zamiana na typ .json
            })
            .then(data => {
                data.forEach(respond => {
                    // Przypisanie wartości zmiennym:
                    Cname = respond.name.common.toLowerCase();  // Zamiana na małe litery
                    Cregion = respond.region;
                    Cpopulation = respond.population;
                    Clanguages = respond.languages;
                    Cborders = respond.borders;

                    if(respond.capital){        // Sprawdzanie czy stolica istnieje w danych państwie
                        Ccapital = respond.capital;
                    }
                    else{Ccapital = "-";}

                    if(Search == Cname || $("#search").val() == Ccapital){      // Sprawdzanie czy nazwa państwa lub stolicy jest równa z tą z API

                        $.each(Clanguages, function(key,value){     // Przypisywanie języków państwa za pomocą kluczy-wartości
                            newClanguages += value + " ";
                        })

                        Cname = Cname.charAt(0).toUpperCase() + Cname.slice(1);   // Zamiana np. poland na Poland czy z pOLand na Poland

                        const result = '<li>Name of the Country: <strong>' + Cname + '</strong></li>' +  
                                       '<li>Name of the Capital: <strong>' + Ccapital + '</strong></li>' +
                                       '<li>Region of the World: <strong>' + Cregion + '</strong></li>' +
                                       '<li>Population: <strong>' + Cpopulation + '</strong> people' + '</li>' +
                                       '<li>Languages: <strong>' + newClanguages + '</strong></li>' +
                                       '<li>Borders with: <strong>' + Cborders + '</strong></li>';

                        let Cflag = respond.flags.png;
                        let CcoatOfArms = respond.coatOfArms.png;

                        // Wyświetlanie danych
                        document.querySelector('h4').style.visibility = "visible";
                        document.querySelector('ul').innerHTML = result;
                        document.querySelector("#flag").src = Cflag;
                        document.querySelector("#flag").style.visibility = "visible";
                        document.querySelector("#coatOfArms").src = CcoatOfArms;
                        document.querySelector("#coatOfArms").style.visibility = "visible"; 
                        document.querySelector("#google_maps").src = "https://maps.google.com/maps?q=" + Cname + "&t=&z=5&ie=UTF8&iwloc=&output=embed";
                    }
                })
            })
    })
});
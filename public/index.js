var makeRequest = function(url, callback){
  // Create new XHR
  var request = new XMLHttpRequest();
  // Open the request, passing in HTTP request type & url
  request.open("GET", url);
  // write an event listener for the request
  request.addEventListener("load", callback);
  // Go
  request.send();
};

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  populateDropdown(countries);
  return countries;
};

var populateDropdown = function(countries){
  var select = document.getElementById("select-country");
  for(country of countries){
    var option = document.createElement('option');
    option.innerText = country.name;
    option.id = country.name;
    select.appendChild(option);
    };
    select.addEventListener('change', function(e){
      var target = e.target;
      var index = target.selectedIndex -1;
      var selectedCountry = countries[index];
      var country = retrieveCountryInfo(selectedCountry);
      save(country);
      populateList(country);
  });
};

var retrieveCountryInfo = function(selectedCountry){
  var country = {
    name: selectedCountry.name,
    population: selectedCountry.population,
    capital: selectedCountry.capital
  }
  return country;
};

var populateList = function(country){
  var ul = document.getElementById("country");
  ul.innerText = "";
  var name = document.createElement('li');
  var population = document.createElement('li');
  var capital = document.createElement('li');
  name.innerText = "Name: " + country.name;
  population.innerText = "Population: " + country.population;
  capital.innerText = "Capital city: " + country.capital;
  ul.appendChild(name);
  ul.appendChild(population);
  ul.appendChild(capital);
};

var save = function(country){
  var savedCountry = JSON.stringify(country);
  localStorage.setItem('lastCountry', savedCountry);
};

var init = function(){
  var storedCountry = JSON.parse(localStorage.getItem('lastCountry'));
  var lastCountry = retrieveCountryInfo(storedCountry);
  populateList(lastCountry);

};

var app = function(){
  var url = "https://restcountries.eu/rest/v2/all";
  makeRequest(url, requestComplete);
  init();
};

window.addEventListener('load', app);

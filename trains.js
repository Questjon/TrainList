var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var trainJSON = JSON.parse(this.responseText);
        var sortedArray = ParseTrains(trainJSON);
        OutputTrains(sortedArray);
    }
};


xhr.open("GET", "https://api.tfl.gov.uk/Line/piccadilly/arrivals", true);
xhr.send();


function ParseTrains(array) {
  var results = [];
  results.push(array[0]);
  for(var train in array){
    var found=false;
  for(var i = 0; i < results.length; i++) {

      if (results[i].vehicleId == array[train].vehicleId) {
        found=true;
          if(results[i].timeToStation>array[train].timeToStation){
            results[i]=array[train];
          }
      }
    }
    if(found==false)results.push(array[train]);


    }

results.sort(function(obj1, obj2) {
	// Ascending: first age less than the previous
	return obj1.vehicleId - obj2.vehicleId;});

  return results;
}

function OutputTrains(array)
{
  for (var item in array) {
      var trainItem = document.createElement('div');
      trainItem.className = "trainDiv";
      document.body.appendChild(trainItem);

      var newElement = document.createElement('div');
      newElement.id = array[item]; newElement.className = "trainNo";
      newElement.innerHTML = "Train Num: "+array[item].vehicleId;
      trainItem.appendChild(newElement);

      newElement = document.createElement('div');
      newElement.id = array[item]; newElement.className = "Location";
      var loc = array[item].currentLocation=="" ? "Siding or Depot?" : array[item].currentLocation
      newElement.innerHTML = "Location: "+loc;
      trainItem.appendChild(newElement);

      newElement = document.createElement('div');
      newElement.id = array[item]; newElement.className = "Direction";
      newElement.innerHTML = "Direction: "+GetDirection(array[item]);
      trainItem.appendChild(newElement);


      newElement = document.createElement('div');
      newElement.id = array[item]; newElement.className = "Destination";
      newElement.innerHTML = "Destination: "+array[item].towards;
      trainItem.appendChild(newElement);
  }

}
//yes I know hardcoding this is lazy
var stations = {
  "Uxbridge Underground Station":-14,
  "Hillingdon Underground Station":-13,
  "Ickenham Underground Station":-12,
  "Ruislip Underground Station":-11,
  "Ruislip Manor Underground Station":-10,
  "Eastcote Underground Station":-9,
  "Rayners Lane Underground Station":-8,
  "South Harrow Underground Station":-7,
  "Sudbury Hill Underground Station":-6,
  "Sudbury Town Underground Station":-5,
  "Alperton Underground Station":-4,
  "Park Royal Underground Station":-3,
  "North Ealing Underground Station":-2,
  "Ealing Common Underground Station":-1,
  "Acton Town Underground Station":0,
  "Turnham Green Underground Station":1,
  "Hammersmith (Dist&Picc Line) Underground Station":2,
  "Barons Court Underground Station":3,
  "Earl's Court Underground Station":4,
  "Gloucester Road Underground Station":5,
  "South Kensington Underground Station":6,
  "Knightsbridge Underground Station":7,
  "Hyde Park Corner Underground Station":8,
  "Green Park Underground Station":9,
  "Piccadilly Circus Underground Station":11,
  "Leicester Square Underground Station":12,
  "Covent Garden Underground Station":13,
  "Holborn Underground Station":14,
  "Russell Square Underground Station":15,
  "King's Cross St. Pancras Underground Station":16,
  "Caledonian Road Underground Station":17,
  "Holloway Road Underground Station":18,
  "Arsenal Underground Station":19,
  "Finsbury Park Underground Station":20,
  "Manor House Underground Station":21,
  "Turnpike Lane Underground Station":22,
  "Wood Green Underground Station":23,
  "Bounds Green Underground Station":24,
  "Arnos Grove Underground Station":25,
  "Southgate Underground Station":26,
  "Oakwood Underground Station":27,
  "Cockfosters Underground Station":28,
  "Heathrow Terminal 4 Underground Station":-11,
  "Heathrow Terminals 1-2-3 Underground Station":-10,
  "Hatton Cross Underground Station":-9,
  "Hounslow West Underground Station":-8,
  "Hounslow Central Underground Station":-6,
  "Hounslow East Underground Station":-5,
  "Osterley Underground Station":-4,
  "Boston Manor Underground Station":-3,
  "Northfields Underground Station":-2,
  "South Ealing Underground Station":-1
};

function GetDirection(train){
var destination = string_of_enum(train.destinationName);
var last = string_of_enum(train.stationName);

if (destination>last) return "East";
if (destination<last) return "West";
if(destination==last) return "At destination"

return "Unknown (not Jon's fault)";
}
function string_of_enum(value)
{

  for (var k in stations) if (k === value){

     return stations[k];
   }
  return null;
}

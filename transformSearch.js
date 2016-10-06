"use strict";


var R = require('ramda');

var user = {
    "id": "NVN-blank-38AAB-ANVR.HOT",
    "connectorCode": "3",
    "contentId": "133faa14ec81c2df28fcce0efcc5220599cc8e4533fd4fcf",
    "startDate": "2016-10-18",
    "endDate": "2016-10-25",
    "depAirport": "AMS",
    "duration": "8",
    "boardType": "1",
    "brand": "NVN",
    "room": "A2A,2",
    "season": "S16",
    "context": "nl",
    "selectedDate": "2016-10-18",
    "geoPath": "Egypte/Marsa Alam/Port Ghalib",
    "roomPackageId": "NVN7FD@24964",
    "productBookingCode": "38AABA",
    "catalog": "blank",
    "language": "nl"
}


// create otapay
var createOtapay = R.compose(
    R.assocPath(['otapayloadStd', 'version'], "0.0"),
    R.assocPath(['otapayloadStd', 'primaryLangID'], "NL")
)

// rename id
var idLens = R.lens(R.path(['id']), R.assocPath(['criteriaHotel']));
var moveId = R.over(idLens, R.clone);

// move dates
var startDateLens = R.lens(R.path(['startDate']), R.assocPath(['criteriaTimeInterval', 'startDate']));
var endDateLens = R.lens(R.path(['endDate']), R.assocPath(['criteriaTimeInterval', 'endDate']));
var moveDates = R.compose(
    R.over(startDateLens, R.clone),
    R.over(endDateLens, R.clone)
);

// move airport
var airportLens = R.lens(R.path(['depAirport']),
    R.assocPath(['criteriaDepartureAirportList', 'departureAirports', 'string']));
var moveAiport = R.over(airportLens, R.clone);


// result
var ff = R.compose(
    createOtapay,
    moveAiport,
    moveDates,
    moveId
);


console.log(ff(user));
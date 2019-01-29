

var config = {
    apiKey: "AIzaSyBfOkIBI3YDIuSi7xsLowHG1x_XbskidOA",
    authDomain: "train-scheduler-3adb8.firebaseapp.com",
    databaseURL: "https://train-scheduler-3adb8.firebaseio.com",
    projectId: "train-scheduler-3adb8",
    storageBucket: "train-scheduler-3adb8.appspot.com",
    messagingSenderId: "536952814171"
};

firebase.initializeApp(config);

var database = firebase.database();



$("#add-train-btn").on("click", function(){
    event.preventDefault();

    var trains = {
        trainName: $("#train-name-input").val(),
        destination: $("#destination-input").val(),
        startInput: $("#start-input").val(),
        frequency: $("#frequency-input").val()
    }

    database.ref().push(trains);

    console.log(trains.trainName);
    console.log(trains.destination);
    console.log(trains.startInput);
    console.log(trains.frequency);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
})

database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    var tName = childSnapshot.val().trainName;
    var tDestination = childSnapshot.val().destination;
    var tStartInput = childSnapshot.val().startInput;
    var tFrequency = childSnapshot.val().frequency;

    var startTimeFormatted = moment(tStartInput, "HH:mm");

    console.log(startTimeFormatted);

    var currentTime = moment();

    var startTimeConverted = moment(startTimeFormatted, "HH:mm").subtract(1, "years");


    var diffTime = moment().diff(moment(startTimeConverted), "minutes");

    var tRemainder = diffTime % tFrequency;

    var tMinutesTillTrain = tFrequency - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var nextTrainFormatted = moment(nextTrain).format("hh:mm A");

    console.log(nextTrain);


    var newRow = $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(tDestination),
        $("<td>").text(tFrequency),
        $("<td>").text(nextTrainFormatted)
      );

    $("#employee-table > tbody").append(newRow);
})
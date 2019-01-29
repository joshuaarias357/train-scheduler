

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

    //grabbing current time
    var currentTime = moment();

    //grabbing first inputted time to get ready for calculations
    var startTimeConverted = moment(startTimeFormatted, "HH:mm").subtract(1, "years");

    //finding the difference between the start time and the current time
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");

    //finding how much time is left between last train depending on current time
    var tRemainder = diffTime % tFrequency;

    //finding how much time till next train
    var tMinutesTillTrain = tFrequency - tRemainder;

    //adding the minutes to the current time to get the next arrival time
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    //prepping it to show on the screen
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
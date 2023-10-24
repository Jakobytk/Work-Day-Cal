// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
    $(function () {
        // Listener for click events on the save button
        $(".saveBtn").on("click", function() {
            // Get the user input from the description textarea
            const description = $(this).siblings(".description").val();
    
            // Get the ID of the time-block containing the button
            const timeBlockID = $(this).closest(".time-block").attr("id");
    
            // Use the timeBlockID as a key to save the description in local storage
            localStorage.setItem(timeBlockID, description);
    
            // Display a confirmation message underneath the respective date and time
            $(this).closest(".time-block").append("<p class='save-message'>Saved to local storage</p>");
    
            // Remove the message after a short delay (optional)
            setTimeout(function() {
                $(".save-message").remove();
            }, 3000);
        });
    
        // Function to apply past, present, or future class to time blocks
        function updateTimeBlockStyles() {
            const currentHour = dayjs().format("H");
    
            $(".time-block").each(function() {
                const blockHour = parseInt($(this).attr("id").split("-")[1]);
    
                if (blockHour < currentHour) {
                    $(this).addClass("past").removeClass("present future");
                } else if (blockHour == currentHour) {
                    $(this).addClass("present").removeClass("past future");
                } else {
                    $(this).addClass("future").removeClass("past present");
                }
            });
        }
    
        // Call the function to set initial time-block styles
        updateTimeBlockStyles();
    
        // Set an interval to update time-block styles every minute
        setInterval(updateTimeBlockStyles, 60000);
    
        // Function to load saved descriptions from local storage
        function loadDescriptions() {
            $(".time-block").each(function() {
                const timeBlockID = $(this).attr("id");
                const savedDescription = localStorage.getItem(timeBlockID);
    
                if (savedDescription) {
                    $(this).find(".description").val(savedDescription);
                }
            });
        }
    
        // Call the function to load saved descriptions initially
        loadDescriptions();
    
        // Display the current date in the header
        const currentDay = dayjs().format("dddd, MMMM D");
        $("#currentDay").text(currentDay);
    });
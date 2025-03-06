(function (){
    
    var deLimiter = ','; //Variable for defining the separators within the CSV file
    var newLine = '\n'; // Defining the next line variable
    var qRegex = /^"|"$/g; // Removing any extra spaces or symbols from headers and rows.

    // Defining variables
    var i = document.getElementById('file');
    var table = document.getElementById('table');

    // checking to see if i has recieved an input
    if (!i){
        return;
    }

    // Checking for any button clicks for file input
    i.addEventListener('change', function () {
        if (!!i.files && i.files.length > 0){
            parseCSV(i.files[0]);
        }
    });

    // File reader
    function parseCSV(file){
        // checking to see if a file has been inputted
        if (!file || !FileReader) {
            return; //returning to default function
        }

        var reader = new FileReader();

        // Grabbing the file and sending it to the toTable function
        reader.onload = function (e){
            toTable(e.target.result);
        };

        // reading the file and transfering it to text (parsing)
        reader.readAsText(file);
    }

    // sending the file information into the table elements
    function toTable(text){
        if (!text || !table){
            return; // return after criteria checked
        };

        // Clearing Table
        while (!!table.lastElementChild) {
            table.removeChild(table.lastElementChild);
        }

        var rows = text.split(newLine);
        var headers = rows.shift().trim().split(deLimiter);
        var tableRow = document.createElement('tr');

        headers.forEach(function (h) {
            var tableHeader = document.createElement('th');
            var headerTrim = h.trim();

            if (!headerTrim) {
                return;
            }

            tableHeader.textContent = headerTrim.replace(qRegex, '');
            tableHeader.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
            tableRow.appendChild(tableHeader);

        });
        
        table.appendChild(tableRow); 

        var rtr;
        // Checking each row and trimming white space
        rows.forEach(function (r) {
            r = r.trim();

            if (!r) {
                return;
            }
            var cols = r.split(deLimiter);

            // checking to see if the number of columns exceed 0
            if (cols.length === 0){
                return; //return to main function
            }

            // creating a table row
            rtr = document.createElement('tr');

            cols.forEach(function (c) {
                // creating a variable with table data element
                var td = document.createElement('td');
                // trimming white space to minimise character count
                var tc = c.trim();

                // Removing any special characters with the predefined regex
                td.textContent = tc.replace(qRegex, '');
                rtr.appendChild(td);
            });
            // append function to table
            table.appendChild(rtr);
        });
    }
})();
/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
let studentPerPage = 9;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   function studentItem(studentInformation) {
      let li = document.createElement('li');
      li.className = "student-item cf";
      let studentDetails = document.createElement('div');
      studentDetails.className = "student-details";
      let studentImage = document.createElement('img');
      studentImage.alt = "Profile Picture";
      studentImage.className = "avatar";
      studentImage.src = studentInformation.picture.large;
      let studentName = document.createElement('h3');
      studentName.textContent = studentInformation.name.first + " " + studentInformation.name.last;
      let studentEmail = document.createElement('span');
      studentEmail.className = "email";
      studentEmail.textContent = studentInformation.email;


      let joinedInformation = document.createElement('div');
      joinedInformation.className = "joined-details";
      let joinedDetails = document.createElement('span');
      joinedDetails.className = "date";
      joinedDetails.textContent = "Joined " + studentInformation.registered.date;

      // Append childs to studentDetails
      studentDetails.appendChild(studentImage);
      studentDetails.appendChild(studentName);
      studentDetails.appendChild(studentEmail);

      // Append childs to JoinedDetails
      joinedInformation.appendChild(joinedDetails);


      // Append childs to LI
      li.appendChild(studentDetails);
      li.appendChild(joinedInformation);
      return li;
   }

   // create two variables which will represent the index for the first and last student on the page
   let startIndex = (page * studentPerPage) - studentPerPage;
   let endIndex = page * studentPerPage;

   // select the element with a class of `student-list` and assign it to a variable
   let studentListUl = document.querySelector(".student-list");

   // set the innerHTML property of the variable you just created to an empty string
   studentListUl.innerHTML = "";

   // loop over the length of the `list` parameter
   // inside the loop create a conditional to display the proper students
   // inside the conditional:
   // create the elements needed to display the student information
   // insert the above elements
   for (let index = 0; index < list.length; index++) {
      if (index >= startIndex && index < endIndex) {
         studentListUl.appendChild(studentItem(list[index]));
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   // create a variable to calculate the number of pages needed
   let numOfPages = Math.ceil(data.length / studentPerPage);

   // select the element with a class of `link-list` and assign it to a variable
   let linkListUl = document.querySelector("link-list");

   // set the innerHTML property of the variable you just created to an empty string
   linkListUl.innerHTML = "";
   
   // loop over the number of pages needed
   // create the elements needed to display the pagination button
   // insert the above elements

   // give the first pagination button a class of "active"

   // create an event listener on the `link-list` element
   // if the click target is a button:
   // remove the "active" class from the previous button
   // add the active class to the clicked button
   // call the showPage function passing the `list` parameter and page to display as arguments
}


// Call functions
showPage(data, 2);
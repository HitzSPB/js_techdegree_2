/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
let studentPerPage = 9;

// ShowPage function that handles the student data showing on the page
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

   // Handling the indexing of the page
   let startIndex = (page * studentPerPage) - studentPerPage;
   let endIndex = page * studentPerPage;

   // selecting list for student elements
   let studentListUl = document.querySelector(".student-list");

   // Clear former data from Student UL
   studentListUl.innerHTML = "";

   // Looping through the students and inserting the correct range
   for (let index = 0; index < list.length; index++) {
      if (index >= startIndex && index < endIndex) {
         studentListUl.appendChild(studentItem(list[index]));
      }
   }
}


// Function to handle creating the correct amount of pages
function addPagination(list) {
   function createPage(number) {
      let li = document.createElement('li');
      let button = document.createElement('button');
      button.type = "button";
      button.textContent = number;

      li.appendChild(button);
      return li;
   }
   // Calculating the correct amount of pages from the list data
   let numOfPages = Math.ceil(list.length / studentPerPage);

   let linkListUl = document.querySelector(".link-list");

   // clearing the pages when new data inserted
   linkListUl.innerHTML = "";

   // Checking the list is not empty
   if (list.length != 0) {
      for (let index = 0; index < numOfPages; index++) {
         linkListUl.appendChild(createPage(index + 1));
      }
      // give the first pagination button a class of "active"
      linkListUl.firstChild.firstChild.className = "active";
      // create an event listener on the `link-list` element
      // if the click target is a button:
      // remove the "active" class from the previous button
      // add the active class to the clicked button
      // call the showPage function passing the `list` parameter and page to display as arguments
      linkListUl.addEventListener('click', (e) => {
         if (e.target.tagName === "BUTTON") {
            linkListUl.querySelector(".active").classList.remove("active");
            e.target.className = "active";
            showPage(list, e.target.textContent);
         }
      });
   }
   else {
      // If the list is empty we add "No results instead of buttons"
      linkListUl.innerHTML = "No results";
      showPage(list, 0);
   }
}

// Search bar
function searchBar(list) {
   // Using template literal instead of creating elements like previously
   let searchBarHtml = `<label for="search" class="student-search">
         <input id="search" placeholder="Search by name...">
            <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
          </label>`;
   let pageHeader = document.querySelector("header");
   pageHeader.insertAdjacentHTML('beforeend', searchBarHtml);

   let searchSubmitButton = document.querySelector('header button');

   // Adding event listener for search button and looping through first and last names to see if it matches the search word
   searchSubmitButton.addEventListener('click', (e) => {
      // Fixed the overlay image click issue with css code. 
      if (e.target.tagName === "BUTTON") {
         let input = document.querySelector('#search')
         const text = input.value.toLowerCase();
         input.value = '';

         let newList = [];
         for (let index = 0; index < list.length; index++) {
            if (list[index].name.first.toLowerCase().includes(text) || list[index].name.last.toLowerCase().includes(text)) {
               newList.push(list[index]);
            }
         }
         showPage(newList, 1);
         addPagination(newList);
      }
   })

}

// Call functions
showPage(data, 1);
addPagination(data);
searchBar(data);
/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

document.addEventListener('DOMContentLoaded', () => {
   //set listItems to get all students
   const studentList = [...document.getElementsByClassName('student-item cf')];
   const numOfItemsPerPage = 10;
   let newList = [];
   const callFunctions = () => {
      //run functions at page load
      pageFunctions.addPaginationLinks(studentList);
      pageFunctions.showPage(studentList, 1);
      pageFunctions.createSearchFunctionHTML();
      helperFunctions.activeClass();
      handlers.searchFunctionHandlers();
   }

   const pageFunctions = {
      //function addPaginationLinks
      //Pass in list param
      addPaginationLinks: (list) => {
         helperFunctions.appendPaginationLinksToPage(list);
      },
      showPage: (list, page) => {
         helperFunctions.displayUpToTenItemsPerPage(list, page);
         handlers.aTagClickHandler();
      },
      //refactor to make createElement a helper function
      createSearchFunctionHTML: () => {
         const pageHeader = document.getElementsByClassName('page-header')[0];
         const div = helperFunctions.createDiv('student-search');
         const input = document.createElement('input');
         const button = document.createElement('button');
         input.placeholder = 'Search for students...';
         input.className = "input__search-input";
         button.textContent = 'Search';
         div.appendChild(input);
         div.appendChild(button);
         pageHeader.appendChild(div);

      }
   }

   //Alphabetized
   const helperFunctions = {
      //add class to first a tag
      activeClass: () => {
         const activeClass = document.getElementsByTagName('a');
         const arr = [...activeClass];
         arr[0].className = 'active';
      },
      appendPaginationLinksToPage: (list) => {
         const numOfPages = Math.ceil(list.length / numOfItemsPerPage);
         //set page to get class page element
         const page = document.querySelector('.page');
         //set div to create div to page
         const div = helperFunctions.createDiv('pagination');
         //set ul to create ul 
         const ul = document.createElement('ul');
         //append ul to div
         div.appendChild(ul);
         for (let i = 0; i < numOfPages; i++) {
            helperFunctions.createPaginationLinks(ul, i);
         }
         //append div to page class element
         page.appendChild(div);

      },
      //loop over a elements and add clickHandler
      createPaginationLinks: (ul, i) => {
         const li = document.createElement('li');
         const a = document.createElement('a');
         a.href = '#';
         a.textContent = i + 1;
         li.appendChild(a);
         ul.appendChild(li);
      },
      createDiv: (className) => {
         const div = document.createElement('div');
         div.className = className;
         return div;
      },
      displayUpToTenItemsPerPage: (list, page) => {
         //set startIndex to (page parameter * items per page) - items per page
         const startIndex = (page * numOfItemsPerPage) - numOfItemsPerPage;
         //set endIndex to page parameter * items per page
         const endIndex = page * numOfItemsPerPage
         //for each item in studentList

         list.forEach(listItem => {
            const index = (list.indexOf(listItem));
            // pageFunctions.searchFunction(listItem);
            //if list item index(index meaning[0]) is greater than or equal to start index && less than index, display to page
            if (index >= startIndex && index < endIndex) {
               listItem.style.display = "";
            } else {
               listItem.style.display = "none";
            }
         });
      },
      searchFunction: (list, page) => {
         const searchInput = document.querySelector(".input__search-input");
         list.forEach(listItem => {
            if (searchInput.value.length !== 0 && listItem.textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
               listItem.style.display = "";
               newList.push(listItem);
            } else {
               listItem.style.display = "none";
            }
         });
      }

   }
   const handlers = {
      aTagClickHandler: () => {
         const a = [...document.getElementsByTagName('a')];
         a.forEach(a => {
            a.addEventListener('click', e => {
               pageFunctions.showPage(studentList, e.target.textContent)
               e.target.className = 'active';
            });
            a.className = ' ';
         });
      },
      searchFunctionHandlers: () => {
         const button = document.querySelector('button');
         const searchInput = document.querySelector(".input__search-input");
         searchInput.addEventListener('keyup', (e) => {
            e.preventDefault();
            helperFunctions.searchFunction(studentList);
         });

         button.addEventListener('click', e => {
            e.preventDefault();
            helperFunctions.searchFunction(studentList);
         });
      },
      

   }
   callFunctions();
});













// Remember to delete the comments that came with this file, and replace them with your own code comments.
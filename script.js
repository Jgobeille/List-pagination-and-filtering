/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

document.addEventListener('DOMContentLoaded', () => {
   //set listItems to get all students
   const studentList = Array.from(document.getElementsByClassName('student-item cf'));
   const numOfItemsPerPage = 10;
   const pageFunctions = {
      //function addPaginationLinks
      //Pass in list param
      addPaginationLinks: (list) => {
         helperFunctions.appendPaginationLinksToPage(list);
      },
      showPage: (list, page) => {
         helperFunctions.displayPage(list, page);
         helperFunctions.aTagClickHandler();
      }
   }
   //Alphabetized
   const helperFunctions = {
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
         const div = document.createElement('div');
         //set ul to create ul 
         const ul = document.createElement('ul');
         //set div class to pagination
         div.className ='pagination';
         //append ul to div
         div.appendChild(ul);
         for(let i = 0; i < numOfPages; i++) {
            helperFunctions.createPaginationLinks(ul, i);
         }
         //append div to page class element
         page.appendChild(div); 
      },
      //loop over a elements and add clickHandler
      createPaginationLinks: (ul,i) => {
         const li = document.createElement('li');
         const a = document.createElement('a');
         a.href = '#';
         a.textContent = i + 1;
         li.appendChild(a);
         ul.appendChild(li);
      },
      displayPage: (list, page) => {
         //set startIndex to (page parameter * items per page) - items per page
         const startIndex = (page * numOfItemsPerPage) - numOfItemsPerPage;
         //set endIndex to page parameter * items per page
         const endIndex = page * numOfItemsPerPage
         //for each item in studentList
         list.forEach(listItem => {
            const index = (list.indexOf(listItem));
            //if list item index(index meaning[0]) is greater than or equal to start index && less than index, display to page)
            if(index >= startIndex && index < endIndex){
               listItem.style.display = "";
            } else {
               listItem.style.display ="none";
            }
         });
      }
   }
   //run functions at page load
   pageFunctions.addPaginationLinks(studentList);
   pageFunctions.showPage(studentList, 1);
   helperFunctions.activeClass();
   
});













// Remember to delete the comments that came with this file, and replace them with your own code comments.
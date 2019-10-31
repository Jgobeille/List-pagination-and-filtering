/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

document.addEventListener("DOMContentLoaded", () => {
  //set listItems to get all students
  const studentList = [...document.getElementsByClassName("student-item cf")];
  const numOfItemsPerPage = 10;
  const p = document.createElement("p");
  //run functions at page load
  const callFunctions = () => {
    pageFunctions.addPaginationLinks(studentList);
    pageFunctions.showPage(studentList, 1);
    helperFunctions.createNoSearchResultP(p);
    helperFunctions.createSearchFunctionHTML();
    handlers.searchFunctionHandlers();
    helperFunctions.activeClass();
  };

  const pageFunctions = {
    //function addPaginationLinks
    //Pass in list param
    addPaginationLinks: list => {
      helperFunctions.appendPaginationLinksToPage(list);
    },
    showPage: (list, page) => {
      helperFunctions.displayUpToTenItemsPerPage(list, page);
      handlers.aTagClickHandler(list);
    },
    searchFunction: (list, p) => {
      const searchInput = document.querySelector(".input__search-input");
      //loop over list items
      var newList = list.filter(listItem => {
        //give all items display of none
        listItem.style.display = "none";
        return (
          (newList === searchInput.value.length) !== 0 &&
          listItem.textContent
            .toLowerCase()
            .includes(searchInput.value.toLowerCase())
        );
      });

      //check if list has items. If array is empty, display hidden p tag. else hide.
      if (newList.length > 0) {
        p.style.display = "none";
      } else if (searchInput.value == 0) {
        p.style.display = "none";
        pageFunctions.showPage(studentList, 1);
      } else {
        p.style.display = "";
      }
      //run necessary functions during search

      pageFunctions.showPage(newList, 1);
      pageFunctions.addPaginationLinks(newList);
      helperFunctions.removePaginationUl();
      handlers.aTagClickHandler(newList);
      helperFunctions.activeClass();
    }
  };

  //Alphabetized
  const helperFunctions = {
    //add class to first a tag
    activeClass: () => {
      const firstA = document.querySelector("a");
      firstA.className = "active";
    },
    //append pagination links to page
    appendPaginationLinksToPage: list => {
      const numOfPages = Math.ceil(list.length / numOfItemsPerPage);
      //set page to get class page element
      const page = document.querySelector(".page");
      //set div to create div to page
      const div = helperFunctions.createDiv("pagination");
      //set ul to create ul
      const ul = helperFunctions.createElement("ul");
      ul.className = "pagination__ul";
      //append ul to div
      div.appendChild(ul);
      for (let i = 0; i < numOfPages; i++) {
        helperFunctions.createPaginationLinks(ul, i);
      }
      //append div to page class element
      page.appendChild(div);
    },
    //create elements
    createElement: (elementName, property, value) => {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    },
    //create and give class name to Div
    createDiv: className => {
      const div = document.createElement("div");
      div.className = className;
      return div;
    },
    //Create p tag for display
    createNoSearchResultP: p => {
      const classList = document.querySelector(".student-list");
      p.textContent = "No Students Found";
      p.style.display = "none";
      p.className = "page__studentList__p";
      classList.appendChild(p);
    },
    //loop over a elements and add clickHandler
    createPaginationLinks: (ul, i) => {
      const li = helperFunctions.createElement("li");
      const a = helperFunctions.createElement("a");
      a.href = "#";
      a.textContent = i + 1;
      li.appendChild(a);
      ul.appendChild(li);
    },
    createSearchFunctionHTML: () => {
      const pageHeader = document.getElementsByClassName("page-header")[0];
      const div = helperFunctions.createDiv("student-search");
      const input = helperFunctions.createElement("input");
      const button = helperFunctions.createElement("button");
      input.placeholder = "Search for students...";
      input.className = "input__search-input";
      input.name = "search";
      input.type = "search";
      button.textContent = "Search";
      div.appendChild(input);
      div.appendChild(button);
      pageHeader.appendChild(div);
    },
    displayUpToTenItemsPerPage: (list, page) => {
      //set startIndex to (page parameter * items per page) - items per page
      const startIndex = page * numOfItemsPerPage - numOfItemsPerPage;
      //set endIndex to page parameter * items per page
      const endIndex = page * numOfItemsPerPage;
      //for each item in studentList

      list.map(listItem => {
        const index = list.indexOf(listItem);
        // pageFunctions.searchFunction(listItem);
        //if list item index(index meaning[0]) is greater than or equal to start index && less than index, display to page
        const display =
          index >= startIndex && index < endIndex
            ? (listItem.style.display = "")
            : (listItem.style.display = "none");
      });
    },
    removePaginationUl: () => {
      const paginationUl = document.querySelector(".pagination__ul");
      const page = paginationUl.parentNode;
      page.removeChild(paginationUl);
    }
  };

  const handlers = {
    aTagClickHandler: list => {
      const a = [...document.getElementsByTagName("a")];
      a.forEach(a => {
        a.addEventListener("click", e => {
          pageFunctions.showPage(list, e.target.textContent);
          e.target.className = "active";
        });
        a.className = " ";
      });
    },
    searchFunctionHandlers: () => {
      const button = document.querySelector("button");
      const searchInput = document.querySelector(".input__search-input");
      searchInput.addEventListener("keyup", e => {
        e.preventDefault();
        pageFunctions.searchFunction(studentList, p);
      });

      button.addEventListener("click", e => {
        e.preventDefault();
        pageFunctions.searchFunction(studentList, p);
      });
    }
  };
  callFunctions();
});

/*
Additional Ideas:
1.) add variable items max per page
2.) When hovering over list items, highlight
 
*/

// Remember to delete the comments that came with this file, and replace them with your own code comments.

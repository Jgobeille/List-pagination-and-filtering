"use strict";

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === "[object Arguments]"
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  //set listItems to get all students
  var studentList = _toConsumableArray(
    document.getElementsByClassName("student-item cf")
  );

  var numOfItemsPerPage = 10;
  var p = document.createElement("p"); //run functions at page load

  var callFunctions = function callFunctions() {
    pageFunctions.addPaginationLinks(studentList);
    pageFunctions.showPage(studentList, 1);
    helperFunctions.activeClass();
    helperFunctions.createNoSearchResultP(p);
    helperFunctions.createSearchFunctionHTML();
    handlers.searchFunctionHandlers();
  };

  var pageFunctions = {
    //function addPaginationLinks
    //Pass in list param
    addPaginationLinks: function addPaginationLinks(list) {
      helperFunctions.appendPaginationLinksToPage(list);
    },
    showPage: function showPage(list, page) {
      helperFunctions.displayUpToTenItemsPerPage(list, page);
      handlers.aTagClickHandler(list);
    },
    searchFunction: function searchFunction(list, p) {
      var newList = [];
      var searchInput = document.querySelector(".input__search-input"); //loop over list items

      list.forEach(function(listItem) {
        //give all items display of none
        listItem.style.display = "none"; //search parameters

        if (
          searchInput.value.length !== 0 &&
          listItem.textContent
            .toLowerCase()
            .includes(searchInput.value.toLowerCase())
        ) {
          newList.push(listItem);
        }
      }); //check if list has items. If array is empty, display hidden p tag. else hide.

      if (newList.length < 1) {
        p.style.display = "";
      } else {
        p.style.display = "none";
      } //run necessary functions during search

      pageFunctions.showPage(newList, 1);
      pageFunctions.addPaginationLinks(newList);
      helperFunctions.activeClass();
      helperFunctions.removePaginationUl();
      handlers.aTagClickHandler(newList);
    }
  }; //Alphabetized

  var helperFunctions = {
    //add class to first a tag
    activeClass: function activeClass() {
      var activeClass = document.getElementsByTagName("a");

      var arr = _toConsumableArray(activeClass);

      if (arr.length >= 0) {
        arr[0].className = "active";
      }
    },
    //append pagination links to page
    appendPaginationLinksToPage: function appendPaginationLinksToPage(list) {
      var numOfPages = Math.ceil(list.length / numOfItemsPerPage); //set page to get class page element

      var page = document.querySelector(".page"); //set div to create div to page

      var div = helperFunctions.createDiv("pagination"); //set ul to create ul

      var ul = helperFunctions.createElement("ul");
      ul.className = "pagination__ul"; //append ul to div

      div.appendChild(ul);

      for (var i = 0; i < numOfPages; i++) {
        helperFunctions.createPaginationLinks(ul, i);
      } //append div to page class element

      page.appendChild(div);
    },
    //create elements
    createElement: function createElement(elementName, property, value) {
      var element = document.createElement(elementName);
      element[property] = value;
      return element;
    },
    //create and give class name to Div
    createDiv: function createDiv(className) {
      var div = document.createElement("div");
      div.className = className;
      return div;
    },
    //Create p tag for display
    createNoSearchResultP: function createNoSearchResultP(p) {
      var classList = document.querySelector(".student-list");
      p.textContent = "No Students Found";
      p.style.display = "none";
      p.className = "page__studentList__p";
      classList.appendChild(p);
    },
    //loop over a elements and add clickHandler
    createPaginationLinks: function createPaginationLinks(ul, i) {
      var li = helperFunctions.createElement("li");
      var a = helperFunctions.createElement("a");
      a.href = "#";
      a.textContent = i + 1;
      li.appendChild(a);
      ul.appendChild(li);
    },
    createSearchFunctionHTML: function createSearchFunctionHTML() {
      var pageHeader = document.getElementsByClassName("page-header")[0];
      var div = helperFunctions.createDiv("student-search");
      var input = helperFunctions.createElement("input");
      var button = helperFunctions.createElement("button");
      input.placeholder = "Search for students...";
      input.className = "input__search-input";
      button.textContent = "Search";
      div.appendChild(input);
      div.appendChild(button);
      pageHeader.appendChild(div);
    },
    displayUpToTenItemsPerPage: function displayUpToTenItemsPerPage(
      list,
      page
    ) {
      //set startIndex to (page parameter * items per page) - items per page
      var startIndex = page * numOfItemsPerPage - numOfItemsPerPage; //set endIndex to page parameter * items per page

      var endIndex = page * numOfItemsPerPage; //for each item in studentList

      list.forEach(function(listItem) {
        var index = list.indexOf(listItem); // pageFunctions.searchFunction(listItem);
        //if list item index(index meaning[0]) is greater than or equal to start index && less than index, display to page

        if (index >= startIndex && index < endIndex) {
          listItem.style.display = "";
        } else {
          listItem.style.display = "none";
        }
      });
    },
    removePaginationUl: function removePaginationUl() {
      var paginationUl = document.querySelector(".pagination__ul");
      var page = paginationUl.parentNode;
      page.removeChild(paginationUl);
    }
  };
  var handlers = {
    aTagClickHandler: function aTagClickHandler(list) {
      var a = _toConsumableArray(document.getElementsByTagName("a"));

      a.forEach(function(a) {
        a.addEventListener("click", function(e) {
          pageFunctions.showPage(list, e.target.textContent);
          e.target.className = "active";
        });
        a.className = " ";
      });
    },
    searchFunctionHandlers: function searchFunctionHandlers() {
      var button = document.querySelector("button");
      var searchInput = document.querySelector(".input__search-input");
      searchInput.addEventListener("keyup", function(e) {
        e.preventDefault();
        pageFunctions.searchFunction(studentList, p);
      });
      button.addEventListener("click", function(e) {
        e.preventDefault();
        pageFunctions.searchFunction(studentList, p);
      });
    }
  };
  callFunctions();
});

let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    //creating result item 
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add('result-item');
    searchResultsEl.appendChild(resultItemEl);

    //creating title 
    let {
        link,
        title,
        description
    } = result;
    let resultTitleEl = document.createElement('a');
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultTitleEl.textContent = title;
    resultTitleEl.classList.add('result-title');
    resultItemEl.appendChild(resultTitleEl)

    //creating break element 
    let titleBreakEl = document.createElement('br');
    resultItemEl.appendChild(titleBreakEl);

    //creating url element 
    let urlEl = document.createElement('a');
    urlEl.href = link;
    urlEl.target = "_blan k";
    urlEl.textContent = link;
    urlEl.classList.add('result-url');
    resultItemEl.appendChild(urlEl);

    //creating break element 
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    //creatinig description element 
    let descriptionEl = document.createElement('p');
    descriptionEl.classList.add('link-description');
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    for (result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = "";
        let searchInputValue = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", searchWikipedia);
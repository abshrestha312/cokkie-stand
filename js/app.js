'use strict';
funtion Store(name, minCust, maxCust, avgCookieSales){
    this.name = name;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.avgCookieSales = avgCookieSales;
    this.cookiesHour = [];
    this.cookiesTotal = 0;
    this.getCookiesHour = function () {
        for (let i=0; i < this.maxCust.length; i++){
            let custHour = Math.random() * (this.maxCust - this.minCust + 1) + this.minCust;
            this.cookiesHour[i] = Math.floor(custHour * this.avgCookieSales);
        }
    };
    this.getCookieTotal = function() {
        for (let i =0; i < cookiesHour.length; i++ ) {
            this.cookieTotal = this.cookieTotal + this.cookiesHour[i];
        }
    };
}

Store.prototype.renderStoreData = function(trElem) {
    makeElem('th', trElem, this.name);
    for (let i=0; i< this.cookiesHour.length; i++) {
        makeElem('td', trElem, this.cookiesHour[i]);
    }
    makeElem('td', trElem, this.cookieTotal);
;}

function addStore(name, minCust, maxCust, avgCookieSales) {
    const store = new Store(name, minCust, maxCust, avgCookieSales);
    storeList.push(store);
  }
  
  function storeData() {
    for (let i = 0; i < storeList.length; i++) {
      storeList[i].getCookiesHour();
      storeList[i].getCookieTotals();
    }
  }
  
  function renderDataTable() {
    const storesSectionElem = document.getElementById('locations');
    const tableElem = makeElem('table', storesSectionElem, null);
    tableHeader(tableElem);
    tableBody(tableElem);
    tableFooter(tableElem);
  }
  
  function tableHeader(tableElem) {
    const thead = makeElem('thead', tableElem, null);
    const trElem = makeElem('tr', thead, null);
    makeElem('th', trElem, null);
    for (let i = 0; i < hours.length; i++) {
      makeElem('th', trElem, hours[i]);
    }
    makeElem('th', trElem, 'Daily Location Total');
  }
  
  function tableBody(tableElem) {
    const tBodyElem = makeElem('tbody', tableElem, null);
    for (let i = 0; i < storeList.length; i++) {
      const trElem = makeElem('tr', tBodyElem, null);
      storeList[i].renderStoreData(trElem);
    }
  }
  
  function tableFooter(tableElem) {
    const tFootElem = makeElem('tfoot', tableElem, null);
    const trElem = makeElem('tr', tFootElem, null);
    makeElem('th', trElem, 'Totals');
    renderTotals(trElem);
  }
  
  function renderTotals(trElem) {
    let dailyTotal = 0;
    for (let hourIndex = 0; hourIndex < hours.length; hourIndex++) {
      let hourlyTotal = 0;
      for (let storeArrIndex = 0; storeArrIndex < storeList.length; storeArrIndex++) {
        hourlyTotal = hourlyTotal + storeList[storeArrIndex].cookiesHour[hourIndex];
      }
      makeElem('td', trElem, hourlyTotal);
      dailyTotal = dailyTotal + hourlyTotal;
    }
    makeElem('td', trElem, dailyTotal);
  }
  
  function makeElem(tagName, parent, textContent) {
    let elem = document.createElement(tagName);
    if (textContent) {
      elem.textContent = textContent;
    }
    parent.appendChild(elem);
    return elem;
  }
  
  const storeList = [];
  const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
  addStore('Seattle', 23, 65, 6.3);
  addStore('Tokyo', 3, 24, 1.2);
  addStore('Dubai', 11, 38, 3.7);
  addStore('Paris', 20, 38, 2.3);
  addStore('Lima', 2, 16, 4.6);
  storeData();
  renderDataTable();
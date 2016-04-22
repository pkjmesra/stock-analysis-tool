clearTable();
drawTable("info");

function drawTable(fileName) {
  d3.tsv("technical/data/" + fileName, function(error, data) {
    var margin = {top: 50, right: 50, bottom: 50, left: 50},
        width = 550 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    console.log(data);

    // the table rows, typically loaded from data file using d3.csv
    var movies = [
      { title: "The Godfather", year: 1972, length: 175, budget: 6000000, rating: 9.1 },
      { title: "The Shawshank Redemption", year: 1994, length: 142, budget: 25000000, rating: 9.1 },
      { title: "The Lord of the Rings: The Return of the King", year: 2003, length: 251, budget: 94000000, rating: 9 },
      { title: "The Godfather: Part II", year: 1974, length: 200, budget: 13000000, rating: 8.9 },
      { title: "Shichinin no samurai", year: 1954, length: 206, budget: 500000, rating: 8.9 },
      { title: "Buono, il brutto, il cattivo, Il", year: 1966, length: 180, budget: 1200000, rating: 8.8 },
      { title: "Casablanca", year: 1942, length: 102, budget: 950000, rating: 8.8 },
      { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001, length: 208, budget: 93000000, rating: 8.8 },
      { title: "The Lord of the Rings: The Two Towers", year: 2002, length: 223, budget: 94000000, rating: 8.8 },
      { title: "Pulp Fiction", year: 1994, length: 168, budget: 8000000, rating: 8.8 }
    ];

    // column definitions
    var columns = [
      { head: 'Movie title', cl: 'title', html: ƒ('title') },
      { head: 'Year', cl: 'center', html: ƒ('year') },
      { head: 'Length', cl: 'center', html: ƒ('length', length()) },
      { head: 'Budget', cl: 'num', html: ƒ('budget', d3.format('$,')) },
      { head: 'Rating', cl: 'num', html: ƒ('rating', d3.format('.1f')) }
    ];

    // create table
    var table = d3.select("#svg-graph-technical").append('table')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("style", "margin: 25px;");

    // create table header
    table.append('thead').append('tr')
      .selectAll('th')
      .data(columns).enter()
      .append('th')
      .attr('class', ƒ('cl'))
      .text(ƒ('head'));

    // create table body
    table.append('tbody')
      .selectAll('tr')
      .data(movies).enter()
      .append('tr')
      .selectAll('td')
      .data(function(row, i) {
        return columns.map(function(c) {
          // compute cell values for this specific row
          var cell = {};
          d3.keys(c).forEach(function(k) {
            cell[k] = typeof c[k] == 'function' ? c[k](row,i) : c[k];
          });
          return cell;
        });
      }).enter()
      .append('td')
      .html(ƒ('html'))
      
      .attr('class', ƒ('cl'));

    function length() {
      var fmt = d3.format('02d');
      return function(l) { return Math.floor(l / 60) + ':' + fmt(l % 60) + ''; };
    }
  });
}

function updateTable() {
  clearTable();
  drawTable("info");
}

function clearTable() {
  d3.selectAll("table > *").remove();
  d3.selectAll("table").remove();
}
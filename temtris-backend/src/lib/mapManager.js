const ITEMS = {
  '+': 11,
  '#': 13,
  '-': 12,
  '=': 14,
  '~': 15,
  '*': 16
}
const getRandomIndex = (items) => Math.floor(Math.random() * items.length);
const mapManager = {
  getRandomMap() {
    const MAP = [ rainbow, cherry, piramid, poketball, dna];    
    const coreMapDat = MAP[getRandomIndex(MAP)].replace(/ /g, '').split(String.fromCharCode(10))
                      .map(line => line.split('|'));

    return coreMapDat.map(line => (line.map(item => {
        item = ITEMS[item] ? ITEMS[item] : item
        return parseInt(item, 10)
      })
    ));
  }
}

module.exports = mapManager;

var rainbow = 
`0|0|0|0|0|0|0|0|0|0
 0|0|0|0|0|0|0|0|0|0
 0|0|0|0|0|0|0|0|0|0
 0|0|0|0|0|0|0|0|0|0
 0|0|0|0|0|0|0|0|0|0
 0|0|0|0|0|0|0|0|0|0
 0|0|0|0|0|0|0|0|0|0
 0|0|0|0|0|0|0|0|0|0
 1|1|1|1|#|=|1|1|0|0
 2|2|2|2|=|=|2|2|0|0
 3|3|3|3|#|#|3|3|0|0
 4|4|4|4|#|#|4|4|0|0
 5|5|5|5|*|+|5|5|0|0
 6|6|6|6|~|#|6|6|0|0
 7|7|7|7|#|=|7|7|0|0
 1|1|1|1|#|#|1|1|0|0
 2|2|2|2|=|#|2|2|0|0
 3|3|3|3|=|=|3|3|0|0
 4|4|4|4|=|=|4|4|0|0
 5|5|5|5|=|=|5|5|0|0`;

 var cherry = 
 `0|0|0|0|0|0|0|0|0|0
  0|0|0|0|0|0|0|0|0|0
  0|0|0|0|0|0|0|0|0|0
  0|0|0|0|0|0|0|0|0|0
  0|0|0|0|0|0|0|0|0|0
  0|0|0|0|0|0|0|0|0|0
  0|0|0|0|0|0|0|0|0|0
  0|0|0|0|5|5|5|2|2|2
  0|0|0|0|0|3|3|0|0|0
  0|0|0|0|0|3|0|0|0|0
  *|0|0|0|3|3|3|0|0|0
  0|0|0|0|3|0|3|0|0|0
  0|0|0|3|3|0|3|0|0|0
  0|0|3|3|0|0|3|3|0|0
  0|0|3|0|0|0|0|3|0|0
  0|1|1|1|1|0|0|3|0|0
  1|1|1|+|1|0|0|1|1|0
  1|1|1|=|1|0|1|1|1|1
  1|1|-|1|1|0|1|1|#|1
  0|1|1|1|0|~|0|1|1|0`

  var piramid = 
  `0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|~|0|0|0|0
   0|0|0|0|=|#|*|0|0|0
   0|0|0|+|#|+|=|#|0|0
   0|0|#|=|#|=|#|3|#|0
   0|2|-|+|-|+|-|+|2|-
   1|1|1|1|*|1|0|1|1|1`;

  var poketball = 
  `0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|0|0|0|0|0|0|0
   0|0|0|1|1|1|1|0|0|0
   0|0|1|1|1|1|1|1|0|0
   0|1|1|1|1|1|1|1|1|0
   0|1|1|1|=|~|1|1|1|0
   2|0|0|0|*|#|0|0|0|2
   2|0|0|0|0|0|0|0|0|2
   2|0|0|0|0|0|0|0|0|2
   2|2|0|0|0|0|0|0|2|2
   2|2|2|0|0|0|0|2|2|2`;

   var dna = 
   `0|0|0|0|0|0|0|0|0|0
    1|0|4|0|0|0|0|0|0|0
    0|1|0|0|0|0|0|0|0|0
    4|0|1|0|0|0|0|0|0|0
    8|1|+|0|0|0|0|0|0|0
    1|8|4|0|0|0|0|0|0|0
    8|1|#|0|0|0|0|0|0|0
    4|+|1|0|0|0|0|0|0|0
    8|4|8|1|0|0|0|0|0|0
    0|8|1|8|0|0|0|0|0|0
    8|1|8|4|0|0|0|0|0|0
    1|8|4|8|0|0|0|0|0|0
    8|1|8|#|8|0|0|0|0|0
    4|8|1|8|8|0|0|0|0|0
    8|+|8|1|8|0|0|0|0|0
    4|8|1|8|0|0|0|0|0|0
    8|1|8|8|8|0|0|0|0|0
    1|0|4|8|8|0|0|0|0|0
    8|1|8|4|8|0|0|0|0|0
    8|8|1|8|4|0|0|0|0|0`;
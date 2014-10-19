(function(){

  /*** init variables ***/ 

  var colors = ['red','blue','yellow'],
      minRowCols = 4,
      maxRowCols = 6,
      recursionChance = 0.01,
      recursionDepreciationRate = 0.05,
      styleChance = 0.3;

  // random with seed
  var seed = 1;
  function random() {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
  }
  
  /*** helper functions ***/ 

  // returns table with # of rows & columns between min & max
  var generateMondrianTable = function(min, max, chance){      
    var numRows = Math.floor(random() * (max + 1 - min) + min);
    var numCols = Math.floor(random() * (max + 1 - min) + min);

    // create this table
    var $thisTable = $('<table border="0" cellpadding="0" cellspacing="0">');

    // append rows to this table
    for ( var i = 0; i < numRows; i++ ) {
      $thisTable.append('<tr></tr>');
    }

    // append cells to each of this table's rows
    $thisTable.find('tr').each(function(){
      for ( var j = 0; j < numCols; j++ ) {
        $(this).append('<td> </td>');
      }
    });  

    // for each lucky cell, generate a new table
    $thisTable.find('td').each(function(){
      var feelingLucky = (random() < chance) ? true : false;

      if ( feelingLucky ) {
        var newerTable = generateMondrianTable(1, 3, chance * recursionDepreciationRate);
        $(this).append(newerTable)
        .css({
          'border' : 'none'
        });
      }
    });

    return $thisTable;
  };

  // returns a background color, mostly white
  var getCellBackgroundColor = function(){
    var setToPrimaryColors = (random() < styleChance) ? true : false;
    var bgColor;

    // set random background color or white
    if ( setToPrimaryColors ) {
      bgColor = colors[Math.floor(random() * (colors.length + 1))]; 
    }
    else {
      bgColor = 'white';
    }

    return bgColor;
  };

  // returns a percentage between 0 and 100 if it has a chance
  var getRandomPercentage = function(){
    var setToPercentage = (random() < styleChance) ? true : false;
    var percentage;

    if ( setToPercentage ) {
      percentage = Math.floor(random() * (100 + 1));
    }
    else {
      percentage = '100';
    }

    return percentage;
  };


  /*** let's make some friggin art ***/
  var redraw = function(){
    // get the "frame"
    var $frame = $('.frame');

    // paint in each "frame"
    $frame.each(function(){

      var $thisFrame = $(this)

      // generate initial table
      var newTable = generateMondrianTable(minRowCols, maxRowCols, recursionChance);
      $thisFrame.html(newTable);

      // randomize cell styling
      $thisFrame.find('td').each(function(){
        $(this).css({
          'background-color' : getCellBackgroundColor(), 
        });   
      });

      // randomize row sizes 
      $thisFrame.find('> tr').each(function(){
        $(this).css({ 
          'height' : getRandomPercentage() + '%' 
        }); 
      });
    });
  };
  
  /*
        minRowCols = 2,
      maxRowCols = 9,
      recursionChance = 0.001,
      recursionDepreciationRate = 0.01,
      styleChance = 0.9;
  */
  $('button[name="redraw"]').click(function(event){
    minRowCols = Number($('input[name="minRowCols"]').val());
    maxRowCols = Number($('input[name="maxRowCols"]').val());
    recursionDepreciationRate = Number($('input[name="recursionDepreciationRate"]').val());
    recursionChance = Number($('input[name="recursionChance"]').val());
    recursionChance = Number($('input[name="recursionChance"]').val());
    
    var styleChance_ = Number($('input[name="styleChance"]').val());
    //alert(styleChance + ' styleChance ' + styleChance_);
    styleChance = styleChance_;
    
    seed = 1; // Math.random();
    redraw();
  })
  
  redraw();

})();
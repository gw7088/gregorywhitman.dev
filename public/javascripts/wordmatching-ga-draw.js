var scentenceToFind = 'Greg is the best!!!';
var charOptions = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+={}[];,.<>? ";

var populationSize = 200;
var genomeSize = scentenceToFind.length;
var mutationRate = 0.005;
var generation = 1;

var population = [];
var maxIndiv;
var maxfitness = 0;

var fontSize = 24;
var canvasH = 800;
var canvasW = (scentenceToFind.length*fontSize)*2 + 150;



function setup() {
  // Create Canvas to work on.
  createCanvas(canvasH, canvasW);
  
  population = [];
  // Creating population with random strings of N length.
  for(var i = 0; i < populationSize; i++)
  {
    var charArray = [];
    for(var j = 0; j < genomeSize; j++){
      charArray.push(selectAChar(charOptions));
    }
    
    var scentence = {
      scentence:charArray,
      fitness:1,
      count:i+1
    };
    
    population.push(scentence);
  }

  // // Varaibles to reset...
  generation = 1;
  // population = [];
  maxfitness = 0;
  var ch = ['R', 'a', 'n', 'd', 'o', 'm', 's', 't', 'r', 'i', 'n', 'g', '!', '!', '!'];
  maxIndiv = {
     fitness:0,
     scentence:ch
  };

  // Details
    let statsHTML = `
                <span>Population Size: ${populationSize}</span>
                <span>Genome Length: ${genomeSize}</span>
                <span>Generation: 1</span>
                <span>Max Fitness: 0%</span>
                `;
  // Update HTML
  $('.ga-best-scentence').html(`<span class="scentence-heading">Closest Match: </span><span class="scentence-important">${maxIndiv.scentence.join('')}</span>`);
  $('.ga-stats').html(statsHTML);
  $('#triedCombinations').html('0');

  $('#reset').removeClass('resetting');
}



function draw() {
  // Setup Canvas
  background(255);
  

  // Handle reset
  if(document.getElementById('reset').classList.contains('resetting')){
    setup();
    loop();
  }

  // Stop if scentence found
  if(maxIndiv.scentence.join('') != scentenceToFind){

    // Check if user wants to run ga.
    if(document.getElementById('action').classList.contains('started')){
      // Calculate Fitness.
      calculateFitness();
      
      // Draw best Scentence that matches
      for(var i in population){ 
        if(population[i].fitness > maxfitness){
          maxfitness = population[i].fitness;
          maxIndiv = population[i];
        }
      }

      // Draw Scentence to match.
      textSize(fontSize);
      text(scentenceToFind, 0.6*canvasH, 0.375*canvasW);
      fill(0);
      // Max Fitness
      var count = 0;
      var percent = (count/scentenceToFind.length)*100;
      for(var i in maxIndiv.scentence){
        if(scentenceToFind[i] == maxIndiv.scentence[i]){
            count++; 
        }
        percent = floor((count/scentenceToFind.length)*100);
      }
      textSize(fontSize);
      text(`${percent}%`, 0.6*canvasH, 0.5625*canvasW);
      fill(0);
      // Best Scentence
      textSize(fontSize);
      text(maxIndiv.scentence.join('')+'', 0.6*canvasH, 0.62*canvasW);
      fill(0);
      // Generations
      textSize(fontSize);
      text(`Generations: ${generation}`, 0.6*canvasH, 0.6875*canvasW);
      fill(0);

      // // Stop if scentence found
      // if(maxIndiv.scentence.join('') == scentenceToFind){
      //   noLoop();
      // }

      // Next Generation.
      nextGeneration();
      generation++;
        
      // Draw Scentences.
      let tempPopHtml = '';
      let limit = 0;
      for(var i in population){
        textSize(fontSize);
        text(population[i].scentence.join('')+'', 10, population[i].count*(fontSize+5));
        if(limit<25){
          tempPopHtml += `<span class="individual"> ${population[i].scentence.join('')+''} </span>`;
        }
        fill(0);
        limit++;
      }

      // -----> Fill in HTML elements
      // Details
      let statsHTML = `
                        <span>Population Size: ${populationSize}</span>
                        <span>Genome Length: ${genomeSize}</span>
                        <span>Generation: ${generation}</span>
                        <span>Max Fitness: ${percent}%</span>
                      `;
      // Population
      let populationHTML = tempPopHtml;
      // Update HTML
      $('.ga-best-scentence').html(`<span class="scentence-heading">Closest Match: </span><span class="scentence-important">${maxIndiv.scentence.join('')}</span>`);
      $('.ga-stats').html(statsHTML);
      $('.ga-population').html(populationHTML);
      $('#triedCombinations').html('~ '+generation*populationSize);
    }
  }
}



function selectAChar(string){
   var index = floor(random(0,string.length));
   return string.charAt(index);
}



function replaceAt(str,index,chr) {
    if(index > str.length-1){
      return str;
    }
    return str.substring(0,index) + chr + str.substring(index+1);
}

// Calculate Fitness of each Scentence in the Population
function calculateFitness(){
  for(var i in population){
     // Working...
     var matchCharPoints = 1;
     var similarCharPoints = 0.01;
     var similarCharCount = 0;
     var fitness = 0;
     for(var j in scentenceToFind){
        if(scentenceToFind[j] == population[i].scentence[j]){
             fitness += 1;
         }
       
        for(var k in population[i].scentence){
           if(scentenceToFind[j] == population[i].scentence[k]){
             fitness += 0.01;
             similarCharCount++;
           }
        }
     }
     fitness += findCommon(scentenceToFind, population[i].scentence.join('')).length;
     fitness += scentenceToFind.length - levenshteinDistance(scentenceToFind, population[i].scentence.join(''));
     
     if(similarCharCount == 0){
       fitness = 0.0001; 
     }
     
     //------------------    Perfect Char in location                      Has similar Characters                Best substring            Least Changes 
     var denominator = (scentenceToFind.length*matchCharPoints) + (scentenceToFind.length*similarCharPoints) + scentenceToFind.length + scentenceToFind.length; // Perfect Score...
     population[i].fitness = pow(((fitness/denominator)*100),4);
  }  
}



function findCommon(str1 = '', str2 = ''){
   const s1 = [...str1];
   const s2 = [...str2];
   const arr = Array(s2.length + 1).fill(null).map(() => {
      return Array(s1.length + 1).fill(null);
   });
   for (let j = 0; j <= s1.length; j += 1) {
      arr[0][j] = 0;
   }
   for (let i = 0; i <= s2.length; i += 1) {
      arr[i][0] = 0;
   }
   let len = 0;
   let col = 0;
   let row = 0;
   for (let i = 1; i <= s2.length; i += 1) {
      for (let j = 1; j <= s1.length; j += 1) {
         if (s1[j - 1] === s2[i - 1]) {
            arr[i][j] = arr[i - 1][j - 1] + 1;
         }
         else {
            arr[i][j] = 0;
         }
         if (arr[i][j] > len) {
            len = arr[i][j];
            col = j;
            row = i;
         }
      }
   }
   if (len === 0) {
      return '';
   }
   let res = '';
   while (arr[row][col] > 0) {
      res = s1[col - 1] + res;
      row -= 1;
      col -= 1;
   }
   return res;
}




function levenshteinDistance(str1 = '', str2 = ''){
   const track = Array(str2.length + 1).fill(null).map(() =>
   Array(str1.length + 1).fill(null));
   for (let i = 0; i <= str1.length; i += 1) {
      track[0][i] = i;
   }
   for (let j = 0; j <= str2.length; j += 1) {
      track[j][0] = j;
   }
   for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
         const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
         track[j][i] = Math.min(track[j][i - 1] + 1, track[j - 1][i] + 1, track[j - 1][i - 1] + indicator);
      }
   }
   return track[str2.length][str1.length];
}



// Get fitness value between 0-1
function normalizeFitness(){
  var sum = 0;
  
  // Get sum of fitness's
  for(var i in population){
    sum += population[i].fitness;
  }
  
  // Normalize by dividing by Sum
  for(var i in population){
    population[i].fitness = population[i].fitness / sum; 
  }
}



// Create new generation using mutation/crossover
function nextGeneration(){
   var newPopulation = [];
   
   //var matingPool = [];
   //// Create Mating Pool
   //for(var i in population){
   //  var n = population[i].fitness;
   //  // console.log(n);
   //  for(var j = 0; j < n; j++){
   //    // console.log('pushed in');
   //    matingPool.push(population[i]);
   //  }
   //}
   // Get MaxFitness from population...
   var maxFitness = 0;
   for(var i in population){
      var n = population[i].fitness;
      if(n > maxFitness){
         maxFitness = n; 
      }
   }

 
   for(var i = 0; i < population.length; i++){
      //var parentA = pickOne(matingPool);
      //var parentB = pickOne(matingPool);
      var parentA = pickOne(population,maxFitness);
      var parentB = pickOne(population,maxFitness);

      
      // Crossover
      var childScentenceA = [];
      var midpoint = floor(scentenceToFind.length/2);
      
      childScentenceA = childScentenceA.concat(parentA.scentence.slice(0,midpoint));
      childScentenceA = childScentenceA.concat(parentB.scentence.slice(midpoint,scentenceToFind.length));
      // Mutation
      for(var j in childScentenceA){
        if(random(1) < mutationRate){
          // console.log('mutation');
          var character = selectAChar(charOptions);
          childScentenceA[j] = character;
        }
      }
      
      var childA = {
        scentence:childScentenceA,
        fitness:1,
        count:(parseInt(i,10))
      };
      newPopulation.push(childA);       
   }
   population = newPopulation;
}



// Pick random Individual from population. Check for pass. Else rerun...
//function pickOne(list){
//  var index = floor(random(list.length));
//  return list[index];
//}
function pickOne(list, maxFitness){
  while(true){
    var index = floor(random(list.length));
    var parent = list[index];
    var r = random(0, maxFitness);
    if(r < parent.fitness){
       return parent; 
    }
  }
}

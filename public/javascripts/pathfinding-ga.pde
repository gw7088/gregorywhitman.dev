Population test;

// Variables to manipulate
int popSize = 200;

//OLD GOAL/////
PVector goal  = new PVector(760, 760);

//New goal
//PVector goal = new PVector(760, 400);

void setup()
{
  size(800, 800);
  frameRate(10000000);
  
  test = new Population(popSize);
  //print("REGULAR GA:\n");
  //print("Initial Population:\n");
}



void draw()
{
    background(0, 175, 255);
    
    //draw goal
    fill(255, 255, 0);
    //ellipse(goal.x, goal.y, 15, 15);
    
    //OLD GOAL///
    //rect(goal.x, goal.y, 15, 15);
    
    //New goal
    rect(goal.x, goal.y, 15, 15);
    
    //draw obstacle
    //fill(0, 0, 255);
    //rect(0, 200, 250, 10);


    // U/I updates. (slightly better performance)
    // document.getElementById("popSize").innerHTML = test.popSize;
    // document.getElementById("genomeLength").innerHTML = test.genomeSize;
    // document.getElementById("generation").innerHTML = test.generation;
    // document.getElementById("avgFitness").innerHTML = nf(((test.fitnessSum / test.popSize) *6000), 0, 6);
    // document.getElementById("minMoves").innerHTML = test.minStep;

    if(document.getElementById('action').classList.contains('started')){
        // U/I updates.
        document.getElementById("popSize").innerHTML = test.popSize;
        document.getElementById("genomeLength").innerHTML = test.genomeSize;
        document.getElementById("generation").innerHTML = test.generation;
        document.getElementById("avgFitness").innerHTML = nf(((test.fitnessSum / test.popSize) *6000), 0, 6);
        document.getElementById("minMoves").innerHTML = test.minStep;

        if(test.allDotsDead())
        {
            // GA here
            test.calculateFitness();
            test.nextGeneration();
            //print("DOTS DEAD");
        }
        else
        {
            test.update();
            test.show();
            //print("MOVING DOTS");
        }
    }
    else{
        test.show();
    }
}



class Genome
{
  public int directions[];
   
  int step = 0;

  Genome(int size)
  {
    
    directions = new int[size];
    
    for(int i = 0; i < directions.length; i++)
    {
      int direction = floor(random(1,9));
      directions[i] = direction;
    }
  }
}



class Dot
{ 
   PVector pos;
   public Genome genome;
   
   // Variable to manipulate
   
   // Good for corner
   public int genomeSize = 650;
   
   //New for goal
   //public int genomeSize = 150;
   
   boolean isDead = false;
   boolean reachedGoal = false;
   
   float fitness = 0;
   
   int numberOfSteps = 4;
   
   Dot()
   {
     genome = new Genome(genomeSize);
     pos = new PVector(400, 400);
   }  
   
   
   
   void show()
   {
    fill(0, 0, 0);
    ellipse(pos.x, pos.y, 4, 4);  
   }
   
   
   
   void move()
   {
     if(genome.directions.length > genome.step)
     {
       // North
       if(genome.directions[genome.step] == 1)
       {
         pos.y = pos.y - numberOfSteps;
         genome.step++;
       }
       // East
       else if(genome.directions[genome.step] == 2)
       {
         pos.x = pos.x + numberOfSteps;
         genome.step++;
       }
       // South
       else if(genome.directions[genome.step] == 3)
       {
         pos.y = pos.y + numberOfSteps;
         genome.step++;
       }
       // West
       else if(genome.directions[genome.step] == 4)
       {
         pos.x = pos.x - numberOfSteps;
         genome.step++;
       }
       // North East
       else if(genome.directions[genome.step] == 5)
       {
         pos.x = pos.x + numberOfSteps;
         pos.y = pos.y - numberOfSteps;
         genome.step++;
       }
       // South East
       else if(genome.directions[genome.step] == 6)
       {
         pos.x = pos.x + numberOfSteps;
         pos.y = pos.y + numberOfSteps;
         genome.step++;
       }
       // South West
       else if(genome.directions[genome.step] == 7)
       {
         pos.x = pos.x - numberOfSteps;
         pos.y = pos.y + numberOfSteps;
         genome.step++;
       }
       // North West
       else if(genome.directions[genome.step] == 8)
       {
         pos.x = pos.x - numberOfSteps;
         pos.y = pos.y - numberOfSteps;
         genome.step++;
       }
     }
     // Kill dot
     else
     {
        isDead = true; 
     }
   }
   
   
   
   void update()
   {
     if(!isDead && !reachedGoal)
     {
       move();
       
       // Kill Dot at window
       if (pos.x < 4 || pos.y < 4 || pos.x > width-4 || pos.y > height-4) 
       { 
        isDead = true;
       }
       //else if(pos.x < 250 && pos.y < 210 && pos.x > 0 && pos.y > 200)//rect(0, 200, 250, 10);
       //{
       //  isDead = true;
       //}
       //New Goal
       //else if(pos.x > 760 && pos.x < 775 && pos.y > 400 && pos.y < 415)
       //{
       //  reachedGoal = true;
       //  isDead = true;
       //}
       ////OLD GOAL////
       else if(pos.x > 760 && pos.x < 775 && pos.y > 760 && pos.y < 775)
       {
         reachedGoal = true;
         isDead = true;
       }
     }
   }
   
   
   
   void calculateFitness()
   {
      float distance = abs(pos.x - goal.x) + abs(pos.y - goal.y);
      if(reachedGoal)
      {
        fitness = (float) 100000/(genome.step*genome.step); 
      }
      else
      {
         // Manhattan distance
        fitness = (float) (1.0/((distance*distance)+15));
      }
   }
}



class Population
{  
  Dot[] dots; 
  
  int generation = 1;
  
  // Variables to manipulate
  int popSize = 200;
  float mRate = .025;
  int genomeSize = 650;


  int minStep = genomeSize;
  float fitnessSum;
  
  
  Population(int size)
  {
    dots = new Dot[size];
    popSize = size;

    for (int i = 0; i < size; i++)
    {
      dots[i] = new Dot();
    }
  }


  void update()
  {
    for (int i = 0; i < dots.length; i++)
    {
      if (dots[i].genome.step > minStep) // 1000
      {
        dots[i].isDead = true;
      }
      dots[i].update();
    }
  }



  void show()
  {
    for (int i = 1; i < dots.length; i++)
    {
      dots[i].show();
    }
    dots[0].show();
  }



  boolean allDotsDead() 
  {
    for (int i = 0; i< dots.length; i++) 
    {
      if (!dots[i].isDead) 
      { 
        return false;
      }
    }
    return true;
  }



  void calculateFitness()
  {
    for (int i = 0; i < dots.length; i++)
    {
      dots[i].calculateFitness();
    }
    calculateFitnessSum();
  }



  void calculateFitnessSum()
  {
    fitnessSum = 0;
    for (int i = 0; i< dots.length; i++)
    {
      fitnessSum = fitnessSum + dots[i].fitness;
      //print("Fitness "+dots[i].fitness);
    }
    //print(" "+fitnessSum+"\n");

    //Normalizing 0-1
    for (int i = 0; i < dots.length; i++)
    {
      dots[i].fitness = (dots[i].fitness / fitnessSum);
      
      //print("Fitness " + dots[i].fitness);
    }
  }



  void nextGeneration()
  {
    //print("\n");
    //print("Gen Count: "+generation+"\n");
    
    setMinStep();
    
    Dot[] newDots = new Dot[popSize];
    
    for (int i = 0; i < dots.length/2; i++)
    {
      Dot parentA = selectParent();
      Dot parentB = selectParent();
      
      while (parentA == parentB)
      {
         //print("same\n");
         parentB = selectParent(); 
      }

      int cloneOne[] = new int[genomeSize];
      int cloneTwo[] = new int[genomeSize];

      //////////////Child A//////////////////////////////////////
      
      /**
      for (int j = 0; j < 36; j++)
      {
        cloneOne[j] = parentA.genome.directions[j];
        //print(j+"\n");
      }

      // CHILD ONE 2nd FIFTH PARENT B
      for (int j = 36; j < 72; j++)
      {
        cloneOne[j] = parentB.genome.directions[j];
        //print(j+"\n");
      }

      // CHILD ONE 3rd FIFTH PARENT B
      for (int j = 72; j < 108; j++)
      {
        cloneOne[j] = parentA.genome.directions[j];
        //print(j+"\n");
      }

      // CHILD ONE 4th FIFTH PARENT B
      for (int j = 108; j < 144; j++)
      {
        cloneOne[j] = parentB.genome.directions[j];
        //print(j+"\n");
      }

      // CHILD ONE 5th FIFTH PARENT B
      for (int j = 144; j < genomeSize; j++)
      {
        cloneOne[j] = parentA.genome.directions[j];
        //print(j+"\n");
      }
      
      // CHILD ONE 1st FIFTH PARENT B
      for (int j = 0; j < 36; j++)
      {
        cloneTwo[j] = parentB.genome.directions[j];
        //print(j+"\n");
      }

      // CHILD ONE 2nd FIFTH PARENT A
      for (int j = 36; j < 72; j++)
      {
        cloneTwo[j] = parentA.genome.directions[j];
        //print(j+"\n");
      }

      // CHILD ONE 3rd FIFTH PARENT B
      for (int j = 72; j < 108; j++)
      {
        cloneTwo[j] = parentB.genome.directions[j];
        //print(j+"\n");
      }

      // CHILD ONE 4th FIFTH PARENT A
      for (int j = 108; j < 144; j++)
      {
        cloneTwo[j] = parentA.genome.directions[j];
        //print(j+"\n");
      }

      // CHILD ONE 5th FIFTH PARENT B
      for (int j = 144; j < genomeSize; j++)
      {
        cloneTwo[j] = parentB.genome.directions[j];
        //print(j+"\n");
      }
      */

      
      // CHILD ONE 1st FIFTH PARENT A
      for (int j = 0; j < genomeSize*(1/5); j++)
      {
        cloneOne[j] = parentA.genome.directions[j];
        //print(j+"\n");
      }

      // CHILD ONE 2nd FIFTH PARENT B
      for (int j = genomeSize*(1/5); j < genomeSize*(2/5); j++)
      {
        cloneOne[j] = parentB.genome.directions[j];
        //print(j+"\n");
      }

      // CHILD ONE 3rd FIFTH PARENT B
      for (int j = genomeSize*(2/5); j < genomeSize*(3/5); j++)
      {
        cloneOne[j] = parentA.genome.directions[j];
        //print(j+"\n");
      }

      // CHILD ONE 4th FIFTH PARENT B
      for (int j = genomeSize*(3/5); j < genomeSize*(4/5); j++)
      {
        cloneOne[j] = parentB.genome.directions[j];
        //print(j+"\n");
      }

      // CHILD ONE 5th FIFTH PARENT B
      for (int j = genomeSize*(4/5); j < genomeSize; j++)
      {
        cloneOne[j] = parentA.genome.directions[j];
        //print(j+"\n");
      }

      //////////////Child B/////////////////////////////////////

      // CHILD ONE 1st FIFTH PARENT B
      for (int j = 0; j < genomeSize*(1/5); j++)
      {
        cloneTwo[j] = parentB.genome.directions[j];
        //print(j+"\n");
      }

      // CHILD ONE 2nd FIFTH PARENT A
      for (int j = genomeSize*(1/5); j < genomeSize*(2/5); j++)
      {
        cloneTwo[j] = parentA.genome.directions[j];
        //print(j+"\n");
      }

      // CHILD ONE 3rd FIFTH PARENT B
      for (int j = genomeSize*(2/5); j < genomeSize*(3/5); j++)
      {
        cloneTwo[j] = parentB.genome.directions[j];
        //print(j+"\n");
      }

      // CHILD ONE 4th FIFTH PARENT A
      for (int j = genomeSize*(3/5); j < genomeSize*(4/5); j++)
      {
        cloneTwo[j] = parentA.genome.directions[j];
        //print(j+"\n");
      }

      // CHILD ONE 5th FIFTH PARENT B
      for (int j = genomeSize*(4/5); j < genomeSize; j++)
      {
        cloneTwo[j] = parentB.genome.directions[j];
        //print(j+"\n");
      }
      

      Dot childA = new Dot();
      Dot childB = new Dot();

      // childA.genome.directions = cloneOne.clone();
      childA.genome.directions = cloneOne;
      // childB.genome.directions = cloneTwo.clone();
      childB.genome.directions = cloneTwo;



      // MUTATE CHILDREN
      for (int s = 0; s < genomeSize; s++)
      {
        float ran = random(0, 1);
        if (ran <= mRate)
        {
          int fRan = (int) floor(random(1, 9));
          childA.genome.directions[s] = fRan;
        }

        ran = random(0, 1);
        if (ran <= mRate)
        {
          int sRan = (int) floor(random(1, 9));
          childB.genome.directions[s] = sRan;
        }
      } 

      newDots[(2*i)] = childA;
      newDots[(2*i)+1] = childB;   
      
      //print(i+"\n");
    }

    // dots = newDots.clone();
    dots = newDots;

    // SHOW NEW POP + DIRECTIONS FOR EACH
    for (int i = 0; i < 500; i++)
    {
      //print("\n");
      //print(i + ":" + dots[i]+"\n");
      for (int j = 0; j < 1000; j++)
      {
        //print(dots[i].genome.directions[j]);
      }
    }
    generation++;
  }


  Dot selectParent()
  {
    int i = 0;
    while(i < 10000000)
    { 
       int indiv = floor(random(0, popSize));
       float indivFit = dots[indiv].fitness;
       float rand = random(1);//fitnessSum
     
       if(indivFit+.00015 > rand || indivFit-.00015 > rand)
       {

         return dots[indiv];
       }
       else
       {
         i++;
       }
     }

    return null; // Shouldnt do this
  }
  
  void setMinStep()
  {
     int currentMinStep = genomeSize;
     for(int i = 0; i < dots.length; i++)
     {
        if(dots[i].reachedGoal == true)
        {
          currentMinStep = dots[i].genome.step;
          
          if(minStep > currentMinStep)
          {
             minStep = currentMinStep;
          }
        }   
     }
     //print("MinStep: "+minStep);
  }
}
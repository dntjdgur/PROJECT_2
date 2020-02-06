### Project 2: Earthquake Data Analysis and Visualization

-----------------------------------------
## Data Sources: 

1. [Food.com Recipes and Interactions](https://www.kaggle.com/shuyangli94/food-com-recipes-and-user-interactions/data#)
   "This dataset consists of 180K+ recipes and 700K+ recipe reviews covering 18 years of user interactions and uploads on Food.com (formerly GeniusKitchen)"
   

2. [Food Choices: College students' food and cooking preferences](https://www.kaggle.com/borapajo/food-choices)
   "This dataset includes information on food choices, nutrition, preferences, childhood favorites, and other information from college students. There are 126 responses from students. Data is raw and uncleaned."

Note: Please refer to source URL for Food.com original CSVs.

-----------------------------------------
## Objective:

Our goal for this project is to compare the most popular comfort food items, the average GPA for the students who preferred those food, and average Food.com ratings of recipes of those food types.


-----------------------------------------
## Extract:

1. From Food.com - Two CSVs databased were extracted. 
* The RAW_recipes.csv contained relevant columns "name" (which contains the food type we will need for reference) and "id" (the id of the recipe on Food.com).
* The RAW_interactions.csv contained relevant columns "recipe_id" and "rating".
* We joined the two CSVs on recipe ID and included some other columns we think may be of potential use in the future.

2. From Food Choices - One CSV was extracted.
* The relevant columns from this CSV were students GPAs and lists of his/her comfort food items.

-----------------------------------------
## Transform:

Types of transformations required were: 
* Convert all CSVs into dataframes
* Merge the two Food.com dataframes 
* Clean dirty data which contained various symbols and typos
* Remove nan at multiple stages as new ones appear when we continue through transformations
* Aggregate results from for loop searches to find average of GPA and ratings
* Convert findings into new dataframes


-----------------------------------------
## Load

* For the purpose of this project, we only searched for the GPAs and ratings for the top five most popular foods from the student survey.
* In real life, extending the searches beyond top five favorites can broaden scope, finds, and understanding.
* We decided to keep the two tables separate because they come from different sources, therefore may require updates at different timeframe.
* We loaded each end dataframe into SQL database for easier queries.

![food_db](/Images/food_db.png)





<H1>Superhero Network Interactive Analytics Dashboard</H1>

Team Members:

Ryla Almario

Tamala

Mitesh Parekh

Andrew Lau

![Superhero network](/static/assets/images/Readme01.png)


We have created a superhero network which will help you get to know the profiles for superheroes from various publishers. [Profile.html](https://github.com/MiParekh/Project2---2020/blob/master/templates/profile.html)

We’ll also look into their characteristics, powers, and stats. Through an interactive analytics dashboard that includes a sunburst, scatter plot, radial bar chart, and hero filter we can find information about many of your favorite heroes.

We’ll look at data over for over 700 superheroes and we’ll also find out how each of them can help solve the world’s most difficult problems. 
Which superhero powers can save the earth?

We identified 167 super abilities that exist among beings across the universe that can potentially assist with one or more current critical world issues which are (Medical (COVID - 19), Climate Change, Drug Addiction, Educational Improvements, Infrastructure Improvements, Large Scale Conflict).

After thorough analysis, we determined the following:
1. 531 beings can potentially assist with Medical (COVID-19) issues.
2. 492 with Infrastructure improvements
3. 432 with Large Scale Conflict
4. 244 with Education Improvements
5. 148 with Climate Change
6. 121 with Drug Addiction

Dependencies

This project requires SuperHero API, Jupyter Notebook, Python, Pandas, SQLite, FlaskApp, JSON, HTML, CSS, Javascript, D3, Amcharts, Heroku.

Questions:
1. Which superheroes are aligned towards good and which publishers are they from?
2. Which superheroes have the most total stats or the highest stats for a combination of stat categories?
3. Which powers are most relevant for solving the world’s problems and which heroes have those relevant powers?

Extract, Scrape, Clean, Load:
![Superhero network](/static/assets/images/Readme02.png)

We download the data from Kaggle and scrape data from the SuperHero API and Clean data using pandas library in Python within a Jupyter notebook:[etl.ipynb](https://github.com/MiParekh/Project2---2020/blob/master/resources/etl.ipynb)

Then load to SQLite.


Create FlaskApp:

Python:  [flaskapp.py](https://github.com/MiParekh/Project2---2020/blob/master/flaskapp.py)

Jupyter Notebook:  [flaskapp.ipynb](https://github.com/MiParekh/Project2---2020/blob/master/flask_app.ipynb)

[Feature_Character.html](https://github.com/MiParekh/Project2---2020/blob/master/templates/feat_character.html)

![Superhero network](/static/assets/images/Readme03.png)

Create Website:

Index: [Index.html](https://github.com/MiParekh/Project2---2020/blob/master/templates/index.html)

![Superhero network](/static/assets/images/Readme04.png)
![Superhero network](/static/assets/images/Readme05.png)

Sunburst Analysis - Superhero Characteristics:

Create sunburst chart to find the right superheroes using HTML, Javascript, and Amchart Sunburst: [Sunburst.html](https://github.com/MiParekh/Project2---2020/blob/master/templates/sunburst.html) and [Sunburst.js](https://github.com/MiParekh/Project2---2020/blob/master/static/js/sunburst.js).
![Superhero network](/static/assets/images/Readme06.png)

To begin our analysis, let’s take a look at the characteristics of our top superheroes. For the top 158 superheroes ranked by total stats, we can review alignment. Good heroes out number bad heroes 94 to 50 with another 10 that are neutral, which puts us in a good position to recruit heroes to our cause. Within the 94 heroes, the publisher is Marvel for 55 heroes and DC for 32 heroes. We can also see that for the non-Marvel and DC heroes, all the top heroes are good which is a positive sign for us. Although Marvel has a higher number of good heroes vs. DC, DC has a slightly higher percentage of good heroes vs. bad heroes. DC is 32 good vs. 17 bad or 65% good. Marvel is 55 good vs. 33 bad or 63% good. On the outer ring of the sunburst, we can see all the top heroes in their respective alignment and publisher camps. Next, we can take a deeper dive into hero power stats as we move through our interactive superhero network analytics dashboard.

Superpowers:

Create scatter plot with interactive axis to display relationship of stats for the superheroes. [Scatter.js](https://github.com/MiParekh/Project2---2020/blob/master/static/js/scatter.js) [Scatter.html](https://github.com/MiParekh/Project2---2020/blob/master/templates/scatter.html). Include a correlation matrix as well. [Correlation_Matrix.ipynb](https://github.com/MiParekh/Project2---2020/blob/master/resources/correlation_matrix.ipynb). 

![Superhero network](/static/assets/images/Readme07.png)
![Superhero network](/static/assets/images/Readme08.png)

Generally speaking, there are moderate to strong correlations between all general attributes, as these are superheroes and villains with extraordinary abilities compared to the general population. The three highest correlations were: Strength/Durability (.79), Combat/Intelligence (.78), and Power/Durability (.75). Conversely, the weakest correlations are Strength/Intelligence (.57), Strength/Combat (.58), and Speed/Combat (.59).

While a scatterplot is helpful to see the correlations between general attributes and scores for high level assessment, a deeper dive into individual superpowers is needed to thoroughly understand which heroes (and potentially villains) can help the most. For example, are there any superpowers that lead to a strong combination of durability and strength which can help with a real-world issue such as COVID-19.

Top 150 Superheroes

[Bar.js](https://github.com/MiParekh/Project2---2020/blob/master/static/js/bar.js) 

[Bar.html](https://github.com/MiParekh/Project2---2020/blob/master/templates/bar.html)
![Superhero network](/static/assets/images/Readme09.png)

-The average total score for the top 150 Superheroes was 434 (median:421), ranging from 356 to 581 (Martian Manhunter).
-24 superheroes and villains had a total score of 500 or more.
-# of superheroes and villains with a 100+ score in a general attribute: Intelligence (16), Strength (24) Speed (10), Durability (48), Power (49), Combat (10).
-94 (or 63%) of the top 150 are aligned with good (colored in blue)
-Durability was the attribute with the highest average score (Mean: 86.6/Median: 90), while Speed was the lowest (Mean: 52.8/Median: 51)
While a bar chart is helpful to see the which superheroes are the most versatile and their total rating, a deeper dive into individual superpowers is needed to thoroughly understand which heroes (and potentially villains) can help the most. For example, 48 superheroes had a durability rating of 100+, but is there any specific superpower that can help with a real-world issue such as COVID-19.

Search Filter for Superhero or Issue

[TableFilter.js](https://github.com/MiParekh/Project2---2020/blob/master/static/js/tableFilter.js) 

[TableFilter.html](https://github.com/MiParekh/Project2---2020/blob/master/templates/tableFilter.html)
![Superhero network](/static/assets/images/Readme10.png)

We identified 167 super abilities that exist among beings across the universe that can potentially assist with one or more current critical world issues which are (Medical (COVID - 19), Climate Change, Drug Addiction, Educational Improvements, Infrastructure Improvements, Large Scale Conflict).
We researched each power and identified an issue that it can potentially assist with. This interactive table below allows you to filter by superhero, critical world issue, or both to see who can potentially help save the day! Amongst the beings, the range of abilities in an individual went from 1 to 49 (with Spectre at the top). 21 of the beings had one or more identified ability in all 6 identified world issues.

After thorough analysis, we determined the following:

531 beings can potentially assist with Medical (COVID-19) issues, with abilities such as Aurora's MolecularManipulation (potentially assist with creating a cure), Deadpool's Regeneration (to potentially help with mass production), and Hulk'sToxin and Disease Control/Resistance.
492 with Infrastructure improvements, with abilities such as Ardina's Energy Manipulation (to help process materials more efficiently for faster results), Thor's Weather Control (to temporarily halt short-term bad weather to allow for progress), and Doctor Strange's Flight (to potentially help move items to elevated locations more efficiently).
432 with Large Scale Conflict, with abilities such as Camouflage, Danger Sense, and Weapons Master. These skills and more can be found in hero coalitions like the Avengers and the Justice League.
244 with Education Improvements, with abilities such as Maxima's Mind Blast (can we "place" information determined to be universally helpful and critical into people’s minds who want to learn more), Power Girl's Enhanced Memory (to potentially help with retaining complex large scale information for like doctoral professions) and Brainiac's Omnilingualism (can assist with language deciphering amongs humans and animals).
148 with Climate Change, with abilities such as Zatanna's Terrakinesis (potentially manipulate items from the earth) and Captain Atom's Radiation Control (is there any technology we can develop learning from these abilities).
121 with Drug Addiction, with abilities such as Scarlet Witch's Illusions (to help show that addiction may cause to someone in the future) and Spider-Woman IV's Psionic powers (to potentially help people control addiction that want to be helped).

Conclusion:
![Superhero network](/static/assets/images/Readme11.png)
We need to find the superheroes that can solve the world’s most pressing issues. The Superhero Network interactive analytics dashboard gives YOU the ability to research the Superheroes by Characteristics, by Stats, by Powers so that YOU can draw your own insights and conclusions. Who will save the earth? We leave that up to YOU. Good luck and God Speed.

![Superhero network](/static/assets/images/Readme12.png)

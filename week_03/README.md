## Project Overview  
### ESG Performance of Food Giants - the bigger, the better?  
This project focuses on ESG (Environmental, Social, Governance) performance of 3 food giants: Tyson, JBS, Cargill. Among all the ESG matrices, food safety and nutrition is very important for food industry and would be used for this project. I would compare the 3 giants with industry benchmark to see how well big food companies are performing with this specific ESG matrix.



## Data source, description and features
### Data is retrieved from [USDA](https://fdc.nal.usda.gov/download-datasets.html):  
 1. `comps.csv`: food data of 3 companies  
    - fdc_id
    - market_country
 2. `food_nutrient.csv`: nutrition data in detailed categories  
    - fdc_id  
    - nutrient_id  
    - amount
 3.  `nutrient_code.csv`: nutrition code  
     - nutrient_nbr
### Supplementary data:  
 1. company revenue is from [SEC](https://www.sec.gov/reports?aId=edit-field-article-sub-type-secart-value&year=All&field_article_sub_type_secart_value=Reports%20and%20Publications-AnnualReports&tid=All)  
 2. different industries' ESG performance is from [WSJ](https://www.wsj.com/articles/explore-the-full-wsj-sustainable-management-ranking-11602506733), as a secondary source



## Why interested and how I would use the data 
### Why:  
I interned with MSCI ESG research team in the past. For a long time investors only care/care most of companies' financial performances, i.e. revenue, CAGR and neglect how companies are performing in Environmental, Social and Governance. Can we just assume those big companies are performing equally well in ESG? Zooming into food industry, this project can provide an answer.  
### How:  
1. donut chart: different industries' ESG performance, to show why it's important to focus on food industry  
2. stacked bar chart: three companies' financial performances, to show why they are comparable  
3. choropleth map: geo-locations of global brands as industry benchmark  
4. boxplot: three companies' performances on different nutrients  


## Any concerns  
Data wrangling and pre-processing may take some time. Besides, there might be a twist in narrative if final result does not support the original assumption.

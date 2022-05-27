from urllib import response
import urllib.request
import bs4 as BeautifulSoup
from selenium import webdriver
import requests


text = urllib.request.urlopen('https://edition.cnn.com/2022/05/23/asia/dead-sperm-whale-in-philippines-intl-hnk/index.html')

article = text.read()



#print(article)

article_parsed = BeautifulSoup.BeautifulSoup(article, 'lxml')

print("Title: ", article_parsed.find('h1').get_text())
    
temp_au = article_parsed.find('span', {"class":'metadata__byline__author'})
print("Author: " ,temp_au.get_text())

temp_time = article_parsed.find('p', {'class':'update-time'})
print("Time: ", temp_time.get_text())

def get_full_text(doc):
    soup = BeautifulSoup.BeautifulSoup(doc, 'html.parser')
    for s in soup(['script', 'style']):
        s.extract()
    return (soup.text.strip()).encode('ascii', 'ignore').decode("utf-8")

print("Fulltext:", get_full_text(article))


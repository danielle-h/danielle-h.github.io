from datetime import datetime
import sys
import requests
import html2text
from bs4 import BeautifulSoup
import re
from urllib.parse import unquote



def get_html_from_url(url):
    """
    Fetch the HTML content of a given URL.

    Parameters:
    - url (str): The URL from which to fetch the HTML content.

    Returns:
    - str: The HTML content of the page, or an error message if the request fails.
    """
    try:
        # Send a GET request to the URL
        response = requests.get(url)
        
        # Check if the request was successful
        if response.status_code == 200:
            return response.text
        else:
            return "Failed to retrieve content, status code: " + str(response.status_code)
    except Exception as e:
        return "An error occurred: " + str(e)

def html_to_markdown(html_content):
    """
    Convert HTML content to Markdown format.

    Parameters:
    - html_content (str): A string containing HTML content.

    Returns:
    - str: The converted content in Markdown format.
    """
    # Initialize the html2text converter
    converter = html2text.HTML2Text()
    converter.ignore_links = False  # You can adjust this based on your preference

    # Convert the HTML to Markdown
    markdown_content = converter.handle(html_content)

    return markdown_content


def get_html_element(element,soup) -> str:
    """
    Searches for the first occurrence of a specified HTML element in a BeautifulSoup object and returns its text.

    Parameters:
    - element (str): The tag name of the HTML element to search for (e.g., 'h1', 'div').
    - soup (BeautifulSoup): A BeautifulSoup object containing the parsed HTML document.

    Returns:
    - str: The text of the first occurrence of the specified element if found; otherwise, an empty string.
    """
    result = soup.find(element)
    # Check if an <h1> tag was found and print its text
    if result:
        return result.text
    else:
        print("No element found.")
        return ""

def cut_text_at_marker(marker:str,text:str,beginning:bool):
    """
    Cuts the text at the specified marker and returns the resulting substring. The function can return the
    text after the first occurrence of the marker (if beginning is True) or before the last occurrence
    of the marker (if beginning is False).

    Parameters:
    - marker (str): The marker at which to cut the text.
    - text (str): The original text to be cut.
    - beginning (bool): Determines the part of the text to return. If True, returns the text after the first occurrence of the marker. If False, returns the text before the last occurrence of the marker.

    Returns:
    - str: The resulting substring after cutting the original text at the specified marker. If the marker is not found, returns the original text.
    """
    # Find the index of the substring
    cut_off_index = 0
    if beginning:
        cut_off_index = text.find(marker)
    else:
        cut_off_index = text.rfind(marker)
    # Slice the string if the substring is found
    newText = ""
    if cut_off_index != -1:
        if beginning:
            newText = text[cut_off_index + len(marker):]
        else:
            newText = text[:cut_off_index]
        return newText
    return text

# get date from post
def get_date(text:str) -> str:
    """
    Extracts the first date in "Month DD, YYYY" format from a string and returns it in "YYYY-MM-DD" format.

    Parameters:
    - text (str): Text to search for the date pattern.

    Returns:
    - str: Date in "YYYY-MM-DD" format if found; otherwise, an empty string.

    The function uses a regular expression to find dates with month abbreviations. If a date is found,
    it's converted to ISO format. If not, it prints a message and returns an empty string.
    """
    date_pattern = r'\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{1,2},\s\d{4}'

    # Find the first occurrence of the date pattern
    match = re.search(date_pattern, text) 
    if match:
        # print("Found date:", match.group())
        date_obj = datetime.strptime(match.group(), "%b %d, %Y")

        # Format the datetime object into the desired string format
        # The format "%Y-%m-%d" corresponds to "Year-Month-Day" with zero-padded month and day
        formatted_date_str = date_obj.strftime("%Y-%m-%d")
        return formatted_date_str

    else:
        print("no date found")
        return ""

## get url and category from command line
if len(sys.argv) < 3:
        print("Usage: python convert.py <URL> <category>")
        sys.exit(1)

url = sys.argv[1]
category = sys.argv[2]

### get html content from url    
html_content = get_html_from_url(url)

### get title
soup = BeautifulSoup(html_content, 'lxml')

title = get_html_element('h1',soup)
title_name = title.lower().replace(" ","-")

if (title == ""):
    print("no title")
    sys.exit()

### get subtitle
subtitle = get_html_element('h2',soup)

if (subtitle == ""):
    print("no subtitle")
    sys.exit()

### text separators
# Find all elements with role="separator"
separator_elements = soup.find_all(attrs={"role": "separator"})

# replace with <hr> element, markdown recognizes this
for element in separator_elements:
    html_content = html_content.replace(str(element), "<hr>")


### code blocks
html_content = html_content.replace("<pre", "```<pre")
html_content = html_content.replace("</pre>", "</pre>```")

### extract gifs from giphy
pattern = r'https%3A%2F%2Fgiphy\.com%2Fembed%2F[^%]+%2F'

# Find all matches of the pattern
giphy_matches = re.findall(pattern, html_content)

### convert to markdown
markdown_text = html_to_markdown(html_content)

### find date
formatted_date_str = get_date(markdown_text)
filename = f"{formatted_date_str}-{title_name}.md"

### cut end
markdown_text = cut_text_at_marker('\--',markdown_text,False)

### cut beginning
markdown_text = cut_text_at_marker('Share',markdown_text,True)

### get tags
pattern = r'\[\s*(\w+)\]' 
matches = re.findall(pattern, markdown_text)
tags = matches[-5:]  


### remove the tags from the content
pattern = r'\[\s*{}'.format(re.escape(tags[0]))
all_patterns = list(re.finditer(pattern, markdown_text))
first_tag = all_patterns[-1]
second_cutoff = first_tag.start()
if second_cutoff != -1:
    markdown_text = markdown_text[:second_cutoff]


### code blocsk part II: remove empty lines
pattern = r'(^```$)(\s*\n\s*)+'
# Replace matches with just the "```" line
markdown_text = re.sub(pattern, r'\1\n', markdown_text, flags=re.MULTILINE)

### separators - part II
markdown_text = markdown_text.replace("* * *","<hr>")

### add front matter content
tags_str = ", ".join([f'"{tag}"' for tag in tags])
front_matter = f"""---
layout: post
title: "{title}"
categories: [{category}]
tags: [{tags_str}]
description: {title} {subtitle}
comments: true
---
"""
markdown_text = front_matter + markdown_text

### add giphy
for match in giphy_matches:
     markdown_text += "\n" + f'{{% include responsive-embed url="{unquote(match)}" ratio="16:9" %}}'

### save file
with open(f"_posts/{filename}", 'w', encoding='utf-8') as file:
    file.write(markdown_text)
from datetime import datetime
import sys
import requests
import html2text
from bs4 import BeautifulSoup
import re
from urllib.parse import unquote
"""
Converts Medium post to markdown.

Does:
* gets the html from a url (command line arg)
* gets the category from command line
* gets title and subtitle from html
* replaces all separators with <hr>
* preserves code blocks (without syntax highlighting)
and removes empty lines in code blocks
* puts all gifs from giphy at the end of the post for
easy copy-pasting
* converts html to markdown
* extracts post date
* removes beginning and end matter
* extracts tags
* creates front matter
* saves to file in _posts with correct name.

Doesn't (yet):
* import images
* format image captions
* import Tenor gifs
"""


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

def find_elements_with_class(html_content, class_name):
    """
    Find all elements with a given class name in HTML content.

    Parameters:
    - html_content (str): HTML content as a string.
    - class_name (str): The class name to search for.

    Returns:
    - list: A list of BeautifulSoup elements with the specified class name.
    """
    # Parse the HTML content
    soup = BeautifulSoup(html_content, 'lxml')

    # Find all elements with the specified class name
    elements = soup.find_all(class_=class_name)

    return elements

## get url and category from command line
if len(sys.argv) < 3:
        print("Usage: python convert.py <URL> <category>")
        sys.exit(1)

url = sys.argv[1]
category = sys.argv[2]

### get html content from url    
# url = "https://dsavir-h.medium.com/how-to-convert-medium-to-markdown-0b1f0809ac69"
html_content = get_html_from_url(url)
### get title
soup = BeautifulSoup(html_content, 'lxml')
h1_tag = soup.find('h1')
title = ""
title_name = ""
# Check if an <h1> tag was found and print its text
if h1_tag:
    print(h1_tag.text)
    title = h1_tag.text
    title_name = h1_tag.text.lower().replace(" ","-")
else:
    print("No <h1> tag found.")

### get subtitle
h2_tag = soup.find('h2')
subtitle = ""
# Check if an <h1> tag was found and print its text
if h2_tag:
    print(h2_tag.text)
    subtitle = h2_tag.text
else:
    print("No <h1> tag found.")

### text separators
# Find all elements with role="separator"
separator_elements = soup.find_all(attrs={"role": "separator"})

# Print each element found
for element in separator_elements:
    print(element)
    #new_hr = soup.new_tag("hr")  # Create a new <hr> tag
    #element.replace_with(new_hr)  # Replace the current element with the <hr> tag
    html_content = html_content.replace(str(element), "<hr>")


### code blocks
# replace <pre with ```<pre`
html_content = html_content.replace("<pre", "```<pre")

# Replace "</pre>" with "</pre>```"
html_content = html_content.replace("</pre>", "</pre>```")



### extract gifs from giphy
pattern = r'https%3A%2F%2Fgiphy\.com%2Fembed%2F[^%]+%2F'

# Find all matches of the pattern
giphy_matches = re.findall(pattern, html_content)
# Print all found matches

### convert to markdwon
markdown_text = html_to_markdown(html_content)
#print(markdown_text)

### find date
date_pattern = r'\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{1,2},\s\d{4}'

# Find the first occurrence of the date pattern
match = re.search(date_pattern, markdown_text)
filename = ""
if match:
    print("Found date:", match.group())
    date_obj = datetime.strptime(match.group(), "%b %d, %Y")

    # Format the datetime object into the desired string format
    # The format "%Y-%m-%d" corresponds to "Year-Month-Day" with zero-padded month and day
    formatted_date_str = date_obj.strftime("%Y-%m-%d")
    filename = f"{formatted_date_str}-{title_name}.md"

    print(formatted_date_str)
else:
    print("No date found.")

### cut end
cut_off_marker = '\--'
# Find the index of the substring
cut_off_index = markdown_text.rfind(cut_off_marker)
# Slice the string if the substring is found
if cut_off_index != -1:
    markdown_text = markdown_text[:cut_off_index]

### cut beginning
start_marker = "Share"
# Find the index of the substring
start_index = markdown_text.find(start_marker)

# Slice the string from just after "Share" if the substring is found
if start_index != -1:
    # Adding the length of start_marker to start_index to include "Share" in the removal
    markdown_text = markdown_text[start_index + len(start_marker):]

### get tags
pattern = r'\[\s*(\w+)\]' 

# Find all occurrences of the pattern
matches = re.findall(pattern, markdown_text)
print(markdown_text)
print(matches)

# Select the last 5 matches
tags = matches[-5:]  
print(tags) 

### remove the tags from the content
pattern = r'\[\s*{}'.format(re.escape(tags[0]))
print(pattern)
all_patterns = list(re.finditer(pattern, markdown_text))
print(all_patterns)
first_tag = all_patterns[-1]
second_cutoff = first_tag.start()
print(second_cutoff)
if second_cutoff != -1:
    markdown_text = markdown_text[:second_cutoff]


### remove empty lines in code blocks
pattern = r'(^```$)(\s*\n\s*)+'
# print(len(markdown_text.splitlines()))
# Replace matches with just the "```" line
markdown_text = re.sub(pattern, r'\1\n', markdown_text, flags=re.MULTILINE)
# print(len(markdown_text.splitlines()))

### separators
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
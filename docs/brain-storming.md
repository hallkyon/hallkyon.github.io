At the moment it is only possible to get all notes and their links from the web server and to display this content as a graph on a canvas. What is missing is to display the content of each note for the user.

I thought about two approaches:

1. When clicking on a vertex of the graph, a click event is triggered, which makes a form visible. Inside of the form, the user can view and manipulate the note. This approach requires a well defined way of setting event on elements, and displaying the content on the page.

2. The second approach would be, that I don't save my notes as Markdown anymore, but each note is its own HTML file. Each SVG vertex is wrapped in an anchor with the note's URL as its reference. My hope through this approach is, that manipulating the content of the note can be completely separated from all the rest of the code base, because after all a new page is being loaded. Another hope is, that the *Typora* WYSIWYG approach is easier to implement in this way. Converting then the HTML file into Markdown would then be the job of the web server. Since the web server is usually more powerful then the clients, this makes sense. 

   The challenge is, how to implement the manipulation exactly.

   1. Is each paragraph element a text area?
   2. How do I insert new paragraphs, headers or other elements?
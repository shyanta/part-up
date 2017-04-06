# Part-up Form Demo's

## What is the project?
The main goal of this project is to improve the part-up site. This can be performance
wise. Or maybe change the accessibility of the website. This so the website can be used by anyone
and everywhere. Even if you don't have great sight, caused by the weather or maybe because you're
blind or partially blind. Also the connection matters, when you're sitting in the train and you're
using the train wifi, you can bet the connection won't be very good. You want your users to be able
to access your site, no matter what the connection is. Therefore it's important to improve the
performance of your website. Make some parts work offline or at least make it as fast as possible on a
bad connection.

## What did I do?
I decided to focus on a small part of the site that can use some improvements. I'm making demo's of the
login and register forms on the website. These parts can be improved on multiple points. First the forms
aren't accessible with the `tab` key. The `:focus` styles are brought to a minimum, so even when tabbing
through the forms, you have no idea where you are navigating to. Also a lot of requirements for the input
fields are placed in the placeholder. When the users types inside this field, the placeholder will be
deleted. The user has no idea what the requirements are, when he starts to type. It's important to place
information like this inside a label.

Also I made sure that the basis form that is needed, still can be used on older browsers. However,
when the user uses a newer browsers, he may see that there are some extra functions on the form.
The form will be progressive enhanced. Newer browsers will render a validation style, this provides
visible feedback when the entered the right content. So when an email contains an at sign, the field
will be seen as valid.

All the changes I made for the styling are done in a seperate stylesheet. This sheet is called `edited-style.css`. And it can be found [here](/css/edited-style.css).
In the HTML files, I only added the form code and nothing more, the functionality of the Facebook or
LinkedIn will not work in this demo. This because the demo is focused the working of the form pages only.


## How did I do this?
### Accessibility
To improve the accessibility I added focus styles and maintained a right flow for the `tab` key navigation.
The original CSS changed all the 

# File Uploading - Internet Explorer 9

Can't use Ajax to submit a form in IE < 10, the user has to click a submit button explicitly.
IE 9 does not support the HTML5 File API, therefore we can't use the FileReader to convert an image to Base64 encoding.

## Possible solutions
- Using a label might solve this problem as seen in the previous article. (see: http://umbracotips.blogspot.nl/2014/08/internet-explorer-8-and-9-submitting.html)
- Using the iFrame workaround. (see: http://www.alfajango.com/blog/ajax-file-uploads-with-the-iframe-method)

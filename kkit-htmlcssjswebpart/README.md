## kkit-htmlcssjswebpart

In SharePoint Online (Modern) you can no longer embed your own HTML, JavaScript or CSS source code.

This can some times be quite frustrating when you need to do something fairly simple. You now no longer have to be restricted by the modern interface.

Our new web part allows you to write HTML and CSS directly into the web part properties as well as having the ability to link to a JavaScript file in from one of your document library's.

The WebPart has the following configuration:

* **Edit HTML Code** Enter HTML Directly Into Webpart
* **Edit CSS Code** - Enter CSS Directly Into Webpart
* **Javascript URL** - Provide a SharePoint Location to your JavaScript File
* **CSS URL** - Provide a SharePoint Location to your CSS File


### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp serve
```


cs171-website
=============

cs171 website - access at [http://cs171.github.io/cs171-website/](http://cs171.github.io/cs171-website/)


## Running the website locally

You can simply open the html file in Firefox. In Chrome you need a web server, for security reasons. To run a webserver execute

```
python -m SimpleHTTPServer
```

in the directory of the html file. 



## MDWiki Hacks to get all functionality

Replace the "readable" theme link in the mdwiki file with this:

```
{name:"readable",url:"cs171.github.io/cs171-website/bootstrap.min.css"}
```

Add google analytics snippet right before the ```</head>``` tag:

```
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-12040112-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
```



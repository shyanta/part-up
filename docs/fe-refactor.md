# Front-end refactor

## Structuur en bestanden
- Voor álles *client packages* gebruiken. Ook voor pages en partials (in app/client).
- Alle client packages simpele, modulaire namen geven (partup:client-widgets-partupdetail-update-item > *partup:client-update*).
- Page-packages worden direct aangesproken door de applicatie routing. Noem een page-package *partup:client-page-discover* (met PageDiscover.html en PageDiscover.js).

## Package stuctuur
- Altijd *eigen* package-tap.json en i18n directory met language files.
- Altijd een *eigen* html en js file, vernoemd naar de package naam (partup:client-update > *Update.html en -.js*).
- Maak een *subtemplate* aan als je de html en js wilt opdelen. Maak hiervoor een *templates* directory aan in je package. Geef de bestanden namen zoals *UpdateContent.html en -js*.
- Haal nooit data op in een package aan de hand van zijn context. *Geef altijd data mee aan de packages vanuit de parent (via template argumenten).* Versta onder data ook: het id om data op te halen.
- Wordt code lang en onoverzichtelijk? Don't doubt en maak *een subtemplate of geheel nieuwe package* aan.
- Wanneer subtemplate, wanneer nieuwe package? *Subtemplate* als het heel specifiek is, *nieuwe package* als het in de toekomst prima op andere plekken gebruikt kan worden.

## Javascript files
- Zorg dat elke Javascript file in een flits goed leesbaar is. Plaats modulaire logica in *een service met logische naam* in client-base. Ook als de code (nog) maar één keer voorkomt.
- *Data manipulatie en analyse* in partup:lib/repositories/user_repository.js plaatsen. Bijvoorbeeld: `Partup.repositories.user.isUpper(partup);`.


## Javascript code styling
- Trim spaties op save.
- 4 spaties indentation.
- Gebruik duidelijke variabelen i.p.v. ingewikkelde `if ()`-statements. Bijvoorbeeld: `var isUpper = ...; if (isUpper)` i.p.v. `if (...)`.

## HTML files
- 

## HTML code styling
-
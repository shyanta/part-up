# CHANGELOG
## 1.8.3
- mentions can now be searched with a space, "first lastname"
- bugfixes
    - z-index issues with mention dropdown box fixed
    - fix for mention bug when "enter" is pressed

## 1.8.2
- bugfixes
    - 61be734 migration(notifications): update hard-coded images in notifications after the image data loss a few weeks ago
    - 14a8b8d fix(bulkinvite): fixed display of accept invite button on non-loggedin email invite click

## 1.8.1
- bugfixes
    - fix(bulkemail): join after invite failed fix: typo in helper
    - fix(bulkemail): proper errorhandling when not able to join network after invite

## 1.8.0
- Tribe email invite
- Tribe admin bulk email invite
- Editable email invites in activity, tribe and bulk email invite
- Access to private partups through email invites with tokens
- new "Request invite" flow on invite and closed tribes
- Create partup from tribe
- Intercom profile values added (count created partups, partner partups, count supporters, number of tribes)
- Intercom events linked (count created partups, partner partups, count supporters, number of tribes)
- New icons and small design tweaks
- Added more analytics events (activity inserted, network joined/left, supporter, new message)
- Prettified more email templates (verify, forgotpassword, all notification mails)
- About and email copy updates
- Comment field limit set to 1000
- Comment text field is now autogrowing textarea
- Removed "straight to my part-up" button
- Admin panel updates 
    - date in usertable
    - edit tribe admin
    - more details in partup and tribe lists
- performance
    - images are now loaded immediately from amazon
    - Added fast rendering of profile
    - caching of discover results for anonymous users
- bugfixes
    - fix(contributions): it is now impossible to create a motivation comment without adding the contribution
    - now avoiding part-up name Chrome AutoFill
    - created fix for chrome renderbugs in timeline


## 1.7.2
- d292f40 feat(analytics): added tracking events to social sharing buttons
- bugfixes
    - 592064b fix(featuredpartups): showing correct number of activities in featured partup
    - 70ef057 fix(partupdetail): facebook, twitter and linkedin url sharing through popups
    - 510b8cd fix(featurednetwork): correctly expose featured network quote author user with image
    - cd5e183 fix(networks): correctly exposing tags and location on network to everyone
    - 7f6de77 fix(featurednetwork): avoid frontend error while loading featured networks
    - 7d9aed9 fix(featurednetworks): show correct image on featured network

## 1.7.1
- bugfixes
    - new image uploader fixes for firefox and safari
    - new language detection migration

## 1.7.0
- Homepage static content
- Featured Tribes
- Featured Tribes admin
- Partup and Tribe language detection and filtering on homepage
- Pricing page
- About page 
- Complete email notification settings
- Designed email templates
- Send notification and email when a part-up is created in tribe
- Unsubscribe from specific / all emails directly
- Ability to "upload" bigger pictures by resizing them on client
- Social sharing through server side rendering (replaced phantomjs)
- Email invite closed partup with token and account linking
- profile locations now link to discover
- changed "all" text in profile dropdown to icon
- Invite to activity/tribe now refreshes search results on filter field blur
- Added confirmation modal to leave a tribe
- Extra stats in admin panel
- Added number of notifications in page title
- Added intercom profile details (language, firstname, phonenumber, gender, participationscore, completeness)
- bugfixes
    - FE: Notification plural copy is incorrect
    - FE: When loading a part-up page the layout column flickers from small to wide
    - FE: invite-for-activity / invite-for-tribe search bar placeholders are untranslated
    - FE: invite network does not show "this network is private" message
    - FE: when leaving the tribe (while being on the Uppers page), the user is not removed from the Upper list reactively
    - FE: invite-for-activity / invite-for-tribe location field overflows with long city names
    - FE: invite-for-activity / invite-for-tribe search bar placeholders are untranslated
    - FE: shielded admin pages for unauthorized users
    - FE: Update detail now always returns to updates overview
    - IE9: invite button on invite-for-activity / invite-for-tribe lists dont work
    - IE9: entering search query in invite-for-activity and pressing enter does not submit the form
    - IE9: clicking clear location in discover does not link to homepage anymore

## 1.6.2
- tribe admin accessible via /admin
- tribe admin tribe overview + remove tribe
- intercom integration
- bugfixes
    - invite buttons not triggering correctly when clicking on text inside button
    - re-added missing tribe labels

## 1.6.1
- fixed email problem in mentions

## 1.6.0
- new home page with featured and popular part-ups
- users mentions in messages and comments with @ notation
- daily digest emails for notifications
- profile email settings
- autolink urls in messages and comments
- connection status bar when connection is lost
- cache placeid/locations for performance and less google costs
- activities softdelete (strikethrough activity in update)
- new button states in userslists (invite-for-activty invite-for-tribe)
- footer copy / order
- invite-for-activity by email success feedback
- friendlier login/registration messages when trying to login with wrong signin method
- loaders for invite-for-tribe userlist
- partup-stats in admin panel (now on /admin route)
- featured part-up management in admin panel
- bugfix
    - restricted image uploads to 2mb to avoid server crashes (bandaid fix)
    - mailfrom address changed and is now easily configurable
    - loggedin user is now omitted from results invite-for-activity / invite-for-tribe
    - seo images now urlencoded to be compatible with facebook parsing
    - invite-for-activity mail now uses url with partup name in it
    - "go to your partup" button on promote now goes to url with partup name in it
    - IE submit discover query search fixed
    - partup progress circle now always starts at 10%
    - profile dropdown refreshing after leaving / joining tribe
    - SAFARI settings cogwheel animation fix
    - profile card properly visible on the right side of the screen
    - restricted pages with notice that you are not allowed to see

## 1.5.12
- bugfix
    - IE9 "no template found" bug fixed

## 1.5.11
- partup supporters now also have access to closed partups
- bugfixes
    - discover query loading is not triggered twice anymore
    - start partup tribe selection IE
    - location field fix IE
    - language is now changeable in IE
    - reworked custom scrolling behavior IE
    - language detection during registration in safari
    - inviter image now shown in tribe invite notification
    - focuspoint does not get reset when saving other partup settings
    - tags in input fields are not clickable anymore
    - hovercard is not shown outside of screen on right side anymore

## 1.5.10
- activity/tribe invites now also searches non-tagmatched users
- invite list speed increase
- bugfixes
    - properly implemented discover caching and preloading
    - locking discover fields to avoid loading issues

## 1.5.9
- fixed broken order discover page
- removed faulty discover caching

## 1.5.8
- now caching discover results
- added pending invite notification for tribe admin
- find all users in invite tribe
- bugfixes
    - loggedout updates
    - message post button loader
    - fixed broken contribution proposal notification link
    - fixed discover images flicker
    - images published properly on profile/supporter partups
    - fixed link to profile on discover

## 1.5.7
- discover sorting default set to newest
- changed twitter hashtag
- disallowed gifs to be uploaded
- search by tags on discover
- better ratings ux
- bugfixes
    - tribe invite search
    - profile page switch to different profile
    - profile supporter partups images
    - fixed my updates filter
    - "waiting approval" state in closed network
    - profile http// checks
    - fixed notification clicks
    - partup location in partup sidebar
    - user card always show counts
    - notification styling
    - dont capitalise every partup tile word
    - server fixes (avoid crashes)

## 1.5.6
- terms and privacy notice
- bugfixes
    - footer links
    - mobile layout
    - invite share mail copy
    - facebook url with dots

## 1.5.5
- admin panel
- copy updates
- bugfixes
    - activity create
    - facebook/twitter share images
    - notification links
    - protection for admins leaving networks
    - sidebar reference to tribes

## 1.5.4
- bugfixes
    - fixed data migrations
    - fixed profile settings saving

## 1.5.3
- re-enabled private partups again

## 1.5.2
- notifications v2
- pretty partup and tribe urls
- clickable tags
- big copy update (including errors)
- mixpanel integration
- social link url entry adjustment
- private partups re-enabled for beta
- new ratings ux
- partups removable by superadmins
- bugfixes
    - partup and tribe privacy
    - consistent profile dropdown data
    - tags input network settings
    - user suggestions in invite pages
    - sorting on discover
    - tribe join button states
    - added more profile card hovers
    - partup tile max 5 uppers
    - feedback link to uservoice
    - uploaded image is properly shown in create partup

## 1.5.1
- tribe settings description 350 chars
- copy updates
- re-enabled private partups (premium functionality)
- new partup progress algorithm
- tribe / activity invites emails for existing user invite
- IE 9, 10 and 11 fixes
- activity and tribe invite screens ux
- bugfixes
    - tribe settings logo
    - partuptile focuspoint
    - homepage profile image
    - duplicate archived activities

## 1.5.0
- User detail
- Profile dropdown v2 (network tabs)
- Profile settings
- Network detail (uppers and partups)
- Network settings (details, uppers and invites)
- hidden add network admin page + admin role access
- Upper matching with current activity
- UI responsiveness (loading states and page switch performance)
- Discover network and location filter
- 404 pages
- Loggedin functinoality popups for nonloggedin users
- Delete partup confirmation modal
- Partup / Profile tags autocomplete ux
- mixpanel / analytics analytics + events
- Beta Homepage

## 1.4
- network page
- well loaders on updates & activities pages
- good update and system messages for proposed contributions
- motivation popup for proposed contribution
- new contribution styling
- bugfixes

## 1.3.1
- updated status text in partup description
- (perceived) performance updates
    - loaders
    - disabled states for most actions
    - unblocking third party calls
- comment time hover
- bugfixes
    - fixed discover scroll upper images bug
    - fixed profile picture on homepage

## 1.3.0
- partup detail settings
- take part functionality
- updates non-reactive
- updates - infinite scroll
- discover + infinite scroll
- profile completeness
- partup tile v2
- location autocompletion
- partup privacy type
- refactoring front- and backend
- analytics
- bugfixes

## 1.2
- profile hover card
- new activity flow
- new contribution flow
- focuspoint
- picturesuggestions
- invite uppers
- partup-detail updates
- update detail
- partup-detail activities
- ratings
- discover v1
- system messages

## 1.1
- new contribution adding UI pattern
- bugfixes
    - loads of small bugs for usertest

## 1.0

- start-intro
- start-details
- start-activities
- start-contributions
- start-promote

- registerrequired
- registeroptional
- login
- forgot-password
- reset-password

# CHANGELOG

## 1.21.4
- chore(dropbox): update dropbox source code
- refactor(application): remove the colon in the local atmospere package names and re-link the new pac
  closes #602
- feat(chats): add compatibility for mobile tribe
- feat(fixtures): update fixtures to create chat for every network
- fix(chat): add migration to add chat to existing networks without a chat
- fix(chat-dropdown): also show tribe chats without chat messages
- fix(chats-dropdown): fix chat tile state for empty chat
- fix(chats): fix directory location of new file after naming big rewrite
- feat(push-notifications): add push notifications for tribe chat messages
- feat(chat): add server-side function to remove a chat
- fix(push-notifications): don't send network-chat-message pushnotifications to devices with app releases before 1.4.0
- feat(profile-dropdown): profile dropdown partner/supporters/tribes toggle, resolve #493
- fix(chat): enabled "join conversation" button fixing #518
- fix(usermenu): tribes have no title fixing #48
- fix(start-partup): Pre-selected tribe is now non-editeble, fixing #351
- fix(chat): fixed incorrect margins for firefox fixing #514
- fix(tribes): changed order of tribes to alphabetically in both tribe selector and user menu, fixing #393
- fix(notifications): added new type to notification images publication, I also fixed the not-working usercards on notifications. Fixing #460
- fix(notifications): removed stray log
- fix(partupsettings): Changed the date input in partup-settings to a more visual style, this also fixes issue #485
- fix(datepicker): show inline datepicker on touch devices for activities
- fix(IE8): polyfill for function.bind
- fix(sort): made the sorting helpers more generic by using function.bind and implemented it into activity sorting
- feat(activities): scroll to new activity, resolve #152
- fix(partup): tribe partup start styled like discussed with pim
- fix(partupsettings): better feedback for location input fixing #154
- fix(tags): allow unicode (Basic Multilingual Plane) characters in par-up tags fixing #430
- fix(tests): tests should allow tags with special characters
- fix(partupsettings): fixed the incorrect value bug for type of organization in a part-up fixing #224
- fix(chat): unread count reset with a defer, this could possibly be the fix for #590
- fix(partup): increased the margin at the bottom of a part-up page fixing the issue with comments under the fold fixing #307
- fix(partners): made some improvements on the sorting of partners, the chunks that are returned al least have more frequent-partners than each following chunk, but the sorting of each chunk is still off.
- fix(chat): fixed chat scraper issue with partup urls fixing #594
- fix(about): remove pasted formatting to prevent conflicts with the wyswig editor fix for #568
- fix(about): give the user feedback for max-characters in contentblocks
- fix(tribe-invite): invite modal closing now takes you to the uppers tab fixing #536
- fix(dropdown): changed html order to make float:right work in firefox fixing #515
- feat(chat): Chats autofocus on message bar, also when searching the user can navigate the list with arrow keys and initialize by pressing the return key
- feat(chat): added quick switcher: try cmd+K in one-on-one chat
- fix(license): fix license on part-up devops script package.json
- fix(css): re-enable css processing (minification and autoprefixer)
- feat(devops): upgraded cron server to bigger machine, changed ip in inventory

## 1.21.3   
- fix(chats): fix security hole for users


## 1.21.2
- Update new pricing url page to link to http://swarmorganizing.com and http://swarmorganizing.nl

## 1.21.1
- Update the Google Drive API client lib source code

## 1.21.0
- 1 on 1 chat partup website #492
 - chore(partup:server): add needed npm package to be able to run mocha integration tests with driver-package
 - feat(chat): completely detached chat template and logic from the NetworkChat to re-use everything in the 1-on-1 chat
 - feat(chat): 1-on-1 chat start
 - feat(footer): start of meny footer
 - feat(menu): moved footer to a "more" menu
 - feat(chat): made it faster with emty and loading state
 - feat(chat): add users in private chat to unread counter
 - feat(chat): sidebar start and dropdown for 1-on-1 messages
 - feat(chat): 1-on-1 chats reachable with url
 - fix(chats): count on empty chats array
 - fix(menu): removed socials from about menu
 - fix(chatdropdown): truncate long tribe chat lines, fixing #517
 - feat(more-header): add ios and android download links and remove sprint i18n files
 - fix(chat): show searching state by INDICATING THE CURRENT SEARCH QUERY
 - fix(header): fixed header displacement on IE
 - fix(1on1chat): add check to see if user is allowed to insert chat message
- How to test your Meteor application #528
    - Write unit test for helpers/fileUploader.js #527
    - Write an acceptance test using Chimp to do basic form login #530
    - Write an acceptance using Chimp for cookie bar feature #532
    - Add unit-tests for helpers/fileUploader.js #529
    - Write integration tests for cooking bar feature #531

## 1.20.3
- Revert "fix(mentions): Mentions are possible with 1 character and user names that have 3 parts are searchable"
- Revert "fix(networkchat): re-enable the search feature of network chat"
- Revert "fix(chatsearch): temp disable, mitigate issue #511"
- feat(scraper): implemented improved web scraper
- feat(chats): also search in scraped metadata
- feat(scraper): URL preview for part-up.com now fetches the right html tags #503

## 1.20.2
- fix(chat): search on tribe chat won't show content of private chats in app anymore #511
- feat(tribes): improved the tribe autocompletion #458
- Remove the invitation sentence to improve one's profile #523
- feat(updates): improved stopped supporting copy #478
- fix(networkchat): re-enable the search feature of network chat

## 1.20.1
- mitigate chat search security issue

## 1.20.0
- fix Forgot password is still case sensitive #445
- fix(invite): 'Match failed' error resolved. fixing issue #427
- fix(tribestart): invite button closes tribe start for members fixing #443
- fix(navbar): tweaked the app width a bit, fixing #65
- fix(tribestart): Read more button fixes #421
- fix(tribestart): bold link styling #421
- fix(email-images): confirmation mail images now showing #394
- fix(edge): bulk upload fix #379
- fix(mentions): Mentions are possible with 1 character and usernames that have 3 parts are searchable
- fix(profile): added authorization token and userid to http gets to get correct results. fixing #477
- fix(intercom): clear intercom session on logout
- fix(profile): fixed infinite scroll issue mentioned in issue #380
- fix(profile): dont't show the profile uppertile in partners #380
- feat(personal-header): part-up-for-organisations in header only when user is on HomePage #470
- feat(triibe-about): phone number and email address of tribe admins now visible for tribe members #457
- feat Dynamic context on Window Title #428
- feat(chat): re-enabled the chat
- feat(chat): search through messages
- feat(chats): abolity to retrieve private and network chats separately
- feat(chat): chat search with highlighting
- fix(notifications): don't mail notifications to deactivated users #459
- feat(chat): group messages by chat for otifications
- feat(chat): check if a user is member of a network when inserting a network chatmessage
- feat(chat): new counter schema
- feat(chats): chat counter helpers and implementation for networks
- feat(counter): increase unread_counter on new message
- feat(chat): reset unread_counter for current user
- feat(migration): migration for chat counters
- feat(migration): minor change to latest migration for edge cases
- feat(chat): dropdown with indicator for read and seen states
- feat(chat): mark messages as read and seen, also the messages divider shows unread messages on chat load
- feat(chat): indicator badge
- feat(chat): link previews
- feat(renderblock): renderblock template that allows onRendered callbacks for small sections of templates
- feat(private chat): send mobile pushnotification to chat message receivers
- feat(push-notification): show app icon badge when notification is sent

## 1.19.3
-  fix(cookiebar): set cookie expires 2147483647


## 1.19.2
-  fix(cookiebar): update translation and fix already accepted cookie intercom button position
-  fix(public-header): remove data-register triggering on organisation link

## 1.19.1
- Fix showing private / closed part-ups
- Fix Cookie bar is not displaying text with the corresponding application language #468

## 1.19.0
- Tribe chat "currently typing" #417
- Tribe chat sidebar #416
- Tribe chat window #414
- App - Chat pushnotificatie #373
- feat(meteor): update to 1.3.2.4
- fix(moment): fix moment according to ES6 modules
- feat(ecmascript): add packages to add support for es2015+ (also in client side code)
- fix(admin): show all admins on admin tribe page fix #446
- Update homepage layout for public viewers #452
- Fix hyperlink in name of tribe admin on tribe about page #456
- ops(cron): not supplying PARTUP_CRON_ENABLED=0 environment variable to non cron instances anymore
- feat(meteor): upgraded meteor packages (only scss was downgraded to avoid issues)
- fix(upgrade): fix upgrade issue with bootstrap inclusion
- fix(upgrade): downgrade lodash to version 3 for compatibility
- feat(app-push-notifications): provide a method to register a push notification device
- fix(networks-route): add support for pagination
- fix(publications): fix paginations
- refactor(userspublication): remove abundant/old return statement

## 1.18.1
- fix(tribeuppers): add translation for hardcoded invite uppers tile

## 1.17.8
- Move invite button to placeholder tile on uppers tab #328
- Move add part-up in this tribe to placeholder tile #327
- Add search feature on tribe uppers #301
- Add search feature on tribe part-ups #300
- Add about tab to tribe page #299
- Add About page to tribe settings #298
- Add upper email address to tribe admin page Uppers tab #284
- Different on-click result for tags #262
- Tribe admin transfer #205
- Tribe about page settings #204
- Add Heap Analytics to Part-up #310

## 1.17.7
- fix(imagemagick): added policy.xml to fix imagetragick vulnerability #408
- Create a (minimalistic) cookie wall #312

## 1.17.6
- fix dropbox share links are save as temporary links, set it to permanent share period #404

## 1.17.5
- Allow CORS in HTTP calls PR #386
- Endless scroll not triggered on anything but Mac+Chrome #347
- Notifications images publication PR #396
- Add Google drive file picker to add message modal #385
- not all the footer links are linked to the correct url/phrase app keys #389
- missing bingbot in SEO routes #390

## 1.17.4
- fix tribe admin page showing tribe 404 #352
- fix redirect to discover in chrome ios on specific url load #352

## 1.17.3
- fix(icons): fix font-icon loading console warnings
- "load more updates" button on the partup-detail as fallback for non triggering infinite scroll.
- fix infinite scroll issue

## 1.17.2
- fix(icons): icons are properly aligned again on all windows browsers #346

## 1.17.1
- fix(tagsquery): reset prefilled query after code has run to prevent early reset fixing #293
- should not upload more than 4 images in EDIT MESSAGE mode #294
- When icon font is updated, the previous font stays cached in browser after deployment #302
- Misalignment in "+x" circle on partup tribe #303
- Archived-date or -flag is missing in datadump #305
- Clicking on backdrop overlay of new/edit message modal caused the modal to close. #326
- Upper profile not showing meurs test results when logged in (and shows when not logged in) #178
- Integrate Dropbox part-up messages #185
- Bug since last release: admins can't access tribe settings #306
- Add endless scroll to invite modal search results #274
- Change name search to full text profile search on invite modal #272
- Add content explanation to search result on invite modal #271
- Add relation explanation to search result in invite modals #270
- Add search criteria to invite emails #269
- Allow to invite up to 10 people by email at once #268
- Add partners to upper profile #146
- Invited upper should not move to the end of the list #13

## 1.17
- being able to run partup and the api with neo4j in one command. PR #290
- fix(swarm): improved the explorer a bit more for mobile/tablet #263
- fix(swarm): read more button shows on mobile #264
- fix(quotes): align to bottom #266
- feat(swarm): add compatibility for case insensitive swarm slugs, fix #282
- fix(tribestart): created a partups publication by networkId for the fallback on
the tribestart page, also created a fallback for no partups and uppers fixing #291 and #292
- fix(activepartups): fixed displaced parties in issue #201
- fix(tribestart): hide partups+uppers footer from tribestart when trib…e is closed fixing #201
- fix(tribestart): fallback for IE with fixes issue #201
- fix(tribestart): tribe chat popup placeholder fixing #201
- fix(activepartups): fixed displaced parties in issue #201
- fix(tribestart): hide partups+uppers footer from tribestart when tribe is closed qfixing #201
- Tribe page header #202
- Background image uploader for tribe start page #203
- Dynamic tags on tribe based on part-up tags #257
- Redesign tribe 404 pages #260
- Swarm page - tribe selecter has double scroll bars in Edge #278

## 1.16.11
- fix linkedin registration issue

## 1.16.10
- revert change to fix private tribe partups

## 1.16.9
- Visualize archived part-ups #22
- Add archived/active filter to profile/partner and profile/supporter #251
- Show new tribe tile design for archived part-ups #252
- Show archived state on part-up page #253
- Refactor Swarm and Tribe routing #256
- Enabling emoji for updates
- fix daily digest for locales other than nl/en
- reduced the swarm stats update interval to every 2 hours
- feat(mailgun): add mailgun tags to track all emails separately

## 1.16.8
- Swarm page frame #192
- Tribe explorer #193
- Tribe tile #194
- Swarm page settings / swarm #195
- Swarm page settings / add tribes #196
- Swarm page settings / Testimonials #197
- Swarm page content blocks #198
- Swarm page Upper section #199
- Find tribes section of swarm page #200
- Swarm overview and create in admin panel #208
- Feat phraseapp refactor package.js and .phraseapp.yml


## 1.16.7
- fix(autocomplete): security patch

## 1.16.6
- fix(pricing): updated the new pricing policy fixing #163
- fix(motivation): give each comment field form a unique ID to prevent conflicting behaviour on the same update fixes #228
- fix(comments): fix Comments posted to different message than commented on #236
hack(comments): created a rerender hack for the update detail, this fixes the wrong comment bug for now
- Copy changes as requested in issues #223 and #133
- fix(file-uploader): fixed the RegEdge to allow for file upload in the Edge browser

## 1.16.5
- feat(analytics): add second google analytics tracker, issue #160
- fix(notifications): mentions in partup messages now only generate one notification when partners are mentioned, fixes #150
- fix(tribe-uppers): only show activate uppers on the tribe uppers overview, fixes #159
- fix(verify-email): fix empty page when clicking the URL, Fix issue #143
- fix(message): fix safari file upload, issue #161
- feat(login): redirect to discover after login as requested in issue #177  
- fix(discover): fix hidden private partups by fixing route authorization to get personal data, Fix #184
- fix(signin): small fix in securitypatch for facebook and linkedin signups
- fix(user): fix security hole where the user can edit his entire profile object from the client
- fix(plain-register): compose profile server-side instead of pass profile object
- fix(hovercontainer): uncomment mouseleave event to fix the bug where the hovercontainer never disappears


## 1.16.4
- fix(partup): better input sanitation

## 1.16.3
- fix(updates): fix race condition that caused endless scroll on updates to break
- feat(part-up-details): Scroll and focus on the first invalid field (#156)

## 1.16.2
- fix(emails): fixed commenter name in "conversation reply email", fix #141
- fix(csvexport): changed dates to google drive importable date

## 1.16.1
- Fixed Tribes dropdown in create part-up incomplete #137

## 1.16.0
- Notifications (#15)
- New notifications (#4 + #89)
- Grouped notifications (#14)
- supporters in sidebar now clickable (#115)
- Admin panel refactor for performance (#120)
- Make better use of new updates divider line (#93 & #57)
- Major refactoring and ops actions that reduce cpu server spike (#92)
- Improve count for updates on part-up in user menu (#85)
- Improve performance switching between updates and activities
- Comment "edited" label now always visible
- Fixed english labels in app (#111)
- Fixed Loading a profile url directly or in new tab does not load profile correctly (#123)
- Fixed new part-ups not on discover (#103)
- Fixed end date on datepicker (#101)
- Fixed image upload in Edge, IE11 and IE10 (#82)
- Fixed English button labels on activity (#111)
- Fixed tags not visible on discover (#104)
- fix(tag-search): disabled tag discover search for the end_date update labels
- feat(messages): don't allow deletion of a message when it has comments
- fix(comments): always show edited state

## 1.15.0
- Upgrade to meteor 1.2 (fixes case sensitive email problems and quicker build time)
- Refactored profile and tribe tiles to use same new columns as discover and home
- Fix mobile/desktop login sequence #62
- Edit and delete comments and messages #29
- Use sticky sessions in loadbalancer instead of iphash
- Improve count for updates on part-up in user menu #85
- Fixed partup details updates through footer scrolling issues (leftover from issue #84)
- New discover tribes filter functionality and styling
- Fix meurs test for people with + in mail address
- Tile performance update

## 1.14.0
- new popular partup algorithm
- @mention all partners or all supporters #16
- updates infinitescroll experience tweaks
- Revamp profile completeness indicator #61
- Improved tile rendering
- Limit to 5 random networks on homepage (avoid breaking layout)
- bugfixes
    - Private tribe invite token bug
    - Empty search results #46 (and massive discover rendering improvements)
    - Lazy load on discover still gives flickering issue #63
    - Image in tweet #70
    - Fix @mention bugs #33
    - All language filter is displaced on discover when other filters have content #55
    - @mention issue after release 1.13 #81

## 1.13.4
- fix(cron): spread out cronjobs better over the hour

## 1.13.3
- fix(meurs-profile): fix problems with numberless userids

## 1.13.2
- fix(meurs-profile): show results for other users
- fix(profile-about): copy update and load bigger image files (fix #80)
- fix(copy): typo fix #69

## 1.13.1
- Fixed a bug where Partups that require authentication were not visible on the discover page
- Fixed a bug where access tokens on Networks were being exposed

## 1.13.0
- Meurs Personality test integration
- Fix memory leak in front-end app
- Create cachable feed of part-ups for homepage, discover
- Supporter part-ups not showing in user menu
- Edit link to blog in footer
- Remove flickering on mobile devices
- FE sequence after adding message or comment
- Hitting "return" 2 times posts comment or message 2 times
- updated icons
- new events for event api

## 1.12.0
- discover language filter (#1)
- currencies (#3)
- multi server image / file upload (#5)
- ip based language (#2)
- comments now trigger partup updatecount increase
- create link to pricing page in partup details
- events are now being sent to partup events api
- fixes
    - fix(networks): allow superadmins to leave networks but disallow network admins to leave network
    - fix(devops): update TEMP_DIR location in group vars fixing csv upload
    - fix(partup-detail): timeline line doesn't overflow anymore
    - fix(update-gallery): fixed the fade out transition
    - fix(contributions): allow for 0 hours and rate
    - fix(profile-dropdown): sort partups by update count

## 1.11.0
- switched to own infrastructure with docker
- clustered invite updates
- invite to partup modal, user invite and emailinvite
- maintenance page
- styling updates
- image gallery display in message update
- part-up type migration (from old hour/budget values to new)
- ipad flow fixes
    - photo upload
    - 3-4 column layout
    - date picker keyboard
- fixes
    - perf(shared count update): more spread out updating of share counts
    - fix(updatedetail): budget changes are displayed properly
    - fix(comments): fixed missing images in comments
    - fix(comments): removed the space after total comments

## 1.10.3
- reverted intercom secure mode

## 1.10.2
- contribution copy
- intercom secure mode

## 1.10.1
- small copy / translation updates
- bugfixes
    - placing comment on old update does not produce error anymore

## 1.10.0
- updates redesign
    - Alle oranje titels beginnen met de voornaam
    - Als het activiteit gerelateerd is, staat de titel van de activiteit in de oranje tekst
    - Nieuwe weergave van comments, nu met profielfoto
    - Niet meer automatisch een reageren veld laten zien, nu onder een knop ‘reageer’.
    - Spacing tussen elementen zijn kleiner
    - Dropdown waar de update pagina op gefilterd kan worden staat nu een tekst voor ‘Show:’.
    - Systeemmeldingen worden niet automatisch weergeven. Staat nu onder een toggle ‘Toon meldingen’.
- activities update
    - Nieuw icon op de activiteiten pagina bij het aantal reacties.
    - Verloop achter de profielfotos die een bijdrage leveren op de activiteit. Verloop over de activiteit titel heen.
    - Pijltje achter een activiteit komt bij een lange titel op een nieuwe regel.
- new comments since last visit marking on activities page
- new updates in partup since last visit in profile dropdown
- new share button design + position in sidebar with sharecounters
- new rating flow with save button
- new fields in start partup flow (new type options, phase)
- now emitting events externally to specific server
- intercom profile now also contains tribenames
- partup image suggestions now fallback to random images from partup flickr group
- user impersonation feature through admin panel ("login as xx")
- copy updates plus dutch youtube video on homepage
- bugfixes
    - removal of partup picture correctly sets new picture to chosen suggestion
    - notification clicked state works again
    - no breakline in checkmark invited state

## 1.9.1
- bugfixes
    - fix(partup-settings): date field now correctly prefilled when changing settings, plus correct removal of end_date field

## 1.9.0
- major style tweaking updates to all pages
- ability to deactivate users from admin panel -> avoid user from logging in or showing up in mentions
- now excluding partners and tribe members from invite screens, until searching for a name
- mentions: display message if no uppers are found
- removed mixpanel integration / badge
- copy updates
- footer links on same domain
- ops: staging and acceptance environments deployable through docker containers
- pricing page links to google docs
- ability to search users with special characters in invite and mentions (e.g. leon matches léon)
- featured networks now have separate image that is shown on homepage
- redirect /blogs/ to blog subdomain
- removed beta logo and changed home copy accordingly
- bugfixes
    - fixed empty text in invite emails
    - fixed date field becoming empty on incomplete part-up save
    - fixed only showing 4 partups discover when loggedout
    - fixed iOS Chrome service login
    - fix(tags): allow & and . characters in partup/tribe/profile tags
    - fix(partuptile): tile correctly displays number of uppers bigger than 5
    - fix(home): popular parties now display correctly on iPad
    - fix(partup-detail): clicking a notification doesn't result in false 404 errors anymore
    - fix(partup-updates): replaced infinite scroll loader with pretty version
    - contribution: don't show edit form if a rating avatar is clicked
    - daily digest doesnt fail halfway anymore
    - properly translating email subjects
    - network settings not visible for unallowed users
    - fix(usercard) now always showing details in profile card
    - redirection fixes on buttons in IE
    - fix(profile): fix flickering images
    - profile: allow underscores/dashes in facebook url and trailing slash after twitter url
    - file upload in firefox fixed

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

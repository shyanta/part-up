<a name="1.21.7"></a>
## [1.21.7](https://github.com/part-up/part-up/compare/v1.21.6...v1.21.7) (2016-08-28)


### Features

* **main.html:** remove heap and add vwo tracking code ([49e29d5](https://github.com/part-up/part-up/commit/49e29d5)), closes [#624](https://github.com/part-up/part-up/issues/624)



<a name="1.21.6"></a>
## [1.21.6](https://github.com/part-up/part-up/compare/v1.21.5...v1.21.6) (2016-08-25)


### Bug Fixes

* **chatmessages-handler:** remove scraper feat for performance reasons ([39e9455](https://github.com/part-up/part-up/commit/39e9455))
* **markdown-style:** img in paragraph is 100% width ([a233202](https://github.com/part-up/part-up/commit/a233202))
* **markdown-style:** paragraph need more vertical space ([a2b046d](https://github.com/part-up/part-up/commit/a2b046d))
* **strings-helper:** prevent adding html stuffs - santize markdown ([cb744b5](https://github.com/part-up/part-up/commit/cb744b5))
* **strings-helper:** replace markdown-it with marked lib ([dcaf7db](https://github.com/part-up/part-up/commit/dcaf7db))


### Features

* **activity-form:** open target blank for external link and add markdown support icon ([1866e13](https://github.com/part-up/part-up/commit/1866e13))
* **activity-view:** enable markdown support ([24810b0](https://github.com/part-up/part-up/commit/24810b0))
* **markdown-hightlight:** able to highlight code with github style ([97cde31](https://github.com/part-up/part-up/commit/97cde31))
* **messages-added.html:** add markdown support notification ([4bd1734](https://github.com/part-up/part-up/commit/4bd1734))
* **strings-helper:** combine partupAutolinker ([20bd8ab](https://github.com/part-up/part-up/commit/20bd8ab))



<a name="1.21.5"></a>
## [1.21.5](https://github.com/part-up/part-up/compare/1.21.4...v1.21.5) (2016-08-16)


### Bug Fixes

* **admin:** allow admins to archive networks ([6d8124a](https://github.com/part-up/part-up/commit/6d8124a))
* **admin:** confirmation prompt provides more information before deleting a tribe ([482e4ab](https://github.com/part-up/part-up/commit/482e4ab))
* **admin:** descriptions expandable ([2383d36](https://github.com/part-up/part-up/commit/2383d36))
* **admin:** partup links fixed ([1b2abff](https://github.com/part-up/part-up/commit/1b2abff))
* **admin:** reactivate user ([2bdf648](https://github.com/part-up/part-up/commit/2bdf648))
* **admin:** show archived state of partups aswell ([b6bbbb7](https://github.com/part-up/part-up/commit/b6bbbb7))
* **admin:** start of admin make-over ([95867ae](https://github.com/part-up/part-up/commit/95867ae))
* **archived_tribes:** fixed count coloring of archived tribes ([a4879d1](https://github.com/part-up/part-up/commit/a4879d1))
* **chat:** 1-on-1 chat unreaqd status fix [#598](https://github.com/part-up/part-up/issues/598) ([bc3e814](https://github.com/part-up/part-up/commit/bc3e814)), closes [#598](https://github.com/part-up/part-up/issues/598)
* **chat:** chatmessage box autogrows on shift-enter ([32a77b8](https://github.com/part-up/part-up/commit/32a77b8))
* **chat:** fixed ordering of chat search, also tweaked the css a bit ([a3ab05c](https://github.com/part-up/part-up/commit/a3ab05c))
* **chat:** limit scrape size to 200kb ([64f30f4](https://github.com/part-up/part-up/commit/64f30f4))
* **chat:** onmessage click disabled in 1on1 chat ([f176afb](https://github.com/part-up/part-up/commit/f176afb))
* **chat:** removed messages read state auorunner, also disable context search when user starts typing ([59dc72f](https://github.com/part-up/part-up/commit/59dc72f))
* **colleagues:** display correct labels for colleague level part-ups ([6bd9100](https://github.com/part-up/part-up/commit/6bd9100))
* **columnslayout:** Set initial columnslayout total columns to prevent render issues, fixing [#607](https://github.com/part-up/part-up/issues/607) ([4364ba2](https://github.com/part-up/part-up/commit/4364ba2))
* **comment:** commentfield autogrow fix. fixes [#489](https://github.com/part-up/part-up/issues/489) ([a7ae43c](https://github.com/part-up/part-up/commit/a7ae43c)), closes [#489](https://github.com/part-up/part-up/issues/489)
* **creatuser:** disabled expensive and error prone call to get_locale in creation of user ([5664160](https://github.com/part-up/part-up/commit/5664160))
* **datepicker:** fixed datepicker where the year would set to 0 fixong [#621](https://github.com/part-up/part-up/issues/621) ([100373d](https://github.com/part-up/part-up/commit/100373d))
* **discover:** hide network if archived ([3277f90](https://github.com/part-up/part-up/commit/3277f90))
* **discover:** prevent discover filter inputs from wrapping to new line on iOS. fixing [#55](https://github.com/part-up/part-up/issues/55) ([c285f34](https://github.com/part-up/part-up/commit/c285f34))
* **getlocale:** disabled getlocale to temporarily fix performance issues and errors in backend ([acf31e4](https://github.com/part-up/part-up/commit/acf31e4))
* **home:** add column calculator to home columntileslayout as well ([b7721f9](https://github.com/part-up/part-up/commit/b7721f9))
* **IE9:** Disabled the overlay for IE9 to prevent the flickering UI fixing [#487](https://github.com/part-up/part-up/issues/487) ([c090e5a](https://github.com/part-up/part-up/commit/c090e5a))
* **intent:** fixed modal where close button would not work fixing [#488](https://github.com/part-up/part-up/issues/488) ([e48a204](https://github.com/part-up/part-up/commit/e48a204))
* **networks:** hide archived networks in partupsettings and chats dropdown ([aec4cd1](https://github.com/part-up/part-up/commit/aec4cd1))
* **pagecontent:** removed overflow hidden from pagecontent component ([cbb2f09](https://github.com/part-up/part-up/commit/cbb2f09))
* **partup:** fixed white-space issue on new updates button fixing [#619](https://github.com/part-up/part-up/issues/619) ([5abdc74](https://github.com/part-up/part-up/commit/5abdc74))
* **partup:** show admin-only privacy type in partup ([1c75a4e](https://github.com/part-up/part-up/commit/1c75a4e))
* **search:** fixed bug where blurring the window caused the search input to close without blurring the input. fixing [#429](https://github.com/part-up/part-up/issues/429) ([a2dd595](https://github.com/part-up/part-up/commit/a2dd595))
* **strings:** require emoji ([c76a9df](https://github.com/part-up/part-up/commit/c76a9df))
* **tribe:** archived tribes have all actions disabled in frontend ([baf624e](https://github.com/part-up/part-up/commit/baf624e))
* **tribe:** disable buttons on archived state ([1699326](https://github.com/part-up/part-up/commit/1699326))
* **tribe:** minor styling tweak ([1c5fb2f](https://github.com/part-up/part-up/commit/1c5fb2f))
* **tribe:** partups tab active when show=false ([646cb8b](https://github.com/part-up/part-up/commit/646cb8b))
* **tribe-about:** remove 'isMember' check from tribe about admins publication fixing [#510](https://github.com/part-up/part-up/issues/510) ([c0c4c88](https://github.com/part-up/part-up/commit/c0c4c88))
* **tribes:** archived tribes are still published, but hidden in the frontend unless a user specifically enters the tribe url ([f77717c](https://github.com/part-up/part-up/commit/f77717c))
* **tribes:** archived tribes not shown on home ([25990f9](https://github.com/part-up/part-up/commit/25990f9))
* **updates:** implemented a "not found" placeholder for the update detail page ([189ecd7](https://github.com/part-up/part-up/commit/189ecd7))


### Chores

* **package.json:** use npm run commit instead of npm run cz ([09e6adc](https://github.com/part-up/part-up/commit/09e6adc))


### Documentation

* **CHANGELOG.md:** changelog based on git conventional commit message (angular) ([cbc25a4](https://github.com/part-up/part-up/commit/cbc25a4))


### Features

* **admin:** (un)archive network methods ([4729034](https://github.com/part-up/part-up/commit/4729034))
* **admin:** added edit partup popup ([0d6437d](https://github.com/part-up/part-up/commit/0d6437d))
* **admin:** backend implementation to move part-ups in and out of tribes [#392](https://github.com/part-up/part-up/issues/392) ([fb041b6](https://github.com/part-up/part-up/commit/fb041b6))
* **admin:** makeover for the admin page ([2be3fef](https://github.com/part-up/part-up/commit/2be3fef))
* **admin:** move partups in and out of networks, also archive tribes ([9f614d7](https://github.com/part-up/part-up/commit/9f614d7))
* **admin:** partups overview ([74099b6](https://github.com/part-up/part-up/commit/74099b6))
* **admin:** partups show more button ([138ef83](https://github.com/part-up/part-up/commit/138ef83))
* **admin:** set network id when creating network_admins partup ([deb5ab6](https://github.com/part-up/part-up/commit/deb5ab6))
* **admin:** set partup privacy setting based on FE input ([11b4922](https://github.com/part-up/part-up/commit/11b4922))
* **admin:** updated admin partups methods ([b09f807](https://github.com/part-up/part-up/commit/b09f807))
* **admin_partup:** added privacy type to create_partup ([be2f307](https://github.com/part-up/part-up/commit/be2f307))
* **chat:** chat message images expanded ([d1f9cd2](https://github.com/part-up/part-up/commit/d1f9cd2))
* **chat:** jump to context in chat search ([de1891c](https://github.com/part-up/part-up/commit/de1891c))
* **chat:** render line breaks in chat message ([3a70329](https://github.com/part-up/part-up/commit/3a70329))
* **chat:** search messages, click a message to view it's context ([8b2455f](https://github.com/part-up/part-up/commit/8b2455f))
* **chat:** started typing indicator for 1-on-1 chat ([4fc9b0f](https://github.com/part-up/part-up/commit/4fc9b0f))
* **chat:** urls of same chat don't open a new window ([0d77054](https://github.com/part-up/part-up/commit/0d77054))
* **chatmessages:** method to get context of a chat message ([fd143d3](https://github.com/part-up/part-up/commit/fd143d3))
* **colleage:** added user helper to check if user is colleague of a specific tribe ([8d7ee83](https://github.com/part-up/part-up/commit/8d7ee83))
* **colleague:** added helper to check if user is a network colelague ([acc3e80](https://github.com/part-up/part-up/commit/acc3e80))
* **colleagues:** added privacy type for colleague partups ([6e720f1](https://github.com/part-up/part-up/commit/6e720f1))
* **colleagues:** make colleague partups visible for colleagues and admins. also some code formatting ([3e492b0](https://github.com/part-up/part-up/commit/3e492b0))
* **colleagues:** updated the partup transformer ([51a2e47](https://github.com/part-up/part-up/commit/51a2e47))
* **comment:** support markdown with renderInline ([d147a8c](https://github.com/part-up/part-up/commit/d147a8c))
* **logging:** only log event endpoint configuration once (on startup) if needed ([40eb266](https://github.com/part-up/part-up/commit/40eb266))
* **menu.html:** some links open target blank and re-order ([c6f12d5](https://github.com/part-up/part-up/commit/c6f12d5))
* **message-added:** markdown support ([34da385](https://github.com/part-up/part-up/commit/34da385))
* **network:** introduced colleague property and implemented backend functionality ([f357aa6](https://github.com/part-up/part-up/commit/f357aa6))
* **network:** only change privacy type of partup on network change when they are neither colleagues or admins types ([7ee436e](https://github.com/part-up/part-up/commit/7ee436e))
* **network:** set partup privacy restrictions for different roles ([954a4e7](https://github.com/part-up/part-up/commit/954a4e7))
* **network:** update count with partup restrictions ([0447533](https://github.com/part-up/part-up/commit/0447533))
* **network:** updated method checks ([7f29ce0](https://github.com/part-up/part-up/commit/7f29ce0))
* **network:** updated privacy settings logic to also take the discover page into account ([045750c](https://github.com/part-up/part-up/commit/045750c))
* **network:** updated publications and stat services to not include archived networks ([306bc99](https://github.com/part-up/part-up/commit/306bc99))
* **network-roles:** don't make a user admin if already colleague and vice vera ([e0144ef](https://github.com/part-up/part-up/commit/e0144ef))
* **networks:** don't change privacy type of colleagues partup when changing networks ([5614ac9](https://github.com/part-up/part-up/commit/5614ac9))
* **networks:** only show specific partup types to admins ([7ebcecc](https://github.com/part-up/part-up/commit/7ebcecc))
* **partners:** improved order of partners on new profile partners tab [#340](https://github.com/part-up/part-up/issues/340) ([cd3997f](https://github.com/part-up/part-up/commit/cd3997f))
* **partup:** select group when starting partup from tribe ([83beae1](https://github.com/part-up/part-up/commit/83beae1))
* **partups:** label for admins/collegue partups on partup tiles ([8dfb873](https://github.com/part-up/part-up/commit/8dfb873))
* **stats:** not able anymore to increase the number of email shares manually [#465](https://github.com/part-up/part-up/issues/465) ([fbc41b8](https://github.com/part-up/part-up/commit/fbc41b8))
* **strings:** export strings helpers as importable with renderToMarkdown ([d585fb9](https://github.com/part-up/part-up/commit/d585fb9))
* **tribe:** archived label ([a75cd83](https://github.com/part-up/part-up/commit/a75cd83))
* **tribe:** archived tribes always show start ([7cf12c7](https://github.com/part-up/part-up/commit/7cf12c7))
* **tribe:** assign and unassign roles, also create part-ups for colleagues level ([5c80e79](https://github.com/part-up/part-up/commit/5c80e79))
* **tribe:** tribe start archived state ([5a27e0a](https://github.com/part-up/part-up/commit/5a27e0a))
* **tribes:** added tribe admin privacy type and disabled viewing by non-admins ([3848026](https://github.com/part-up/part-up/commit/3848026))


### BREAKING CHANGES

* package.json: S: npm run commit instead of npm run cz
* CHANGELOG.md: S: convential commit messages max to 1.16.4 version



<a name="1.21.4"></a>
## [1.21.4](https://github.com/part-up/part-up/compare/1.21.3...1.21.4) (2016-07-26)


### Bug Fixes

* **about:** give the user feedback for max-characters in contentblocks ([b0d2ff3](https://github.com/part-up/part-up/commit/b0d2ff3))
* **about:** remove pasted formatting to prevent conflicts with the wyswig editor fix for [#568](https://github.com/part-up/part-up/issues/568) ([7add7f7](https://github.com/part-up/part-up/commit/7add7f7)), closes [#568](https://github.com/part-up/part-up/issues/568)
* **chat:** add migration to add chat to existing networks without a chat ([9680e8d](https://github.com/part-up/part-up/commit/9680e8d))
* **chat:** enabled "join conversation" button fixing [#518](https://github.com/part-up/part-up/issues/518) ([5dd057e](https://github.com/part-up/part-up/commit/5dd057e))
* **chat:** fixed chat scraper issue with partup urls fixing [#594](https://github.com/part-up/part-up/issues/594) ([64d4749](https://github.com/part-up/part-up/commit/64d4749))
* **chat:** fixed incorrect margins for firefox fixing [#514](https://github.com/part-up/part-up/issues/514) ([20c9f41](https://github.com/part-up/part-up/commit/20c9f41))
* **chat:** unread count reset with a defer, this could possibly be the fix for [#590](https://github.com/part-up/part-up/issues/590) ([9a38da0](https://github.com/part-up/part-up/commit/9a38da0)), closes [#590](https://github.com/part-up/part-up/issues/590)
* **chat-dropdown:** also show tribe chats without chat messages ([4175a35](https://github.com/part-up/part-up/commit/4175a35))
* **chat-dropdown:** fix tribe chat tiles (alignements and consistency) ([3332400](https://github.com/part-up/part-up/commit/3332400))
* **chats:** fix directory location of new file after naming big rewrite ([259b79a](https://github.com/part-up/part-up/commit/259b79a))
* **chats-dropdown:** fix chat tile state for empty chat ([e2e7344](https://github.com/part-up/part-up/commit/e2e7344))
* **css:** re-enable css processing (minification and autoprefixer) ([406c6e4](https://github.com/part-up/part-up/commit/406c6e4))
* **datepicker:** show inline datepicker on touch devices for activities ([6056fbc](https://github.com/part-up/part-up/commit/6056fbc))
* **dropdown:** changed html order to make float:right work in firefox fixing [#515](https://github.com/part-up/part-up/issues/515) ([1ad7250](https://github.com/part-up/part-up/commit/1ad7250))
* **fixtures:** update fixtures to fix tribes after running meteor reset ([1453e05](https://github.com/part-up/part-up/commit/1453e05))
* **IE8:** polyfill for function.bind ([76a8734](https://github.com/part-up/part-up/commit/76a8734))
* **license:** fix license on part-up devops script package.json ([76696c2](https://github.com/part-up/part-up/commit/76696c2))
* **networks:** remove chat when removing network ([1f01289](https://github.com/part-up/part-up/commit/1f01289))
* **notifications:** added new type to notification images publication, I also fixed the not-working usercards on notifications. Fixing [#460](https://github.com/part-up/part-up/issues/460) ([28b6dad](https://github.com/part-up/part-up/commit/28b6dad))
* **notifications:** removed stray log ([8071d8b](https://github.com/part-up/part-up/commit/8071d8b))
* **partners:** made some improvements on the sorting of partners, the chunks that are returned al least have more frequent-partners than each following chunk, but the sorting of each chunk is still off. ([b0b8973](https://github.com/part-up/part-up/commit/b0b8973))
* **partup:** increased the margin at the bottom of a part-up page fixing the issue with comments under the fold fixing [#307](https://github.com/part-up/part-up/issues/307) ([e602178](https://github.com/part-up/part-up/commit/e602178))
* **partup:** tribe partup start styled like discussed with pim ([c020b09](https://github.com/part-up/part-up/commit/c020b09))
* **partupsettings:** better feedback for location input fixing [#154](https://github.com/part-up/part-up/issues/154) ([179f552](https://github.com/part-up/part-up/commit/179f552))
* **partupsettings:** Changed the date input in partup-settings to a more visual style, this also fixes issue [#485](https://github.com/part-up/part-up/issues/485) ([fad1463](https://github.com/part-up/part-up/commit/fad1463)), closes [#485](https://github.com/part-up/part-up/issues/485)
* **partupsettings:** fixed the incorrect value bug for type of organization in a part-up fixing [#224](https://github.com/part-up/part-up/issues/224) ([168ded3](https://github.com/part-up/part-up/commit/168ded3))
* **push-notifications:** don't send network-chat-message pushnotifications to devices with app releases before 1.4.0 ([74a5e3e](https://github.com/part-up/part-up/commit/74a5e3e))
* **sort:** made the sorting helpers more generic by using function.bind and implemented it into activity sorting ([505f678](https://github.com/part-up/part-up/commit/505f678))
* **start-partup:** Pre-selected tribe is now non-editeble, fixing [#351](https://github.com/part-up/part-up/issues/351) ([1686088](https://github.com/part-up/part-up/commit/1686088))
* **tags:** allow unicode (Basic Multilingual Plane) characters in par-up tags fixing [#430](https://github.com/part-up/part-up/issues/430) ([05f5ab2](https://github.com/part-up/part-up/commit/05f5ab2))
* **tests:** tests should allow tags with special characters ([f330e25](https://github.com/part-up/part-up/commit/f330e25))
* **tribe:** fix button alignment ([c985f0e](https://github.com/part-up/part-up/commit/c985f0e))
* **tribe-invite:** invite modal closing now takes you to the uppers tab fixing [#536](https://github.com/part-up/part-up/issues/536) ([558ea8f](https://github.com/part-up/part-up/commit/558ea8f))
* **tribes:** changed order of tribes to alphabetically in both tribe selector and user menu, fixing [#393](https://github.com/part-up/part-up/issues/393) ([851ff31](https://github.com/part-up/part-up/commit/851ff31))
* **usermenu:** tribes have no title fixing [#48](https://github.com/part-up/part-up/issues/48) ([09c8bcf](https://github.com/part-up/part-up/commit/09c8bcf))


### Features

* **activities:** scroll to new activity, resolve [#152](https://github.com/part-up/part-up/issues/152) ([a18f88b](https://github.com/part-up/part-up/commit/a18f88b)), closes [#152](https://github.com/part-up/part-up/issues/152)
* **chat:** add server-side function to remove a chat ([065ab0d](https://github.com/part-up/part-up/commit/065ab0d))
* **chat:** added quick switcher: try cmd+K in one-on-one chat ([b509b50](https://github.com/part-up/part-up/commit/b509b50))
* **chat:** Chats autofocus on message bar, also when searching the user can navigate the list with arrow keys and initialize by pressing the return key ([829e6fd](https://github.com/part-up/part-up/commit/829e6fd))
* **chat-push-notification:** useful badge number for iOS ([0a6711f](https://github.com/part-up/part-up/commit/0a6711f))
* **chats:** add compatibility for mobile tribe ([69f1550](https://github.com/part-up/part-up/commit/69f1550))
* **devops:** upgraded cron server to bigger machine, changed ip in inventory ([95add3f](https://github.com/part-up/part-up/commit/95add3f))
* **fixtures:** update fixtures to create chat for every network ([18912be](https://github.com/part-up/part-up/commit/18912be))
* **profile-dropdown:** profile dropdown partner/supporters/tribes toggle, resolve [#493](https://github.com/part-up/part-up/issues/493) ([020aec3](https://github.com/part-up/part-up/commit/020aec3)), closes [#493](https://github.com/part-up/part-up/issues/493)
* **push-notifications:** add push notifications for tribe chat messages ([5f7cf44](https://github.com/part-up/part-up/commit/5f7cf44))


### Performance Improvements

* **chats:** remove publication of all unread chat messages ([1c3293f](https://github.com/part-up/part-up/commit/1c3293f))



<a name="1.21.3"></a>
## [1.21.3](https://github.com/part-up/part-up/compare/1.21.2...1.21.3) (2016-07-12)


### Bug Fixes

* **chats:** fix security hole for users ([875c2e0](https://github.com/part-up/part-up/commit/875c2e0))
* **users:** point to publicUserFields, privateUserFields, etc using getter functions to make the objects immutable ([3ae0036](https://github.com/part-up/part-up/commit/3ae0036))



<a name="1.21.2"></a>
## [1.21.2](https://github.com/part-up/part-up/compare/1.21.1...1.21.2) (2016-07-10)



<a name="1.21.1"></a>
## [1.21.1](https://github.com/part-up/part-up/compare/1.21.0...1.21.1) (2016-07-08)


### Bug Fixes

* **google-api:** update google api version ([fa049fb](https://github.com/part-up/part-up/commit/fa049fb))


### Features

* **chats:** add publication to retrieve new chats count ([02117c0](https://github.com/part-up/part-up/commit/02117c0))



<a name="1.21.0"></a>
# [1.21.0](https://github.com/part-up/part-up/compare/1.20.3...1.21.0) (2016-07-07)


### Bug Fixes

* **1on1chat:** add check to see if user is allowed to insert chat message ([a2085a4](https://github.com/part-up/part-up/commit/a2085a4))
* **chat:** add start chat ability via url ([4088e11](https://github.com/part-up/part-up/commit/4088e11))
* **chat:** count on empty counters in chat dropdown ([b2a12ee](https://github.com/part-up/part-up/commit/b2a12ee))
* **chat:** fixed translation issue on network chat. fixes [#585](https://github.com/part-up/part-up/issues/585) ([60d405e](https://github.com/part-up/part-up/commit/60d405e)), closes [#585](https://github.com/part-up/part-up/issues/585)
* **chat:** redirect user to home page after logging out in chat ([fe1e611](https://github.com/part-up/part-up/commit/fe1e611))
* **chat:** reset new messages divider for one on one chat fixing [#569](https://github.com/part-up/part-up/issues/569) ([a971e9f](https://github.com/part-up/part-up/commit/a971e9f))
* **chat:** show searching state by INDICATING THE CURRENT SEARCH QUERY ([4422aa6](https://github.com/part-up/part-up/commit/4422aa6))
* **chat:** sidebar width fix ([efa4c23](https://github.com/part-up/part-up/commit/efa4c23))
* **chat:** translation fix [#537](https://github.com/part-up/part-up/issues/537) ([43afd0f](https://github.com/part-up/part-up/commit/43afd0f)), closes [#537](https://github.com/part-up/part-up/issues/537)
* **chat-dropdown:** added  start a chat button to dropdown ([3b06ee6](https://github.com/part-up/part-up/commit/3b06ee6))
* **chatdropdown:** truncate long tribe chat lines, fixing [#517](https://github.com/part-up/part-up/issues/517) ([1e671e5](https://github.com/part-up/part-up/commit/1e671e5))
* **chats:** count on empty chats array ([d5b2068](https://github.com/part-up/part-up/commit/d5b2068))
* **chatview:** fixed some issues ([fe61f33](https://github.com/part-up/part-up/commit/fe61f33))
* **client1on1chat-package:** include partup:client-base because it's using  preventScrollPropagation ([09728ca](https://github.com/part-up/part-up/commit/09728ca))
* **columnlayout:** removed unnesssary error throw ([fa40435](https://github.com/part-up/part-up/commit/fa40435))
* **header:** fixed header displacement on IE ([e0cc34f](https://github.com/part-up/part-up/commit/e0cc34f))
* **header:** header scales properly again ([34f5a90](https://github.com/part-up/part-up/commit/34f5a90))
* **menu:** removed socials from about menu ([37465ed](https://github.com/part-up/part-up/commit/37465ed))
* **moremenu:** overflow hidden to fix scrollbar issue ([901938e](https://github.com/part-up/part-up/commit/901938e))
* **notifications:** chats now correctly display the number of unread messages ([9eab3e8](https://github.com/part-up/part-up/commit/9eab3e8))
* **packages:** removed double package ([6f920dd](https://github.com/part-up/part-up/commit/6f920dd))
* **translations:** updated translations ([377a813](https://github.com/part-up/part-up/commit/377a813))
* **tribechat:** adjusted check for chatmessage insert, fixing tribe chat insertion ([8a87f6f](https://github.com/part-up/part-up/commit/8a87f6f))


### Features

* **chat:** 1-on-1 chat start ([080eacc](https://github.com/part-up/part-up/commit/080eacc))
* **chat:** 1-on-1 chats reachable with url ([f9eb5f2](https://github.com/part-up/part-up/commit/f9eb5f2))
* **chat:** add users in private chat to unread counter ([141f850](https://github.com/part-up/part-up/commit/141f850))
* **chat:** added the ability to start a chat via a users profile or profilecard ([ffa2b54](https://github.com/part-up/part-up/commit/ffa2b54))
* **chat:** completely detached chat template and logic from the NetworkChat to re-use everything in the 1-on-1 chat ([85ab6c4](https://github.com/part-up/part-up/commit/85ab6c4))
* **chat:** dropdown fully working ([27485e4](https://github.com/part-up/part-up/commit/27485e4))
* **chat:** made it faster with emty and loading state ([144b0d8](https://github.com/part-up/part-up/commit/144b0d8))
* **chat:** one on one chat ([1048317](https://github.com/part-up/part-up/commit/1048317))
* **chat:** publish unread chat messages for count purpose ([2d21414](https://github.com/part-up/part-up/commit/2d21414))
* **chat:** sidebar start and dropdown for 1-on-1 messages ([74bc6b4](https://github.com/part-up/part-up/commit/74bc6b4))
* **footer:** start of meny footer ([4a4949d](https://github.com/part-up/part-up/commit/4a4949d))
* **menu:** moved footer to a "more" menu ([5159546](https://github.com/part-up/part-up/commit/5159546))
* **more-header:** add ios and android download links and remove sprint i18n files ([f2abf81](https://github.com/part-up/part-up/commit/f2abf81))
* **usercard:** reflect online status on usercard ([3ebf9ec](https://github.com/part-up/part-up/commit/3ebf9ec))



<a name="1.20.3"></a>
## [1.20.3](https://github.com/part-up/part-up/compare/1.20.2...1.20.3) (2016-06-20)


### Bug Fixes

* **changelog:** fix wrong format changelog MD ([b59fb6e](https://github.com/part-up/part-up/commit/b59fb6e))
* **fileUploader:** create Partup object when is undefined prevent testing from failing ([f62472b](https://github.com/part-up/part-up/commit/f62472b))


### Features

* **chats:** also search in scraped metadata ([3047ae1](https://github.com/part-up/part-up/commit/3047ae1))
* **scraper:** implemented improved web scraper ([9b1e2ed](https://github.com/part-up/part-up/commit/9b1e2ed))
* **scraper:** URL preview for part-up.com now fetches the right html tags [#503](https://github.com/part-up/part-up/issues/503) ([c406245](https://github.com/part-up/part-up/commit/c406245))



<a name="1.20.2"></a>
## [1.20.2](https://github.com/part-up/part-up/compare/1.20.0...1.20.2) (2016-06-17)


### Bug Fixes

* **chat:** search on tribe chat won't show content of private chats in app anymore [#511](https://github.com/part-up/part-up/issues/511) ([4da82bb](https://github.com/part-up/part-up/commit/4da82bb))
* **chat:** translations fix ([b1db463](https://github.com/part-up/part-up/commit/b1db463))
* **chatsearch:** temp disable, mitigate issue [#511](https://github.com/part-up/part-up/issues/511) ([c76a1b6](https://github.com/part-up/part-up/commit/c76a1b6))
* **networkchat:** re-enable the search feature of network chat ([1f7a5f4](https://github.com/part-up/part-up/commit/1f7a5f4))


### Features

* **chats:** also search in scraped metadata ([67012b7](https://github.com/part-up/part-up/commit/67012b7))
* **scraper:** implemented improved web scraper ([e4ed7b2](https://github.com/part-up/part-up/commit/e4ed7b2))
* **scraper:** URL preview for part-up.com now fetches the right html tags [#503](https://github.com/part-up/part-up/issues/503) ([77530bb](https://github.com/part-up/part-up/commit/77530bb))
* **tribes:** improved the tribe autocompletion [#458](https://github.com/part-up/part-up/issues/458) ([80821a8](https://github.com/part-up/part-up/commit/80821a8))
* **updates:** improved stopped supporting copy [#478](https://github.com/part-up/part-up/issues/478) ([ecc71e8](https://github.com/part-up/part-up/commit/ecc71e8))


### Performance Improvements

* **chat:** remove duplicate chat findOne ([04a0a61](https://github.com/part-up/part-up/commit/04a0a61))
* **chat:** remove duplicate network findOne ([c108495](https://github.com/part-up/part-up/commit/c108495))



<a name="1.20.0"></a>
# [1.20.0](https://github.com/part-up/part-up/compare/1.19.3...1.20.0) (2016-06-15)


### Bug Fixes

* **apple-pushnotification0feedback:** remove heavy feedbackservice cron and prune devices on login as well ([eadd728](https://github.com/part-up/part-up/commit/eadd728))
* **chat:** avatars without images now won't disappear ([cffabf0](https://github.com/part-up/part-up/commit/cffabf0))
* **chat:** chatmessages rendered properly ([cf0dc86](https://github.com/part-up/part-up/commit/cf0dc86))
* **chat:** clear search input button and new messages divider doesn't show up uninvited anymore ([9e14286](https://github.com/part-up/part-up/commit/9e14286))
* **chat:** do not prevent new message composing ([f9cf538](https://github.com/part-up/part-up/commit/f9cf538))
* **chat:** don't insert data if link isnt scaped ([b8c51dc](https://github.com/part-up/part-up/commit/b8c51dc))
* **chat:** dropdown shows correct message and timestamp fixing [#505](https://github.com/part-up/part-up/issues/505) ([774c8d6](https://github.com/part-up/part-up/commit/774c8d6))
* **chat:** fixed the chatId concatenation ([e29f788](https://github.com/part-up/part-up/commit/e29f788))
* **chat:** group messages by delay ([ebff9d3](https://github.com/part-up/part-up/commit/ebff9d3))
* **chat:** hide typing indicator for self ([b20096a](https://github.com/part-up/part-up/commit/b20096a))
* **chat:** improve chat scrolling behaviour ([3e0c774](https://github.com/part-up/part-up/commit/3e0c774))
* **chat:** improved speed ([502943f](https://github.com/part-up/part-up/commit/502943f))
* **chat:** improved the sticky avatar margins a bit fixing [#504](https://github.com/part-up/part-up/issues/504) ([4291fb1](https://github.com/part-up/part-up/commit/4291fb1))
* **chat:** Margins are decreased to improve readability, chat search has been moved to the sidebar ([5cfddfd](https://github.com/part-up/part-up/commit/5cfddfd))
* **chat:** only allow members to send messages ([211af66](https://github.com/part-up/part-up/commit/211af66))
* **chat:** removed simulated method from frontend to prevent conflicts ([cf1906c](https://github.com/part-up/part-up/commit/cf1906c))
* **chat:** removed standard-minifiers-css so meteor compiles the css properly for IE9 ([e5e51d7](https://github.com/part-up/part-up/commit/e5e51d7))
* **chat:** sanitize html, no more harlem shake ([f446e35](https://github.com/part-up/part-up/commit/f446e35))
* **chat:** scrolling behaviour more solid ([c4fb535](https://github.com/part-up/part-up/commit/c4fb535))
* **chat:** seperate messages by 2 minute pauses, fixing [#501](https://github.com/part-up/part-up/issues/501) ([c2191ea](https://github.com/part-up/part-up/commit/c2191ea))
* **chat:** some refactoring to cope with the new chat notifications descriptions ([7875290](https://github.com/part-up/part-up/commit/7875290))
* **chat:** sort chat dropdown by updated_at ([4254f3a](https://github.com/part-up/part-up/commit/4254f3a))
* **chat:** speed improvements ([28d139a](https://github.com/part-up/part-up/commit/28d139a))
* **chat:** styling touches ([7550e6f](https://github.com/part-up/part-up/commit/7550e6f))
* **chat:** styling touches ([bd9599b](https://github.com/part-up/part-up/commit/bd9599b))
* **chat:** styling touches (again) ([09caa49](https://github.com/part-up/part-up/commit/09caa49))
* **chat:** translations ([143d8fb](https://github.com/part-up/part-up/commit/143d8fb))
* **chat:** translations ([f80ce0d](https://github.com/part-up/part-up/commit/f80ce0d))
* **chat:** use the limit set by chat ([001f0d0](https://github.com/part-up/part-up/commit/001f0d0))
* **chatmessages-pushnotifications:** only send push notifications for 1-on-1 chats ([f6b59ad](https://github.com/part-up/part-up/commit/f6b59ad))
* **chats:** add temporary backwards compatibility for chat publication in 1.2.2 app version (to be removed after 1.2.3 release in appstores) ([88141aa](https://github.com/part-up/part-up/commit/88141aa))
* **chats-publication:** fix backwards compatibility for 1.2.2 app ([354a87b](https://github.com/part-up/part-up/commit/354a87b))
* **dropdown-profile.js:** Replaced meteor logout with partup.client logout ([927f1f3](https://github.com/part-up/part-up/commit/927f1f3))
* **edge:** bulk upload fix [#379](https://github.com/part-up/part-up/issues/379) ([a9e763a](https://github.com/part-up/part-up/commit/a9e763a)), closes [#379](https://github.com/part-up/part-up/issues/379)
* **email-images:** confirmation mail images now showing [#394](https://github.com/part-up/part-up/issues/394) ([efa983b](https://github.com/part-up/part-up/commit/efa983b))
* **es6:** remove es6 code ([a06afc2](https://github.com/part-up/part-up/commit/a06afc2))
* **icons:** Added sass variables that make all the icon content available. This is usefull for third party packages that don't alow for much flexibility in the generated html. fixing [#466](https://github.com/part-up/part-up/issues/466) ([1b46182](https://github.com/part-up/part-up/commit/1b46182))
* **icons:** updated readme ([1ec7dda](https://github.com/part-up/part-up/commit/1ec7dda))
* **intercom:** clear intercom session on logout ([68367e5](https://github.com/part-up/part-up/commit/68367e5))
* **invite:** 'Match failed' error resolved. fixing issue [#427](https://github.com/part-up/part-up/issues/427) ([06a4daf](https://github.com/part-up/part-up/commit/06a4daf))
* **linkscraper:** changed data to preview_data to prevent frontend namespace conflicts, also added the url to the preview_data to allow easy access to the scraped url ([5db7a78](https://github.com/part-up/part-up/commit/5db7a78))
* **linkscraper:** temporarily disable linkscraper until feedback is processed ([caf5ae7](https://github.com/part-up/part-up/commit/caf5ae7))
* **login:** made forgot password case insensitive [#445](https://github.com/part-up/part-up/issues/445) ([e57a2a7](https://github.com/part-up/part-up/commit/e57a2a7))
* **mentions:** Mentions are possible with 1 character and usernames that have 3 parts are searchable ([211c402](https://github.com/part-up/part-up/commit/211c402))
* **nav:** added stripe for button seperation ([ad54e6f](https://github.com/part-up/part-up/commit/ad54e6f))
* **navbar:** tweaked the app width a bit, fixing [#65](https://github.com/part-up/part-up/issues/65) ([2db3a39](https://github.com/part-up/part-up/commit/2db3a39))
* **network:** updated isnetworkAdmin check ([f2747f8](https://github.com/part-up/part-up/commit/f2747f8))
* **notification-payload:** add fixes to allow the app to interprete notification payloads correctly ([716d490](https://github.com/part-up/part-up/commit/716d490))
* **notifications:** don't mail notifications to deactivated users [#459](https://github.com/part-up/part-up/issues/459) ([926f542](https://github.com/part-up/part-up/commit/926f542))
* **packages:** remove mongol package that caused the build error ([b134131](https://github.com/part-up/part-up/commit/b134131))
* **partup-sidebar:** add check to prevent exception when calling Partup.client.windowTitle.setContextName() ([b8b1192](https://github.com/part-up/part-up/commit/b8b1192))
* **profile:** added authorization token and userid to http gets to get correct results. fixing [#477](https://github.com/part-up/part-up/issues/477) ([694d9c1](https://github.com/part-up/part-up/commit/694d9c1))
* **profile:** dont't show the profile uppertile in partners [#380](https://github.com/part-up/part-up/issues/380) ([0ddd304](https://github.com/part-up/part-up/commit/0ddd304))
* **profile:** fixed infinite scroll issue mentioned in issue [#380](https://github.com/part-up/part-up/issues/380) ([937c41e](https://github.com/part-up/part-up/commit/937c41e)), closes [#380](https://github.com/part-up/part-up/issues/380)
* **prune-devices:** add fallback for users who don't have the push_notification_devices array yet ([a1736ec](https://github.com/part-up/part-up/commit/a1736ec))
* **prune-devices:** make register-device-id backwards compatible ([f073d92](https://github.com/part-up/part-up/commit/f073d92))
* **push-notification-devices:** prune devices when a user logs out ([1ed037e](https://github.com/part-up/part-up/commit/1ed037e))
* **push-notifications-payload:** fix way payload of push notifications are sent to be able to correctly interprete it in the app for Android as well as iOS ([686b579](https://github.com/part-up/part-up/commit/686b579))
* **safari:** bug fixes for safari ([cc0fd77](https://github.com/part-up/part-up/commit/cc0fd77))
* **single-chat-publication:** guard user fields and fix empty chat messages screen ([f541ec4](https://github.com/part-up/part-up/commit/f541ec4))
* **tribestart:** bold link styling [#421](https://github.com/part-up/part-up/issues/421) ([0949c60](https://github.com/part-up/part-up/commit/0949c60))
* **tribestart:** invite button closes tribe start for members fixing [#443](https://github.com/part-up/part-up/issues/443) ([2b703f7](https://github.com/part-up/part-up/commit/2b703f7))
* **tribestart:** Read more button fixes [#421](https://github.com/part-up/part-up/issues/421) ([d795119](https://github.com/part-up/part-up/commit/d795119)), closes [#421](https://github.com/part-up/part-up/issues/421)
* **windowtitle:** fix defaultDelimiter - value ([b573735](https://github.com/part-up/part-up/commit/b573735))
* **windowtitle:** fix es6 code which was breaking build [@annotatedjs](https://github.com/annotatedjs) ([5dc4cf1](https://github.com/part-up/part-up/commit/5dc4cf1))


### Features

* **chat:** added scraper functionality ([0d64f28](https://github.com/part-up/part-up/commit/0d64f28))
* **chat:** chat search with highlighting ([d037916](https://github.com/part-up/part-up/commit/d037916))
* **chat:** check if a user is member of a network when inserting a network chatmessage ([081e42d](https://github.com/part-up/part-up/commit/081e42d))
* **chat:** dropdown for chat messages ([8f13f26](https://github.com/part-up/part-up/commit/8f13f26))
* **chat:** dropdown with indicator for read and seen states ([c9f4d8c](https://github.com/part-up/part-up/commit/c9f4d8c))
* **chat:** group messages by chat for otifications ([b3437b1](https://github.com/part-up/part-up/commit/b3437b1))
* **chat:** indicator badge ([b6fdaa8](https://github.com/part-up/part-up/commit/b6fdaa8))
* **chat:** link previews ([2e919e6](https://github.com/part-up/part-up/commit/2e919e6))
* **chat:** mark messages as read and seen, also the messages divider shows unread messages on chat load ([d0225c8](https://github.com/part-up/part-up/commit/d0225c8))
* **chat:** new counter schema ([b1d969c](https://github.com/part-up/part-up/commit/b1d969c))
* **chat:** notification count ([fcca9c0](https://github.com/part-up/part-up/commit/fcca9c0))
* **chat:** re-enabled the chat ([aa4e1ea](https://github.com/part-up/part-up/commit/aa4e1ea))
* **chat:** reset unread_counter for current user ([3614136](https://github.com/part-up/part-up/commit/3614136))
* **chat:** search through messages ([4a4c814](https://github.com/part-up/part-up/commit/4a4c814))
* **chats:** abolity to retrieve private and network chats separately ([4a8cc7b](https://github.com/part-up/part-up/commit/4a8cc7b))
* **chats:** chat counter helpers and implementation for networks ([672720e](https://github.com/part-up/part-up/commit/672720e))
* **client pages:** Dynamic window titles ([71f2733](https://github.com/part-up/part-up/commit/71f2733))
* **counter:** increase unread_counter on new message ([109a2b9](https://github.com/part-up/part-up/commit/109a2b9))
* **migration:** migration for chat counters ([9a76141](https://github.com/part-up/part-up/commit/9a76141))
* **migration:** minor change to latest migration for edge cases ([829c3ba](https://github.com/part-up/part-up/commit/829c3ba))
* **personal-header:** part-up-for-organisations in header only when user is on HomePage ([81bcd8d](https://github.com/part-up/part-up/commit/81bcd8d))
* **private chat:** send mobile pushnotification to chat message receivers ([b8add67](https://github.com/part-up/part-up/commit/b8add67))
* **push-notification:** show app icon badge when notification is sent ([a718eb1](https://github.com/part-up/part-up/commit/a718eb1))
* **renderblock:** renderblock template that allows onRendered callbacks for small sections of templates ([9b02ac6](https://github.com/part-up/part-up/commit/9b02ac6))
* **triibe-about:** phone number and email address of tribe admins now visible for tribe members [#457](https://github.com/part-up/part-up/issues/457) ([69f662a](https://github.com/part-up/part-up/commit/69f662a))



<a name="1.19.3"></a>
## [1.19.3](https://github.com/part-up/part-up/compare/1.19.2...1.19.3) (2016-06-01)


### Bug Fixes

* **cookiebar:** set expires on 2147483647 ([c030128](https://github.com/part-up/part-up/commit/c030128))
* **cookiebar:** set expires on 2147483647 ([54c2d52](https://github.com/part-up/part-up/commit/54c2d52))



<a name="1.19.2"></a>
## [1.19.2](https://github.com/part-up/part-up/compare/1.19.1...1.19.2) (2016-05-31)


### Bug Fixes

* **cookiebar:** update translation and fix already accepted cookie intercom button position ([8089f52](https://github.com/part-up/part-up/commit/8089f52))
* **public-header:** remove data-register triggering on organisatino ([41c933b](https://github.com/part-up/part-up/commit/41c933b))



<a name="1.19.1"></a>
## [1.19.1](https://github.com/part-up/part-up/compare/1.19.0...1.19.1) (2016-05-31)


### Bug Fixes

* **cookie-bar:** make the text reactive to application language settings ([281d6d6](https://github.com/part-up/part-up/commit/281d6d6))
* **publications:** downgrade simple:json-rest to re-enable hidden/private partups showing when authorized ([38a932d](https://github.com/part-up/part-up/commit/38a932d))
* **upgrade:** update iron middleware package to fix incompatibility with latest chrome on win10 (fixes [#471](https://github.com/part-up/part-up/issues/471)) ([5211b02](https://github.com/part-up/part-up/commit/5211b02)), closes [#471](https://github.com/part-up/part-up/issues/471)



<a name="1.19.0"></a>
# [1.19.0](https://github.com/part-up/part-up/compare/1.18.1...1.19.0) (2016-05-29)


### Bug Fixes

* **about-profile-name-href-link:** replace hard-coded with pathFor profile and _id ([73c4030](https://github.com/part-up/part-up/commit/73c4030))
* **admin:** show all admins on admin tribe page fix [#446](https://github.com/part-up/part-up/issues/446) ([0b26734](https://github.com/part-up/part-up/commit/0b26734)), closes [#446](https://github.com/part-up/part-up/issues/446)
* **android-notifications:** correctly send android push notification ([dbcad66](https://github.com/part-up/part-up/commit/dbcad66))
* **app-push-notifications:** add production flag to enable notifications ([fdc88f3](https://github.com/part-up/part-up/commit/fdc88f3))
* **app-push-notifications:** better fallback for APN devices cleanup cron interval ([998182d](https://github.com/part-up/part-up/commit/998182d))
* **app-push-notifications:** correctly convert APN base64 pfx environment variable to buffer ([6ac09ab](https://github.com/part-up/part-up/commit/6ac09ab))
* **app-push-notifications:** fix reference to APN  device cleanup interval env var ([3e04760](https://github.com/part-up/part-up/commit/3e04760))
* **app-push-notifications:** remove production=true flag ([4cc587b](https://github.com/part-up/part-up/commit/4cc587b))
* **chat:** better started typing handling ([1b0b523](https://github.com/part-up/part-up/commit/1b0b523))
* **chat:** bugfixes and typing indicator ([f405cf9](https://github.com/part-up/part-up/commit/f405cf9))
* **chat:** empty state ([f807aa8](https://github.com/part-up/part-up/commit/f807aa8))
* **chat:** fix avatar position ([a61cdbd](https://github.com/part-up/part-up/commit/a61cdbd))
* **chat:** fix chatbox arrow size, position send/receive and borders send/receive ([ffe144a](https://github.com/part-up/part-up/commit/ffe144a))
* **chat:** fix chatbox for multiple messages ([4632c49](https://github.com/part-up/part-up/commit/4632c49))
* **chat:** fix chatbox send/receive to look identical ([edf14e2](https://github.com/part-up/part-up/commit/edf14e2))
* **chat:** fix header border and padding ([268710f](https://github.com/part-up/part-up/commit/268710f))
* **chat:** fix textlines, margins and scroll container ([dd37147](https://github.com/part-up/part-up/commit/dd37147))
* **chat:** fixed chat publication to be respoinsive ([c914ebe](https://github.com/part-up/part-up/commit/c914ebe))
* **chat:** fixed the privacy labels for chat, also tweaked the initialize a bit to make it feel more smooth ([098d949](https://github.com/part-up/part-up/commit/098d949))
* **chat:** minor changes to account for large windows ([7677b72](https://github.com/part-up/part-up/commit/7677b72))
* **chat:** online upper image ([4f28537](https://github.com/part-up/part-up/commit/4f28537))
* **chat:** publication fix ([9c2d1b2](https://github.com/part-up/part-up/commit/9c2d1b2))
* **chat:** publish user images ([c05cddc](https://github.com/part-up/part-up/commit/c05cddc))
* **chat:** scrollpropagation implementation ([9fa301b](https://github.com/part-up/part-up/commit/9fa301b))
* **chat:** send button ([9f79cec](https://github.com/part-up/part-up/commit/9f79cec))
* **chat:** throttled the started typing call ([14933a3](https://github.com/part-up/part-up/commit/14933a3))
* **chat:** trnaslations update ([1a434b2](https://github.com/part-up/part-up/commit/1a434b2))
* **chat:** update key instead of replacing network when inserting chat ([96a2be1](https://github.com/part-up/part-up/commit/96a2be1))
* **chat:** wrong status code ([b824228](https://github.com/part-up/part-up/commit/b824228))
* **chat-publication:** fix chat messages publication in chat ([3369227](https://github.com/part-up/part-up/commit/3369227))
* **chatmessage:** chat message rendering ([9a5b2ae](https://github.com/part-up/part-up/commit/9a5b2ae))
* **chats:** fix chat related publications ([1ea5556](https://github.com/part-up/part-up/commit/1ea5556))
* **chats:** fix publication reactiveness ([649c419](https://github.com/part-up/part-up/commit/649c419))
* **chats:** make chats options object optional, rename chats.for_upper to chats.for_loggedin_user ([0a3e7ef](https://github.com/part-up/part-up/commit/0a3e7ef))
* **chats-publication:** fix chat-messages publication ([16b8012](https://github.com/part-up/part-up/commit/16b8012))
* **composition-home:** make the witdth of heading paragraph smaller ([e9cf09a](https://github.com/part-up/part-up/commit/e9cf09a))
* **copy-tabs-about:** remove hardcoded copy ([ff43091](https://github.com/part-up/part-up/commit/ff43091))
* **footer:** fix footer padding ([f5a3c8c](https://github.com/part-up/part-up/commit/f5a3c8c))
* **gitcache:** git cache cleanup ([df457a2](https://github.com/part-up/part-up/commit/df457a2))
* **minification:** fix minified build by removing ecmascript and rewriting all to old javascript ([7c3d7a5](https://github.com/part-up/part-up/commit/7c3d7a5))
* **moment:** fix moment according to ES6 modules ([11c62ef](https://github.com/part-up/part-up/commit/11c62ef))
* **networks-route:** add support for pagination ([658a10d](https://github.com/part-up/part-up/commit/658a10d))
* **notifications:** fixed require together with jesse ([827391b](https://github.com/part-up/part-up/commit/827391b))
* **personal-header:** add mobile key for the partup for organisations ([9b1b222](https://github.com/part-up/part-up/commit/9b1b222))
* **personal-header:** change register link into the part-up for organisation like desktop version ([1c2bc46](https://github.com/part-up/part-up/commit/1c2bc46))
* **phraseapp-cli:** remove git checkout reset commmand and move the files to separate folder ([f6bf0ae](https://github.com/part-up/part-up/commit/f6bf0ae))
* **phraseapp-cli:** resolve correct path for sh file ([49d1375](https://github.com/part-up/part-up/commit/49d1375))
* **phraseapp-custom-cli:** improve commit command for automatic commit and push ([c81199b](https://github.com/part-up/part-up/commit/c81199b))
* **publications:** fix paginations ([74e6cc1](https://github.com/part-up/part-up/commit/74e6cc1))
* **pushnotification:** add missing - in push notification keys, and log when listening for cron apn feedback ([b68df04](https://github.com/part-up/part-up/commit/b68df04))
* **scroll:** scrollpropagation preventer imeplemented in profile and notifications dropdown ([3a955a3](https://github.com/part-up/part-up/commit/3a955a3))
* **textline :** fix class name ([5620327](https://github.com/part-up/part-up/commit/5620327))
* **upgrade:** downgrade lodash to version 3 for compatibility ([003491f](https://github.com/part-up/part-up/commit/003491f))
* **upgrade:** fix upgrade issue with bootstrap inclusion ([98cecd1](https://github.com/part-up/part-up/commit/98cecd1))
* **upgrade:** move dependencies inclusion to "old fashioned" npm depends ([b4100ee](https://github.com/part-up/part-up/commit/b4100ee))
* **user-methods:** fix autocomplete method checks ([c3c770c](https://github.com/part-up/part-up/commit/c3c770c))
* **user-publication:** add chats field to user publication ([c258cb1](https://github.com/part-up/part-up/commit/c258cb1))
* **users-autocomplete-method:** embed user image when options.chatSearch is true ([3c45640](https://github.com/part-up/part-up/commit/3c45640))


### Features

* **app-push-notifications:** add a service to send notifications ([df7b894](https://github.com/part-up/part-up/commit/df7b894))
* **app-push-notifications:** add apple devices cleanup cron ([6f5b556](https://github.com/part-up/part-up/commit/6f5b556))
* **app-push-notifications:** add createdAt field to user's device list ([7ad1bd3](https://github.com/part-up/part-up/commit/7ad1bd3))
* **app-push-notifications:** fix sending notifications to APN and GCM ([8abc3a5](https://github.com/part-up/part-up/commit/8abc3a5))
* **app-push-notifications:** provide a method to register a push notification device ([ce15b2e](https://github.com/part-up/part-up/commit/ce15b2e))
* **chat:** add chat page ([391e9d6](https://github.com/part-up/part-up/commit/391e9d6))
* **chat:** add chat to network ([0095103](https://github.com/part-up/part-up/commit/0095103))
* **chat:** add chatbox ([b2eafc1](https://github.com/part-up/part-up/commit/b2eafc1))
* **chat:** add header ([288924d](https://github.com/part-up/part-up/commit/288924d))
* **chat:** add language files ([0478e04](https://github.com/part-up/part-up/commit/0478e04))
* **chat:** add search component ([4272ccb](https://github.com/part-up/part-up/commit/4272ccb))
* **chat:** added chat collection, schema and methods ([7730633](https://github.com/part-up/part-up/commit/7730633))
* **chat:** added chatmessages collection schema and method ([98c6508](https://github.com/part-up/part-up/commit/98c6508))
* **chat:** added flag to usercomplete to exclude current user ([a41d79f](https://github.com/part-up/part-up/commit/a41d79f))
* **chat:** added helper to get unread chat count per user on chat level ([a17054e](https://github.com/part-up/part-up/commit/a17054e))
* **chat:** added max of 1000 characters to message ([aacf269](https://github.com/part-up/part-up/commit/aacf269))
* **chat:** added parameters to publication to configure limit and skip ([75b58e7](https://github.com/part-up/part-up/commit/75b58e7))
* **chat:** added publication ([4825eec](https://github.com/part-up/part-up/commit/4825eec))
* **chat:** added publication for user chats ([7f5db78](https://github.com/part-up/part-up/commit/7f5db78))
* **chat:** added seen/read methods ([355e06e](https://github.com/part-up/part-up/commit/355e06e))
* **chat:** added started and stopped typing methods ([2c6f65a](https://github.com/part-up/part-up/commit/2c6f65a))
* **chat:** chat publication (in progress) ([604e002](https://github.com/part-up/part-up/commit/604e002))
* **chat:** did alot of tweaking and finetuning to get the scrolling behaviour of the chat right ([0e72a5a](https://github.com/part-up/part-up/commit/0e72a5a))
* **chat:** don't allow chat with yourself ([4851171](https://github.com/part-up/part-up/commit/4851171))
* **chat:** fully functional chat with "is_typing" indicator, date grouping and user grouping of messages ([6c21118](https://github.com/part-up/part-up/commit/6c21118))
* **chat:** group messages by day ([cc278e1](https://github.com/part-up/part-up/commit/cc278e1))
* **chat:** partup tribe chat ([30dfeeb](https://github.com/part-up/part-up/commit/30dfeeb))
* **chat:** remove chatmessage method ([fcc654e](https://github.com/part-up/part-up/commit/fcc654e))
* **chat:** removed creator_id from chat insert ([c73eeb6](https://github.com/part-up/part-up/commit/c73eeb6))
* **chat:** removed network_id from chat schema and added chat_id to network ([0ab4cf9](https://github.com/part-up/part-up/commit/0ab4cf9))
* **chat:** reverse scroll behaviour ([d4673ad](https://github.com/part-up/part-up/commit/d4673ad))
* **chat:** search in tribe chat ([f63dcbb](https://github.com/part-up/part-up/commit/f63dcbb))
* **chat:** some optimizations and validations ([a4403d3](https://github.com/part-up/part-up/commit/a4403d3))
* **chat:** start a private chat ([785817b](https://github.com/part-up/part-up/commit/785817b))
* **chat:** sticky avatars, emoji integration and infinite scrolling behaviour ([60399b6](https://github.com/part-up/part-up/commit/60399b6))
* **chat:** temp disable tribe chat functionality (to support mobile 1on1 chat release) ([53e2ae0](https://github.com/part-up/part-up/commit/53e2ae0))
* **chat:** tribe chat component ([f302ec1](https://github.com/part-up/part-up/commit/f302ec1))
* **chat:** update the chat on new message ([266e4e6](https://github.com/part-up/part-up/commit/266e4e6))
* **chat:** updated chat/chatmessage methods ([7b95f19](https://github.com/part-up/part-up/commit/7b95f19))
* **chat:** updated property names ([502d72b](https://github.com/part-up/part-up/commit/502d72b))
* **chat:** updated the chat/chatmessage schemas ([4826416](https://github.com/part-up/part-up/commit/4826416))
* **chats:** 1 on 1 chat now functional ([43aa8ff](https://github.com/part-up/part-up/commit/43aa8ff))
* **chats:** add tribe chats to user chat list ([69eff4d](https://github.com/part-up/part-up/commit/69eff4d))
* **chats:** moved logic to chats methods ([c9be6fa](https://github.com/part-up/part-up/commit/c9be6fa))
* **datehelpers:** new dat ehelpers for chat ([2a4784a](https://github.com/part-up/part-up/commit/2a4784a))
* **ecmascript:** add packages to add support for es2015+ (also in client side code) ([3846c3c](https://github.com/part-up/part-up/commit/3846c3c))
* **homepage:** change the content of the home page with new i18n key ([7633d94](https://github.com/part-up/part-up/commit/7633d94))
* **meteor:** update to 1.3.2.4 ([c5c253f](https://github.com/part-up/part-up/commit/c5c253f))
* **meteor:** upgraded meteor packages (only scss was downgraded to avoid issues) ([639e7d1](https://github.com/part-up/part-up/commit/639e7d1))
* **notifications:** send push notifications to all user's devices when ge recieves a notification ([b7c0bc2](https://github.com/part-up/part-up/commit/b7c0bc2))
* **publication:** updated contentblocks publication ([db57ecb](https://github.com/part-up/part-up/commit/db57ecb))
* **push-notifications:** send a push notification to the user on every normal notification ([8dcdf36](https://github.com/part-up/part-up/commit/8dcdf36))
* **scroll:** preventScrollPropagation helper for scroll containers like dropdowns. this helper prevents the propagation of the mousewheel event to parent elements for a better scrolling experience ([cba7d55](https://github.com/part-up/part-up/commit/cba7d55))
* **security:** added param checks to users autocomplete method ([6c382c1](https://github.com/part-up/part-up/commit/6c382c1))
* **started-typing:** fixed the problem where new objects would be added to the set when there was already an object for that user ([ff0d86d](https://github.com/part-up/part-up/commit/ff0d86d))
* **typing:** typing indicator ([60d0619](https://github.com/part-up/part-up/commit/60d0619))



<a name="1.18.1"></a>
## [1.18.1](https://github.com/part-up/part-up/compare/1.17.8...1.18.1) (2016-05-20)


### Bug Fixes

* **events:** fire events to API when CRUD'ding network object ([2f51b11](https://github.com/part-up/part-up/commit/2f51b11))
* **tribeuppers:** add translation for hardcoded invite uppers tile ([04aa2b9](https://github.com/part-up/part-up/commit/04aa2b9))



<a name="1.17.8"></a>
## [1.17.8](https://github.com/part-up/part-up/compare/1.17.7...1.17.8) (2016-05-19)


### Bug Fixes

* **about:** admins are aligned to center, this behaviour has the best looking layout behaviour ([e4ccb69](https://github.com/part-up/part-up/commit/e4ccb69))
* **about:** fixed most bugs in issue [#299](https://github.com/part-up/part-up/issues/299) ([1c5fdd3](https://github.com/part-up/part-up/commit/1c5fdd3)), closes [#299](https://github.com/part-up/part-up/issues/299)
* **about:** implemented the sorting fix on the about page ([1d6b24f](https://github.com/part-up/part-up/commit/1d6b24f))
* **about:** placeholders and translations ([d43f8ef](https://github.com/part-up/part-up/commit/d43f8ef))
* **about:** removed margin on faces and align properly ([d758f08](https://github.com/part-up/part-up/commit/d758f08))
* **about:** sorting of the content blocks works on mobile now, this issue had to do with the way the return value of the Array.sort() function is interpreted in different browsers ([464f486](https://github.com/part-up/part-up/commit/464f486))
* **aboutsettings:** fix hardcoded placeholder value for contentblock textarea ([d60f9ce](https://github.com/part-up/part-up/commit/d60f9ce))
* **admin:** use admin_id if no admins array is present ([d1d4482](https://github.com/part-up/part-up/commit/d1d4482))
* **analytics:** return if there are no properties (for development) ([cd23630](https://github.com/part-up/part-up/commit/cd23630))
* **contentblock:** image preview fixed, also dometimes the contentblock would not be wrapped in a html tag, i also fixed this issue ([ff594f7](https://github.com/part-up/part-up/commit/ff594f7))
* **contentblocks:** fixed the contentblocks publication ([b9d8120](https://github.com/part-up/part-up/commit/b9d8120))
* **contentblocks:** images are stored again ([d47c7dd](https://github.com/part-up/part-up/commit/d47c7dd))
* **contentforms:** final changes for the weelk ([adab4b5](https://github.com/part-up/part-up/commit/adab4b5))
* **csv:** csv button ([e377141](https://github.com/part-up/part-up/commit/e377141))
* **featuredPartup:** subscribe to the author id fixing [#412](https://github.com/part-up/part-up/issues/412) ([9c20ff2](https://github.com/part-up/part-up/commit/9c20ff2))
* **images:** fixed unwanted error ([1dbad13](https://github.com/part-up/part-up/commit/1dbad13))
* **invite:** add invite tile to first column ([f546aeb](https://github.com/part-up/part-up/commit/f546aeb))
* **messages:** add validation on max message length ([4b1e09d](https://github.com/part-up/part-up/commit/4b1e09d))
* **network:** added translations ([dd2c022](https://github.com/part-up/part-up/commit/dd2c022))
* **network:** start of invite tile ([e426bd0](https://github.com/part-up/part-up/commit/e426bd0))
* **partup_settings:** support translation when notifying errors ([c8b10cf](https://github.com/part-up/part-up/commit/c8b10cf))
* **prompt:** use buttons instead of anchors ([f2f6a29](https://github.com/part-up/part-up/commit/f2f6a29))
* **schema:** added type for contentblocks ([a4d35d6](https://github.com/part-up/part-up/commit/a4d35d6))
* **search:** correct expanding behaviour ([0c30a38](https://github.com/part-up/part-up/commit/0c30a38))
* **search:** moved the focus call to the same callstack as the class toggler, to trick safari in thinking the user wanted to focus on the search-input fixing [#301](https://github.com/part-up/part-up/issues/301) ([e5cd0b4](https://github.com/part-up/part-up/commit/e5cd0b4))
* **search:** search form doesnt reload page fixing [#301](https://github.com/part-up/part-up/issues/301) ([7edd6bf](https://github.com/part-up/part-up/commit/7edd6bf))
* **search:** unfold on click instead of hover ([3876d4a](https://github.com/part-up/part-up/commit/3876d4a))
* **translation:** removed lorem ipsum ([613878e](https://github.com/part-up/part-up/commit/613878e))
* **translations:** about page translations ([caf5571](https://github.com/part-up/part-up/commit/caf5571))
* **tribe-about:** fixed the initialization of the about page fixing [#298](https://github.com/part-up/part-up/issues/298) ([abd7d6b](https://github.com/part-up/part-up/commit/abd7d6b))
* **tribe-uppers:** fixed bugs reported in issue [#284](https://github.com/part-up/part-up/issues/284) ([b7b4c3f](https://github.com/part-up/part-up/commit/b7b4c3f)), closes [#284](https://github.com/part-up/part-up/issues/284)
* **tribeadmin:** change csv header copy from technical keys to readable words ([23f50a1](https://github.com/part-up/part-up/commit/23f50a1))
* **tribepartupsearch:** change search method to implement similar regex search in network search partups as user invite modal (fixes [#300](https://github.com/part-up/part-up/issues/300)) ([30660b0](https://github.com/part-up/part-up/commit/30660b0)), closes [#300](https://github.com/part-up/part-up/issues/300)
* **tribes:** fix security leak by ensuring use clean copy of public user fields constant on each separate request. ([d44253b](https://github.com/part-up/part-up/commit/d44253b))
* **wysiwyg:** added view html button ([e48ee8a](https://github.com/part-up/part-up/commit/e48ee8a))
* **wyswig:** onclick focus on contenteditable fields that immediatly focus on ios when tapped one time instead of two, fixing [#298](https://github.com/part-up/part-up/issues/298) ([358471a](https://github.com/part-up/part-up/commit/358471a))


### Features

* **about:** add about page ([a5f5d99](https://github.com/part-up/part-up/commit/a5f5d99))
* **about:** add composition file and add tag list ([c450ff6](https://github.com/part-up/part-up/commit/c450ff6))
* **about:** add headings, copy, img and contact ([0356849](https://github.com/part-up/part-up/commit/0356849))
* **about:** add translation files ([df752a9](https://github.com/part-up/part-up/commit/df752a9))
* **about:** add translation files ([5992c15](https://github.com/part-up/part-up/commit/5992c15))
* **action-tile:** added call to action tiles in the network tabs ([a731964](https://github.com/part-up/part-up/commit/a731964))
* **contentblocks:** added contentblock collection ([7ce12f5](https://github.com/part-up/part-up/commit/7ce12f5))
* **contentblocks:** added contentblock schema ([e2e1d83](https://github.com/part-up/part-up/commit/e2e1d83))
* **contentblocks:** added contentblock sequence method for networks ([578d0d3](https://github.com/part-up/part-up/commit/578d0d3))
* **contentblocks:** added contentblock to network schema ([318c5b7](https://github.com/part-up/part-up/commit/318c5b7))
* **contentblocks:** added insert contentblock method ([df91f87](https://github.com/part-up/part-up/commit/df91f87))
* **contentblocks:** added network collection helper to check if a contentblock belongs to the network ([19016a6](https://github.com/part-up/part-up/commit/19016a6))
* **contentblocks:** added publication ([2aa06d1](https://github.com/part-up/part-up/commit/2aa06d1))
* **contentblocks:** added transformers ([032bc83](https://github.com/part-up/part-up/commit/032bc83))
* **contentblocks:** content block forms and views ([ff92337](https://github.com/part-up/part-up/commit/ff92337))
* **contentblocks:** finalized insert block to network method ([57c0c20](https://github.com/part-up/part-up/commit/57c0c20))
* **contentblocks:** finalized remove block to network method ([84c0bee](https://github.com/part-up/part-up/commit/84c0bee))
* **contentblocks:** finalized update block in network method ([eb9f801](https://github.com/part-up/part-up/commit/eb9f801))
* **contentblocks:** fixed some checking errors ([9eba6ce](https://github.com/part-up/part-up/commit/9eba6ce))
* **contentblocks:** implementation ([a641baf](https://github.com/part-up/part-up/commit/a641baf))
* **contentblocks:** only allow 1 image per contenblock ([3591c14](https://github.com/part-up/part-up/commit/3591c14))
* **contentblocks:** only allow 1 intro type ([eb5a6cf](https://github.com/part-up/part-up/commit/eb5a6cf))
* **contentblocks:** publish contenblocks for a network ([bcf3ea7](https://github.com/part-up/part-up/commit/bcf3ea7))
* **contentblocks:** update blocks in network method ([8025f1f](https://github.com/part-up/part-up/commit/8025f1f))
* **contentSequence:** users can reorder the content sequence ([71bfc86](https://github.com/part-up/part-up/commit/71bfc86))
* **csv:** export tribe upper list as csv ([71d625e](https://github.com/part-up/part-up/commit/71d625e))
* **development:** add start-debug script to start meteor-debug command ([1c3ecd2](https://github.com/part-up/part-up/commit/1c3ecd2))
* **env.sh:** add push notifications related keys to development env.sh ([f11ef17](https://github.com/part-up/part-up/commit/f11ef17))
* **heap-analytics:** add heap analytics tag code and indetify user in the login succes hook ([7f83f31](https://github.com/part-up/part-up/commit/7f83f31))
* **migration:** convert admin_id string to admins array for all networks ([e8accdb](https://github.com/part-up/part-up/commit/e8accdb))
* **ops:** update apple push notification pfx files to use new app bundle certificates ([42ba160](https://github.com/part-up/part-up/commit/42ba160))
* **partup-search:** made the search for partups working ([3730da1](https://github.com/part-up/part-up/commit/3730da1))
* **search:** partup search ([d265dc6](https://github.com/part-up/part-up/commit/d265dc6))
* **search:** put the searchcomponent in it's own template ([60bafcb](https://github.com/part-up/part-up/commit/60bafcb))
* **seo:** added tribe about page seo snippet ([41951f7](https://github.com/part-up/part-up/commit/41951f7))
* **tags-search:** swarm tags now search in tribes ([02beef6](https://github.com/part-up/part-up/commit/02beef6))
* **tribe-admin:** added transformer for admin form ([8ebf667](https://github.com/part-up/part-up/commit/8ebf667))
* **tribe-admin:** allow maximum of 10 admins ([c180e59](https://github.com/part-up/part-up/commit/c180e59))
* **tribe-admins:** added admins to exposed network fields ([be638fc](https://github.com/part-up/part-up/commit/be638fc))
* **tribe-admins:** dont remove admin if its the last one ([3db467a](https://github.com/part-up/part-up/commit/3db467a))
* **tribe-admins:** expose email addresses to admins ([65f26e8](https://github.com/part-up/part-up/commit/65f26e8))
* **tribe-admins:** implemented functionality to make user an admin ([3398bfb](https://github.com/part-up/part-up/commit/3398bfb))
* **tribe-admins:** implemented functionality to remove user from admin list ([02a15be](https://github.com/part-up/part-up/commit/02a15be))
* **tribe-admins:** when removing a user from the network that was also an admin, remove the user from the admin list ([d2102ce](https://github.com/part-up/part-up/commit/d2102ce))
* **tribe-uppers:** multiple admins and upper search ([903d7de](https://github.com/part-up/part-up/commit/903d7de))
* **tribes:** allow search for uppers ([3b1a7af](https://github.com/part-up/part-up/commit/3b1a7af))
* **tribes:** allow to search for partups ([37dedc2](https://github.com/part-up/part-up/commit/37dedc2))
* **upper-search:** search for uppers in tribes is now working ([e5cd6ab](https://github.com/part-up/part-up/commit/e5cd6ab))
* **usersearch:** user search on network page ([74d9adf](https://github.com/part-up/part-up/commit/74d9adf))
* **wysiwyg:** fully working wysiwyg editor ([ea05180](https://github.com/part-up/part-up/commit/ea05180))
* **wysiwyg editor:** removed summernote because it wouldn't work, added Trumbowyg instead. It's more lightweight and does not need any dependencies like bootstrap css ([6cd73cd](https://github.com/part-up/part-up/commit/6cd73cd))
* **wyswig:** fixed the prefill feature ([3dc7f82](https://github.com/part-up/part-up/commit/3dc7f82))



<a name="1.17.7"></a>
## [1.17.7](https://github.com/part-up/part-up/compare/1.17.6...1.17.7) (2016-05-06)


### Bug Fixes

* **imagemagick:** added policy.xml to fix imagetragick vulnerability ([f1ce9ab](https://github.com/part-up/part-up/commit/f1ce9ab))
* **notifications:** fix check ([362ce13](https://github.com/part-up/part-up/commit/362ce13))
* **notifications:** fix type_data for activity-related notifications to provide activity's update_id ([c65e239](https://github.com/part-up/part-up/commit/c65e239))
* **notifications:** fix type_data for activity-related notifications to provide activity's update_id instead of own update_id ([1e36b46](https://github.com/part-up/part-up/commit/1e36b46))
* **partup-updates:** fix update comments authors avatar images publications ([af6bd29](https://github.com/part-up/part-up/commit/af6bd29))


### Features

* **cookie-law-bar:** add cookie package and change intercom button style when cookiebar is present ([d4ff1a0](https://github.com/part-up/part-up/commit/d4ff1a0))
* **cookie-law-bar:** add fixed cookie lawbar on the bottom of the page and provide translation texts for this feat ([410f128](https://github.com/part-up/part-up/commit/410f128))
* **cookie-law-bar:** change the style of the footer corresponding to styleguide ([b237a0d](https://github.com/part-up/part-up/commit/b237a0d))



<a name="1.17.6"></a>
## [1.17.6](https://github.com/part-up/part-up/compare/1.17.5...1.17.6) (2016-05-02)


### Features

* **dropbox-share-settings:** implement oAuth to set settings permission after picking a file ([32d97dd](https://github.com/part-up/part-up/commit/32d97dd))



<a name="1.17.5"></a>
## [1.17.5](https://github.com/part-up/part-up/compare/1.17.4...1.17.5) (2016-04-30)


### Bug Fixes

* **cors:** allow CORS from all origins in HTTP calls on behalf of the Part-up app (subscriptions and methods already do that) ([4499831](https://github.com/part-up/part-up/commit/4499831))
* **dropbox-chooser:** consider catch error ([a83a20a](https://github.com/part-up/part-up/commit/a83a20a))
* **fileUploader:** give preference to filename check and fallback to mimeType ([b6917c0](https://github.com/part-up/part-up/commit/b6917c0))
* **fileUploader:** make sure that mimeType exists ([bc03cd3](https://github.com/part-up/part-up/commit/bc03cd3))
* **footer:** not all the footer links are linked to the correct url/phrase app keys [#389](https://github.com/part-up/part-up/issues/389) ([d5a4aaa](https://github.com/part-up/part-up/commit/d5a4aaa))
* **google-drive-picker:** add nbsp; to the empty bytes value to fill up space in document renderer ([e8612c7](https://github.com/part-up/part-up/commit/e8612c7))
* **google-drive-picker:** authorize immediate and wait for setting default permission is done, before uploading ([000964d](https://github.com/part-up/part-up/commit/000964d))
* **google-drive-picker:** don't authorize when have access_token ([18b2937](https://github.com/part-up/part-up/commit/18b2937))
* **google-drive-picker:** enable setDeveloperKey ([b640d61](https://github.com/part-up/part-up/commit/b640d61))
* **google-drive-picker:** fix ES6 syntax typo in google drive picker, unfailing the build hopefully ([d6a9435](https://github.com/part-up/part-up/commit/d6a9435))
* **google-drive-picker:** force correct document scheme ([2451b42](https://github.com/part-up/part-up/commit/2451b42))
* **google-drive-picker:** force sizeBytes to be 0  when isNan is false ([9159616](https://github.com/part-up/part-up/commit/9159616))
* **google-drive-picker:** ommit setDevelopeKey ([b7029f4](https://github.com/part-up/part-up/commit/b7029f4))
* **google-drive-picker:** ommit setDeveloperKey ([e3eba9b](https://github.com/part-up/part-up/commit/e3eba9b))
* **google-drive-picker:** remove toggleing double tab, cause it has no effect ([aff4f98](https://github.com/part-up/part-up/commit/aff4f98))
* **google-drive-picker:** render html tag with tripple curly for &nbsp; ([f20a22f](https://github.com/part-up/part-up/commit/f20a22f))
* **notifications:** fix notifications images publication ([3fa84c0](https://github.com/part-up/part-up/commit/3fa84c0))
* **phraseapp-commit-push:** change the way it runs the git command ([d6b9e99](https://github.com/part-up/part-up/commit/d6b9e99))
* **translation-dropbownbutton:** add new counter translations and make the dropdown container width bigger for loading icon ([0d22509](https://github.com/part-up/part-up/commit/0d22509))


### Features

* **google-drive-picker:** able to browse through folders view ([956aade](https://github.com/part-up/part-up/commit/956aade))
* **google-drive-picker:** able to upload with google drive and render icons based on mimeTypes ([e1e33cd](https://github.com/part-up/part-up/commit/e1e33cd))
* **google-drive-picker:** add correct link image url for google drive upload ([90aecef](https://github.com/part-up/part-up/commit/90aecef))
* **google-drive-picker:** add official part-up google drive api credentials ([2866185](https://github.com/part-up/part-up/commit/2866185))
* **google-drive-picker:** add support uppercase extensions ([b65fa30](https://github.com/part-up/part-up/commit/b65fa30))
* **google-drive-picker:** fallback to general file extension when mimeType is unknown ([12f55c4](https://github.com/part-up/part-up/commit/12f55c4))
* **google-drive-picker:** return blank string when no byte size found ([a815187](https://github.com/part-up/part-up/commit/a815187))
* **google-drive-picker:** toggling double tabzoom ([3efb770](https://github.com/part-up/part-up/commit/3efb770))
* **google-driver-picker:** set fullWidth and fullHeight size on the small screen sizes ([10af5ae](https://github.com/part-up/part-up/commit/10af5ae))
* **icon-logo:** add icon logo for google consent screen ([1db6630](https://github.com/part-up/part-up/commit/1db6630))
* **new-phraseapp-setup:** add new phrasea app setup with simpler command and update phraseapp translation ([d235441](https://github.com/part-up/part-up/commit/d235441))
* **phraseapp-job:** ask if user wants to commit and push after pull ([d99416e](https://github.com/part-up/part-up/commit/d99416e))
* **phraseapp-job:** ask if user wants to commit and push after pull ([08c4567](https://github.com/part-up/part-up/commit/08c4567))



<a name="1.17.4"></a>
## [1.17.4](https://github.com/part-up/part-up/compare/1.17.3...1.17.4) (2016-04-12)


### Bug Fixes

* **login:** fix redirect to discover in chrome ios on specific url load fix [#352](https://github.com/part-up/part-up/issues/352) ([c4c6018](https://github.com/part-up/part-up/commit/c4c6018)), closes [#352](https://github.com/part-up/part-up/issues/352)
* **networks:** fix tribe admin race condition by exposing admin_id in public metadata fix [#352](https://github.com/part-up/part-up/issues/352) ([a962f13](https://github.com/part-up/part-up/commit/a962f13)), closes [#352](https://github.com/part-up/part-up/issues/352)



<a name="1.17.3"></a>
## [1.17.3](https://github.com/part-up/part-up/compare/1.17.2...1.17.3) (2016-04-08)


### Bug Fixes

* **docker:** remove depricated docker file to avoid confusion ([d15e37d](https://github.com/part-up/part-up/commit/d15e37d))
* **iconfonts:** removed svg and eot fonts, added support for woff2 font type, also the correct file is nouw outputted in .sass format, so no extra action is needed to implement the font-icon css ([fa5de7a](https://github.com/part-up/part-up/commit/fa5de7a))
* **infinite-scroll:** removed updates loader since it is unnecessary with a load more button ([689ae47](https://github.com/part-up/part-up/commit/689ae47))
* **infinite-scroll:** set scroll event listener on document instead of window to fix the infinte scoll issue ([0687c5c](https://github.com/part-up/part-up/commit/0687c5c))
* **partup:** implemented temporary load more button on partup-updates page ([d2101f2](https://github.com/part-up/part-up/commit/d2101f2))



<a name="1.17.2"></a>
## [1.17.2](https://github.com/part-up/part-up/compare/1.17.1...1.17.2) (2016-04-07)


### Bug Fixes

* **icons:** icons are properly aligned again on all windows browsers ([0dcd962](https://github.com/part-up/part-up/commit/0dcd962))
* **icons:** icons are properly aligned again on all windows browsers ([9ea0fdf](https://github.com/part-up/part-up/commit/9ea0fdf))
* **search:** tags are highlighted when there is no description ([2c31c27](https://github.com/part-up/part-up/commit/2c31c27))



<a name="1.17.1"></a>
## [1.17.1](https://github.com/part-up/part-up/compare/1.16.11...1.17.1) (2016-04-05)


### Bug Fixes

* **404:** added translations and created a new 404 page for tribestart ([d16c590](https://github.com/part-up/part-up/commit/d16c590))
* **404:** tribe start tags not clickable when it's a 404 page ([618ecc8](https://github.com/part-up/part-up/commit/618ecc8))
* **accordion:** height fix ([40f4323](https://github.com/part-up/part-up/commit/40f4323))
* **activepartups:** fixed displaced parties in issue [#201](https://github.com/part-up/part-up/issues/201) ([c5fc5bd](https://github.com/part-up/part-up/commit/c5fc5bd)), closes [#201](https://github.com/part-up/part-up/issues/201)
* **activity:** pass along prefillValueKey to prefill end_date when editing. fixing [#267](https://github.com/part-up/part-up/issues/267) ([6146f96](https://github.com/part-up/part-up/commit/6146f96))
* **app:** reload the app template when the current user chaned (logout/login) ([6eb2649](https://github.com/part-up/part-up/commit/6eb2649))
* **auto form:** include helper for array manipulation ([6ab7e1c](https://github.com/part-up/part-up/commit/6ab7e1c))
* **avatars:** improved the naming of avatar and avatar stacks to be more consistent ([4fa7ba2](https://github.com/part-up/part-up/commit/4fa7ba2))
* **bootstrap:** all images are available again. ([42dcb23](https://github.com/part-up/part-up/commit/42dcb23))
* **copy invite mails:** improved copy after searchquery was added ([6e1d514](https://github.com/part-up/part-up/commit/6e1d514))
* **datePicker:** removed standard startDate from the datepicker and made it optional fixing [#288](https://github.com/part-up/part-up/issues/288) ([0482cdd](https://github.com/part-up/part-up/commit/0482cdd))
* **datePicker:** removed standard startDate from the datepicker and made it optional fixing [#288](https://github.com/part-up/part-up/issues/288) ([481aaa0](https://github.com/part-up/part-up/commit/481aaa0))
* **dropbox-chooser:** check if dropboxFile is defined ([bc05972](https://github.com/part-up/part-up/commit/bc05972))
* **dropbox-chooser:** fix document initialization by avoiding setting of null value (and trying to push to that null value later on) ([1d163c7](https://github.com/part-up/part-up/commit/1d163c7))
* **dropbox-chooser:** include the documents array when updating a message on the serverside ([8e18c1c](https://github.com/part-up/part-up/commit/8e18c1c))
* **email-invite:** re-enabled submit hook ([fc61ee7](https://github.com/part-up/part-up/commit/fc61ee7))
* **envvars:** fixed dev env vars for amazon bucket. ([b562eec](https://github.com/part-up/part-up/commit/b562eec))
* **featured partups:** remove console log ([b936370](https://github.com/part-up/part-up/commit/b936370))
* **featured-networks:** fixed the wrong hovercard display. fixing [#71](https://github.com/part-up/part-up/issues/71) ([2df3253](https://github.com/part-up/part-up/commit/2df3253))
* **featuredtile:** fixed lineheight of featured tile fixing [#303](https://github.com/part-up/part-up/issues/303) ([51a507f](https://github.com/part-up/part-up/commit/51a507f))
* **featuredtile:** fixed lineheight of featured tile fixing [#303](https://github.com/part-up/part-up/issues/303) ([b607c89](https://github.com/part-up/part-up/commit/b607c89))
* **header:** tribe header final changes ([697447e](https://github.com/part-up/part-up/commit/697447e))
* **iconfont:** converted coffee to javascript (LORDREEKUS) ([0f73ba3](https://github.com/part-up/part-up/commit/0f73ba3))
* **icons:** dirty font warning fix ([ae55f00](https://github.com/part-up/part-up/commit/ae55f00))
* **icons:** updated icons and added show icon to tribe header ([c582aba](https://github.com/part-up/part-up/commit/c582aba))
* **invite:** check the current query in method callback to make sure the results are right to prevent duplicates or wrong search output ([876015e](https://github.com/part-up/part-up/commit/876015e))
* **invite:** description doesn't overflow past 4 lines anymore ([f4e2aa1](https://github.com/part-up/part-up/commit/f4e2aa1))
* **invite:** fix layout ([63d191e](https://github.com/part-up/part-up/commit/63d191e))
* **invite:** got networks and parts mixed up ([018279e](https://github.com/part-up/part-up/commit/018279e))
* **invite:** prevented loading state from removing all results ([84c1247](https://github.com/part-up/part-up/commit/84c1247))
* **invite modal:** multiple email invites ([7e1a615](https://github.com/part-up/part-up/commit/7e1a615))
* **invite tile:** pass search query ([c618441](https://github.com/part-up/part-up/commit/c618441))
* **invite tile:** translation update ([38f134b](https://github.com/part-up/part-up/commit/38f134b))
* **invite-search:** tags are now only highlighted if there is an actual match ([422aa06](https://github.com/part-up/part-up/commit/422aa06))
* **invites:** indicate loading state to prevent false "no results" ([b6a01c1](https://github.com/part-up/part-up/commit/b6a01c1))
* **invites:** placeholders for empty search ([d0a0791](https://github.com/part-up/part-up/commit/d0a0791))
* **logo:** resized the small variant ([f559eed](https://github.com/part-up/part-up/commit/f559eed))
* **message:** check the uploaded photos length to prevent more images being uploaded ([9920f1b](https://github.com/part-up/part-up/commit/9920f1b))
* **message:** check the uploaded photos length to prevent more images being uploaded ([bf8a7e7](https://github.com/part-up/part-up/commit/bf8a7e7))
* **message:** fixed max image upload on edit fixing [#294](https://github.com/part-up/part-up/issues/294) ([47d5018](https://github.com/part-up/part-up/commit/47d5018))
* **message:** fixed max image upload on edit fixing [#294](https://github.com/part-up/part-up/issues/294) ([0dd1ccb](https://github.com/part-up/part-up/commit/0dd1ccb))
* **miulti-invite:** styling for selectable row ([3c67db6](https://github.com/part-up/part-up/commit/3c67db6))
* **network:** tribe header fix ([9cd92c0](https://github.com/part-up/part-up/commit/9cd92c0))
* **network-settings:** added check to see if user is admin, this was still missing for closed tribes, fixing [#306](https://github.com/part-up/part-up/issues/306) ([36794e6](https://github.com/part-up/part-up/commit/36794e6))
* **partners:** fixed the comumnslayout ([59df834](https://github.com/part-up/part-up/commit/59df834))
* **partners:** fixed the partners route error ([10183a1](https://github.com/part-up/part-up/commit/10183a1))
* **partup:** network url checks if user is a member ([18116b8](https://github.com/part-up/part-up/commit/18116b8))
* **partup-tile:** removed calc() from transform:translateX fixing [#279](https://github.com/part-up/part-up/issues/279) ([9cc4599](https://github.com/part-up/part-up/commit/9cc4599))
* **partup-tile:** removed calc() from transform:translateX fixing [#279](https://github.com/part-up/part-up/issues/279) ([e5c6e63](https://github.com/part-up/part-up/commit/e5c6e63))
* **partups:** fix a console error ([2ccddbb](https://github.com/part-up/part-up/commit/2ccddbb))
* **profile:** in the process of fixing the result tiles in profile ([e37cc24](https://github.com/part-up/part-up/commit/e37cc24))
* **profile:** partners page translation keys ([911514a](https://github.com/part-up/part-up/commit/911514a))
* **profile:** profile result tiles alway show when available, still an issue when user logs out ([fac721c](https://github.com/part-up/part-up/commit/fac721c))
* **profile:** render issue with remove button ([2091687](https://github.com/part-up/part-up/commit/2091687))
* **prompt:** fallback buttons for prompt are translated and not undefined ([79113c9](https://github.com/part-up/part-up/commit/79113c9))
* **routes:** send swarm redirect to network instead of network-detail ([225d60c](https://github.com/part-up/part-up/commit/225d60c))
* **search:** highlighted text is truncated to only the relevant part ([6ccd12c](https://github.com/part-up/part-up/commit/6ccd12c))
* **signup:** put the validate password input in it's own label element fixing [#237](https://github.com/part-up/part-up/issues/237) ([453c6a0](https://github.com/part-up/part-up/commit/453c6a0))
* **swarm header:** logo fix ([5faa9f0](https://github.com/part-up/part-up/commit/5faa9f0))
* **tagsquery:** reset prefilled query after code has run to prevent early reset fixing [#293](https://github.com/part-up/part-up/issues/293) ([62f15d4](https://github.com/part-up/part-up/commit/62f15d4))
* **translations:** added button translation to tribe header ([2db946a](https://github.com/part-up/part-up/commit/2db946a))
* **translations:** added labels for parties on tribestarT ([b288e7c](https://github.com/part-up/part-up/commit/b288e7c))
* **translations:** added new labels ([e5e27af](https://github.com/part-up/part-up/commit/e5e27af))
* **tribe:** final styling touches ([d702c15](https://github.com/part-up/part-up/commit/d702c15))
* **tribe:** hide network label ([3a077a4](https://github.com/part-up/part-up/commit/3a077a4))
* **tribe:** routing implemented in user menu and partup tiles, also refactored the network page a bit ([2b3fcd6](https://github.com/part-up/part-up/commit/2b3fcd6))
* **tribe settings:** default image ([ee9aa20](https://github.com/part-up/part-up/commit/ee9aa20))
* **tribeadmin:** initialize stats / most active / common tags variables when creating tribe ([0bde6f1](https://github.com/part-up/part-up/commit/0bde6f1))
* **tribestart:** avatars clickable ([6aae3d7](https://github.com/part-up/part-up/commit/6aae3d7))
* **tribestart:** created a partups publication by networkId for the fallback on the tribestart page, also created a fallback for no partups and uppers fixing [#291](https://github.com/part-up/part-up/issues/291) and [#292](https://github.com/part-up/part-up/issues/292) ([87c5801](https://github.com/part-up/part-up/commit/87c5801))
* **tribestart:** fallback for IE with fixes issue [#201](https://github.com/part-up/part-up/issues/201) ([5df97de](https://github.com/part-up/part-up/commit/5df97de)), closes [#201](https://github.com/part-up/part-up/issues/201)
* **tribestart:** fixed the twitchiness of the accordion a bit ([fdf906b](https://github.com/part-up/part-up/commit/fdf906b))
* **tribestart:** hide partups+uppers footer from tribestart when tribe is closed fixing [#201](https://github.com/part-up/part-up/issues/201) ([8a490e9](https://github.com/part-up/part-up/commit/8a490e9))
* **tribestart:** image uploader loading state ([6234681](https://github.com/part-up/part-up/commit/6234681))
* **tribestart:** implemented most_active_uppers and most_active_partups ([25372ec](https://github.com/part-up/part-up/commit/25372ec))
* **tribestart:** improved homepage styling and added uppers and partups ([83da1c6](https://github.com/part-up/part-up/commit/83da1c6))
* **tribestart:** loaders in places where data is needed ([6577171](https://github.com/part-up/part-up/commit/6577171))
* **tribestart:** margin on bottom of page for small screens ([b21d86e](https://github.com/part-up/part-up/commit/b21d86e))
* **tribestart:** more buttons redirect to proper pages ([4777ffa](https://github.com/part-up/part-up/commit/4777ffa))
* **tribestart:** parties are displayed now ([4e56e15](https://github.com/part-up/part-up/commit/4e56e15))
* **tribestart:** partups don't bounce on page load ([d17b94c](https://github.com/part-up/part-up/commit/d17b94c))
* **tribestart:** removed twitch ([5b947ca](https://github.com/part-up/part-up/commit/5b947ca))
* **tribestart:** standard image ([864c477](https://github.com/part-up/part-up/commit/864c477))
* **tribestart:** throw 404 page when tribe is not found ([de3fe17](https://github.com/part-up/part-up/commit/de3fe17))
* **tribestart:** tribe chat popup placeholder fixing [#201](https://github.com/part-up/part-up/issues/201) ([29be671](https://github.com/part-up/part-up/commit/29be671))
* **upper suggestions:** moved tile to it's own template ([776d5f6](https://github.com/part-up/part-up/commit/776d5f6))
* **usermenu:** fixed chrome render bug of the scrollbar ([0797a0b](https://github.com/part-up/part-up/commit/0797a0b))


### Features

* **browser test:** universal helpers for browser tests ([88404ff](https://github.com/part-up/part-up/commit/88404ff))
* **checks:** added checks for IDs ([49a0d43](https://github.com/part-up/part-up/commit/49a0d43))
* **common_tags:** most common tags are displayed first on the tribestart page ([0479850](https://github.com/part-up/part-up/commit/0479850))
* **dropbox-chooser:**  add document renderer newmessage and updatemessage ([ae7fec2](https://github.com/part-up/part-up/commit/ae7fec2))
* **dropbox-chooser:**  add remove media item on newMessage dialog ([86f3757](https://github.com/part-up/part-up/commit/86f3757))
* **dropbox-chooser:**  do a better count for uploaded items ([8121900](https://github.com/part-up/part-up/commit/8121900))
* **dropbox-chooser:**  improve check totalMedia upload and prevent further upload ([07506dc](https://github.com/part-up/part-up/commit/07506dc))
* **dropbox-chooser:** add 1-2 icons layout document renderer ([23e406d](https://github.com/part-up/part-up/commit/23e406d))
* **dropbox-chooser:** add allowedUpload trigger helper and dropbox icon ([f5603a4](https://github.com/part-up/part-up/commit/f5603a4))
* **dropbox-chooser:** add dropdown menu for add media ([2997872](https://github.com/part-up/part-up/commit/2997872))
* **dropbox-chooser:** add extensions filter on input[type=file] ([31e1c6a](https://github.com/part-up/part-up/commit/31e1c6a))
* **dropbox-chooser:** add human readable filesize output for document renderer ([c43f97c](https://github.com/part-up/part-up/commit/c43f97c))
* **dropbox-chooser:** add media items live max counter ([b9592c5](https://github.com/part-up/part-up/commit/b9592c5))
* **dropbox-chooser:** add overflow filename truncate ellipsis ([23c9bc2](https://github.com/part-up/part-up/commit/23c9bc2))
* **dropbox-chooser:** add template helper checking whether image or document is loading ([6b8472e](https://github.com/part-up/part-up/commit/6b8472e))
* **dropbox-chooser:** change directLink mode to preview mode and add more allowedExtensions ([cac0095](https://github.com/part-up/part-up/commit/cac0095))
* **dropbox-chooser:** change styles for document render icon ([d1887e2](https://github.com/part-up/part-up/commit/d1887e2))
* **dropbox-chooser:** disable buttons when limit is reached and change allowedExtensions for dropbox each time ([9bd093d](https://github.com/part-up/part-up/commit/9bd093d))
* **dropbox-chooser:** document render with the correct icon on updates.html page ([e7ebdcc](https://github.com/part-up/part-up/commit/e7ebdcc))
* **dropbox-chooser:** extend upload photos on newmessage modal with dropbox chooser ([febd6e3](https://github.com/part-up/part-up/commit/febd6e3))
* **dropbox-chooser:** leverage power of promises array and update template vars in promise callback ([9f68c79](https://github.com/part-up/part-up/commit/9f68c79))
* **dropbox-chooser:** limit upload photos in edit message and disable click popup when media limit is reached ([40cff2b](https://github.com/part-up/part-up/commit/40cff2b))
* **dropbox-chooser:** prepare needed insertDoc documents (template) variables for newMessageForm action ([b5c2fe0](https://github.com/part-up/part-up/commit/b5c2fe0))
* **dropbox-chooser:** render correct svg icon based on extension on new/edit message dialog ([2ddd324](https://github.com/part-up/part-up/commit/2ddd324))
* **dropbox-chooser:** render media icon and thumbnails on newmessageDialog ([35e5d20](https://github.com/part-up/part-up/commit/35e5d20))
* **dropboxchooser:** add new schema and transforming for uploading document types ([ddfc8c8](https://github.com/part-up/part-up/commit/ddfc8c8))
* **emailinvites:** multi field input ([66d144c](https://github.com/part-up/part-up/commit/66d144c))
* **iconfont-generatror:** iconfont generator now adds a timestamp to the extension of the icon fonts ('icons.ttf?v=4732854536897456') to fix the unwanted browser caching fixing [#302](https://github.com/part-up/part-up/issues/302) ([5b9a6a6](https://github.com/part-up/part-up/commit/5b9a6a6))
* **infinite-scroll:** added support for limit and skip options ([bd0dfbe](https://github.com/part-up/part-up/commit/bd0dfbe))
* **invite:** add caret icon to invite link ([0514510](https://github.com/part-up/part-up/commit/0514510))
* **invite:** implemented net upper search in networks invite ([9b21ea5](https://github.com/part-up/part-up/commit/9b21ea5))
* **invite:** infinite scroll implementation ([0088085](https://github.com/part-up/part-up/commit/0088085))
* **invite:** invite to activity modal refactor/restyling ([3c2f36c](https://github.com/part-up/part-up/commit/3c2f36c))
* **invite:** set searchQuery to a blank string if nothing provided ([ea1ca96](https://github.com/part-up/part-up/commit/ea1ca96))
* **invite-tile:** add invite-tile ([1d93897](https://github.com/part-up/part-up/commit/1d93897))
* **invite-tile:** invite tile with more metadata per user with query highlighting ([176bd37](https://github.com/part-up/part-up/commit/176bd37))
* **invite-tile list:** add highlight text ([e2e41be](https://github.com/part-up/part-up/commit/e2e41be))
* **invite-tile list:** add invite-tile list ([926f626](https://github.com/part-up/part-up/commit/926f626))
* **invites:** added functionality to include search query into partup, activity and network invite email ([07a21a4](https://github.com/part-up/part-up/commit/07a21a4))
* **invites:** allow email invites to accept multiple invitees ([f36747e](https://github.com/part-up/part-up/commit/f36747e))
* **invites:** invited upper should not move to the end of the list [#13](https://github.com/part-up/part-up/issues/13) ([c39a1f5](https://github.com/part-up/part-up/commit/c39a1f5))
* **link:** add button text underline class ([aa8dd2e](https://github.com/part-up/part-up/commit/aa8dd2e))
* **matching:** added matching on description ([c5e8e1b](https://github.com/part-up/part-up/commit/c5e8e1b))
* **matching:** allow networkslug as identifier instead of network id ([daf0743](https://github.com/part-up/part-up/commit/daf0743))
* **matching:** implemented matching on name, tags, location and description ([5564ecc](https://github.com/part-up/part-up/commit/5564ecc))
* **matching:** when searching for searchterm with multiple terms, also search for individual words as tags ([b051c35](https://github.com/part-up/part-up/commit/b051c35))
* **math:** helper to round numbers ([c105f87](https://github.com/part-up/part-up/commit/c105f87))
* **media-dropdown:** add and style the media upload dropdown menu ([ca657ae](https://github.com/part-up/part-up/commit/ca657ae))
* **modal-overlay:** dislable closing modal by clicking on overlay when there is at least one data-dismiss element ([3b56f42](https://github.com/part-up/part-up/commit/3b56f42))
* **multi-emailinput:** implementation ([b920144](https://github.com/part-up/part-up/commit/b920144))
* **network:** changed the root route to a tribe ([7e96c37](https://github.com/part-up/part-up/commit/7e96c37))
* **network:** tribe header start ([3597a26](https://github.com/part-up/part-up/commit/3597a26))
* **network:** tribe start page ([151973a](https://github.com/part-up/part-up/commit/151973a))
* **network:** tribe start page styling ([acf7e87](https://github.com/part-up/part-up/commit/acf7e87))
* **network-partners:** added fallback if partup doesnt have uppers ([4879469](https://github.com/part-up/part-up/commit/4879469))
* **partners:** added publication for upper partners ([892b2c0](https://github.com/part-up/part-up/commit/892b2c0))
* **partners:** count partners for upper route ([cf4ad0f](https://github.com/part-up/part-up/commit/cf4ad0f))
* **partners:** find partners for upper logic ([5f99efd](https://github.com/part-up/part-up/commit/5f99efd))
* **partners:** partners tab implementation ([903922b](https://github.com/part-up/part-up/commit/903922b))
* **partners:** remove the requested upper from the partner ([af3e8e1](https://github.com/part-up/part-up/commit/af3e8e1))
* **profile:** new translation files for current sprint ([ba55dde](https://github.com/part-up/part-up/commit/ba55dde))
* **profile:** partners route ([cb5543f](https://github.com/part-up/part-up/commit/cb5543f))
* **profile:** partners tab base ([91e53a2](https://github.com/part-up/part-up/commit/91e53a2))
* **routes:** created a clean redirect for sub routes that still allows users to use their browser back button ([a147377](https://github.com/part-up/part-up/commit/a147377))
* **routes:** user is properly redirected with the lease interference to the tribe start page or part page based on membership or a route query ([de0b377](https://github.com/part-up/part-up/commit/de0b377))
* **search:** add full width search bar ([189a686](https://github.com/part-up/part-up/commit/189a686))
* **search:** add search icon to search bar ([716ac11](https://github.com/part-up/part-up/commit/716ac11))
* **search:** fix full width search bar ([9ee7578](https://github.com/part-up/part-up/commit/9ee7578))
* **search:** sort display tags by most relevant ([d650056](https://github.com/part-up/part-up/commit/d650056))
* **stats:** updated stats cron to also update the networks that are not in a swarm ([accdf8d](https://github.com/part-up/part-up/commit/accdf8d))
* **stylesheet:** add new svg icons for and generator icon fonts ([f967063](https://github.com/part-up/part-up/commit/f967063))
* **swarm:** add compatibility for case insensitive swarm slugs, fix [#282](https://github.com/part-up/part-up/issues/282) ([b21dc70](https://github.com/part-up/part-up/commit/b21dc70)), closes [#282](https://github.com/part-up/part-up/issues/282)
* **swarm:** implemented common tags in swarm page networks by creating a collection helper that returns the common_tags with additional tags by user input ([68e7eee](https://github.com/part-up/part-up/commit/68e7eee))
* **tags:** highlight tags by search query ([c3c22b8](https://github.com/part-up/part-up/commit/c3c22b8))
* **tiles:** added fields check ([0c11ee4](https://github.com/part-up/part-up/commit/0c11ee4))
* **tribe header:** new tribe header ([87a39c3](https://github.com/part-up/part-up/commit/87a39c3))
* **tribe-start:** added active partners update to cron ([991bc89](https://github.com/part-up/part-up/commit/991bc89))
* **tribe-start:** added active_partners property to network schema ([83f93cd](https://github.com/part-up/part-up/commit/83f93cd))
* **tribe-start:** added active_partners to the networks unguarded field list ([adc972f](https://github.com/part-up/part-up/commit/adc972f))
* **tribe-start:** added background_image property ([8e88586](https://github.com/part-up/part-up/commit/8e88586))
* **tribe-start:** added background_image support in image publication ([d6502f9](https://github.com/part-up/part-up/commit/d6502f9))
* **tribe-start:** added background_image to unguardedFields ([872cbba](https://github.com/part-up/part-up/commit/872cbba))
* **tribe-start:** added common tags gathering service ([7136ab4](https://github.com/part-up/part-up/commit/7136ab4))
* **tribe-start:** added common_tags to network ([c04a7fa](https://github.com/part-up/part-up/commit/c04a7fa))
* **tribe-start:** added cron for gathering common tags ([1332076](https://github.com/part-up/part-up/commit/1332076))
* **tribe-start:** added network service that selects the most active partners throughout the tribe ([fb968d4](https://github.com/part-up/part-up/commit/fb968d4))
* **tribe-start:** added new active properties to unguardedFields ([437a368](https://github.com/part-up/part-up/commit/437a368))
* **tribe-start:** also include archived partups into common tags gathering ([b146c41](https://github.com/part-up/part-up/commit/b146c41))
* **tribe-start:** removed the active_partners property and changed the logic of the service to re-order the tribe uppers based on how many partups of the tribe they're partner of ([98378c5](https://github.com/part-up/part-up/commit/98378c5))
* **tribe-start:** renamed service method and added service to that sorts and saves the most popular partups ([e64a50f](https://github.com/part-up/part-up/commit/e64a50f))
* **tribe-start:** renamed the sort_uppers cron to reflect the fact that it also sorts the partups ([d5f65ee](https://github.com/part-up/part-up/commit/d5f65ee))
* **tribe-start:** updated the constants file and added partup namespace where I forgot them in the past ([d49f64a](https://github.com/part-up/part-up/commit/d49f64a))
* **tribestart:** background image uploader and implementation ([dfabf88](https://github.com/part-up/part-up/commit/dfabf88))
* **tribestart:** fully working start page with party accordion ([3b186e8](https://github.com/part-up/part-up/commit/3b186e8))
* **tribestart:** settings button on tribe startpage for admins only ([9c148df](https://github.com/part-up/part-up/commit/9c148df))



<a name="1.16.11"></a>
## [1.16.11](https://github.com/part-up/part-up/compare/1.16.10...1.16.11) (2016-03-07)


### Bug Fixes

* **message:** fixed new message button margin fixing [#54](https://github.com/part-up/part-up/issues/54) ([f881aef](https://github.com/part-up/part-up/commit/f881aef))
* **notifications:** enable new upper in tribe notification for public tribes [#158](https://github.com/part-up/part-up/issues/158) ([a6612a2](https://github.com/part-up/part-up/commit/a6612a2))
* **register:** extra guard for profile name when registering through facebook or linkedin ([9a84743](https://github.com/part-up/part-up/commit/9a84743))
* **tribe-notifications:** fixed bug where invite networks didn't receive notifications for uninvited requests [#231](https://github.com/part-up/part-up/issues/231) ([4f7f925](https://github.com/part-up/part-up/commit/4f7f925)), closes [#231](https://github.com/part-up/part-up/issues/231)



<a name="1.16.10"></a>
## [1.16.10](https://github.com/part-up/part-up/compare/1.16.9...1.16.10) (2016-03-02)



<a name="1.16.9"></a>
## [1.16.9](https://github.com/part-up/part-up/compare/1.16.8...1.16.9) (2016-03-01)


### Bug Fixes

* **archive:** disabled all filter until possible implementation ([f873da8](https://github.com/part-up/part-up/commit/f873da8))
* **archive filter:** alignment corrected in network ([c57f1de](https://github.com/part-up/part-up/commit/c57f1de))
* **archive_filter:** column actions have a max height to prevent layout issues ([2067b0c](https://github.com/part-up/part-up/commit/2067b0c))
* **archived part:** fixed part archived state fixing [#253](https://github.com/part-up/part-up/issues/253) ([108d2c4](https://github.com/part-up/part-up/commit/108d2c4))
* **archived_partup:** removed stray log ([985038a](https://github.com/part-up/part-up/commit/985038a))
* **archived_partups:** account for archived parties in count query ([7735405](https://github.com/part-up/part-up/commit/7735405))
* **archived_partups:** added a update type ([a680280](https://github.com/part-up/part-up/commit/a680280))
* **archived_partups:** check to see if the response is the right one by comparing the archived boolean fixing [#251](https://github.com/part-up/part-up/issues/251) ([f4ab113](https://github.com/part-up/part-up/commit/f4ab113))
* **archived_partups:** fixed the count on networks page ([997a5b4](https://github.com/part-up/part-up/commit/997a5b4))
* **archived_partups:** translations for network page ([a15c6ef](https://github.com/part-up/part-up/commit/a15c6ef))
* **archived-partups:** adjusted the upper avatars and the count so they all align properly fixing [#252](https://github.com/part-up/part-up/issues/252) ([60c0217](https://github.com/part-up/part-up/commit/60c0217))
* **avatars:** fixed avatar url on party archived tile ([397db22](https://github.com/part-up/part-up/commit/397db22))
* **columns layout:** return deferred callback if the template does not exist ([683c5c2](https://github.com/part-up/part-up/commit/683c5c2))
* **comment:** error handling in comment update fixes [#130](https://github.com/part-up/part-up/issues/130) ([3443aa6](https://github.com/part-up/part-up/commit/3443aa6)), closes [#130](https://github.com/part-up/part-up/issues/130)
* **daily-digest:** provide a fallback to a user's locale when it's not compatible with a mail template ([f1b2965](https://github.com/part-up/part-up/commit/f1b2965))
* **emoji:** cleanup old emoji dependency, update documentation ([024886b](https://github.com/part-up/part-up/commit/024886b))
* **i18n:** last of the missing __ refactors ([3da6f8b](https://github.com/part-up/part-up/commit/3da6f8b))
* **icons:** fixed false errors ([205939f](https://github.com/part-up/part-up/commit/205939f))
* **icons:** tag icon updated ([b6c576f](https://github.com/part-up/part-up/commit/b6c576f))
* **invite:** fixed hover cards on party and network invite to fix issue [#129](https://github.com/part-up/part-up/issues/129) ([acde9cb](https://github.com/part-up/part-up/commit/acde9cb)), closes [#129](https://github.com/part-up/part-up/issues/129)
* **invite:** tweaked the saying of the upper list to fix [#12](https://github.com/part-up/part-up/issues/12) ([52cf32d](https://github.com/part-up/part-up/commit/52cf32d)), closes [#12](https://github.com/part-up/part-up/issues/12)
* **invites:** removed blur event listener to prevent form submission on input blur, this fixes [#140](https://github.com/part-up/part-up/issues/140) ([e2695b6](https://github.com/part-up/part-up/commit/e2695b6)), closes [#140](https://github.com/part-up/part-up/issues/140)
* **location:** fixed bug where new location didn't get stored [#53](https://github.com/part-up/part-up/issues/53) ([b6af174](https://github.com/part-up/part-up/commit/b6af174)), closes [#53](https://github.com/part-up/part-up/issues/53)
* **partuptile:** do not init focus point if the party is archived ([0fddaaf](https://github.com/part-up/part-up/commit/0fddaaf))
* **partuptile:** fixed an annoying pertrusion of partup tags ([d6908ec](https://github.com/part-up/part-up/commit/d6908ec))
* **profile:** tags don;t break the layout ([d3ba75a](https://github.com/part-up/part-up/commit/d3ba75a))
* **quotes:** align to bottom ([c2ec4c1](https://github.com/part-up/part-up/commit/c2ec4c1))
* **swarm:** improved the explorer a bit more for mobile/tablet ([de75bfa](https://github.com/part-up/part-up/commit/de75bfa))
* **swarm:** optimised the spacing and media queries for the swarm header, also removed the offset from the ring generator and put the buttons outside the pages to allow for better pagination system ([0e3a4dd](https://github.com/part-up/part-up/commit/0e3a4dd))
* **swarm:** read more button shows on mobile ([5d0ad23](https://github.com/part-up/part-up/commit/5d0ad23))
* **translations:** removed extra comma ([ee26930](https://github.com/part-up/part-up/commit/ee26930))
* **translations:** updated some TAPi18n. calls ([e3f1aa7](https://github.com/part-up/part-up/commit/e3f1aa7))
* **tribe-partups:** upgrade networks.one.partups from publishComposite to routeComposite to avoid ordering issues ([b1fcd0d](https://github.com/part-up/part-up/commit/b1fcd0d))
* **updates:** final fixes to repair the party updates ([a64f8c8](https://github.com/part-up/part-up/commit/a64f8c8))
* **updates:** fixed the refactor of the update Template.dynamic ([74651ed](https://github.com/part-up/part-up/commit/74651ed))


### Features

* **archive-partup:** allow the Part-up admins to (un)archive partups ([076ca41](https://github.com/part-up/part-up/commit/076ca41))
* **archive-partup:** also notify supporters on (un)archive methods ([d23e77c](https://github.com/part-up/part-up/commit/d23e77c))
* **archive-partup:** fixed the publication find that can now toggle between archived an active partups ([0b07db5](https://github.com/part-up/part-up/commit/0b07db5))
* **archive-partup:** sort tribe partups on popularity ([5927247](https://github.com/part-up/part-up/commit/5927247))
* **archive-partups:** added new update and notification on both archive and unarchive ([c67657a](https://github.com/part-up/part-up/commit/c67657a))
* **archived_partups:** implement in networks ([c10ee33](https://github.com/part-up/part-up/commit/c10ee33))
* **archived_partups:** implemented the active/inactive filter on profile Partner and Supporter ([8bba558](https://github.com/part-up/part-up/commit/8bba558))
* **arhcive-partup:** Fixed some translation errors related to archive and unarchive functionality ([1e23311](https://github.com/part-up/part-up/commit/1e23311))
* **error-msg:** added missing error messages ([a9bad8b](https://github.com/part-up/part-up/commit/a9bad8b))
* **mailgun:** add mailgun tags to track emails ([b584b96](https://github.com/part-up/part-up/commit/b584b96))
* **notifications:** new notifications for archiving and unarchiving parties ([ff7447a](https://github.com/part-up/part-up/commit/ff7447a))
* **partup-archive:** sort partups on user profile by popularity ([d532733](https://github.com/part-up/part-up/commit/d532733))
* **stats:** reduced the swarm stats update interval to every 2 hours ([9033129](https://github.com/part-up/part-up/commit/9033129))
* **swarms:** replaced total upper count in content block with unique uppers in swarm count ([f7a0d93](https://github.com/part-up/part-up/commit/f7a0d93))



<a name="1.16.8"></a>
## [1.16.8](https://github.com/part-up/part-up/compare/1.16.7...1.16.8) (2016-02-23)


### Bug Fixes

* **dropdown:** translations for supporter and upper filter ([699e634](https://github.com/part-up/part-up/commit/699e634))
* **explorer:** fix header for mobile ([82c25d3](https://github.com/part-up/part-up/commit/82c25d3))
* **footer icons:** fix hover ([c6860f8](https://github.com/part-up/part-up/commit/c6860f8))
* **full width section:** fix same padding in section ([3d5ef44](https://github.com/part-up/part-up/commit/3d5ef44))
* **full-width section:** fix z-index ([392da18](https://github.com/part-up/part-up/commit/392da18))
* **header:** mobile and tablet ([f140bac](https://github.com/part-up/part-up/commit/f140bac))
* **headings:** fix headings width and margin ([903c845](https://github.com/part-up/part-up/commit/903c845))
* **icons:** added archive icon ([78cdc32](https://github.com/part-up/part-up/commit/78cdc32))
* **methods:** simplify errorhandling (throw inside findOneOrFail is not caught here anyway) ([533a87e](https://github.com/part-up/part-up/commit/533a87e))
* **network card:** fix feedback pim ([d703583](https://github.com/part-up/part-up/commit/d703583))
* **network card:** fix padding, line-height and arrow ([f2fbfc2](https://github.com/part-up/part-up/commit/f2fbfc2))
* **network card:** removed delay ([069cbcb](https://github.com/part-up/part-up/commit/069cbcb))
* **partup:** made archived state conditional ([b237136](https://github.com/part-up/part-up/commit/b237136))
* **partuptile:** archived part tile state ([09315f8](https://github.com/part-up/part-up/commit/09315f8))
* **quites:** fix padding/margin and whitespace in html ([ce4018a](https://github.com/part-up/part-up/commit/ce4018a))
* **quote:** fix height mobile/desktop ([815d116](https://github.com/part-up/part-up/commit/815d116))
* **quote:** fix height mobile/desktop ([04517a6](https://github.com/part-up/part-up/commit/04517a6))
* **quote:** fix hover on user ([9bc7475](https://github.com/part-up/part-up/commit/9bc7475))
* **quote:** media queries and min-height ([4eb5b2f](https://github.com/part-up/part-up/commit/4eb5b2f))
* **quote user:** fix whitespace in html ([2267fda](https://github.com/part-up/part-up/commit/2267fda))
* **quotes:** fix margin bottom for mobile ([2f09d72](https://github.com/part-up/part-up/commit/2f09d72))
* **quotes:** fix same padding in section ([29e7b5e](https://github.com/part-up/part-up/commit/29e7b5e))
* **routes:** add this.stop to prevent anything from happening before the swarm/network check is completed ([f0e4895](https://github.com/part-up/part-up/commit/f0e4895))
* **routes:** changed onRun to onBeforeAction to fix the broken bender animation ([06ce98d](https://github.com/part-up/part-up/commit/06ce98d))
* **routes:** changed the 'swarms.exists' method to a 'swarm.slug_is_swarm_or_network' method that determines what the slug belongs to ([d2de25c](https://github.com/part-up/part-up/commit/d2de25c))
* **routes:** implemented the new method ([d26758a](https://github.com/part-up/part-up/commit/d26758a))
* **routes:** method doc ([57dc77a](https://github.com/part-up/part-up/commit/57dc77a))
* **routes:** removed 'network.exists' method ([18735db](https://github.com/part-up/part-up/commit/18735db))
* **routes:** removed the custom callEach method ([9c21a28](https://github.com/part-up/part-up/commit/9c21a28))
* **routes:** renamed some variables ([015679c](https://github.com/part-up/part-up/commit/015679c))
* **routes:** swarm settings also changed to root slug ([0744ada](https://github.com/part-up/part-up/commit/0744ada))
* **section:** fix margins ([c0508ed](https://github.com/part-up/part-up/commit/c0508ed))
* **section:** fix padding mobile ([846ea5d](https://github.com/part-up/part-up/commit/846ea5d))
* **settings - quotes:** fix paddings/margins ([b6bd109](https://github.com/part-up/part-up/commit/b6bd109))
* **swarm:** add quote users / images to swarm.one publication ([0e4e793](https://github.com/part-up/part-up/commit/0e4e793))
* **swarm:** allow for multiple pages in swarm header ([3dd7612](https://github.com/part-up/part-up/commit/3dd7612))
* **swarm:** better distribution and pagination ([6f101de](https://github.com/part-up/part-up/commit/6f101de))
* **swarm:** changed limit and min for inner circle ([99fcacd](https://github.com/part-up/part-up/commit/99fcacd))
* **swarm:** content template doesn't error ([74f7782](https://github.com/part-up/part-up/commit/74f7782))
* **swarm:** disabled horizontal autoscroller, added placeholder for tags ([7b41463](https://github.com/part-up/part-up/commit/7b41463))
* **swarm:** finished up the detail settings page ([ba85a46](https://github.com/part-up/part-up/commit/ba85a46))
* **swarm:** fix some label references and copy updates ([4648a5d](https://github.com/part-up/part-up/commit/4648a5d))
* **swarm:** focus on tribes input to allow for fast usage ([e00cf1e](https://github.com/part-up/part-up/commit/e00cf1e))
* **swarm:** footer brand fix ([6a7da38](https://github.com/part-up/part-up/commit/6a7da38))
* **swarm:** header fixes ([e67f70a](https://github.com/part-up/part-up/commit/e67f70a))
* **swarm:** ie fallback for swarm header ([0ba1009](https://github.com/part-up/part-up/commit/0ba1009))
* **swarm:** labels for quotes and tribes are correct ([c0fd0f6](https://github.com/part-up/part-up/commit/c0fd0f6))
* **swarm:** minot styling fix ([058dda1](https://github.com/part-up/part-up/commit/058dda1))
* **swarm:** mobile header ([b0b6d88](https://github.com/part-up/part-up/commit/b0b6d88))
* **swarm:** mouse handler active again ([30981f2](https://github.com/part-up/part-up/commit/30981f2))
* **swarm:** networks had horizontal scroll buttons ([f7f8ee7](https://github.com/part-up/part-up/commit/f7f8ee7))
* **swarm:** networks scroller ([77c52de](https://github.com/part-up/part-up/commit/77c52de))
* **swarm:** networks scroller final fix ([8732f90](https://github.com/part-up/part-up/commit/8732f90))
* **swarm:** quote character count ([66c41ed](https://github.com/part-up/part-up/commit/66c41ed))
* **swarm:** quotes can be submitted and edited ([a85947f](https://github.com/part-up/part-up/commit/a85947f))
* **swarm:** quotes list now had max count ([ce80e2c](https://github.com/part-up/part-up/commit/ce80e2c))
* **swarm:** removed console.log ([49c0e12](https://github.com/part-up/part-up/commit/49c0e12))
* **swarm:** safari fix for swarm header ([c179159](https://github.com/part-up/part-up/commit/c179159))
* **swarm:** settings not accessible by non-admins ([cd33d0d](https://github.com/part-up/part-up/commit/cd33d0d))
* **swarm:** show max tribes left ([b1d34f4](https://github.com/part-up/part-up/commit/b1d34f4))
* **swarm:** swarm routes have been updated to "swarms" ([1090b1f](https://github.com/part-up/part-up/commit/1090b1f))
* **swarm:** upper count in upper list ([94a325b](https://github.com/part-up/part-up/commit/94a325b))
* **swarm:** upper count in upper list ([dda37c9](https://github.com/part-up/part-up/commit/dda37c9))
* **swarm:** uppers list ([c599e00](https://github.com/part-up/part-up/commit/c599e00))
* **swarms:** remove console logs ([bd3bb85](https://github.com/part-up/part-up/commit/bd3bb85))
* **swarms:** subscribe to users by id (show related uppers at bottom of page) ([d71c7e4](https://github.com/part-up/part-up/commit/d71c7e4))
* **tile:** delete interactivity and add overflow hidden ([a14985f](https://github.com/part-up/part-up/commit/a14985f))
* **tile:** fix arrow ([428665a](https://github.com/part-up/part-up/commit/428665a))
* **tile:** fix boolean ([559974a](https://github.com/part-up/part-up/commit/559974a))
* **tile:** fix user list in archived tile state ([9171ce1](https://github.com/part-up/part-up/commit/9171ce1))
* **video:** fix order ([d2838ef](https://github.com/part-up/part-up/commit/d2838ef))
* **video:** fix placeholder img ([25dd69c](https://github.com/part-up/part-up/commit/25dd69c))
* **video:** fix video image ([9c2773b](https://github.com/part-up/part-up/commit/9c2773b))
* **video:** fix video/section for mobile ([b22f549](https://github.com/part-up/part-up/commit/b22f549))
* **video:** fix video/section with tables ([9c431ad](https://github.com/part-up/part-up/commit/9c431ad))


### Features

* **activities:** update the activity counter on the partup when an activity gets (un)archived ([34a87ef](https://github.com/part-up/part-up/commit/34a87ef))
* **archive-partup:** added archive partup method ([7d3af63](https://github.com/part-up/part-up/commit/7d3af63))
* **archive-partup:** added archived and archived_at properties to partup schema ([882d8d7](https://github.com/part-up/part-up/commit/882d8d7))
* **archive-partup:** added collection helper ([6a6e840](https://github.com/part-up/part-up/commit/6a6e840))
* **archive-partup:** added unarchive partup method ([af0adee](https://github.com/part-up/part-up/commit/af0adee))
* **archive-partup:** exclude archived partups from dropdown menu ([072d85f](https://github.com/part-up/part-up/commit/072d85f))
* **archive-partup:** exclude archived partups from swarm/network stats ([7251a3a](https://github.com/part-up/part-up/commit/7251a3a))
* **archive-partup:** filter archived partups from discover page ([1925e06](https://github.com/part-up/part-up/commit/1925e06))
* **archive-partup:** show and hide archived partups on profile page ([35f3782](https://github.com/part-up/part-up/commit/35f3782))
* **dropdown:** added filter dropdowns to all pages where it is needed ([5987279](https://github.com/part-up/part-up/commit/5987279))
* **network:** filter dropdown for network page ([e3e405e](https://github.com/part-up/part-up/commit/e3e405e))
* **partup-archive:** removed unnecessary archived property from partup collection ([d7c9360](https://github.com/part-up/part-up/commit/d7c9360))
* **phraseapp:** add .phraseapp config file and refactor all the package.js to point to app/i18n files ([4fa3025](https://github.com/part-up/part-up/commit/4fa3025))
* **swarm:** header has pagination if more than 12 tribes are in the swarm ([6568f23](https://github.com/part-up/part-up/commit/6568f23))
* **swarm:** related tribes list is scrollable ([f9ab18e](https://github.com/part-up/part-up/commit/f9ab18e))
* **swarms:** added image ID to related uppers return object ([f0ed342](https://github.com/part-up/part-up/commit/f0ed342))
* **swarms:** added quote limit in add method ([c90a315](https://github.com/part-up/part-up/commit/c90a315))
* **swarms:** improved security on some swarm calls ([d616aed](https://github.com/part-up/part-up/commit/d616aed))
* **swarms:** quotes now have a limit of 180 chars ([d09c7a5](https://github.com/part-up/part-up/commit/d09c7a5))
* **swarms:** remove duplicates from swarm and network stats counter ([f162c7d](https://github.com/part-up/part-up/commit/f162c7d))
* **swarms:** remove network id from swarm when the tribe gets deleted ([34e9639](https://github.com/part-up/part-up/commit/34e9639))
* **swarms:** set new max char count for intro and description ([caac619](https://github.com/part-up/part-up/commit/caac619))
* **swarms:** stats update should run on all environments ([0e0f440](https://github.com/part-up/part-up/commit/0e0f440))
* **swarms:** swarm image publication reference fix ([9fa8f3c](https://github.com/part-up/part-up/commit/9fa8f3c))
* **swarmsettings:** add error handling and notifications on actions ([92dd433](https://github.com/part-up/part-up/commit/92dd433))



<a name="1.16.7"></a>
## [1.16.7](https://github.com/part-up/part-up/compare/1.16.6...1.16.7) (2016-02-16)


### Bug Fixes

* **autocomplete:** security patch ([a83ef9c](https://github.com/part-up/part-up/commit/a83ef9c))
* **explorer:** fallback for logo ([65899b8](https://github.com/part-up/part-up/commit/65899b8))
* **explorer:** fix color fallback text and spacing ([ca1169c](https://github.com/part-up/part-up/commit/ca1169c))
* **network card:** fix margin labels, line-height, margin-top ([18c949c](https://github.com/part-up/part-up/commit/18c949c))
* **swarm:** add users ([bf02af7](https://github.com/part-up/part-up/commit/bf02af7))
* **swarm:** added stats to network publication ([dc485bc](https://github.com/part-up/part-up/commit/dc485bc))
* **swarm:** better network layout ([2b007f4](https://github.com/part-up/part-up/commit/2b007f4))
* **swarm:** content translations ([285fc0d](https://github.com/part-up/part-up/commit/285fc0d))
* **swarm:** default state of swarm ([57fc5ee](https://github.com/part-up/part-up/commit/57fc5ee))
* **swarm:** exclude added tribes from autocomplete ([a0e5d53](https://github.com/part-up/part-up/commit/a0e5d53))
* **swarm:** file inclusion and no connection update ([040f2cc](https://github.com/part-up/part-up/commit/040f2cc))
* **swarm:** fix comment box paddings and font-size ([0e50036](https://github.com/part-up/part-up/commit/0e50036))
* **swarm:** fix paddings and width h3 block ([97d4de9](https://github.com/part-up/part-up/commit/97d4de9))
* **swarm:** fix video margins and width ([bfc3aae](https://github.com/part-up/part-up/commit/bfc3aae))
* **swarm:** fix video player responsive behaviour ([a19aa38](https://github.com/part-up/part-up/commit/a19aa38))
* **swarm:** fixed quote author autocomplete ([a0fb937](https://github.com/part-up/part-up/commit/a0fb937))
* **swarm:** improved the explorer to minimize tribe name overlapping ([7f4b0d7](https://github.com/part-up/part-up/commit/7f4b0d7))
* **swarm:** network status uniform for all pages ([048fb51](https://github.com/part-up/part-up/commit/048fb51))
* **swarm:** network tile stats ([c88c53d](https://github.com/part-up/part-up/commit/c88c53d))
* **swarm:** prefill values, also tried to do a max characters ([6afb412](https://github.com/part-up/part-up/commit/6afb412))
* **swarm:** quote view with edit button ([9f4d676](https://github.com/part-up/part-up/commit/9f4d676))
* **swarm:** talltiles now transition ([5978564](https://github.com/part-up/part-up/commit/5978564))
* **swarm): fix section paddings fix(swarm:** fix paddings sections ([b681df5](https://github.com/part-up/part-up/commit/b681df5))
* **swarms:** fixed typo that caused related uppers not to work ([d522be5](https://github.com/part-up/part-up/commit/d522be5))
* **swarms:** forgot to edit second typo ([f54b34f](https://github.com/part-up/part-up/commit/f54b34f))


### Features

* **swarm:** network related list ([18d0f91](https://github.com/part-up/part-up/commit/18d0f91))
* **swarm:** network tall tile list ([85810f1](https://github.com/part-up/part-up/commit/85810f1))
* **swarm:** quote component ([3fb08fe](https://github.com/part-up/part-up/commit/3fb08fe))
* **swarm:** quote component beginning ([dc65e62](https://github.com/part-up/part-up/commit/dc65e62))
* **swarm:** quotes can be submitted and removed ([cccacc9](https://github.com/part-up/part-up/commit/cccacc9))
* **swarms:** added method to autocomplete all users ([a894052](https://github.com/part-up/part-up/commit/a894052))
* **swarms:** added seo route ([c8de5f9](https://github.com/part-up/part-up/commit/c8de5f9))
* **swarms:** adjusted the cron time of the count stats ([860a14d](https://github.com/part-up/part-up/commit/860a14d))
* **swarms:** finalized stats service ([2b2b99b](https://github.com/part-up/part-up/commit/2b2b99b))
* **swarms:** optimized find queries ([ee41b93](https://github.com/part-up/part-up/commit/ee41b93))
* **swarms:** refactored related networks ([baa1b5d](https://github.com/part-up/part-up/commit/baa1b5d))
* **swarms:** related uppers call now returns non-empty unique arrays ([ece47ef](https://github.com/part-up/part-up/commit/ece47ef))
* **swarms:** return related networks ([67f2137](https://github.com/part-up/part-up/commit/67f2137))
* **swarms:** show related uppers method ([db6183a](https://github.com/part-up/part-up/commit/db6183a))
* **swarms:** updated the swarms and network schemas t oreflect the new stats ([046a566](https://github.com/part-up/part-up/commit/046a566))



<a name="1.16.6"></a>
## [1.16.6](https://github.com/part-up/part-up/compare/1.16.5...1.16.6) (2016-02-12)


### Bug Fixes

* **bender:** made it more readable ([7e748ec](https://github.com/part-up/part-up/commit/7e748ec))
* **comments:** Made the comment form id reactive so it refreshes the form when the view is switched ([7266739](https://github.com/part-up/part-up/commit/7266739))
* **comments:** Made the comment form id reactive so it refreshes the form when the view is switched ([ee045eb](https://github.com/part-up/part-up/commit/ee045eb))
* **file-uploader:** fixed the RegEdge to allow for file upload in the Edge browser ([de7af87](https://github.com/part-up/part-up/commit/de7af87))
* **file-uploader:** fixed the RegEdge to allow for file upload in the Edge browser ([e3c95bb](https://github.com/part-up/part-up/commit/e3c95bb))
* **guard:** removed empty guardedCriteria that caused errors. Can be put back when criteria arise ([9d30965](https://github.com/part-up/part-up/commit/9d30965))
* **ie9:** removed style files specific for IE9, not necessary in meteor 1.2 ([0f5be32](https://github.com/part-up/part-up/commit/0f5be32))
* **motivation:** give each comment field form a unique ID to prevent conflicting behaviour on the same update fixes [#228](https://github.com/part-up/part-up/issues/228) ([c9fd196](https://github.com/part-up/part-up/commit/c9fd196)), closes [#228](https://github.com/part-up/part-up/issues/228)
* **pricing:** updated the new pricing policy fixing [#163](https://github.com/part-up/part-up/issues/163) ([ff82e8d](https://github.com/part-up/part-up/commit/ff82e8d))
* **styling:** did some minor refactoring so components can be used better ([ae0c308](https://github.com/part-up/part-up/commit/ae0c308))
* **swarm:** background fix ([f46df92](https://github.com/part-up/part-up/commit/f46df92))
* **swarm:** better background masking ([5c26166](https://github.com/part-up/part-up/commit/5c26166))
* **swarm:** cleanup ([0dfecfc](https://github.com/part-up/part-up/commit/0dfecfc))
* **swarm:** final touches and some modal content ([fae6d7e](https://github.com/part-up/part-up/commit/fae6d7e))
* **swarm:** final touches to the header styling ([9d7121c](https://github.com/part-up/part-up/commit/9d7121c))
* **swarm:** fixed the header z index ([185237d](https://github.com/part-up/part-up/commit/185237d))
* **swarm:** header background ([de6bb76](https://github.com/part-up/part-up/commit/de6bb76))
* **swarm:** header swarm background ([ddb18dd](https://github.com/part-up/part-up/commit/ddb18dd))
* **swarm:** optimised some of the code after the code review with mr peerdemeeuw ([1956583](https://github.com/part-up/part-up/commit/1956583))
* **swarm:** prevent horizontal scrolling ([aa91dc8](https://github.com/part-up/part-up/commit/aa91dc8))
* **swarm:** refactored the explorer to be reactive, also accounted for empty swarms and non existing swarms ([42e592a](https://github.com/part-up/part-up/commit/42e592a))
* **swarm:** separated state and data and wait to show swarm content after subscription is ready ([633448a](https://github.com/part-up/part-up/commit/633448a))
* **swarm:** swarm content loaded with data ([e513807](https://github.com/part-up/part-up/commit/e513807))
* **swarm:** translations and helper structuring ([2b2e533](https://github.com/part-up/part-up/commit/2b2e533))
* **swarm:** translations for all components ([eab7d2e](https://github.com/part-up/part-up/commit/eab7d2e))
* **swarm:** tribe adding and removing now fully reactive ([36b0e52](https://github.com/part-up/part-up/commit/36b0e52))
* **swarm:** tribe list ([8071cac](https://github.com/part-up/part-up/commit/8071cac))
* **swarm:** tribes search in swarm settings ([b648ab2](https://github.com/part-up/part-up/commit/b648ab2))
* **swarm:** updated characters left translations ([3fec928](https://github.com/part-up/part-up/commit/3fec928))
* **swarm:** upper content block start ([e333464](https://github.com/part-up/part-up/commit/e333464))
* **swarms:** fixed the networks publication of swarms, now it's reactive ([3714761](https://github.com/part-up/part-up/commit/3714761))
* **swarms:** link to swarm from admin page now works ([fcc6764](https://github.com/part-up/part-up/commit/fcc6764))
* **transitions:** added swarms to page transitions ([bea2728](https://github.com/part-up/part-up/commit/bea2728))


### Features

* **license:** add license supplement ([9b84023](https://github.com/part-up/part-up/commit/9b84023))
* **network tile:** created network tile package in the same style as user tile ([250d4dc](https://github.com/part-up/part-up/commit/250d4dc))
* **network-card:** hover card beginning ([38eeb6d](https://github.com/part-up/part-up/commit/38eeb6d))
* **swarm:** added intro component and video components ([6651689](https://github.com/part-up/part-up/commit/6651689))
* **swarm:** base form for swarm settings ([657e6df](https://github.com/part-up/part-up/commit/657e6df))
* **swarm:** beginning of tribes swarm settings ([e9879fd](https://github.com/part-up/part-up/commit/e9879fd))
* **swarm:** bubble swarm header for swarm page ([4eb1ab9](https://github.com/part-up/part-up/commit/4eb1ab9))
* **swarm:** hover card for network ([fc11e82](https://github.com/part-up/part-up/commit/fc11e82))
* **swarm:** hover container styling ([8ebed4b](https://github.com/part-up/part-up/commit/8ebed4b))
* **swarm:** not found page ([97d6448](https://github.com/part-up/part-up/commit/97d6448))
* **swarm:** settings templates all in place ([6c4c537](https://github.com/part-up/part-up/commit/6c4c537))
* **swarm:** social share footer ([9a25b31](https://github.com/part-up/part-up/commit/9a25b31))
* **swarm:** swarm now uses swarm data (no filler data) ([407592f](https://github.com/part-up/part-up/commit/407592f))
* **swarm:** swarm settings route ([f3a6606](https://github.com/part-up/part-up/commit/f3a6606))
* **swarm-settings:** added route for swarm settings modal ([178bfec](https://github.com/part-up/part-up/commit/178bfec))
* **swarms:** add a network to a swarm ([d81ddde](https://github.com/part-up/part-up/commit/d81ddde))
* **swarms:** add quote method ([62726a1](https://github.com/part-up/part-up/commit/62726a1))
* **swarms:** added check in user collection to make sure he/she is admin of a given swarm ([18a49e3](https://github.com/part-up/part-up/commit/18a49e3))
* **swarms:** added counters to schema ([01199ff](https://github.com/part-up/part-up/commit/01199ff))
* **swarms:** added cron to update swarm stats ([4531983](https://github.com/part-up/part-up/commit/4531983))
* **swarms:** added event handler that triggers stats update on network add/remove ([9846a1b](https://github.com/part-up/part-up/commit/9846a1b))
* **swarms:** added networks publication ([a9dc38e](https://github.com/part-up/part-up/commit/a9dc38e))
* **swarms:** added quotes form schema ([47ce3ff](https://github.com/part-up/part-up/commit/47ce3ff))
* **swarms:** added service that updates the swarm stats ([542c1ec](https://github.com/part-up/part-up/commit/542c1ec))
* **swarms:** added swarm shared counters update base ([3b7060c](https://github.com/part-up/part-up/commit/3b7060c))
* **swarms:** added swarm shared counters update cron ([748a752](https://github.com/part-up/part-up/commit/748a752))
* **swarms:** added transformers ([62e122f](https://github.com/part-up/part-up/commit/62e122f))
* **swarms:** added update method ([667c1ea](https://github.com/part-up/part-up/commit/667c1ea))
* **swarms:** capitalized close copy on swarm admin ([4489907](https://github.com/part-up/part-up/commit/4489907))
* **swarms:** code cleanup ([df2ae3a](https://github.com/part-up/part-up/commit/df2ae3a))
* **swarms:** edited swarm insert data to reflect the updated schema ([6dc70c9](https://github.com/part-up/part-up/commit/6dc70c9))
* **swarms:** fixed the cron constants naming ([d4c2bf4](https://github.com/part-up/part-up/commit/d4c2bf4))
* **swarms:** remove a network from a swarm ([89545fd](https://github.com/part-up/part-up/commit/89545fd))
* **swarms:** remove quote method ([d112a49](https://github.com/part-up/part-up/commit/d112a49))
* **swarms:** removed double properties ([f541c44](https://github.com/part-up/part-up/commit/f541c44))
* **swarms:** search tribes to add based on normalized tribe name ([f452762](https://github.com/part-up/part-up/commit/f452762))
* **swarms:** swarm crud is working now ([9746793](https://github.com/part-up/part-up/commit/9746793))
* **swarms:** update quote method ([5737546](https://github.com/part-up/part-up/commit/5737546))
* **swarms:** updated some field lengths ([235dbed](https://github.com/part-up/part-up/commit/235dbed))
* **swarms:** updated the swarm schema to group stats ([addb9ec](https://github.com/part-up/part-up/commit/addb9ec))



<a name="1.16.5"></a>
## [1.16.5](https://github.com/part-up/part-up/compare/1.16.4...1.16.5) (2016-01-26)


### Bug Fixes

* **analytics:** add proper checks ([f46bf95](https://github.com/part-up/part-up/commit/f46bf95))
* **discover:** fix hidden private partups by fixing route authorization to get personal data ([9382462](https://github.com/part-up/part-up/commit/9382462))
* **html-in-message:** allow html in a message (rendered sanitized) ([53555c1](https://github.com/part-up/part-up/commit/53555c1))
* **mentions:** allow for people to be mentioned in comments and messages, while staying secure ([ec29997](https://github.com/part-up/part-up/commit/ec29997))
* **message:** fix safari file upload ([55888f0](https://github.com/part-up/part-up/commit/55888f0))
* **meta:** add google notranslate meta header to avoid page translation fix [#124](https://github.com/part-up/part-up/issues/124) ([7b78670](https://github.com/part-up/part-up/commit/7b78670)), closes [#124](https://github.com/part-up/part-up/issues/124)
* **partups:** fix insert handler error ([c22662d](https://github.com/part-up/part-up/commit/c22662d))
* **pu-dropdown:** remove overflow hidden which hides tribes menu on the left ([b600224](https://github.com/part-up/part-up/commit/b600224))
* **pu-dropdown:** removes displaced scrollbar on chrome ([9228bea](https://github.com/part-up/part-up/commit/9228bea))
* **sanitize:** do not html sanitize in the backend, because this is specific to the browser implementation ([a0e6fe0](https://github.com/part-up/part-up/commit/a0e6fe0))
* **security:** whitelist attributes when translating form to network object ([6371d25](https://github.com/part-up/part-up/commit/6371d25))
* **swarm:** responsive layout ([c059a29](https://github.com/part-up/part-up/commit/c059a29))
* **verify-email:** fix empty page when clicking the URL ([d0716b5](https://github.com/part-up/part-up/commit/d0716b5))
* **xss:** sanitize comments and partup status in sidebar ([a986fe2](https://github.com/part-up/part-up/commit/a986fe2))


### Features

* **analytics:** add second google analytics tracker ([9d721a0](https://github.com/part-up/part-up/commit/9d721a0))
* **analytics:** add secondGATracker to METEOR_SETTINGS in production variables ([b59700b](https://github.com/part-up/part-up/commit/b59700b))
* **login:** redirect to discover after login as requested in issue [#177](https://github.com/part-up/part-up/issues/177) ([6ec6ebe](https://github.com/part-up/part-up/commit/6ec6ebe))
* **swarm:** swarm base layout and route ([377cdca](https://github.com/part-up/part-up/commit/377cdca))
* **swarms:** added admin page ([ffe53ea](https://github.com/part-up/part-up/commit/ffe53ea))
* **swarms:** added find helpers ([cc66141](https://github.com/part-up/part-up/commit/cc66141))
* **swarms:** added insert method ([b244c86](https://github.com/part-up/part-up/commit/b244c86))
* **swarms:** added swarm schema ([73f6b2b](https://github.com/part-up/part-up/commit/73f6b2b))
* **swarms:** added swarms collection ([dd7da43](https://github.com/part-up/part-up/commit/dd7da43))
* **swarms:** export swarms collection for usage ([f100aa7](https://github.com/part-up/part-up/commit/f100aa7))
* **swarms:** first version of swarms publication ([56498d5](https://github.com/part-up/part-up/commit/56498d5))
* **swarms:** remove swarm method ([dfd9b41](https://github.com/part-up/part-up/commit/dfd9b41))
* **swarms:** update admin method ([11bc6b3](https://github.com/part-up/part-up/commit/11bc6b3))
* **swarms:** updated the swarm schema ([6ee981d](https://github.com/part-up/part-up/commit/6ee981d))



<a name="1.16.4"></a>
## [1.16.4](https://github.com/part-up/part-up/compare/14b3357...1.16.4) (2016-01-20)


### Bug Fixes

* **hovercontainer:** uncomment mouseleave event to fix the bug where the hovercontainer never disappears ([c0ccd4f](https://github.com/part-up/part-up/commit/c0ccd4f))
* **hovercontainer:** uncomment mouseleave event to fix the bug where the hovercontainer never disappears ([2d6d411](https://github.com/part-up/part-up/commit/2d6d411))
* **images:** add s3 bucket information to public settings ([ed873b6](https://github.com/part-up/part-up/commit/ed873b6))
* **notifications:** mentions in partup messages now only generate one notification when partners are mentioned ([3685ca3](https://github.com/part-up/part-up/commit/3685ca3))
* **partup:** better input sanitation ([eab06da](https://github.com/part-up/part-up/commit/eab06da))
* **plain-register:** compose profile server-side instead of pass profile object ([2270219](https://github.com/part-up/part-up/commit/2270219))
* **pu-dropdown:** removes displaced scrollbar on chrome ([40526e1](https://github.com/part-up/part-up/commit/40526e1))
* **signin:** small fix in securitypatch for facebook and linkedin signups ([aee4916](https://github.com/part-up/part-up/commit/aee4916))
* **tribe-uppers:** only show activate uppers on the tribe uppers overview ([59acae2](https://github.com/part-up/part-up/commit/59acae2))
* **user:** fix security hole where the user can edit his entire profile object from the client ([52d54f8](https://github.com/part-up/part-up/commit/52d54f8))


### Features

* **encrypted-env:** add encrypted development environment variables protected with a password (using ansible-vault) ([9cb4fc8](https://github.com/part-up/part-up/commit/9cb4fc8))
* **part-up:** open-sourcing part-up codebase ([14b3357](https://github.com/part-up/part-up/commit/14b3357))




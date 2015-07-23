Feature: Partup Privacy

  As a user of part-up
  I want to access the part-ups that I have access to
  So that everyone's hidden content is secure

  Scenario: Public Partups
    Given I am loggedin as "user"
    When I create a "public" partup
    Then I should see the partup on my profile
    And I should see the partup in my dropdown menu
    And user "john" should be able to view that partup in discover
    And user "john" should be able to view that partup in "user" his profile

  Scenario: Private Partups
    Given I am loggedin as "user"
    When I create a "private" partup
    And I invite user "john" to one of the "private" partup's activities
    Then I should be able to see the private partup in discover
    And I should be able to see the private partup in my profile menu 
    And user "john" should be able to see partup contents (! bug reported)
    And user "john" should be able to make a contribution
    And user "judy" should not see this partup in discover 
    And user "judy" should not see this partup in "user" his profile (! bug reported)
    And user "judy" should be unable to see partup contents

  Scenario: Tribe Public Partups
    Given I am loggedin as "user"
    And I am part of public tribe "lifely"
    When I create a partup in the public "lifely" tribe 
    Then I should see the partup in my profile view with the "lifely" tribe label
    Then I should see the partup in the discover view with the "lifely" tribe label
    Then user "john" should see the partup in the tribe partups view

  Scenario: Tribe Invite Partups
    Given I am loggedin as "user"
    And I am part of invite tribe "ING (invite)"
    And I invite user "john" to the invite tribe "ING (invite)"
    And user "john" visits the tribe page and accepts the tribe invite
    When I create a partup in the "ING (invite)" tribe
    Then I should see the partup in my profile view
    And user "john" should see the partup in the tribe partups view
    And user "judy" should be unable to see partup contents

  Scenario: Tribe Closed Partups
    Given I am loggedin as "john"
    And I am part of closed tribe "ING (closed)"
    And I invite user "user" to the closed tribe "ING (closed)"
    And tribe admin user "admin" accepts john to the closed tribe "ING (closed)"
    And user "user" visits the tribe page and accepts the tribe invite
    When I create a partup in the "ING (invite)" tribe
    Then I should see the partup in my profile view
    And user "user" should see the partup in the tribe partups view
    And user "judy" should be unable to see partup contents
    And user "judy" should be unable to see users in the tribe detail

Feature: Tribes

  As a user of part-up
  I want to participate in tribes
  So that I can use the grouping of part-ups with their specific visibility settings

  Scenario: Tribe Creation
    Given I am logged in as admin user "admin"
    And I navigate to "/tribes/create"
    When I create a tribe
    Then I should be owner and the first upper in the tribe

  Scenario: Joining Open Tribes
    Given I am loggedin as "user"
    When I join the public "lifely" tribe
    Then I should see the tribe listed in my profile tribe overview

  Scenario: Inviting users to "Invite Tribes"
    Given I am loggedin as tribe "ING (invite)" member "user"
    When I invite non tribe member user "john" to the tribe
    And user "john" receives an email with tribe link
    And user "john" is able to see the "ING (invite)" tribe with tribe closed notice
    And user "john" accepts the tribe invite
    Then user "john" is able to see the partups and users in the tribe 

  Scenario: Inviting users to "Closed Tribes" as a normal member
    Given I am loggedin as tribe "ING (closed)" member "john"
    When I invite non tribe member user "judy" to the tribe
    And user "judy" receives an email with tribe link
    And user "judy" accepts the tribe invite
    Then user "judy" sees pending status in "ING (closed)" tribe detail
    And user "admin" should recieve a notification about a new pending upper

  Scenario: Inviting users to "Closed Tribes" as an admin
    Given I am loggedin as tribe "ING (closed)" member "admin"
    When I invite non tribe member user "judy" to the tribe
    And user "judy" receives an email with tribe link
    And user "judy" accepts the tribe invite
    Then user "judy" is able to see the partups and users in the tribe
    And user "admin" should recieve a notification about a new pending upper

  Scenario: Accepting users into closed tribe
    Given I am loggedin as tribe admin "admin"
    And user "judy" has accepted her invite
    When I navigate to the tribe settings / requests page
    And accept user "judy" into the tribe
    Then user "judy" should not appear in the network requests overview
    And user "judy" should be able to access the tribe partups and uppers
    And user "judy" should recieve a notification that she is accepted

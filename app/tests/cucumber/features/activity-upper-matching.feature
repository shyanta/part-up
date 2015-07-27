Feature: Activity Upper Matching

  As a "default" user
  I want to get recommended uppers for an activity
  So that I invite them to join my partup

  Scenario: Match with tags
    Given I am loggedin as "user"
    Given I create a partup with tag "crowdfunding"
    Given user "john" has tag "crowdfunding" in his profile
    When I navigate to "/partups/gJngF65ZWyS9f3NDE/invite-for-activity/"
    Then I get user "john" as suggested upper

  Scenario: Match without tags
    Given I am loggedin as "user"
    Given I create a partup with tag "crowdfunding"
    Given there are no users with the tag "crowdfunding" in their profile
    When I navigate to "/partups/gJngF65ZWyS9f3NDE/invite-for-activity/"
    Then I get user "john" as suggested upper because his participation_score is highest

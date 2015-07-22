Feature: Allow users to login and logout

  As a "default" user
  I want to login and logout
  So that I can have manage my profile

  Scenario: A user can login with valid info
    Given I navigate to "/login"
    When I enter my authentication information
    Then I should see my username "Default User"

  Scenario: A user cannot login with bad information
    Given I navigate to "/login"
    When I enter wrong login information
    Then I should see an error

Feature: Allow users to login and logout

  As a "default" user
  I want to login and logout
  So that I can have manage my profile

  Background:
    Given I am signed out

  Scenario: A user can login with valid info
    Given I navigate to "/"
    When I click on sign in link
    And I enter my authentication information
    Then I should see my username "Default User"

  Scenario: A user cannot login with bad information
    Given I navigate to "/"
    When I click on sign in link
    And I enter wrong information
    Then I should see an error

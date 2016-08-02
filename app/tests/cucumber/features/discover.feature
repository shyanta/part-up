Feature: Discover

  As a loggedin / non loggedin user
  I want to discover partups
  So that I can decide which one to interact with

  @watch
  Scenario: Discover partups
    Given I navigate to "/discover"
    Then I should see some partup tiles

  @watch
  Scenario: Discover filters
    Given I navigate to "/discover"
    When I enter a discover keyword
    And I select a tribe
    And I select a location
    Then I should see filtered partups

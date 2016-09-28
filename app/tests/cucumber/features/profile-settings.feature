Feature: Profile

  As a user of part-up
  I want to be able to update my profile
  So that I can see my up-to-date profile details

#  @watch
  Scenario: Can edit my profile
    Given The user logs in as Judy on the login page "login"
    When Click the profile avatar
    When Click Settings
    When Type in "Judy Doe" and "Hello, I am Judy Doe"
    When Click the Save changes button
    When Click the Close button
    Then Should I see the updated profile "Judy Doe" and "Hello, I am Judy Doe"
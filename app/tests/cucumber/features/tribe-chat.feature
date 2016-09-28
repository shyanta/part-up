Feature: Partup Tribe Chat
  As a user of part-up
  I want to send a chat message
  So that I can see it send in the chat

  @watch
  Scenario: Can send a chat message
    Given The user logs in as Judy on page "login"
    When Navigate to Chats "tribes/lifely-open/chat"
    And Click 'I Understand' if cookie-bar is displayed
    And Type the message "Hello there"
    And Click the Send button
    And Then type the message "I Judy"
    And Click the Send button again
    Then Should see the messages "Hello there" and "I Judy"

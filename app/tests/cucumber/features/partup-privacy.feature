Feature: Partup Privacy
  As a user of part-up
  I want to access the part-ups that I have access to
  So that everyone's hidden content is secure

  Scenario: Can see private (closed) part-up
    Given The user is logged in as Admin
    Then Should see part-up title "Super secret closed ING partup"

  Scenario: Can not see private part-up
    Given The user is logged in as Judy
    Then Should NOT see "Super secret closed ING partup"


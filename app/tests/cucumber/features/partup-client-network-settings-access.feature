Feature:
  Filter part-ups based on access level within a tribe.
  User should be able to see partups of own access level and below
  Only a 'NETWORK_ADMINS' (tribe admins) should be able to manage the access level in the tribe.

  @access_types_of_tribe
  Scenario: Manage access types for tribe
    Given I have role 'NETWORK_ADMINS'
    And   I navigate to [/tribes/<tribe>]
    When  I press 'Settings' in the nav bar
    And   I press 'Tribe access' tab
    Then  I want to be able to add extra access types (max 2)
    And   I want to be able to manage the labels of the enabled extra access types
    And   I want to be able to manage the label of access type 'NETWORK_COLLEAGUES' at least one extra access type is added

  @access_type_of_partup_created
  Scenario: Create tribe part-up with new access type
    Given I have role 'NETWORK_ADMINS'
    And   I have configured custom access levels
    And   I navigate to [/tribes/<tribe>]
    When  I press 'Start a part-up in this tribe'
    Then  I should see two extra options for 'Who can see this part-up?'

  @access_type_of_partup_changed
  Scenario: Manage access type for tribe part-up
    Given I have role 'NETWORK_ADMINS'
    And   I have configured custom access levels
    And   I navigate to [/partups/<partup>]
    When  I press the 'cog icon' to go to partup settings
    Then  I want to be able to change setting 'Who can see this part-up?'
    And   allow change only to levels that I can view

  @access_type_of_partup_displayed
  Scenario: Show the partups the user is allowed to see
    Given I have a custom access level
    And   custom access levels are defined for the tribe
    And   I navigate to [/tribes/<tribe>] or [/tribes/<tribe>/partups]
    When  I'm looking at the partups list
    Then  I can see the access level of each partups
    And   I only see the partups I'm allowed to see (own access level and below)

  @access_type_of_member
  Scenario: Manage access for tribe member
    Given I have role 'NETWORK_ADMINS'
    And   I have configured custom access levels
    And   I navigate to [/profile/<user>]
    When  I click on the 'access type' tab
    Then  I want to be able to change the access level of this member

  @access_with_invite_token
  Scenario: Allow access for user with lower access level using invite token
    Given I have role 'NETWORK_ADMINS'
    And   I navigate to [/partups/<partup>]
    When  I press 'Invite' to invite a user with lower access level
    Then  invited user should be able accept the invite
    And   invited user should be able to see the partup

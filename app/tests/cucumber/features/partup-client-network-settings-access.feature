Feature:
  Filter part-ups based on access level within a tribe.
  User should be able to see partups of own access level and below
  Only a 'NETWORK_ADMINS' (tribe admins) should be able to manage the access level in the tribe.

  @tribe_settings_access
  Scenario: Manage access types in tribe settings
    Given I have role 'NETWORK_ADMINS'
    And   I navigate to [/tribes/<tribe>]
    When  I press 'Settings' in the nav bar
    And   I press 'Tribe access' tab
    Then  I want to be able to add extra access types (max 2)
    And   I want to be able to manage the labels of the enabled extra access types
    And   I want to be able to manage the label of access type 'NETWORK_COLLEAGUES' at least one extra access type is added

  @tribe_settings_member_access
  Scenario: Manage access for member in tribe settings
    Given I have role 'NETWORK_ADMINS'
    And   I navigate to [/tribes/<tribe>]
    When  I press 'Settings' in the nav bar
    And   I press 'Members' tab
    And   I press the 'cog icon' to edit a member
    Then  I want to include the custom access levels

  @tribe_settings_partup_access
  Scenario: Manage access for partups in tribe settings
    Given I have role 'NETWORK_ADMINS'
    And   I navigate to [/tribes/<tribe>]
    When  I press 'Settings' in the nav bar
    And   I press 'Partups' tab to see an overview of partups in the tribe
    And   I press the 'cog icon' to edit a partup
    Then  I want be able to manage access level for that partup

  @tribe_partup_start
  Scenario: Create tribe part-up with new access type
    Given I have role 'NETWORK_ADMINS'
    And   I have configured custom access levels
    And   I navigate to [/tribes/<tribe>]
    When  I press 'Start a part-up in this tribe'
    Then  I should see two extra options for 'Who can see this part-up?'

  @tribe_partup_filter
  Scenario: Show the partups the user is allowed to see
    Given I have a custom access level
    And   custom access levels are defined for the tribe
    And   I navigate to [/tribes/<tribe>] or [/tribes/<tribe>/partups]
    When  I'm looking at the partups list
    Then  I can see the access level of each partups
    And   I only see the partups I'm allowed to see (own access level and below)

  @partup_settings_change
  Scenario: Manage access type for tribe part-up
    Given I can have any role
    And   I navigate to [/partups/<partup>]
    When  I press the 'cog icon' to go to partup settings
    Then  I see all access levels defined in the tribe settings that are available
          for my access level in the dropdown of for 'Who can see this part-up'

  @access_with_invite_token
  Scenario: Allow access for user with lower access level using invite token
    Given I have role 'NETWORK_ADMINS'
    And   I navigate to [/partups/<partup>]
    When  I press 'Invite' to invite a user with lower access level
    Then  invited user should be able accept the invite
    And   invited user should be able to see the partup

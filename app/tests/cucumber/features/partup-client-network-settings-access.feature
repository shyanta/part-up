Feature:
  Filter part-ups based on access level within a tribe.
  User should be able to see partups of own access level and below
  Only a 'NETWORK_ADMINS' (tribe admins) should be able to manage the access level in the tribe.

  @tribe_settings_access
  Scenario: Manage access types in tribe settings
    Given I have role 'NETWORK_ADMINS'
    When  I navigate to [/tribes/<tribe>]
    And   I press 'Settings' in the nav bar
    And   I press 'Tribe access' tab
    Then  I see a list of all the access levels
    And   I'm able to change the copy (label) of each access level
    And   I'm able to add (max) two extra access levels + copy (label)

  @tribe_settings_member_access
  Scenario: Manage access for member in tribe settings
    Given I have role 'NETWORK_ADMINS'
    When  I navigate to [/tribes/<tribe>]
    And   I press 'Settings' in the nav bar
    And   I press 'Members' tab
    And   I press the 'cog icon' to edit a member
    Then  I want to include the custom access levels

  @tribe_settings_partup_access
  Scenario: Manage access for partups in tribe settings
    Given I have role 'NETWORK_ADMINS'
    When  I navigate to [/tribes/<tribe>]
    And   I press 'Settings' in the nav bar
    And   I press 'Partups' tab to see an overview of partups in the tribe
    And   I press the 'cog icon' to edit a partup
    Then  I want be able to manage access level for that partup

  @tribe_partup_start
  Scenario: Create tribe part-up with new access type
    Given I can have any access level
    And   I'm a tribe member
    And   I have configured custom access levels
    When  I navigate to [/tribes/<tribe>]
    And   I press 'Start a part-up in this tribe'
    Then  I see all access levels defined in the tribe settings that are available
          for my access level in the dropdown of for 'Who can see this part-up'

  @tribe_partup_filter
  Scenario: Show the partup tiles the user is allowed to see
    Given I can have any access level
    And   I'm a tribe member
    When  I navigate to [/tribes/<tribe>] or [/tribes/<tribe>/partups]
    And   I see a list of partup tiles
    Then  I can only see the partup tiles that are available for my access level
    And   I can see the access level of each partup tile

  @partup_settings_change
  Scenario: Manage access type for tribe part-up
    Given I can have any access level
    And   I'm a tribe member
    When  I navigate to [/partups/<partup>]
    And   I press the 'cog icon' to go to partup settings
    Then  I see all access levels defined in the tribe settings that are available
          for my access level in the dropdown of for 'Who can see this part-up'

  @access_with_invite_token
  Scenario: Allow access for user with lower access level using invite token
    Given I can have any access level
    When  I navigate to [/partups/<partup>]
    And   I press 'Invite' to invite a user with lower access level
    Then  invited user should be able accept the invite
    And   invited user should be able to see the partup
